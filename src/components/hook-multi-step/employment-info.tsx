import { Controller, useFormContext } from "react-hook-form";

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
    control,
    trigger,
    formState: { errors },
    register,
  } = useFormContext<StepperFormValues>();

  return (
    <div>
      <h4 className="stepper_step_heading">Employment Information</h4>
      <div className="stepper_step_container">
        <Controller
          name="employmentStatus"
          rules={{ required: "Required" }}
          control={control}
          render={({
            field: { onChange, value, onBlur },
            fieldState: { invalid, error },
          }) => (
            <div>
              <Select
                onValueChange={(value) => {
                  onChange(value);
                  trigger(["employerName", "jobTitle", "annualIncome"]);
                }}
                value={value}
                onOpenChange={(value) => !value && onBlur()}
              >
                <SelectTrigger
                  name="employmentStatus"
                  floatingLabel="Employment status"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                {invalid && (
                  <span className="text-destructive block !mt-[5px] text-[12px]">
                    {error?.message}
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
            </div>
          )}
        />
        <FloatingLabelInput
          id="employerName"
          label="Employer name"
          type="text"
          {...register("employerName", {
            validate: (employerName, formValues) => {
              if (
                (formValues.employmentStatus === "employed" ||
                  formValues.employmentStatus === "self-employed") &&
                !employerName
              ) {
                return "Required";
              }
            },
          })}
          error={errors.employerName?.message}
        />
        <FloatingLabelInput
          id="jobTitle"
          label="Job title"
          type="text"
          {...register("jobTitle", {
            validate: (jobTitle, formValues) => {
              if (
                (formValues.employmentStatus === "employed" ||
                  formValues.employmentStatus === "self-employed") &&
                !jobTitle
              ) {
                return "Required";
              }
            },
          })}
          error={errors.jobTitle?.message}
        />
        <FloatingLabelInput
          id="annualIncome"
          label="Annual income"
          type="number"
          {...register("annualIncome", {
            validate: (annualIncome, formValues) => {
              if (
                (formValues.employmentStatus === "employed" ||
                  formValues.employmentStatus === "self-employed") &&
                !annualIncome
              ) {
                return "Required";
              }
            },
            valueAsNumber: true,
          })}
          error={errors.annualIncome?.message}
        />
      </div>
    </div>
  );
};

export default EmploymentInfo;
