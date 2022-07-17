import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './model/content.model';
import { ContentColumn } from './model/contentColumn.model';
import { ColumnService } from '../column/column.service';
import { ContentTypeEnum } from './constant/contentType.enum';
import { MESSAGES } from './constant/constant';

@Injectable()
export class ContentService {
  constructor(
    @Inject(forwardRef(() => ColumnService))
    private readonly columnService: ColumnService,
    @InjectModel(Content)
    private readonly contentModel: typeof Content,
    @InjectModel(ContentColumn)
    private readonly contentColumnModel: typeof ContentColumn,
  ) {}

  async create(createContentDto: CreateContentDto): Promise<Content> {
    return this.contentModel.create({ ...createContentDto });
  }

  findAll(): Promise<Content[]> {
    return this.contentModel.findAll({});
  }

  findByType(type: ContentTypeEnum): Promise<Content[]> {
    return this.contentModel.findAll({ where: { type } });
  }

  findOne(id: number): Promise<Content> {
    return this.contentModel.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateContentDto: UpdateContentDto,
  ): Promise<string> {
    const isUpdated = await this.contentModel.update(updateContentDto, {
      where: { id },
    });

    if (updateContentDto.column_id) {
      const column = await this.columnService.findOne(
        updateContentDto.column_id,
      );

      if (!column) {
        throw new NotFoundException(MESSAGES.COLUMN_NOT_FOUND);
      }

      const isExist = await this.contentColumnModel.findOne({
        where: { content_id: id, column_id: updateContentDto.column_id },
      });

      if (!isExist) {
        await this.contentColumnModel.create({
          content_id: id,
          column_id: updateContentDto.column_id,
        });
      }
    }

    if (Boolean(isUpdated[0])) {
      return MESSAGES.CONTENT_UPDATED;
    } else {
      throw new BadRequestException(MESSAGES.CONTENT_UPDATED_400);
    }
  }

  async remove(id: number) {
    const contentColumn = await this.contentColumnModel.findOne({
      where: { content_id: id },
    });

    if (contentColumn) {
      throw new BadRequestException(MESSAGES.CONTENT_REMOVED_400);
    }

    const isDeleted = await this.contentModel.destroy({
      where: { id },
    });

    if (isDeleted === 1) {
      return MESSAGES.CONTENT_REMOVED;
    } else {
      throw new NotFoundException(MESSAGES.CONTENT_REMOVED_404);
    }
  }

  async removeRelationByRowId(id: number): Promise<void> {
    await this.contentColumnModel.destroy({
      where: { column_id: id },
    });
  }
}
