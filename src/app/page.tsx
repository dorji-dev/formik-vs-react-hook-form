import Forms from "@/components/simple-form/forms";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="py-[30px] px-[24px]">
      <h3 className="text-center">Formik vs react-hook-form</h3>
      <Separator className="my-[12px]" />
      <Forms />
    </main>
  );
}
