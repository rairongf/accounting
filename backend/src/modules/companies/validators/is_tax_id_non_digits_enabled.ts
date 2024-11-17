import { isTaxId, registerDecorator, ValidationOptions } from "class-validator";

export function IsTaxIdNonDigitsEnabled(locale?: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isTaxIdNonDigitsEnabled",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return isTaxId((value as string).replaceAll(/\D/g, ''), locale);
        }
      }
    });
  };
}