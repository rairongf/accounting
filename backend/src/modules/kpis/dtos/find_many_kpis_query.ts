import { Transform } from "class-transformer";
import { IsIn, IsOptional } from "class-validator";
import { KpiType } from "../entities";

export class FindManyKpisQueryDto {
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @IsIn(KpiType.allTypes, { each: true })
  @IsOptional()
  types: string[] = KpiType.allTypes;

  /* @Max(4)
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  amountPerType: number = 1; */
}