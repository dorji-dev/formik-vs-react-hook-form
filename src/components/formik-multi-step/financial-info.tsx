import React from "react";
import { FloatingLabelInput } from "../ui/floating-input";
import { Field } from "formik";
import { FormValidators } from "@/lib/utils";

const FinancialInfo = () => {
  return (
    <div>
      <h4 className="stepper_step_heading">Financial Information</h4>
      <div className="stepper_step_container">
        <Field name="bankName" validate={FormValidators.required}>
          {({ field, meta }) => (
            <FloatingLabelInput
              {...field}
              id="bankName"
              label="Bank Name"
              type="text"
              error={meta.touched && meta?.error}
            />
          )}
        </Field>
        <Field name="accountNumber" validate={FormValidators.required}>
          {({ field, meta }) => (
            <FloatingLabelInput
              {...field}
              id="accountNumber"
              label="Account Number"
              type="number"
              error={meta.touched && meta?.error}
            />
          )}
        </Field>
        <Field name="routingNumber" validate={FormValidators.required}>
          {({ field, meta }) => (
            <FloatingLabelInput
              {...field}
              id="routingNumber"
              label="Routing Number"
              type="text"
              error={meta.touched && meta?.error}
            />
          )}
        </Field>
        <Field name="creditScore" validate={FormValidators.required}>
          {({ field, meta }) => (
            <FloatingLabelInput
              {...field}
              id="creditScore"
              label="Credit Score"
              type="number"
              error={meta.touched && meta?.error}
            />
          )}
        </Field>
      </div>
    </div>
  );
};

export default FinancialInfo;
