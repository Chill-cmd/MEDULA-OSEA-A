import { ArenaWaitingClient } from "./ArenaWaitingClient";

export const metadata = { title: "Sala de Espera — Becker Lab" };

export default function ArenaWaitingPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-14 sm:px-6">
      <ArenaWaitingClient />
    </div>
  );
}
