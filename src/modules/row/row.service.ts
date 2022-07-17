import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRowDto } from './dto/create-row.dto';
import { UpdateRowDto } from './dto/update-row.dto';
import { Row } from './model/row.model';
import { PageService } from '../page/page.service';
import { RowPage } from './model/rowPage.model';
import { Columns } from '../column/model/column.model';
import { ColumnService } from '../column/column.service';
import { Content } from '../content/model/content.model';
import { MESSAGES } from './constant/constant';
@Injectable()
export class RowService {
  constructor(
    @Inject(forwardRef(() => PageService))
    private readonly pageService: PageService,
    @Inject(forwardRef(() => ColumnService))
    private readonly columnsService: ColumnService,
    @InjectModel(Row)
    private readonly rowModel: typeof Row,
    @InjectModel(RowPage)
    private readonly rowPageModel: typeof RowPage,
  ) {}

  async create(createRowDto: CreateRowDto): Promise<Row> {
    const page = await this.pageService.findOne(createRowDto.page_id);
    if (!page) {
      throw new NotFoundException(MESSAGES.PAGE_NOT_FOUND);
    }
    const row = await this.rowModel.create({ name: createRowDto.name });
    await this.rowPageModel.create({
      row_id: row.id,
      page_id: page.id,
    });
    return row;
  }

  findAll(): Promise<Row[]> {
    return this.rowModel.findAll({
      include: [
        {
          model: Columns,
          include: [{ model: Content }],
        },
      ],
    });
  }

  findOne(id: number): Promise<Row> {
    return this.rowModel.findOne({
      where: { id },
      include: [
        {
          model: Columns,
          include: [{ model: Content }],
        },
      ],
    });
  }

  async update(id: number, updateRowDto: UpdateRowDto): Promise<string> {
    const isUpdated = await this.rowModel.update(updateRowDto, {
      where: { id },
    });

    if (Boolean(isUpdated[0])) {
      return MESSAGES.ROW_UPDATED;
    } else {
      throw new BadRequestException(MESSAGES.ROW_UPDATED_400);
    }
  }

  async remove(id: number) {
    await this.columnsService.removeRelationByRowId(id);

    const isDeleted = await this.rowPageModel.destroy({
      where: { row_id: id },
    });
    if (isDeleted === 0) {
      throw new BadRequestException(MESSAGES.ROW_REMOVED_400);
    }

    const result = await this.rowModel.destroy({ where: { id } });

    if (result === 1) {
      return MESSAGES.ROW_REMOVED;
    } else {
      throw new NotFoundException(MESSAGES.ROW_REMOVED_404);
    }
  }

  async removeRelationByPageId(id: number): Promise<void> {
    await this.rowPageModel.destroy({
      where: { page_id: id },
    });
  }
}
