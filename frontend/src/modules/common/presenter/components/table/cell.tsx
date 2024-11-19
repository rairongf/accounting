interface TableCellProps {
  children?: React.ReactNode;
}

export function TableCell({ children }: Readonly<TableCellProps>) {
  return (
    <td className={`first:pl-2 last:pr-2 text-center text-sm font-semibold`}>
      {children}
    </td>
  );
}
