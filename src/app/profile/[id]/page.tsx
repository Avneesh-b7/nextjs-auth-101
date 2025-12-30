/**
 * USAGE GUIDELINES:
 * - Server-rendered protected profile page.
 * - Auth state derived via getCurrentUser().
 * - URL param is NOT trusted for identity.
 */

import { getCurrentUser } from "@/src/helpers/getCurrentUser";
import { redirect } from "next/navigation";

interface UserProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  // -----------------------------
  // Auth check (server-side)
  // -----------------------------
  const { id } = await params;

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Optional: enforce user can only see their own profile
  if (id !== user.id) {
    redirect(`/profile/${user.id}`);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        display: "flex",
        justifyContent: "center",
        padding: "3rem 1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          backgroundColor: "#0f0f0f",
          border: "1px solid #262626",
          borderRadius: "10px",
          padding: "2rem",
        }}
      >
        {/* Header */}
        <h1
          style={{
            color: "#ffffff",
            fontSize: "1.8rem",
            marginBottom: "0.25rem",
          }}
        >
          Profile
        </h1>
        <p style={{ color: "#a3a3a3", marginBottom: "2rem" }}>
          Manage your account information
        </p>

        {/* Profile Card */}
        <div
          style={{
            border: "1px solid #262626",
            borderRadius: "8px",
            padding: "1.5rem",
            backgroundColor: "#000000",
          }}
        >
          <ProfileRow label="Name" value={user.name} />
          <ProfileRow label="Email" value={user.email} />
          <ProfileRow label="Role" value={user.role} />
          <ProfileRow label="User ID" value={user.id} mono />
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// Reusable row component
// -----------------------------
function ProfileRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.75rem 0",
        borderBottom: "1px solid #1f1f1f",
      }}
    >
      <span style={{ color: "#a3a3a3" }}>{label}</span>
      <span
        style={{
          color: "#ffffff",
          fontFamily: mono ? "monospace" : "inherit",
          maxWidth: "60%",
          textAlign: "right",
          wordBreak: "break-all",
        }}
      >
        {value}
      </span>
    </div>
  );
}
