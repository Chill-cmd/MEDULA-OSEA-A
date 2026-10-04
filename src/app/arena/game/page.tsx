import { ArenaGameClient } from "./ArenaGameClient";

export const metadata = { title: "Vax Arena — Juego en vivo" };

export default function ArenaGamePage() {
  return (
    <div className="mx-auto px-4 py-10 sm:px-6">
      <ArenaGameClient />
    </div>
  );
}
