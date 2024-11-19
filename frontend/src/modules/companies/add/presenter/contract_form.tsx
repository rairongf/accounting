import { Column, Input, ReactUseState, Row } from "@/modules/common";
import { twJoin } from "tailwind-merge";
import { AddCompanyFormData } from "./page_content";

export function ContractForm({
  formState: [state, updateState],
}: {
  formState: ReactUseState<AddCompanyFormData>;
}) {
  return (
    <Column
      className={twJoin(
        "justify-start items-stretch w-full h-auto bg-white",
        "rounded-xl rounded-tl-none p-6 shadow-md gap-6"
      )}
    >
      <div className="text-start border-b border-gray-200 font-bold text-slate-700">
        Dados gerais
      </div>
      <Row className="justify-start items-center flex-wrap gap-4">
        <div className="basis-[calc(50%-0.5rem)]">
          <Input
            label={
              <>
                Data de vigência do contrato
                <span className="text-red-700">*</span>
              </>
            }
            required
            type="date"
            placeholder="dd/mm/aaaa"
            value={state.contract.effectiveDate?.toISOString()}
            onChange={(e) =>
              updateState((state) => ({
                ...state,
                company: {
                  ...state.company,
                  effectiveDate: new Date(e.target.value),
                },
              }))
            }
          />
        </div>
        <div className="basis-[calc(50%-0.5rem)]">
          <Input
            label={
              <>
                Data de assinatura
                <span className="text-red-700">*</span>
              </>
            }
            required
            type="date"
            placeholder="dd/mm/aaaa"
            value={state.contract.signedAt?.toISOString()}
            onChange={(e) =>
              updateState((state) => ({
                ...state,
                company: {
                  ...state.company,
                  signedAt: new Date(e.target.value),
                },
              }))
            }
          />
        </div>
        <div className="basis-full">
          <Input
            label={
              <>
                Taxa
                <span className="text-red-700">*</span>
              </>
            }
            required
            type="text"
            placeholder="Digite o valor"
            value={state.contract.fee}
            onChange={(e) =>
              updateState((state) => ({
                ...state,
                company: {
                  ...state.company,
                  fee: e.target.value,
                },
              }))
            }
          />
        </div>
        <div className="basis-full">Serviços contratados*</div>
      </Row>
      <div className="bg-yellow-100 text-yellow-800 font-bold text-sm text-center p-4 rounded-lg">
        Campos marcados com <span className="text-red-700">*</span> são
        obrigatórios, preencha todos os campos para que o botão {'"CONTINUAR" '}
        abaixo seja liberado
      </div>
    </Column>
  );
}
