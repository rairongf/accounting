"use client";

import {
  Column,
  PageScaffold,
  PaginatedRepositoryArguments,
  Row,
  SortDirectionOrUndefined,
  TabButton,
  Table,
  TableAppliedSortDirectionByColumn,
  TableColumnData,
  TableRowCellsData,
  TableRowData,
  TableState,
} from "@/modules/common";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";
import {
  findManyContracts,
  FindManyContractsRepositoryAcceptableSortByValues,
  FindManyContractsRepositoryQuery,
  findManyKpis,
  FindManyKpisRepositoryKpiData,
} from "../infra";
import { KpiItem } from "./kpi_item";

type ContractsSummaryTableRowData = TableRowData & {
  company: string;
  effectiveDate: Date;
  signedAt: Date;
  fee: number;
  department: string;
};

export function DashboardSummaryPageContent() {
  const routeNames = useTranslations("route_names");
  const columns: TableColumnData[] = [
    { id: "company", label: "Cliente" },
    { id: "effective_date", label: "Data de Vigência" },
    { id: "signed_at", label: "Data Assinatura" },
    { id: "fee", label: "Valor" },
    { id: "department", label: "Departamento" },
  ];
  const [tableState, setTableState] = useState<
    TableState<ContractsSummaryTableRowData>
  >({
    elements: [],
    currentPage: 1,
    totalElements: 0,
    totalPages: 2,
  });
  const [sort, changeSort] =
    useState<[TableColumnData["id"], SortDirectionOrUndefined]>();

  async function getDataAndUpdateState(
    args?: PaginatedRepositoryArguments<FindManyContractsRepositoryQuery>
  ) {
    const { data, didSucceed } = await findManyContracts({ ...args });
    if (!didSucceed) return;
    setTableState({
      elements: data.elements,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
    });
  }

  useEffect(() => {
    if (!sort) {
      getDataAndUpdateState();
      return;
    }

    const [columnId, direction] = sort;
    getDataAndUpdateState({
      sortBy: columnId as FindManyContractsRepositoryAcceptableSortByValues,
      sortDirection: direction,
    });
  }, [sort]);

  const appliedSort: TableAppliedSortDirectionByColumn = {
    [columns[0].id]: undefined,
    [columns[1].id]: undefined,
    [columns[2].id]: undefined,
    [columns[3].id]: undefined,
    [columns[4].id]: undefined,
  };
  if (sort) {
    appliedSort[sort[0]] = sort[1];
  }

  const [kpis, setKpis] = useState<FindManyKpisRepositoryKpiData[]>([]);
  useEffect(() => {
    async function getKpis() {
      const response = await findManyKpis({});
      if (!response.didSucceed) return;

      setKpis([...response.data]);
    }

    getKpis();
  }, []);

  return (
    <PageScaffold title={routeNames("dashboard")} className="overflow-y-auto">
      <Column className="justify-start items-stretch w-full h-auto">
        <Row className="justify-start">
          <TabButton isActive={true}>Resumo Executivo</TabButton>
        </Row>
        <Column
          className={twJoin(
            "justify-start items-stretch w-full h-auto bg-white",
            "rounded-xl rounded-tl-none p-6 shadow-md"
          )}
        >
          <p className="text-lg font-bold text-gray-400">
            Métricas dos contratos
          </p>
          <Row className="gap-2 w-full mb-8 mt-2">
            {kpis.map((kpi, index) => (
              <KpiItem
                key={index}
                className="basis-1/4"
                typeName={kpi.name}
                value={kpi.value ? `${kpi.value}` : "-"}
              />
            ))}
          </Row>
          <Table
            rows={tableState.elements}
            cells={tableState.elements.reduce(
              (object, row) => ({
                ...object,
                [row.id]: {
                  [columns[0].id]: row.company,
                  [columns[1].id]: row.effectiveDate.toString(),
                  [columns[2].id]: row.signedAt.toString(),
                  [columns[3].id]: row.fee,
                  [columns[4].id]: row.department,
                },
              }),
              {} as TableRowCellsData
            )}
            columns={columns}
            pagination={{
              initialPage: tableState.currentPage,
              totalPages: tableState.totalPages,
              onPageChanged: (page, limit) => {
                console.log("Page changed to: ", page);
                getDataAndUpdateState({ page, limit });
              },
              totalElements: tableState.totalElements,
              initialLimit: 10,
              onLimitChanged: (limit, page) => {
                console.log("Limit changed to: ", limit);
                getDataAndUpdateState({ limit, page });
              },
            }}
            appliedSortDirectionByColumn={appliedSort}
            onColumnSortPressed={(column) => {
              console.log("Change sort by column: ", column);
              changeSort((sort) => {
                if (!sort) return [column.id, "asc"];

                const [columnId, direction] = sort;
                if (columnId != column.id) return [column.id, "asc"];

                if (!direction) return [column.id, "asc"];
                if (direction === "asc") return [column.id, "desc"];
                return undefined;
              });
            }}
            selectionMode="multiple"
          />
        </Column>
      </Column>
    </PageScaffold>
  );
}
