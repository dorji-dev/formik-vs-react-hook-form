import { Field } from "formik";
import { FloatingLabelInput } from "../ui/floating-input";
import { FormValidators } from "@/lib/utils";

const AddressInfo = () => {
  return (
    <div>
      <h4 className="stepper_step_heading">Address Information</h4>
      <div className="stepper_step_container">
        <Field name="address" validate={FormValidators.required}>
          {({ field, meta }) => (
            <FloatingLabelInput
              {...field}
              id="currentAddress"
              label="Current Address"
              type="text"
              error={meta.touched && meta?.error}
            />
          )}
        </Field>
        <Field name="city" validate={FormValidators.required}>
          {({ field, meta }) => (
            <FloatingLabelInput
              {...field}
              id="city"
              label="City"
              type="text"
              error={meta.touched && meta?.error}
            />
          )}
        </Field>
        <Field name="state" validate={FormValidators.required}>
          {({ field, meta }) => (
            <FloatingLabelInput
              {...field}
              id="state"
              label="State"
              type="text"
              error={meta.touched && meta?.error}
            />
          )}
        </Field>
        <Field name="zipCode" validate={FormValidators.required}>
          {({ field, meta }) => (
            <FloatingLabelInput
              {...field}
              id="zipCode"
              label="Zip Code"
              type="number"
              error={meta.touched && meta?.error}
            />
          )}
        </Field>
      </div>
    </div>
  );
};

export default AddressInfo;
