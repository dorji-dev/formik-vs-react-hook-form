import { StepperFormValues } from "@/types/hook-stepper";
import { useFormContext } from "react-hook-form";
import { FloatingLabelInput } from "../ui/floating-input";

const FinancialInfo = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<StepperFormValues>();

  return (
    <div>
      <h4 className="stepper_step_heading">Financial Information</h4>
      <div className="stepper_step_container">
        <FloatingLabelInput
          id="bankName"
          label="Bank Name"
          type="text"
          {...register("bankName", { required: "Required" })}
          error={errors.bankName?.message}
        />
        <FloatingLabelInput
          id="accountNumber"
          label="Account Number"
          type="number"
          {...register("accountNumber", { required: "Required" })}
          error={errors.accountNumber?.message}
        />
        <FloatingLabelInput
          id="routingNumber"
          label="Routing Number"
          type="text"
          {...register("routingNumber", { required: "Required" })}
          error={errors.routingNumber?.message}
        />
        <FloatingLabelInput
          id="creditScore"
          label="Credit Score"
          type="number"
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
