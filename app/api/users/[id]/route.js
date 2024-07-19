import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  console.log("API called for user ID:", id);

  // Replace this with your database fetching logic
  const profileData = {
    id: parseInt(id),
    name: "John Doe",
    bio: "Musician specializing in jazz and classical music.",
    // Add more fields as needed
  };

  return NextResponse.json(profileData);
}
