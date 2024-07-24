import { Controller, useFormContext } from "react-hook-form";

import { validateEmail } from "@/lib/utils";
import { StepperFormValues } from "@/types/hook-stepper";

import { DatePickerSingle } from "../ui/date-picker-single";
import { FloatingLabelInput } from "../ui/floating-input";

const ApplicantInfo = () => {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext<StepperFormValues>();

  return (
    <div>
      <h4 className="stepper_step_heading">Applicant Information</h4>
      <div className="stepper_step_container">
        <FloatingLabelInput
          id="fullName"
          label="Full name"
          {...register("fullName", { required: "Required" })}
          error={errors.fullName?.message}
        />
        <Controller
          name="dob"
          control={control}
          rules={{ required: "Required" }}
          render={({
            field: { onChange, value, onBlur },
            fieldState: { invalid, error },
          }) => (
            <div>
              <DatePickerSingle
                placeholder="Pick a date"
                onSelect={onChange}
                selectedDate={value ? new Date(value) : null}
                onBlur={onBlur}
                floatingLabel="Date of birth"
              />
              {invalid && (
                <span className="text-destructive block !mt-[5px] text-[12px]">
                  {error?.message}
                </span>
              )}
            </div>
          )}
        />
        <FloatingLabelInput
          id="email"
          label="Email"
          type="email"
          {...register("email", {
            required: "Required",
            validate: validateEmail,
          })}
          error={errors.email?.message}
        />
        <FloatingLabelInput
          id="phone"
          label="Phone"
          type="tel"
          {...register("phone", { required: "Required" })}
          error={errors.phone?.message}
        />
      </div>
    </div>
  );
};

export default ApplicantInfo;
