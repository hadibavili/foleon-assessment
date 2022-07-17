import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
