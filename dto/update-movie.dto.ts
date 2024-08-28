import { IsOptional, Validate } from "class-validator";
import { IsFileType } from "../utils/file-type-validator";
import { MovieDto } from "./movie.dto";

export class UpdateMovieDto extends MovieDto {
  @IsOptional()
  @Validate(
    IsFileType,
    IsFileType.params({
      validTypes: [
        "image/webp",
        "image/gif",
        "image/svg+xml",
        "image/png",
        "image/jpeg",
      ],
    })
  )
  file: File;
}
