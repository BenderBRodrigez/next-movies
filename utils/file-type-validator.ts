import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

type ValidatorParams = { validTypes: string[] };

@ValidatorConstraint({ async: true })
export class IsFileType implements ValidatorConstraintInterface {
  static params(params: ValidatorParams) {
    return [params];
  }

  async validate(
    value: Promise<File>,
    validatorArguments: ValidationArguments
  ) {
    const [params] = validatorArguments.constraints as ValidatorParams[];
    const file = await value;
    return file && params.validTypes.includes(file.type);
  }

  defaultMessage(validatorArguments: ValidationArguments) {
    const [params] = validatorArguments.constraints as ValidatorParams[];
    return `file must be a type: ${params.validTypes.join(", ")}`;
  }
}
