import { useFormikContext } from "formik";
import { Button } from "../ui/button";
import { StepperFormValues } from "@/types/hook-stepper";
import { useEffect } from "react";

interface FormActionsProps {
  activeStep: number;
  handleBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  fieldError: {
    message: string;
    fieldName: string;
  };
}
const FormActions = ({
  activeStep,
  handleBack,
  onNext,
  onSubmit,
  fieldError,
}: FormActionsProps) => {
  const { isSubmitting, validateForm, values, setTouched, setFieldError } =
    useFormikContext<StepperFormValues>();

  useEffect(() => {
    fieldError &&
      setFieldError &&
      setFieldError(fieldError.fieldName, fieldError.message);
  }, [fieldError, setFieldError]);

  const handleNext = async () => {
    await setTouched({
      fullName: true,
      email: true,
      phone: true,
      dob: true,
      city: true,
      address: true,
      state: true,
      zipCode: true,
      annualIncome: true,
      jobTitle: true,
      employerName: true,
      employmentStatus: true,
      loanAmount: true,
      loanPurpose: true,
      repaymentStartDate: true,
      repaymentTerms: true,
      creditScore: true,
      routingNumber: true,
      bankName: true,
      accountNumber: true,
    });
    const errors = await validateForm(values);
    // console.log({ errors, values });
    !Object.keys(errors).length && onNext();
  };

  return (
    <>
      <Button
        type="button"
        className="w-[100px]"
        variant="secondary"
        onClick={handleBack}
        disabled={activeStep === 1}
      >
        Back
      </Button>
      {activeStep === 5 ? (
        <Button
          className="w-[100px]"
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          Submit
        </Button>
      ) : (
        <Button type="button" className="w-[100px]" onClick={handleNext}>
          Next
        </Button>
      )}
    </>
  );
};

export default FormActions;
