import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RowService } from './row.service';
import { CreateRowDto } from './dto/create-row.dto';
import { UpdateRowDto } from './dto/update-row.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('row')
@ApiTags('row')
export class RowsController {
  constructor(private readonly rowsService: RowService) {}

  @Post()
  create(@Body() createRowDto: CreateRowDto) {
    return this.rowsService.create(createRowDto);
  }

  @Get()
  findAll() {
    return this.rowsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rowsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRowDto: UpdateRowDto) {
    return this.rowsService.update(+id, updateRowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rowsService.remove(+id);
  }
}
