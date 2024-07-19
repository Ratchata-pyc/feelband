"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setProfileData(data))
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setError(error.message);
      });
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <main className="p-4">
        <h1 className="bg-slate-400 p-4">Profile Page</h1>
        <div className="profile">
          <h2>{profileData.name}</h2>
          <p>{profileData.bio}</p>
        </div>
      </main>
    </div>
  );
}
