import { Controller, useFormContext } from "react-hook-form";
import { DatePickerSingle } from "../ui/date-picker-single";
import { Input } from "../ui/input";
import { StepperFormValues } from "@/types/hook-stepper";
import { validateEmail } from "@/lib/utils";

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
        <Input
          placeholder="Full name"
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
                placeholder="Date of birth"
                onSelect={onChange}
                selectedDate={value ? new Date(value) : null}
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
        <Input
          placeholder="Email"
          type="email"
          {...register("email", {
            required: "Required",
            validate: validateEmail,
          })}
          error={errors.email?.message}
        />
        <Input
          placeholder="Phone"
          type="number"
          {...register("phone", { required: "Required" })}
          error={errors.phone?.message}
        />
      </div>
    </div>
  );
};

export default ApplicantInfo;
