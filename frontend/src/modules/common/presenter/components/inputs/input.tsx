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
  labelText?: string;
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
  labelText,
  helperText,
  validator,
  ...props
}: InputProps) {
  const [isObscure, setIsObscure] = useState<boolean>(obscureText);

  //const inputHasRowSiblings = obscureText || prefix || suffix;
  //const defaultInputClassName = "outline-none rounded";
  const defaultInputWithSiblingsClassName =
    "outline-none rounded bg-transparent grow shrink basis-auto my-2 ml-3";

  const {
    onChange: onInputChange,
    type: inputType,
    ...otherInputProps
  } = { ...props };
  const [error, setError] = useState<string>();

  const inputComponent = (
    <input
      className={twJoin(defaultInputWithSiblingsClassName, className)}
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
      {!!labelText && (
        <span
          className={twJoin(
            "text-start uppercase font-extrabold text-xs",
            "text-black"
          )}
        >
          {labelText}
        </span>
      )}
      <Row
        className={twMerge(
          "justify-start items-center rounded max-w-full gap-2 pr-3",
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
              className={twJoin("text-white", "text-lg")}
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
