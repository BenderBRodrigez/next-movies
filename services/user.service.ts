import { initializedDataSource } from "../ormconfig";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import * as crypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { JwtPayload } from "jsonwebtoken";
import { LoginDto } from "../dto/login.dto";

class UserService {
  private repo: Promise<Repository<User>>;

  constructor() {
    this.repo = initializedDataSource().then((connection) =>
      connection.getRepository(User)
    );
  }

  async login(input: LoginDto) {
    const existing = await (await this.repo).findOneBy({ email: input.email });
    if (existing) {
      const valid = await crypt.compare(input.password, existing.password);
      if (valid) {
        return existing;
      } else {
        throw new Error("Invalid password");
      }
    }
    const password = await crypt.hash(input.password, crypt.genSaltSync(10));
    const token = jwt.sign({ email: input.email }, process.env.JWT_SECRET!);
    const user = (await this.repo).create({ ...input, password, token });
    return (await this.repo).save(user);
  }

  async getAuthUser() {
    const auth = headers().get("Authorization");
    const token = auth?.split(" ")[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return (await this.repo).findOneBy({
          email: (decoded as JwtPayload).email,
        });
      } catch (error) {
        throw new Error("Invalid token");
      }
    }
    throw new Error("Invalid token");
  }
}

const userService = new UserService();

export default userService;
