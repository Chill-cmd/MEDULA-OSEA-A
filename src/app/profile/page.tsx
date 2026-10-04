import { ProfileClient } from "./ProfileClient";

export const metadata = { title: "Mi Becker Lab — Becker Lab" };

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <ProfileClient />
    </div>
  );
}
