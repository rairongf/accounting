import { IsIn, IsOptional, IsString } from "class-validator";
import { PaginationQueryParamsDTO } from "src/modules/common";

export class FindManyContractsQueryDto extends PaginationQueryParamsDTO {
  @IsIn(['company', 'effective_date', 'signed_at', 'fee', 'department'])
  @IsString()
  @IsOptional()
  sortBy: 'company' | 'effective_date' | 'signed_at' | 'fee' | 'department' = 'effective_date';

  @IsIn(['asc', 'desc'])
  @IsString()
  @IsOptional()
  sortDirection: 'asc' | 'desc' = 'asc';
}