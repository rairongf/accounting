"use client";

import { Button, Column, Icon, Row, RowProps } from "@/modules/common";
import { useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";

export type InputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "prefix"
> & {
  rowProps?: RowProps;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  label?: React.ReactNode;
  helperText?: string;
  obscureText?: boolean;
  validator?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => string | undefined;
};

export function Input({
  className,
  prefix,
  suffix,
  rowProps,
  obscureText = false,
  label,
  helperText,
  validator,
  ...props
}: InputProps) {
  const [isObscure, setIsObscure] = useState<boolean>(obscureText);

  const defaultInputWithSiblingsClassName =
    "outline-none rounded bg-transparent grow shrink basis-auto my-2 text-sm";

  const {
    onChange: onInputChange,
    type: inputType,
    ...otherInputProps
  } = { ...props };
  const [error, setError] = useState<string>();

  const inputComponent = (
    <input
      className={twMerge(defaultInputWithSiblingsClassName, className)}
      onChange={(e) => {
        const errorOrNull = validator?.(e);
        setError(errorOrNull);
        onInputChange?.(e);
      }}
      type={isObscure ? inputType : "text"}
      {...otherInputProps}
    />
  );

  const { className: rowClassName, ...otherRowProps } = { ...rowProps };

  return (
    <Column className="items-stretch gap-1.5 w-full">
      {!!label && (
        <span className={twJoin("text-start text-sm text-slate-700")}>
          {label}
        </span>
      )}
      <Row
        className={twMerge(
          "justify-start items-center max-w-full gap-2 px-3",
          "rounded-lg border border-gray-400",
          rowClassName
        )}
        {...otherRowProps}
      >
        {prefix != undefined && prefix}
        {inputComponent}
        {suffix != undefined && suffix}
        {obscureText && (
          <Button
            className={twJoin(
              "flex justify-center items-center h-full aspect-square p-1 rounded"
            )}
            onClick={() => setIsObscure(!isObscure)}
            type="button"
          >
            <Icon
              name={isObscure ? "visibility_off" : "visibility"}
              className={twJoin("text-app-lime", "text-lg")}
            />
          </Button>
        )}
      </Row>
      {!!error && (
        <span
          className={twJoin(
            "text-start font-semibold text-xs",
            "text-rose-400"
          )}
        >
          {error}
        </span>
      )}
      {!!helperText && (
        <span
          className={twJoin("text-start font-semibold text-xs", "text-black")}
        >
          {helperText}
        </span>
      )}
    </Column>
  );
}
