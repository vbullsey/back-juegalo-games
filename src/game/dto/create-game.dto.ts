import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  slug: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  category: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsOptional()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsNumber()
  votes: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  provider: string;

  @IsString()
  @IsNotEmpty()
  images: string;
}
