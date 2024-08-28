import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import movieService from "../../../services/movie.service";
import userService from "../../../services/user.service";
import validationService from "../../../services/validation.service";
import { CreateMovieDto } from "../../../dto/create-movie.dto";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  try {
    const user = await userService.getAuthUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const movies = await movieService.getUserMovies(user.id, { page, limit });
    return NextResponse.json(movies);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await userService.getAuthUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const publishingYear = parseInt(
      formData.get("publishingYear") as string,
      10
    );
    await validationService.validate(
      { title, publishingYear, file },
      CreateMovieDto
    );

    const movie = await movieService.create({
      title,
      publishingYear,
      posterUrl: await movieService.uploadPoster(file),
      createdBy: { id: user.id },
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
