import React from "react";
import { FloatingLabelInput } from "../ui/floating-input";
import { DatePickerSingle } from "../ui/date-picker-single";
import { Field, useFormikContext } from "formik";
import {
  composeFormValidation,
  FormValidators,
  validateEmail,
} from "@/lib/utils";
import { StepperFormValues } from "@/types/hook-stepper";

const ApplicantInfo = () => {
  const { setFieldValue, validateField, setTouched } =
    useFormikContext<StepperFormValues>();

  return (
    <div>
      <h4 className="stepper_step_heading">Applicant Information</h4>
      <div className="stepper_step_container">
        <Field name="fullName" validate={FormValidators.required}>
          {({ field, meta }) => (
            <FloatingLabelInput
              {...field}
              id="fullName"
              label="Full name"
              error={meta.touched && meta?.error}
            />
          )}
        </Field>
        <Field name="dob" validate={FormValidators.required}>
          {({ field: { value }, meta }) => (
            <div>
              <DatePickerSingle
                onBlur={async () => {
                  await setTouched({dob: true});
                  validateField("dob");
                }}
                placeholder="Pick a date"
                selectedDate={value ? new Date(value) : null}
                onSelect={(date) => setFieldValue("dob", date.toISOString())}
                floatingLabel="Date of birth"
              />
              {meta.touched && meta.error && (
                <span className="text-destructive block !mt-[5px] text-[12px]">
                  {meta.error}
                </span>
              )}
            </div>
          )}
        </Field>
        <Field
          name="email"
          validate={composeFormValidation(
            FormValidators.required,
            validateEmail
          )}
        >
          {({ field, meta }) => (
            <FloatingLabelInput
              {...field}
              id="email"
              label="Email"
              type="email"
              error={meta.touched && meta?.error}
            />
          )}
        </Field>
        <Field name="phone" validate={FormValidators.required}>
          {({ field, meta }) => (
            <FloatingLabelInput
              {...field}
              id="phone"
              label="Phone"
              type="tel"
              error={meta.touched && meta?.error}
            />
          )}
        </Field>
      </div>
    </div>
  );
};

export default ApplicantInfo;
