import Link from "next/link";

export default function NavComponent() {
  return (
    <nav className="flex gap-6">
      <Link href="/">Home</Link>
      <Link href="/profile/">Profile</Link>
      <Link href="/login/">Login</Link>
      <Link href="/register/">Register</Link>
    </nav>
  );
}
