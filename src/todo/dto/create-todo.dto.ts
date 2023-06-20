import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  //* TITLE
  @ApiProperty({
    description: 'Todo title',
    minLength: 3,
    maxLength: 20,
    default: 'My new Todo',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  readonly title: string;

  //* DESCRIPTION
  @ApiProperty({
    description: 'Todo description',
    minLength: 3,
    maxLength: 50,
    default: 'My new Todo',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  readonly description: string;
}
