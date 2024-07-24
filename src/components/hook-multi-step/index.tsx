"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { STEPPER_FORM_KEYS } from "@/lib/constants/hook-stepper-constants";
import { StepperFormKeysType, StepperFormValues } from "@/types/hook-stepper";

import StepperIndicator from "../shared/stepper-indicator";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import AddressInfo from "./address-info";
import ApplicantInfo from "./applicant-info";
import EmploymentInfo from "./employment-info";
import FinancialInfo from "./financial-info";
import LoanDetails from "./loan-details";

function getStepContent(step: number) {
  switch (step) {
    case 1:
      return <ApplicantInfo />;
    case 2:
      return <AddressInfo />;
    case 3:
      return <EmploymentInfo />;
    case 4:
      return <LoanDetails />;
    case 5:
      return <FinancialInfo />;
    default:
      return "Unknown step";
  }
}

const HookMultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [erroredInputName, setErroredInputName] = useState("");
  const methods = useForm<StepperFormValues>({
    mode: "onTouched",
  });

  const {
    trigger,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  // focus errored input on submit
  useEffect(() => {
    const erroredInputElement =
      document.getElementsByName(erroredInputName)?.[0];
    if (erroredInputElement instanceof HTMLInputElement) {
      erroredInputElement.focus();
      setErroredInputName("");
    }
  }, [erroredInputName]);

  const onSubmit = async (formData: StepperFormValues) => {
    console.log({ formData });
    // simulate api call
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve({
        //   title: "Success",
        //   description: "Form submitted successfully",
        // });
        reject({
          message: "There was an error submitting form",
          // message: "Field error",
          // errorKey: "fullName",
        });
      }, 2000);
    })
      .then(({ title, description }) => {
        toast({
          title,
          description,
        });
      })
      .catch(({ message: errorMessage, errorKey }) => {
        if (
          errorKey &&
          Object.values(STEPPER_FORM_KEYS)
            .flatMap((fieldNames) => fieldNames)
            .includes(errorKey)
        ) {
          let erroredStep: number;
          // get the step number based on input name
          for (const [key, value] of Object.entries(STEPPER_FORM_KEYS)) {
            if (value.includes(errorKey as never)) {
              erroredStep = Number(key);
            }
          }
          // set active step and error
          setActiveStep(erroredStep);
          setError(errorKey as StepperFormKeysType, {
            message: errorMessage,
          });
          setErroredInputName(errorKey);
        } else {
          setError("root.formError", {
            message: errorMessage,
          });
        }
      });
  };

  const handleNext = async () => {
    const isStepValid = await trigger(undefined, { shouldFocus: true });
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <StepperIndicator activeStep={activeStep} />
      {errors.root?.formError && (
        <Alert variant="destructive" className="mt-[28px]">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Form Error</AlertTitle>
          <AlertDescription>{errors.root?.formError?.message}</AlertDescription>
        </Alert>
      )}
      <FormProvider {...methods}>
        <form noValidate>
          {getStepContent(activeStep)}
          <div className="flex justify-center space-x-[20px]">
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
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                Submit
              </Button>
            ) : (
              <Button type="button" className="w-[100px]" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default HookMultiStepForm;
