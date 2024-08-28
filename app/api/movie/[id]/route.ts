import movieService from "../../../../services/movie.service";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import userService from "../../../../services/user.service";
import validationService from "../../../../services/validation.service";
import { UpdateMovieDto } from "../../../../dto/update-movie.dto";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const user = await userService.getAuthUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const movie = await movieService.getUserMovie(user.id, params.id);
    return NextResponse.json(movie);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const publishingYear = parseInt(
      formData.get("publishingYear") as string,
      10
    );
    await validationService.validate(
      { title, publishingYear, file },
      UpdateMovieDto
    );
    const movie = await movieService.update(params.id, {
      title,
      publishingYear,
      ...(file && { posterUrl: await movieService.uploadPoster(file) }),
    });

    revalidatePath("/");

    return NextResponse.json(movie);
  } catch (error: any) {
    return NextResponse.json(
      error.message ? { message: error.message } : error,
      { status: 400 }
    );
  }
}
