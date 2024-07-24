import { Field, useFormikContext } from "formik";
import React from "react";

import { FormValidators } from "@/lib/utils";
import { StepperFormValues } from "@/types/hook-stepper";

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

const EmploymentInfo = () => {
  const {
    validateForm,
    setTouched,
    validateField,
    setFieldValue,
    values: formValues,
  } = useFormikContext<StepperFormValues>();

  return (
    <div>
      <h4 className="stepper_step_heading">Employment Information</h4>
      <div className="stepper_step_container">
        <div>
          <Field name="employmentStatus" validate={FormValidators.required}>
            {({ field: { value }, meta }) => (
              <Select
                onValueChange={async (value) => {
                  await setFieldValue("employmentStatus", value);
                  await setTouched({
                    employerName: true,
                    jobTitle: true,
                    annualIncome: true,
                  });
                  validateForm();
                }}
                value={value}
                onOpenChange={async (open) => {
                  // validate self field only
                  !open &&
                    (await setTouched({ employmentStatus: true })) &&
                    validateField("employmentStatus");
                }}
              >
                <SelectTrigger
                  name="employmentStatus"
                  floatingLabel="Employment status"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                {meta.touched && meta?.error && (
                  <span className="text-destructive block !mt-[5px] text-[12px]">
                    {meta?.error}
                  </span>
                )}
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Employment status</SelectLabel>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="self-employed">Self employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </Field>
        </div>
        <Field
          name="employerName"
          validate={(employerName) => {
            if (
              (formValues.employmentStatus === "employed" ||
                formValues.employmentStatus === "self-employed") &&
              !employerName
            ) {
              return "Required";
            }
          }}
        >
          {({ field, meta }) => (
            <FloatingLabelInput
              {...field}
              id="employerName"
              label="Employer name"
              type="text"
              error={meta.touched && meta?.error}
            />
          )}
        </Field>
        <Field
          name="jobTitle"
          validate={(jobTitle) => {
            if (
              (formValues.employmentStatus === "employed" ||
                formValues.employmentStatus === "self-employed") &&
              !jobTitle
            ) {
              return "Required";
            }
          }}
        >
          {({ field, meta }) => (
            <FloatingLabelInput
              {...field}
              id="jobTitle"
              label="Job title"
              type="text"
              error={meta.touched && meta?.error}
            />
          )}
        </Field>
        <Field
          name="annualIncome"
          validate={(annualIncome) => {
            if (
              (formValues.employmentStatus === "employed" ||
                formValues.employmentStatus === "self-employed") &&
              !annualIncome
            ) {
              return "Required";
            }
          }}
        >
          {({ field, meta }) => (
            <FloatingLabelInput
              {...field}
              id="annualIncome"
              label="Annual income"
              type="number"
              error={meta.touched && meta?.error}
            />
          )}
        </Field>
      </div>
    </div>
  );
};

export default EmploymentInfo;
