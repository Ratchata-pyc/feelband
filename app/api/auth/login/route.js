import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req, res) {
  const { email, password } = await req.json();

  // Validate the input
  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "กรุณากรอกอีเมลและรหัสผ่าน" }),
      { status: 400 }
    );
  }

  // Check if the user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return new Response(
      JSON.stringify({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }),
      { status: 401 }
    );
  }

  // Compare the password
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return new Response(
      JSON.stringify({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }),
      { status: 401 }
    );
  }

  // Create JWT token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return new Response(JSON.stringify({ message: "เข้าสู่ระบบสำเร็จ", token }), {
    status: 200,
  });
}
