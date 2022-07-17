import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ContentTypeEnum } from '../constant/contentType.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  value: string;

  @IsEnum(ContentTypeEnum)
  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  column_id: number;
}
