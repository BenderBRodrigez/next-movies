import userService from "../../../services/user.service";
import { NextResponse } from "next/server";
import { LoginDto } from "../../../dto/login.dto";
import validationService from "../../../services/validation.service";

export async function POST(request: Request) {
  const input = await request.json();
  try {
    await validationService.validate(input, LoginDto);
    const user = await userService.login(input);
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      error.message ? { message: error.message } : error,
      { status: 400 }
    );
  }
}
