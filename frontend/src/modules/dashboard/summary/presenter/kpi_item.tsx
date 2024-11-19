import { Column, Icon, Row } from "@/modules/common";
import { twJoin } from "tailwind-merge";

export type KpiItemProps = {
  iconName: string;
  label: string;
  value: string;
  growthRatio?: number;
  className?: string;
};

export function KpiItem({
  label,
  value,
  iconName,
  growthRatio,
  className,
}: KpiItemProps) {
  if (growthRatio && growthRatio <= 0) {
    console.error("Invalid growthRatio value: ", growthRatio);
  }

  return (
    <Row
      className={twJoin(
        "justify-start items-stretch p-6 gap-3 bg-white rounded-lg border border-gray-200",
        className
      )}
    >
      <div className="flex justify-center items-center bg-app-lime/30 rounded-full h-full aspect-square">
        <Icon name={iconName} className="text-3xl text-app-lime" />
      </div>
      <Column className="gap-0.5 items-start justify-center w-full">
        <span className="font-bold text-sm text-gray-500 text-nowrap overflow-ellipsis max-w-full">
          {label}
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
