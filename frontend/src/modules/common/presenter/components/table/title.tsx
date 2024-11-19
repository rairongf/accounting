interface TableTitleProps {
  children: React.ReactNode;
}

export function TableTitle({ children }: Readonly<TableTitleProps>) {
  return (
    <div className={`flex flex-row justify-between items-center`}>
      {children}
    </div>
  );
}
