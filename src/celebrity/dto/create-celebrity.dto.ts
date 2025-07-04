import { IsString, IsNotEmpty, IsOptional, IsInt, Min, IsUrl } from 'class-validator';

export class CreateCelebrityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsOptional()
  @IsUrl()
  instagram?: string;

  @IsInt()
  @Min(1000)
  fanbase: number;

  @IsOptional()
  @IsString()
  setlist?: string;
}
