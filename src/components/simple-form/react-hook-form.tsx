"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { FloatingLabelInput } from "../ui/floating-input";

interface HookFormData {
  firstName: string;
  lastName: string;
  email: string;
  fruit: string;
}
const ReactHookForm = () => {
  return (
    <div className="space-y-[20px]">
      <h4 className="mb-[12px]">Simple form with validation</h4>
      <SimpleFormWithValidation />
      <h4 className="mb-[12px]">Dynamic form</h4>
      <DynamicForm />
    </div>
  );
};

export default ReactHookForm;

// Simple form with validation
const SimpleFormWithValidation = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<HookFormData>({
    mode: "onTouched",
    defaultValues: {
      email: "",
      lastName: "",
      firstName: "",
    },
  });

  const onSubmit: SubmitHandler<HookFormData> = async (data) => {
    console.log({ data });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-[20px]"
      noValidate
    >
      <FloatingLabelInput
        placeholder="Email"
        type="email"
        {...register("email", {

          validate: {
            lessThan: () => '',
            morethan: () => ''
          },
        })}
        error={errors.email?.message}
      />

      <Controller
        rules={{ required: "Please select a fruit" }}
        control={control}
        name="fruit"
        render={({ field: { onChange }, fieldState: { invalid, error } }) => (
          <Select onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            {invalid && (
              <span className="text-destructive block !mt-[5px] text-[12px]">
                {error?.message}
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
      />

      <FloatingLabelInput
        placeholder="First name"
        type="text"
        {...register("firstName", {
          required: "First name is required",
        })}
        error={errors.firstName?.message}
      />

      <FloatingLabelInput
        placeholder="Last name"
        type="text"
        {...register("lastName", {
          required: "Last name is required",
        })}
        error={errors.lastName?.message}
      />
      <Button type="submit">Submit</Button>
    </form>
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

// Dynamic form
const DynamicForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onTouched",
    shouldFocusError: false,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    console.log({ formValues });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-[40px]">
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ name: "", gender: "" }, { shouldFocus: false })}
        className="w-full"
      >
        Add field
      </Button>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="space-y-[20px] p-[20px] border rounded-[10px] border-foreground/80"
        >
          <FloatingLabelInput
            {...register(`users.${index}.name`, { required: "Required" })}
            placeholder="Name"
            error={errors.users?.[index]?.name?.message}
          />
          <Controller
            control={control}
            rules={{ required: "Please select a gender" }}
            name={`users.${index}.gender`}
            render={({
              field: { onChange },
              fieldState: { invalid, error },
            }) => (
              <Select onValueChange={onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                {invalid && (
                  <span className="text-destructive block !mt-[5px] text-[12px]">
                    {error?.message}
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
          />
          <Button
            type="button"
            onClick={() => remove(index)}
            variant="destructive"
            className="ml-auto block"
          >
            Remove
          </Button>
        </div>
      ))}
      {!!fields.length && (
        <div className="flex space-x-[20px]">
          <Button
            variant="outline"
            onClick={() => remove()}
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
    </form>
  );
};
