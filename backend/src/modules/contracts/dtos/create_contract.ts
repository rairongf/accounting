import { Type } from "class-transformer";
import { ArrayUnique, IsArray, IsDate, IsInt, IsPositive } from "class-validator";

export class CreateContractDto {
  @IsDate()
  @Type(() => Date)
  effectiveDate: Date;

  @IsDate()
  @Type(() => Date)
  signedAt: Date;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  fee: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  companyId: number;

  @IsArray()
  @IsInt({ each: true })
  @ArrayUnique()
  services: number[];
}
