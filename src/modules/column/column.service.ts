import {
  Inject,
  forwardRef,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Columns } from './model/column.model';
import { InjectModel } from '@nestjs/sequelize';
import { RowService } from '../row/row.service';
import { ColumnRow } from './model/columnRow.model';
import { Content } from '../content/model/content.model';
import { ContentService } from '../content/content.service';
import { MESSAGES } from './constant/constant';

@Injectable()
export class ColumnService {
  constructor(
    @Inject(forwardRef(() => RowService))
    private readonly rowsService: RowService,
    @Inject(forwardRef(() => ContentService))
    private readonly contentsService: ContentService,
    @InjectModel(Columns)
    private readonly columnModel: typeof Columns,
    @InjectModel(ColumnRow)
    private readonly columnRowModel: typeof ColumnRow,
  ) {}

  async create(createColumnDto: CreateColumnDto): Promise<Columns> {
    const row = await this.rowsService.findOne(createColumnDto.row_id);
    if (!row) {
      throw new NotFoundException(MESSAGES.ROW_NOT_FOUND);
    }
    const column = await this.columnModel.create({
      name: createColumnDto.name,
    });
    await this.columnRowModel.create({
      row_id: row.id,
      column_id: column.id,
    });
    return column;
  }

  findAll(): Promise<Columns[]> {
    return this.columnModel.findAll({
      include: [
        {
          model: Content,
        },
      ],
    });
  }

  findOne(id: number): Promise<Columns> {
    return this.columnModel.findOne({
      where: { id },
      include: [
        {
          model: Content,
        },
      ],
    });
  }

  async update(id: number, updateColumnDto: UpdateColumnDto): Promise<string> {
    const isUpdated = await this.columnModel.update(updateColumnDto, {
      where: { id },
    });

    if (Boolean(isUpdated[0])) {
      return MESSAGES.COLUMN_UPDATED;
    } else {
      throw new BadRequestException(MESSAGES.COLUMN_UPDATED_400);
    }
  }

  async remove(id: number) {
    await this.contentsService.removeRelationByRowId(id);

    const isDeleted = await this.columnRowModel.destroy({
      where: { column_id: id },
    });
    if (isDeleted === 0) {
      throw new BadRequestException(MESSAGES.COLUMN_REMOVED_400);
    }

    const isColumnDeleted = await this.columnModel.destroy({ where: { id } });

    if (isColumnDeleted === 1) {
      return MESSAGES.COLUMN_REMOVED_400;
    } else {
      throw new NotFoundException(MESSAGES.COLUMN_REMOVED_404);
    }
  }

  async removeRelationByRowId(id: number): Promise<void> {
    await this.columnRowModel.destroy({
      where: { row_id: id },
    });
  }
}
