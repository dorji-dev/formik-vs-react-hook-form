"use client";

import React, { useEffect, useState } from "react";
import StepperIndicator from "../shared/stepper-indicator";
import ApplicantInfo from "./applicant-info";
import AddressInfo from "./address-info";
import EmploymentInfo from "./employment-info";
import FinancialInfo from "./financial-info";
import LoanDetails from "./loan-details";
import { Formik } from "formik";
import { StepperFormValues } from "@/types/hook-stepper";
import FormActions from "./form-actions";
import { toast } from "../ui/use-toast";
import { StepperFormKeys } from "@/lib/constants/hook-stepper-constants";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

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

const FormikMultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [fieldError, setFieldError] = useState<{
    message: string;
    fieldName: string;
  }>(null);
  const [formError, setFormError] = useState("");

  // focus errored input on submit
  useEffect(() => {
    const erroredInputElement =
      fieldError && document.getElementsByName(fieldError.fieldName)?.[0];
    if (erroredInputElement instanceof HTMLInputElement) {
      erroredInputElement.focus();
      setFieldError(null);
    }
  }, [fieldError]);

  const onSubmit = async (formData: StepperFormValues) => {
    // reset field and form error if any
    setFieldError(null);
    setFormError("");
    // console.log({ formData });
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
          Object.values(StepperFormKeys)
            .flatMap((fieldNames) => fieldNames)
            .includes(errorKey)
        ) {
          let erroredStep: number;
          // get the step number based on input name
          for (const [key, value] of Object.entries(StepperFormKeys)) {
            if (value.includes(errorKey as never)) {
              erroredStep = Number(key);
            }
          }
          // set active step and error
          setActiveStep(erroredStep);
          setFieldError({
            message: errorMessage,
            fieldName: errorKey,
          });
        } else {
          setFormError(errorMessage);
        }
      });
  };

  const onNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const initialValues: StepperFormValues = {
    fullName: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    employmentStatus: "",
    employerName: "",
    jobTitle: "",
    annualIncome: undefined,
    loanAmount: undefined,
    loanPurpose: "",
    repaymentTerms: undefined,
    repaymentStartDate: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    creditScore: undefined,
  };

  return (
    <div>
      <StepperIndicator activeStep={activeStep} />
      {formError && (
        <Alert variant="destructive" className="mt-[28px]">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Form Error</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form noValidate>
            {getStepContent(activeStep)}
            <div className="flex justify-center space-x-[20px]">
              <FormActions
                activeStep={activeStep}
                handleBack={handleBack}
                onNext={onNext}
                onSubmit={handleSubmit}
                fieldError={fieldError}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormikMultiStepForm;
