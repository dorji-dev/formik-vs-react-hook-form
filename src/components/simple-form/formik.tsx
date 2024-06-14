"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { composeFormValidation, validateEmail } from "@/lib/utils";
import { Field, FieldArray, Formik, FormikErrors } from "formik";

const FormikForm = () => {
  return (
    <div className="space-y-[20px]">
      <h4>Simple form with validation</h4>
      <SimpleFormWithValidation />
      <h4>Dynamic form</h4>
      <DynamicForm />
    </div>
  );
};

export default FormikForm;

// Simple form with validation
const SimpleFormWithValidation = () => {
  const onSubmit = async (data: {
    email: string;
    firstName: string;
    lastName: string;
    fruit: string;
  }) => {
    console.log({ data });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        firstName: "",
        lastName: "",
        fruit: "",
      }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, errors, touched, setFieldValue }) => (
        <form onSubmit={handleSubmit} className="space-y-[20px]" noValidate>
          <Field
            name="eil"
            validate={composeFormValidation(async (value) => {
              if (!value) {
                return "Email is required";
              }
            }, validateEmail)}
          >
            {({ field }) => (
              <Input
                placeholder="Email"
                type="email"
                {...field}
                error={touched?.email && errors?.email}
              />
            )}
          </Field>
          <Field
            name="fruit"
            validate={(value) => {
              if (!value) {
                return "Please select a fruit";
              } else {
                return undefined;
              }
            }}
          >
            {() => (
              <Select
                onValueChange={(value) => {
                  setFieldValue("fruit", value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                {touched.fruit && errors?.fruit && (
                  <span className="text-destructive block !mt-[5px] text-[12px]">
                    {errors?.fruit}
                  </span>
                )}
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </Field>
          <Field
            name="firstName"
            validate={(value) => {
              if (!value) {
                return "First name is required";
              }
            }}
          >
            {({ field }) => (
              <Input
                placeholder="First name"
                type="text"
                {...field}
                error={touched?.firstName && errors?.firstName}
              />
            )}
          </Field>
          <Field
            name="lastName"
            validate={(value) => {
              if (!value) {
                return "Last name is required";
              }
            }}
          >
            {({ field }) => (
              <Input
                placeholder="Last name"
                type="text"
                {...field}
                error={touched?.lastName && errors?.lastName}
              />
            )}
          </Field>
          <Button type="submit">Submit</Button>
        </form>
      )}
    </Formik>
  );
};

// Dynamic form

type FormValues = {
  users: Users;
};

type Users = {
  name: string;
  gender: "male" | "female" | "";
}[];

const DynamicForm = () => {
  const onSubmit = (formValues: FormValues) => {
    console.log({ formValues });
  };

  return (
    <Formik initialValues={{ users: [] }} onSubmit={onSubmit}>
      {({ handleSubmit, values, errors, setFieldValue, touched }) => (
        <form onSubmit={handleSubmit} className="space-y-[40px]">
          <FieldArray name="users">
            {({ push, remove }) => {
              return (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => push({ name: "", gender: "" })}
                    className="w-full"
                  >
                    Add field
                  </Button>
                  {values.users.map((_, index) => (
                    <div
                      key={index}
                      className="space-y-[20px] p-[20px] border rounded-[10px] border-foreground/80"
                    >
                      <Field
                        name={`uses.${index}.age`}
                        validate={(value) => {
                          if (!value) {
                            return "Required";
                          }
                        }}
                      >
                        {({ field }) => (
                          <Input
                            {...field}
                            placeholder="Name"
                            error={
                              touched?.users?.[index]?.name &&
                              (errors?.users as FormikErrors<FormValues>)?.[
                                index
                              ]?.name
                            }
                          />
                        )}
                      </Field>
                      <Field
                        name={`users.${index}.gender`}
                        validate={(value) => {
                          if (!value) {
                            return "Please select a gender";
                          } else {
                            return undefined;
                          }
                        }}
                      >
                        {() => (
                          <Select
                            onValueChange={(value) =>
                              setFieldValue(`users.${index}.gender`, value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            {touched.users?.[index]?.gender &&
                              (errors?.users as FormikErrors<FormValues>)?.[
                                index
                              ]?.gender && (
                                <span className="text-destructive block !mt-[5px] text-[12px]">
                                  {
                                    (
                                      errors?.users as FormikErrors<FormValues>
                                    )?.[index]?.gender
                                  }
                                </span>
                              )}
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Gender</SelectLabel>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                      <Button
                        onClick={() => remove(index)}
                        type="button"
                        variant="destructive"
                        className="ml-auto block"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}

                  {!!values.users.length && (
                    <div className="flex space-x-[20px]">
                      <Button
                        variant="outline"
                        onClick={() => setFieldValue("users", [])}
                        type="button"
                        className="flex-1"
                      >
                        Remove all
                      </Button>
                      <Button type="submit" className="flex-1">
                        Submit
                      </Button>
                    </div>
                  )}
                </>
              );
            }}
          </FieldArray>
        </form>
      )}
    </Formik>
  );
};
