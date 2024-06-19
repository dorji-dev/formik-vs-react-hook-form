import { StepperFormValues } from "@/types/hook-stepper";
import { Controller, useFormContext } from "react-hook-form";
import { DatePickerSingle } from "../ui/date-picker-single";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FloatingLabelInput } from "../ui/floating-input";

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
        <FloatingLabelInput
          id="loanAmount"
          label="Loan Amount"
          type="number"
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
                <SelectTrigger floatingLabel="Loan purpose">
                  <SelectValue placeholder="Select" />
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
        <FloatingLabelInput
          id="repaymentTerms"
          label="Repayment Terms(months)"
          type="number"
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
                placeholder="Pick a date"
                onBlur={onBlur}
                floatingLabel="Preferred Repayment Start Date"
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
