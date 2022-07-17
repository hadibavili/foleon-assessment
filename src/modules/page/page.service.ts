import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './model/page.model';
import { Row } from '../row/model/row.model';
import { RowService } from '../row/row.service';
import { Columns } from '../column/model/column.model';
import { Content } from '../content/model/content.model';
import { MESSAGES } from './constant/constant';
@Injectable()
export class PageService {
  constructor(
    @Inject(forwardRef(() => RowService))
    private readonly rowService: RowService,
    @InjectModel(Page)
    private readonly pageModel: typeof Page,
  ) {}

  async create(createPageDto: CreatePageDto) {
    return this.pageModel.create({ name: createPageDto.name });
  }

  findAll(): Promise<Page[]> {
    return this.pageModel.findAll({
      include: [
        {
          model: Row,
          include: [{ model: Columns, include: [{ model: Content }] }],
        },
      ],
    });
  }

  findOne(id: number): Promise<Page> {
    return this.pageModel.findOne({
      where: { id },
      include: [
        {
          model: Row,
          include: [{ model: Columns, include: [{ model: Content }] }],
        },
      ],
    });
  }

  async update(id: number, updatePageDto: UpdatePageDto): Promise<string> {
    const isUpdated = await this.pageModel.update(updatePageDto, {
      where: { id },
    });

    if (Boolean(isUpdated[0])) {
      return MESSAGES.PAGE_UPDATED;
    } else {
      throw new BadRequestException(MESSAGES.PAGE_UPDATED_400);
    }
  }

  async remove(id: number) {
    await this.rowService.removeRelationByPageId(id);
    const isDeleted = await this.pageModel.destroy({ where: { id } });

    if (isDeleted === 1) {
      return MESSAGES.PAGE_REMOVED;
    } else {
      throw new NotFoundException(MESSAGES.PAGE_REMOVED_404);
    }
  }
}
