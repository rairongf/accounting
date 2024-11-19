"use client";

import {
  Column,
  Icon,
  Input,
  PageScaffold,
  Table,
  TableColumnData,
  TableRowCellsData,
  TableRowData,
  TableState,
} from "@/modules/common";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { twJoin } from "tailwind-merge";

type CompaniesTableRowData = TableRowData & {
  name: string;
  taxId: string;
  status: string;
  actions: string;
};

export function CompaniesListPageContent() {
  const routeNames = useTranslations("route_names");
  const buttonLabels = useTranslations("button_labels");

  const rows: CompaniesTableRowData[] = [
    {
      id: "1",
      name: "Sit Dot LTDA",
      taxId: "00.000.000/0000-00",
      status: "Ativa",
      actions: "open edit delete",
    },
    {
      id: "2",
      name: "Sit Dot LTDA",
      taxId: "00.000.000/0000-00",
      status: "Ativa",
      actions: "open edit delete",
    },
    {
      id: "3",
      name: "Sit Dot LTDA",
      taxId: "00.000.000/0000-00",
      status: "Ativa",
      actions: "open edit delete",
    },
    {
      id: "4",
      name: "Sit Dot LTDA",
      taxId: "00.000.000/0000-00",
      status: "Ativa",
      actions: "open edit delete",
    },
  ];

  const [tableState, setTableState] = useState<
    TableState<CompaniesTableRowData>
  >({
    elements: [rows[0]],
    currentPage: 1,
    totalElements: rows.length,
    totalPages: 4,
  });

  const columns: TableColumnData[] = [
    { id: "name", label: "Nome" },
    { id: "taxId", label: "CNPJ" },
    { id: "status", label: "Status" },
    { id: "actions", label: "Ações" },
  ];

  return (
    <PageScaffold
      title={routeNames("companies")}
      trailing={
        <Link href={"/companies/add"} passHref>
          <div className="py-3 px-8 bg-app-lime rounded-lg text-white text-sm font-bold">
            {buttonLabels("add_company")}
          </div>
        </Link>
      }
    >
      <Column className="gap-6 items-stretch w-full h-full">
        <Input
          rowProps={{
            className: twJoin("px-4"),
          }}
          suffix={<Icon name={"search"} className={"text-2xl text-app-lime"} />}
          placeholder="Buscar por nome ou CNPJ"
        />
        <Table
          rows={tableState.elements}
          cells={tableState.elements.reduce(
            (object, row) => ({
              ...object,
              [row.id]: {
                [columns[0].id]: row.name,
                [columns[1].id]: row.taxId,
                [columns[2].id]: row.status,
                [columns[3].id]: row.actions,
              },
            }),
            {} as TableRowCellsData
          )}
          columns={columns}
          pagination={{
            initialPage: tableState.currentPage,
            totalPages: tableState.totalPages,
            onPageChanged: (page) => console.log("Page changed to: ", page),
            totalElements: tableState.totalElements,
            initialLimit: tableState.elements.length,
            onLimitChanged: (limit) => console.log("Limit changed to: ", limit),
          }}
          selectionMode="multiple"
        />
      </Column>
    </PageScaffold>
  );
}
