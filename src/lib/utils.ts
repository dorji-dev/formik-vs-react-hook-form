import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  if (email.length > 254) {
    return "Email is too long";
  }

  return undefined;
};

export const composeFormValidation = (
  ...validators: ((value: any) => any | undefined)[]
) => {
  return (value: any) =>
    validators.reduce(
      (error: string | undefined, validator) => error || validator(value),
      undefined
    );
};

export abstract class FormValidators {
  static required(value: any) {
    return value ? undefined : "Required";
  }
}
