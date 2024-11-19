"use client";

import {
  Column,
  PageScaffold,
  Row,
  TabButton,
  Table,
  TableColumnData,
  TableRowCellsData,
  TableRowData,
  TableState,
} from "@/modules/common";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { twJoin } from "tailwind-merge";
import { KpiItem } from "./kpi_item";

type ContractsSummaryTableRowData = TableRowData & {
  company: string;
  effectiveDate: string;
  signedAt: string;
  fee: string;
  department: string;
};

export function DashboardSummaryPageContent() {
  const routeNames = useTranslations("route_names");

  const rows: ContractsSummaryTableRowData[] = [
    {
      id: "1",
      company: "Sit Dot LTDA",
      effectiveDate: "15/06/2024",
      signedAt: "15/06/2024",
      fee: "2%",
      department: "Indiretos",
    },
    {
      id: "2",
      company: "Sit Dot LTDA",
      effectiveDate: "15/06/2024",
      signedAt: "15/06/2024",
      fee: "10%",
      department: "Financeiro",
    },
    {
      id: "3",
      company: "Sit Dot LTDA",
      effectiveDate: "15/06/2024",
      signedAt: "15/06/2024",
      fee: "15%",
      department: "Jurídico",
    },
    {
      id: "4",
      company: "Sit Dot LTDA",
      effectiveDate: "15/06/2024",
      signedAt: "15/06/2024",
      fee: "30%",
      department: "Financeiro",
    },
    {
      id: "5",
      company: "Sit Dot LTDA",
      effectiveDate: "15/06/2024",
      signedAt: "15/06/2024",
      fee: "30%",
      department: "Financeiro",
    },
    {
      id: "6",
      company: "Sit Dot LTDA",
      effectiveDate: "15/06/2024",
      signedAt: "15/06/2024",
      fee: "30%",
      department: "Financeiro",
    },
    {
      id: "7",
      company: "Sit Dot LTDA",
      effectiveDate: "15/06/2024",
      signedAt: "15/06/2024",
      fee: "30%",
      department: "Financeiro",
    },
    {
      id: "8",
      company: "Sit Dot LTDA",
      effectiveDate: "15/06/2024",
      signedAt: "15/06/2024",
      fee: "30%",
      department: "Financeiro",
    },
    {
      id: "9",
      company: "Sit Dot LTDA",
      effectiveDate: "15/06/2024",
      signedAt: "15/06/2024",
      fee: "30%",
      department: "Financeiro",
    },
    {
      id: "10",
      company: "Sit Dot LTDA",
      effectiveDate: "15/06/2024",
      signedAt: "15/06/2024",
      fee: "30%",
      department: "Financeiro",
    },
    {
      id: "11",
      company: "Sit Dot LTDA",
      effectiveDate: "15/06/2024",
      signedAt: "15/06/2024",
      fee: "30%",
      department: "Financeiro",
    },
    {
      id: "12",
      company: "Sit Dot LTDA",
      effectiveDate: "15/06/2024",
      signedAt: "15/06/2024",
      fee: "30%",
      department: "Financeiro",
    },
  ];

  const [tableState, setTableState] = useState<
    TableState<ContractsSummaryTableRowData>
  >({
    elements: [...rows],
    currentPage: 1,
    totalElements: rows.length,
    totalPages: 2,
  });

  const columns: TableColumnData[] = [
    { id: "company", label: "Cliente" },
    { id: "effectiveDate", label: "Data de Vigência" },
    { id: "signedAt", label: "Data Assinatura" },
    { id: "fee", label: "Valor" },
    { id: "department", label: "Departamento" },
  ];

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
            <KpiItem
              className="basis-1/4"
              label="Valor"
              value="2.9 Mi"
              iconName="paid"
            />
            <KpiItem
              className="basis-1/4"
              label="Meta Financeira"
              value="3.4 M"
              iconName="trending_up"
              growthRatio={1.85}
            />
            <KpiItem
              className="basis-1/4"
              label="Quantidade"
              value="47"
              iconName="workspaces"
            />
            <KpiItem
              className="basis-1/4"
              label="Meta Qtde"
              value="10"
              iconName="trending_up"
              growthRatio={0.3}
            />
          </Row>
          <Table
            rows={tableState.elements}
            cells={tableState.elements.reduce(
              (object, row) => ({
                ...object,
                [row.id]: {
                  [columns[0].id]: row.company,
                  [columns[1].id]: row.effectiveDate,
                  [columns[2].id]: row.signedAt,
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
              onPageChanged: (page) => console.log("Page changed to: ", page),
              totalElements: tableState.totalElements,
              initialLimit: tableState.elements.length,
              onLimitChanged: (limit) =>
                console.log("Limit changed to: ", limit),
            }}
            selectionMode="multiple"
          />
        </Column>
      </Column>
    </PageScaffold>
  );
}
