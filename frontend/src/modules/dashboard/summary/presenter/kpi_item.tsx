import { Column, Icon, Row } from "@/modules/common";
import { twJoin } from "tailwind-merge";

export type KpiItemProps = {
  typeName: string;
  value: string;
  growthRatio?: number;
  className?: string;
};

const kpiTypes: { [typeName: string]: { iconName: string; label: string } } = {
  TOTAL_VALUE: {
    iconName: "paid",
    label: "Valor",
  },
  ACTIVE_CONTRACTS_COUNT: {
    iconName: "workspaces",
    label: "Nº Contratos",
  },
  ACTIVE_COMPANIES_COUNT: {
    iconName: "workspaces",
    label: "Nº Empresas",
  },
  MEAN_CONTRACTS_BY_COMPANIES: {
    iconName: "trending_up",
    label: "Média Contratos/Empresas",
  },
};

export function KpiItem({
  typeName,
  value,
  growthRatio,
  className,
}: KpiItemProps) {
  if (growthRatio && growthRatio <= 0) {
    console.error("Invalid growthRatio value: ", growthRatio);
  }

  const kpiData = kpiTypes[typeName];

  return (
    <Row
      className={twJoin(
        "justify-start items-stretch p-6 gap-3 bg-white rounded-lg border border-gray-200",
        className
      )}
    >
      <div className="flex justify-center items-center bg-app-lime/30 rounded-full h-full aspect-square">
        <Icon name={kpiData.iconName} className="text-3xl text-app-lime" />
      </div>
      <Column className="gap-0.5 items-start justify-center w-full">
        <span className="font-bold text-sm text-gray-500 text-nowrap overflow-ellipsis max-w-full">
          {kpiData.label}
        </span>
        <Row className="justify-between items-center w-full">
          <span className="text-2xl font-extrabold text-slate-700">
            {value}
          </span>
          {!!growthRatio && growthRatio > 0 && (
            <div
              className={twJoin(
                "p-0.5 text-sm font-bold rounded-lg px-1.5 py-0.5",
                growthRatio >= 1
                  ? "bg-green-200 text-green-600"
                  : "bg-red-200 text-red-600"
              )}
            >
              {(Math.abs(growthRatio - 1) * 100).toFixed(0)}%
            </div>
          )}
        </Row>
      </Column>
    </Row>
  );
}
