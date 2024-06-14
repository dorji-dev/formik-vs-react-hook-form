import { Separator } from "@/components/ui/separator";
import FormikForm from "./formik";
import ReactHookForm from "./react-hook-form";

const Forms = () => {
  return (
    <div className="flex justify-between">
      <div className="basis-[48%]">
        <h2 className="text-center mb-[12px]">
          <code className="underline">formik</code>
        </h2>
        <FormikForm />
      </div>
      <Separator orientation="vertical" className="h-[1000px]" />
      <div className="basis-[48%]">
        <h2 className="text-center mb-[12px]">
          <code className="underline">react-hook-form</code>
        </h2>
        <ReactHookForm />
      </div>
    </div>
  );
};

export default Forms;
