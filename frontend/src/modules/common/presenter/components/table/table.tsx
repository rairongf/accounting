"use client";

import { Icon } from "..";
import { Row } from "../layout";
import { Pagination } from "../pagination";
import { TableCell } from "./cell";
import { TableHeaderLabel } from "./header_label";
import { TableRow } from "./row";
import { TableTitle } from "./title";
import {
  TableColumnData,
  TableRowData,
  UseTableProps,
  useTable,
} from "./useTable";

export function Table<R extends TableRowData, C extends TableColumnData>({
  ...props
}: UseTableProps<R, C>) {
  const {
    onRowClicked,
    isRowOfIdSelected,
    currentPage,
    onPagePressed,
    limit,
    onLimitSelected,
  } = useTable<R, C>(props);

  const shouldBuildFooter =
    props.pagination != null || props.footerLeadingActions != null;
  const shouldBuildTitle =
    props.title != null || props.titleTrailingActions != null;

  const rowsStyles =
    props.selectionMode && props.selectionMode != "none"
      ? `hover:bg-gray-200 hover:cursor-pointer`
      : "hover:bg-gray-200";

  return (
    <div className={`flex flex-col justify-start items-stretch h-full gap-6`}>
      {shouldBuildTitle && (
        <TableTitle>
          {props.title && typeof props.title == "string" && (
            <span
              className={`font-semibold text-neutral-900 text-xl font-['Nunito Sans']`}
            >
              {props.title}
            </span>
          )}
          {props.title && typeof props.title != "string" && props.title}
          <div className={`flex flex-row justify-between items-center gap-4`}>
            {props.titleTrailingActions != null && props.titleTrailingActions}
          </div>
        </TableTitle>
      )}
      <div className={`max-h-full overflow-x-auto shadow-md rounded-xl`}>
        <table className={`table-auto border-collapse mb-0 w-full`}>
          <thead>
            <tr>
              {props.columns.map((c) => (
                <TableHeaderLabel
                  key={c.id}
                  id={c.id}
                  label={c.label}
                  appliedFiltersCount={
                    props.appliedFiltersCountByColumn?.[c.id]
                  }
                  appliedSortDirection={
                    props.appliedSortDirectionByColumn?.[c.id]
                  }
                  onFilterClick={() => props.onColumnFilterPressed?.(c)}
                  onSortClick={() => props.onColumnSortPressed?.(c)}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {props.rows.length > 0 &&
              props.rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    onClick={() => onRowClicked(row)}
                    className={rowsStyles}
                    isSelected={isRowOfIdSelected(row.id)}
                  >
                    {Object.values(props.cells[row.id]).map((data, index) => (
                      <TableCell key={`${row.id}_cell_${index}`}>
                        {data}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </tbody>
        </table>
      </div>
      {props.rows.length == 0 && (
        <div className="w-full col-span-full flex flex-col justify-center items-center gap-2">
          <Icon name={"info"} className="text-2xl text-fuchsia-900" />
          <span className="text-gray-600 font-semibold text-base">
            Nenhum dado encontrado
          </span>
        </div>
      )}
      {shouldBuildFooter && (
        <Row className={`justify-between items-center`}>
          {props.footerLeadingActions != null && props.footerLeadingActions}
          {props.footerLeadingActions == null && <div></div>}
          {props.pagination && (
            <Pagination
              totalPages={props.pagination!.totalPages}
              currentPage={currentPage}
              limit={limit}
              totalElements={props.pagination!.totalElements}
              onPagePressed={onPagePressed}
              onLimitSelected={onLimitSelected}
            />
          )}
        </Row>
      )}
    </div>
  );
}
