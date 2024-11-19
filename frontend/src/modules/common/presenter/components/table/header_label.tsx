import { twJoin } from "tailwind-merge";
import { Button } from "../buttons";
import { Icon } from "../icon";

interface TableHeaderLabelProps {
  id: string;
  label: string;
  appliedFiltersCount?: number;
  appliedSortDirection?: "asc" | "desc";
  onSortClick?: () => void;
  onFilterClick?: () => void;
}

export function TableHeaderLabel({
  label,
  appliedFiltersCount,
  appliedSortDirection,
  onSortClick,
  onFilterClick,
}: Readonly<TableHeaderLabelProps>) {
  return (
    <th className={`text-center text-white text-sm font-bold bg-app-lime p-3`}>
      <div className="flex justify-center items-center gap-1">
        <span className="align-middle">{label}</span>
        {appliedFiltersCount != null && (
          <Button onClick={onFilterClick} className="relative p-[2px]">
            <Icon className={"text-xl m-auto !block"} name={"filter_list"} />
            {appliedFiltersCount > 0 && (
              <div className="absolute -bottom-1 -right-1 size-3 rounded-full flex justify-center items-center bg-gray-700 ">
                <span className="text-center text-[8px] text-white">
                  {appliedFiltersCount}
                </span>
              </div>
            )}
          </Button>
        )}
        {onSortClick && (
          <Button
            onClick={onSortClick}
            className="group size-5 flex items-center"
          >
            <Icon
              className={twJoin(
                "text-xl",
                appliedSortDirection ? "!block" : "!hidden group-hover:!block"
              )}
              name={
                appliedSortDirection === "desc"
                  ? "arrow_drop_down"
                  : "arrow_drop_up"
              }
            />
          </Button>
        )}
      </div>
    </th>
  );
}
