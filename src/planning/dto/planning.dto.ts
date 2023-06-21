import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePlanningDto {
  //* TITLE
  @ApiProperty({
    description: 'Todo UUID',
  })
  @IsUUID()
  @IsNotEmpty()
  readonly todo: string;

  //* DESCRIPTION
  @ApiProperty({
    description: 'User UUID',
  })
  @IsUUID()
  @IsNotEmpty()
  readonly user: string;
}

export class UpdatePlanningDto extends PartialType(CreatePlanningDto) {}
