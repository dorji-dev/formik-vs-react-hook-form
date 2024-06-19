import { StepperFormValues } from "@/types/hook-stepper";
import { useFormContext } from "react-hook-form";
import { FloatingLabelInput } from "../ui/floating-input";

const AddressInfo = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<StepperFormValues>();

  return (
    <div>
      <h4 className="stepper_step_heading">Address Information</h4>
      <div className="stepper_step_container">
        <FloatingLabelInput
          id="currentAddress"
          label="Current Address"
          type="text"
          {...register("address", { required: "Required" })}
          error={errors.address?.message}
        />
        <FloatingLabelInput
          id="city"
          label="City"
          type="text"
          {...register("city", { required: "Required" })}
          error={errors.city?.message}
        />
        <FloatingLabelInput
          id="state"
          label="State"
          type="text"
          {...register("state", { required: "Required" })}
          error={errors.state?.message}
        />
        <FloatingLabelInput
          id="zipCode"
          label="Zip Code"
          type="number"
          {...register("zipCode", { required: "Required" })}
          error={errors.zipCode?.message}
        />
      </div>
    </div>
  );
};

export default AddressInfo;
