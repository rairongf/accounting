"use client";

import { Button, Column, PageScaffold, Row, TabButton } from "@/modules/common";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { twJoin } from "tailwind-merge";
import { CompanyForm } from "./company_form";
import { ContractForm } from "./contract_form";

type FormStep = "company" | "contract";
export type AddCompanyFormData = {
  company: {
    name?: string;
    tradeName?: string;
    legalName?: string;
    taxId?: string;
    state?: string;
    city?: string;
    logo?: File;
  };
  contract: {
    effectiveDate?: Date;
    signedAt?: Date;
    fee?: number;
    services: {
      id: string;
      name: string;
    }[];
  };
};

export function CompaniesAddPageContent() {
  const routeNames = useTranslations("route_names");

  const [formStep, setFormStep] = useState<FormStep>("company");
  const isAtCompanyStep = formStep === "company";
  const isAtContractStep = formStep === "contract";
  const changeFormStep = (value: FormStep) => {
    if (formStep === value) return;
    setFormStep(value);
  };

  const formState = useState<AddCompanyFormData>({
    company: {
      name: undefined,
      tradeName: undefined,
      legalName: undefined,
      taxId: undefined,
      state: undefined,
      city: undefined,
      logo: undefined,
    },
    contract: {
      effectiveDate: undefined,
      signedAt: undefined,
      fee: undefined,
      services: [],
    },
  });
  const companyValues = Object.values({ ...formState[0].company }).filter(
    (v) => v != undefined
  );
  const isCompanyDataValid =
    companyValues.length === Object.keys({ ...formState[0].company }).length &&
    companyValues.every((value) => {
      if (typeof value === "string") {
        return value.length > 0;
      }
      return true;
    });

  const contractValues = Object.values({ ...formState[0].contract }).filter(
    (v) => v != undefined
  );
  const isContractDataValid =
    contractValues.length ===
      Object.keys({ ...formState[0].contract }).length &&
    contractValues.every((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value;
    });

  return (
    <PageScaffold title={routeNames("add")} className="overflow-y-auto">
      <Column className="justify-start items-stretch w-full h-auto">
        <Row className="justify-start gap-1">
          <TabButton
            isActive={isAtCompanyStep}
            onClick={() => changeFormStep("company")}
          >
            Empresa
          </TabButton>
          <TabButton
            isActive={isAtContractStep}
            onClick={() => changeFormStep("contract")}
          >
            Contrato
          </TabButton>
        </Row>
        <form>
          {isAtCompanyStep && <CompanyForm formState={formState} />}
          {isAtContractStep && <ContractForm formState={formState} />}
          <Row className="justify-end items-center gap-2 mt-16">
            <Link href={"/companies/list"}>
              <div className="rounded-md text-sm bg-gray-300 text-gray-500 font-semibold py-3 px-8">
                Cancelar
              </div>
            </Link>
            <Button
              className={twJoin(
                "rounded-md text-sm text-white py-3 px-8",
                "bg-gray-600 font-bold disabled:bg-gray-400 disabled:font-semibold"
              )}
              disabled={
                isAtCompanyStep ? !isCompanyDataValid : !isContractDataValid
              }
              onClick={() => {
                if (isAtCompanyStep && isCompanyDataValid) {
                  changeFormStep("contract");
                  return;
                }
                if (!isContractDataValid) return;
              }}
              type={isAtContractStep ? "submit" : "button"}
            >
              Continuar
            </Button>
          </Row>
        </form>
      </Column>
    </PageScaffold>
  );
}
