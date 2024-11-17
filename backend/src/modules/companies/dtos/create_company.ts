import { IsNotEmpty, IsString } from "class-validator";
import { IsTaxIdNonDigitsEnabled } from "../validators/is_tax_id_non_digits_enabled";

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  legalName: string;

  @IsString()
  @IsNotEmpty()
  tradeName: string;

  @IsTaxIdNonDigitsEnabled('pt-BR', {
    message: args => `${args.property} must be a Tax Identification Number`
  })
  taxId: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;
}
