import { HematologiaClient } from "./HematologiaClient";

export const metadata = { title: "Hematología y Médula Ósea — Becker Lab" };

export default function HematologiaPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <HematologiaClient />
    </div>
  );
}
