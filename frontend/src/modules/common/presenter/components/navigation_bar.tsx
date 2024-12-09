"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";
import { UriAssets } from "../constants";
import { Icon } from "./icon";
import { AppImage } from "./image";
import { Column, Row } from "./layout";

export function NavigationBar() {
  const pathname = usePathname();

  const NavigationItem: React.FC<{
    iconName: string;
    label: string;
    route: string;
    isSelected: boolean;
  }> = ({ iconName, label, route, isSelected }) => {
    return (
      <Link href={route} passHref>
        <Row
          className={twJoin(
            "py-2 px-3 justify-start items-center gap-2 rounded-md",
            isSelected ? "bg-app-lime text-white" : "text-gray-500"
          )}
        >
          <Icon name={iconName} className="text-xl" />
          <span className="text-sm font-semibold">{label}</span>
        </Row>
      </Link>
    );
  };

  return (
    <aside className="bg-white border-r border-gray-300 min-w-72 w-72 max-w-72">
      <Column className="justify-start items-stretch mt-20 gap-4">
        <AppImage
          src={UriAssets.accountingLogo}
          height={128}
          width={256}
          className="w-1/2 mx-auto"
          alt="Accounting logo"
        />
        <nav className="flex flex-col justify-start items-stretch mx-4">
          <NavigationItem
            route="/dashboard/summary"
            iconName="extension"
            label="Dashboard"
            isSelected={pathname.includes("dashboard")}
          />
          <NavigationItem
            route="/companies/list"
            iconName="domain"
            label="Empresas"
            isSelected={pathname.includes("companies")}
          />
        </nav>
      </Column>
    </aside>
  );
}
