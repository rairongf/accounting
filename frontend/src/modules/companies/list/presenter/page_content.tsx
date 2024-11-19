"use client";

import {
  Column,
  Icon,
  Input,
  PageScaffold,
  PaginatedRepositoryArguments,
  Table,
  TableColumnData,
  TableRowCellsData,
  TableRowData,
  TableState,
} from "@/modules/common";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";
import { findManyCompanies, FindManyCompaniesRepositoryQuery } from "../infra";

type CompaniesTableRowData = TableRowData & {
  name: string;
  taxId: string;
  status: string;
};

export function CompaniesListPageContent() {
  const routeNames = useTranslations("route_names");
  const buttonLabels = useTranslations("button_labels");

  const columns: TableColumnData[] = [
    { id: "name", label: "Nome" },
    { id: "taxId", label: "CNPJ" },
    { id: "status", label: "Status" },
    { id: "actions", label: "Ações" },
  ];

  const [tableState, setTableState] = useState<
    TableState<CompaniesTableRowData>
  >({
    elements: [],
    currentPage: 1,
    totalElements: 0,
    totalPages: 4,
  });

  async function getDataAndUpdateState(
    args?: PaginatedRepositoryArguments<FindManyCompaniesRepositoryQuery>
  ) {
    const { data, didSucceed } = await findManyCompanies({ ...args });
    if (!didSucceed) return;
    setTableState({
      elements: data.elements.map((e) => ({
        ...e,
        status: e.deletedAt ? "Inativa" : "Ativa",
      })),
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
    });
  }

  const [search, setSearch] = useState<string>("");
  let timeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (!search) {
        getDataAndUpdateState();
        return;
      }

      getDataAndUpdateState({
        name: search,
        taxId: search,
      });
    }, 1000);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [search]);

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
          id={"search_input"}
          rowProps={{
            className: twJoin("px-4"),
          }}
          suffix={<Icon name={"search"} className={"text-2xl text-app-lime"} />}
          placeholder="Buscar por nome ou CNPJ"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
                [columns[3].id]: <>ACTIONS</>,
              },
            }),
            {} as TableRowCellsData
          )}
          columns={columns}
          pagination={{
            initialPage: tableState.currentPage,
            totalPages: tableState.totalPages,
            onPageChanged: (page, limit) =>
              getDataAndUpdateState({ page, limit }),
            totalElements: tableState.totalElements,
            initialLimit: 10,
            onLimitChanged: (limit, page) =>
              getDataAndUpdateState({ page, limit }),
          }}
          selectionMode="multiple"
        />
      </Column>
    </PageScaffold>
  );
}
