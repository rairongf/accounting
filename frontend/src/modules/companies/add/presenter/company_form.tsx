import {
  Column,
  Icon,
  Input,
  InputProps,
  ReactUseState,
  Row,
} from "@/modules/common";
import { twJoin } from "tailwind-merge";
import { AddCompanyFormData } from "./page_content";

type CompanyInputProps = InputProps;

export function CompanyForm({
  formState: [state, updateState],
}: {
  formState: ReactUseState<AddCompanyFormData>;
}) {
  const inputsProps: CompanyInputProps[] = [
    {
      label: (
        <>
          Apelido da empresa<span className="text-red-700">*</span>
        </>
      ),
      required: true,
      placeholder: "Digite o apelido da empresa",
      value: state.company.name,
      onChange: (e) =>
        updateState((state) => ({
          ...state,
          company: { ...state.company, name: e.target.value },
        })),
    },
    {
      label: (
        <>
          Nome fantasia<span className="text-red-700">*</span>
        </>
      ),
      required: true,
      placeholder: "Digite o nome fantasia",
      value: state.company.tradeName,
      onChange: (e) =>
        updateState((state) => ({
          ...state,
          company: { ...state.company, tradeName: e.target.value },
        })),
    },
    {
      label: (
        <>
          Razão Social<span className="text-red-700">*</span>
        </>
      ),
      required: true,
      placeholder: "Digite a razão social",
      value: state.company.legalName,
      onChange: (e) =>
        updateState((state) => ({
          ...state,
          company: { ...state.company, legalName: e.target.value },
        })),
    },
    {
      label: (
        <>
          CNPJ<span className="text-red-700">*</span>
        </>
      ),
      required: true,
      placeholder: "00.000.000/0000-00",
      value: state.company.taxId,
      onChange: (e) =>
        updateState((state) => ({
          ...state,
          company: { ...state.company, taxId: e.target.value },
        })),
    },
    {
      label: (
        <>
          UF<span className="text-red-700">*</span>
        </>
      ),
      required: true,
      placeholder: "Digite o nome da UF",
      value: state.company.state,
      onChange: (e) =>
        updateState((state) => ({
          ...state,
          company: { ...state.company, state: e.target.value },
        })),
    },
    {
      label: (
        <>
          Cidade<span className="text-red-700">*</span>
        </>
      ),
      required: true,
      placeholder: "Digite o nome da cidade",
      value: state.company.city,
      onChange: (e) =>
        updateState((state) => ({
          ...state,
          company: { ...state.company, city: e.target.value },
        })),
    },
  ];

  return (
    <Column
      className={twJoin(
        "justify-start items-stretch w-full h-auto bg-white",
        "rounded-xl rounded-tl-none p-6 shadow-md gap-6"
      )}
    >
      <div className="text-start border-b border-gray-200 font-bold text-slate-700">
        Dados cadastrais
      </div>
      <Row className="justify-start items-center flex-wrap gap-4">
        {...inputsProps.map((props, index) => (
          <div key={index} className="basis-[calc(50%-0.5rem)]">
            <Input {...props} />
          </div>
        ))}
      </Row>
      <div className="bg-yellow-100 text-yellow-800 font-bold text-sm text-center p-4 rounded-lg">
        Campos marcados com <span className="text-red-700">*</span> são
        obrigatórios, preencha todos os campos para que o botão {'"CONTINUAR" '}
        abaixo seja liberado
      </div>

      <div className="text-start border-b border-gray-200 font-bold text-slate-700 mt-6">
        Logo da empresa
      </div>
      <Row className="justify-between items-center rounded-md border border-gray-300 p-4">
        <Row className="justify-start items-center gap-3">
          <Icon name={"upload_file"} className="text-3xl text-gray-500" />
          <span className="text-gray-600 font-semibold">
            Selecione um ou mais arquivos no formato .png para{" "}
            <span className="font-extrabold">fazer upload</span>
          </span>
        </Row>
        <label className="text-white font-bold px-4 py-2 bg-app-lime rounded-md hover:cursor-pointer">
          Carregar arquivos
          <input className="hidden" type="file" />
        </label>
      </Row>
    </Column>
  );
}
