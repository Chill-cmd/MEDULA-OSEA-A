import { ArenaResultsClient } from "./ArenaResultsClient";

export const metadata = { title: "Resultados — Becker Lab" };

export default function ArenaResultsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <ArenaResultsClient />
    </div>
  );
}
