import { StepperFormValues } from "@/types/hook-stepper";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

const FinancialInfo = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<StepperFormValues>();

  return (
    <div>
      <h4 className="stepper_step_heading">Financial Information</h4>
      <div className="stepper_step_container">
        <Input
          type="text"
          placeholder="Bank name"
          {...register("bankName", { required: "Required" })}
          error={errors.bankName?.message}
        />
        <Input
          type="number"
          placeholder="Account number"
          {...register("accountNumber", { required: "Required" })}
          error={errors.accountNumber?.message}
        />
        <Input
          type="text"
          placeholder="Routing number"
          {...register("routingNumber", { required: "Required" })}
          error={errors.routingNumber?.message}
        />
        <Input
          type="number"
          placeholder="Credit score"
          {...register("creditScore", {
            required: "Required",
            valueAsNumber: true,
          })}
          error={errors.creditScore?.message}
        />
      </div>
    </div>
  );
};

export default FinancialInfo;
