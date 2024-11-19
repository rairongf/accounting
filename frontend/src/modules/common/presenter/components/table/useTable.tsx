"use client";

import { useState } from "react";

export interface TableRowData {
  id: string;
}

export interface TableColumnData {
  id: string;
  label: string;
}

export interface TableRowCellsData {
  [rowId: string]: {
    [columnId: string]: React.ReactNode;
  };
}

/// Ref: https://github.com/nextui-org/nextui/blob/main/packages/components/table/src/use-table.ts
///
interface Props<R extends TableRowData, C extends TableColumnData> {
  ///
  rows: R[];

  /// Table cells data
  cells: TableRowCellsData;

  ///
  onRowPressed?: (row: R) => void;

  ///
  columns: C[];

  /// Table title shown on top of the table (OPTIONAL)
  title?: React.ReactNode;

  /// Table title trailing actions (OPTIONAL)
  titleTrailingActions?: React.ReactNode;

  /// Table footer leading actions (OPTIONAL)
  footerLeadingActions?: React.ReactNode;

  /// Column applied filters count (OPTIONAL)
  appliedFiltersCountByColumn?: {
    [columnId: string]: number;
  };

  /// Column sorting (?)
  appliedSortDirectionByColumn?: {
    [columnId: string]: "asc" | "desc" | undefined;
  };

  ///
  onColumnFilterPressed?: (column: C) => void;

  ///
  onColumnSortPressed?: (column: C) => void;

  /// Pagination data (optional)
  pagination?: {
    initialPage: number;
    totalPages: number;
    totalElements: number;
    initialLimit: number;
    onPageChanged: (page: number) => void;
    onLimitChanged: (limit: number) => void;
  };

  /// Allow multiple selection (default false)
  selectionMode?: "single" | "multiple" | "none";

  ///
  onSelectionChanged?: (selectedIds: string[]) => void;
}

export type UseTableProps<
  R extends TableRowData,
  C extends TableColumnData
> = Props<R, C>;

export function useTable<R extends TableRowData, C extends TableColumnData>({
  selectionMode = "none",
  ...originalProps
}: UseTableProps<R, C>) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(
    originalProps.pagination?.initialPage ?? 1
  );
  const [limit, changeLimit] = useState(
    originalProps.pagination?.initialLimit ?? 10
  );

  /// Handle row selection events
  const isRowOfIdSelected = (rowId: string) => {
    return selectedIds.some((id) => id === rowId);
  };

  const changeSelectedRows = (value: string[]) => {
    setSelectedIds(value);
    originalProps.onSelectionChanged?.(value);
  };

  const onRowClicked = (row: R) => {
    originalProps.onRowPressed?.(row);
    const isSelected = isRowOfIdSelected(row.id);
    console.log(`Row of id ${row.id} pressed`);

    if (selectionMode === "none") return;

    if (selectionMode === "multiple") {
      changeSelectedRows(
        isSelected
          ? selectedIds.filter((id) => id !== row.id)
          : [...selectedIds, row.id]
      );
      return;
    }

    changeSelectedRows(isSelected ? [] : [row.id]);
  };

  /// Handle pagination events
  const isPageSelected = (page: number) => currentPage == page;

  const onPagePressed = (page: number) => {
    if (isPageSelected(page)) return;

    setCurrentPage(page);
    originalProps.pagination?.onPageChanged(page);
  };

  const isLimitSelected = (value: number) => limit == value;

  const onLimitSelected = (value: number) => {
    if (isLimitSelected(value)) return;

    changeLimit(value);
    originalProps.pagination?.onLimitChanged(value);
  };

  return {
    onRowClicked,
    isRowOfIdSelected,
    currentPage,
    onPagePressed,
    limit,
    onLimitSelected,
  };
}
