import { StepperFormValues } from "@/types/hook-stepper";
import { Controller, useFormContext } from "react-hook-form";
import { DatePickerSingle } from "../ui/date-picker-single";
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

const LoanDetails = () => {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext<StepperFormValues>();

  return (
    <div>
      <h4 className="stepper_step_heading">Loan Details</h4>
      <div className="stepper_step_container">
        <Input
          type="number"
          placeholder="Loan amount"
          {...register("loanAmount", {
            required: "Required",
            valueAsNumber: true,
          })}
          error={errors.loanAmount?.message}
        />
        <Controller
          rules={{ required: "Required" }}
          control={control}
          name="loanPurpose"
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
                <SelectTrigger>
                  <SelectValue placeholder="Loan purpose" />
                </SelectTrigger>
                {invalid && (
                  <span className="text-destructive block !mt-[5px] text-[12px]">
                    {error?.message}
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
        />
        <Input
          type="number"
          placeholder="Repayment terms(months)"
          {...register("repaymentTerms", {
            required: "Required",
            valueAsNumber: true,
          })}
          error={errors.repaymentTerms?.message}
        />
        <Controller
          rules={{ required: "Required" }}
          control={control}
          name="repaymentStartDate"
          render={({
            field: { onChange, value, onBlur },
            fieldState: { invalid, error },
          }) => (
            <div>
              <DatePickerSingle
                selectedDate={value ? new Date(value) : null}
                onSelect={onChange}
                placeholder="Preferred Repayment Start Date"
                onBlur={onBlur}
              />
              {invalid && (
                <span className="text-destructive block !mt-[5px] text-[12px]">
                  {error?.message}
                </span>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default LoanDetails;
