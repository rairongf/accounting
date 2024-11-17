import { IsIn, IsInt, IsOptional, Max, Min } from "class-validator";
import { KpiType } from "../entities";

export class FindManyKpisQueryDto {
  @IsOptional()
  @IsIn(KpiType.allTypes, { each: true })
  types: string[];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(4)
  amountPerType: number = 1;
}