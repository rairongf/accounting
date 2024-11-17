import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaginationQueryParamsDTO } from "src/modules/common";

export class FindManyCompaniesQueryDto extends PaginationQueryParamsDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  taxId?: string;
}