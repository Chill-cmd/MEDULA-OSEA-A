import { ImmunologyClient } from "./ImmunologyClient";

export const metadata = { title: "Immunology Lab — VaxLab México" };

export default function ImmunologyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <ImmunologyClient />
    </div>
  );
}
