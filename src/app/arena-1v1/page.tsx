import { Arena1v1Client } from "./Arena1v1Client";

export const metadata = { title: "Arena Becker 1v1 — Becker Lab" };

export default function Arena1v1Page() {
  return (
    <div className="mx-auto px-4 py-10 sm:px-6">
      <Arena1v1Client />
    </div>
  );
}
