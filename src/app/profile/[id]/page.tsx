import React from "react";

interface UserProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

async function UserProfilePage({ params }: UserProfilePageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return (
    <>
      <h1>this is the USER PROFILE page!!</h1>
      <h1 className="text-4xl text-white">hello from {id} </h1>
    </>
  );
}

export default UserProfilePage;
