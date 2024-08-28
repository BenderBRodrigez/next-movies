import { validateOrReject, ValidationError } from "class-validator";

class ValidationService {
  private formatErrors(errors: ValidationError[]) {
    return errors.map((error) => {
      return {
        message: Object.values(error.constraints || {}).join(", "),
      };
    });
  }

  async validate(input: any, Dto: any) {
    const dto = new Dto();
    Object.entries(input).forEach(([key, value]) => {
      dto[key] = value;
    });
    await validateOrReject(dto).catch((errors) => {
      const formattedErrors = this.formatErrors(errors);
      throw formattedErrors;
    });
  }
}

const validationService = new ValidationService();

export default validationService;
