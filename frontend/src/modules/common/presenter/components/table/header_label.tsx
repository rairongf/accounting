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
      <div className="flex justify-center items-center gap-2">
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
        {appliedSortDirection && (
          <Button onClick={onSortClick} className="p-[2px]">
            <Icon
              className={"text-xl m-auto !block"}
              name={
                appliedSortDirection == "asc"
                  ? "arrow_drop_up"
                  : "arrow_drop_down"
              }
            />
          </Button>
        )}
      </div>
    </th>
  );
}
