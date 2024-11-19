"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";
import { Column, Row } from "./layout";

export function PageScaffold({
  children,
  title,
  trailing,
  className,
}: React.PropsWithChildren<{
  title: string;
  trailing?: React.ReactNode;
  className?: string;
}>) {
  const messages = useTranslations("route_names");
  const routeNameMessages = usePathname()
    .substring(1)
    .split("/")
    .map((routeName) => messages(routeName));

  const titleAndPathElements = (
    <Column className="gap-0.5 items-start">
      <p className="text-start text-slate-700 font-bold text-lg">{title}</p>
      <p className="text-start text-slate-400 text-sm font-semibold">
        {routeNameMessages.join(" > ")}
      </p>
    </Column>
  );

  return (
    <Column
      className={twJoin(
        "p-8 gap-8 justify-start items-stretch h-full w-full",
        "bg-gray-100",
        className
      )}
    >
      {!!trailing && (
        <Row className="justify-between items-center w-full">
          {titleAndPathElements}
          {trailing}
        </Row>
      )}
      {!trailing && titleAndPathElements}
      {children}
    </Column>
  );
}
