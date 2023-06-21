import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty, IsEnum } from 'class-validator';
import { UserStatus } from 'src/entities/status.entity';

export class CreateUserDto {
  //* NAME
  @ApiProperty({
    description: 'User Name',
    minLength: 3,
    maxLength: 20,
    default: 'Bob',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  readonly name: string;

  @ApiProperty({
    description: 'Status of the user',
    enum: UserStatus,
  })
  @IsEnum(UserStatus)
  readonly status: UserStatus;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
