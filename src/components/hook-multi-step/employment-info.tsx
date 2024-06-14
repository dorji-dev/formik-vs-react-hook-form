import { StepperFormValues } from "@/types/hook-stepper";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
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
                onValueChange={onChange}
                value={value}
                onOpenChange={(value) => !value && onBlur()}
              >
                <SelectTrigger name="employmentStatus">
                  <SelectValue placeholder="Employment status" />
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
        <Input
          placeholder="Employer name"
          type="text"
          {...register("employerName", { required: "Required" })}
          error={errors.employerName?.message}
        />
        <Input
          placeholder="Job title"
          type="text"
          {...register("jobTitle", { required: "Required" })}
          error={errors.jobTitle?.message}
        />
        <Input
          placeholder="Annual income"
          type="number"
          {...register("annualIncome", {
            required: "Required",
            valueAsNumber: true,
          })}
          error={errors.annualIncome?.message}
        />
      </div>
    </div>
  );
};

export default EmploymentInfo;
