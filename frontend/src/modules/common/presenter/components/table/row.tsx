import { twJoin } from "tailwind-merge";

export interface TableRowPublicProps {
  children: React.ReactNode;
  className?: string;
}

interface TableRowProps extends TableRowPublicProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isSelected: boolean;
}

export function TableRow({
  children,
  className,
  onClick,
  isSelected,
}: Readonly<TableRowProps>) {
  return (
    <tr
      className={twJoin(
        "text-slate-700 group h-10 border-b border-gray-200 last:border-none",
        "odd:bg-white even:bg-gray-100",
        className,
        isSelected ? "!bg-gray-300" : ""
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}
