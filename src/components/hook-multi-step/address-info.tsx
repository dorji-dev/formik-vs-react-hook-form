import { StepperFormValues } from "@/types/hook-stepper";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

const AddressInfo = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<StepperFormValues>();

  return (
    <div>
      <h4 className="stepper_step_heading">Address Information</h4>
      <div className="stepper_step_container">
        <Input
          placeholder="Current address"
          type="text"
          {...register("address", { required: "Required" })}
          error={errors.address?.message}
        />
        <Input
          placeholder="City"
          type="text"
          {...register("city", { required: "Required" })}
          error={errors.city?.message}
        />
        <Input
          placeholder="State"
          type="text"
          {...register("state", { required: "Required" })}
          error={errors.state?.message}
        />
        <Input
          placeholder="Zip code"
          type="number"
          {...register("zipCode", { required: "Required" })}
          error={errors.zipCode?.message}
        />
      </div>
    </div>
  );
};

export default AddressInfo;
