import React from "react";
import { FloatingLabelInput } from "../ui/floating-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DatePickerSingle } from "../ui/date-picker-single";
import { Field, useFormikContext } from "formik";
import { FormValidators } from "@/lib/utils";
import { StepperFormValues } from "@/types/hook-stepper";

const LoanDetails = () => {
  const { setFieldValue, setTouched, validateField } =
    useFormikContext<StepperFormValues>();
  return (
    <div>
      <h4 className="stepper_step_heading">Loan Details</h4>
      <div className="stepper_step_container">
        <Field name="loanAmount" validate={FormValidators.required}>
          {({ field, meta }) => (
            <FloatingLabelInput
              {...field}
              id="loanAmount"
              label="Loan Amount"
              type="number"
              error={meta.touched && meta?.error}
            />
          )}
        </Field>
        <Field name="loanPurpose" validate={FormValidators.required}>
          {({ field: { value }, meta }) => (
            <div>
              <Select
                onValueChange={(value) => setFieldValue("loanPurpose", value)}
                value={value}
                onOpenChange={async (value) =>
                  !value &&
                  (await setTouched({ loanPurpose: true })) &&
                  validateField("loanPurpose")
                }
              >
                <SelectTrigger floatingLabel="Loan purpose">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                {meta.touched && meta?.error && (
                  <span className="text-destructive block !mt-[5px] text-[12px]">
                    {meta?.error}
                  </span>
                )}
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Loan purpose</SelectLabel>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        </Field>
        <Field name="repaymentTerms" validate={FormValidators.required}>
          {({ field, meta }) => (
            <FloatingLabelInput
              {...field}
              id="repaymentTerms"
              label="Repayment Terms(months)"
              type="number"
              error={meta.touched && meta?.error}
            />
          )}
        </Field>
        <Field name="repaymentStartDate" validate={FormValidators.required}>
          {({ field: { value }, meta }) => (
            <div>
              <DatePickerSingle
                selectedDate={value ? new Date(value) : null}
                onSelect={(date) =>
                  setFieldValue("repaymentStartDate", date.toISOString())
                }
                placeholder="Pick a date"
                onBlur={async () => {
                  await setTouched({ repaymentStartDate: true });
                  validateField("repaymentStartDate");
                }}
                floatingLabel="Preferred Repayment Start Date"
              />
              {meta.touched && meta?.error && (
                <span className="text-destructive block !mt-[5px] text-[12px]">
                  {meta?.error}
                </span>
              )}
            </div>
          )}
        </Field>
      </div>
    </div>
  );
};

export default LoanDetails;
