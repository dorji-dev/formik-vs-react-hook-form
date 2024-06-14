import { StepperFormKeys } from "@/lib/constants/hook-stepper-constants";

export type StepperFormKeysType =
  (typeof StepperFormKeys)[keyof typeof StepperFormKeys][number];

export type StepperFormValues = {
  [FormName in StepperFormKeysType]: FormName extends
    | "annualIncome"
    | "loanAmount"
    | "repaymentTerms" 
    | "creditScore"
    ? number
    : string;
};
