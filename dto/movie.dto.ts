import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { Transform } from "class-transformer";

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Max(2024)
  @Transform(({ value }) => Number(value))
  publishingYear: number;
}
