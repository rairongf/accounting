import { twJoin } from "tailwind-merge";
import { Button } from "./buttons";
import { Icon } from "./icon";
import { Row } from "./layout";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  totalElements: number;
  limit: number;
  onPagePressed: (page: number) => void;
  onLimitSelected: (limit: number) => void;
}

export function Pagination({
  totalPages,
  currentPage,
  totalElements,
  limit,
  onPagePressed,
  onLimitSelected,
}: PaginationProps) {
  const previousPageEnabled = currentPage > 1;
  const nextPageEnabled = currentPage < totalPages;

  const ArrowButton: React.FC<{
    iconName: string;
    onClick?: () => void;
    disabled?: boolean;
  }> = ({ disabled = false, ...props }) => (
    <Button
      onClick={props.onClick}
      disabled={disabled}
      className={twJoin(
        "flex items-center text-2xl",
        disabled ? "text-app-lime/60" : "text-app-lime"
      )}
    >
      <Icon name={props.iconName} />
    </Button>
  );

  const firstElementIndex = (currentPage - 1) * limit + 1;
  const lastElementIndex = firstElementIndex + limit - 1;

  return (
    <div className="flex flex-row justify-end items-center gap-2 text-sm text-slate-700 font-semibold">
      <Row className="gap-4 justify-end items-center">
        <span>Itens por página:</span>
        <select
          className="outline-none border-b border-black w-16"
          onChange={(e) => onLimitSelected(+e.target.value)}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </Row>

      <span className="mx-6">
        {firstElementIndex} - {lastElementIndex} de {totalElements}
      </span>

      <ArrowButton
        iconName="first_page"
        disabled={currentPage === 1}
        onClick={currentPage !== 1 ? () => onPagePressed(1) : undefined}
      />

      <ArrowButton
        iconName="keyboard_arrow_left"
        disabled={!previousPageEnabled}
        onClick={
          previousPageEnabled ? () => onPagePressed(currentPage - 1) : undefined
        }
      />

      <ArrowButton
        iconName="keyboard_arrow_right"
        disabled={!nextPageEnabled}
        onClick={
          nextPageEnabled ? () => onPagePressed(currentPage + 1) : undefined
        }
      />

      <ArrowButton
        iconName="last_page"
        disabled={currentPage === totalPages}
        onClick={
          currentPage !== totalPages
            ? () => onPagePressed(totalPages)
            : undefined
        }
      />
    </div>
  );
}
