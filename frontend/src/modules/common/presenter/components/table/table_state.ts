import { PaginatedData } from "@/modules/common/domain";

export interface TableState<RowType = unknown> extends PaginatedData<RowType> {
  filters?: object;
}
