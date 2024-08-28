import { initializedDataSource } from "../ormconfig";
import { Repository } from "typeorm";
import { Movie } from "../entities/movie.entity";
import { writeFile } from "fs/promises";
import { getPagingQuery, PagingInput } from "../utils/get-paging-query";
import { PagingResult } from "../types/paging-result";

class MovieService {
  private repo: Promise<Repository<Movie>>;

  constructor() {
    this.repo = initializedDataSource().then((connection) =>
      connection.getRepository(Movie)
    );
  }

  async uploadPoster(file: File) {
    const uploadPath = "./public/uploads";
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const posterUrl = `/uploads/${file.name}`;
    await writeFile(`${uploadPath}/${file.name}`, buffer);
    return posterUrl;
  }

  async create(input: any) {
    const movie = (await this.repo).create(input);
    return (await this.repo).save(movie);
  }

  async update(id: number, input: any) {
    const movie = await (await this.repo).findOneBy({ id });
    if (!movie) {
      throw new Error("Movie not found");
    }
    Object.assign(movie, input);
    return (await this.repo).save(movie);
  }

  async getUserMovies(
    userId: number,
    paging: PagingInput
  ): Promise<PagingResult<Movie>> {
    const { skip, take } = getPagingQuery(paging);
    const [results, total] = await (
      await this.repo
    ).findAndCount({
      where: { createdBy: { id: userId } },
      order: { createdAt: "DESC" },
      skip,
      take,
    });
    return { results, total, ...paging };
  }

  async getUserMovie(userId: number, id: number) {
    return (await this.repo).findOneBy({ id, createdBy: { id: userId } });
  }
}

const movieService = new MovieService();

export default movieService;
