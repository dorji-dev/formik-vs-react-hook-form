# formik-vs-react-hook-form
## Background
So I was(and am) working for a company and we were using `react-final-form` for form management in our projects. But then I was casually checking the npm status of the libraries we were using and noticed that the last published date of  `react-firnal-form` was `two` years ago and has still `react -v 17`(with react 19 already on it's way) as a dependency. So I didn't feel quite right and suggested our tech leads that we may need to swtich the form libraries that we were using where my first candidate was `react-hook-form`. Our tech lead suggested that I make a comparison between `react-hook-form` and `formik` libraries and so here I am. The comparison basically contains two use cases, one a simple use case and another a stepper form using both library so here I am.
You may not need those simple implementations but you might need the stepper form example to integrage to your existing projects. So here's how you can do that(you can use the guide for both the form library):

## Using the sample stepper form in existing projects 
You may not need those simple implementations but you might need the stepper form example to integrage to your existing projects. So here's how you can do that(you can use the guide for both the form library):

- Both stepper implementation has a dedicated folder inside the `components` folder and all the code that is needed for the implementation, you will find there. For formik it is `formik-multi-step` and for react-hook-form it is `hook-multi-step`.
- The entry file for the implementation is the `index.tsx` file for both.
- For `react-hook-form`, you need to wrap your form with `FormProvider` passing to it all the methods you get from `useForm` so that the step/child components can use those methods via `useFormContext` hook and make sure to pass the type of form values to the hook to get full type safety while adding or updaing new form inputs.
- For `formik`, you need to wrap your form with `Formik` component as you would normally do and access all the form methods and states using `useFormikContext`.
- Currently there is five steps and hence five child components. You can add as many steps/components(switch statements) inside `getStepContent` function. Also accordingly you need to update the `STEPPER_FORM_KEYS` constants which is basically an object with step number with the value as an array of field names for each step. The type for our form values is being derived from `STEPPER_FORM_KEYS` so if you need an extra field for each step or even an extra step, make sure to update the `STEPPER_FORM_KEYS` object and you will get an automatically updated type. `react-hook-form` is fully type safe hence there is no mistake of adding/updating form input names. As for `formik` it is unable to detect the input types correctly so you may need to be careful when assigning input names.

## Validations
- Makes use of both controlled and uncontrolled components. The controlled components include shadcn `datepicker` and `select` component.
- Doesn't let the user to jump to next step unless all the required fields are filled.
- Conditional validation based on the value from another field in `EmploymentInfo` component.
- Focus input(regardless of which step it belongs to) with the error message if the submit response includes input specific error messages, if not show generic form error message.

Any suggestions are welcome via PR.


