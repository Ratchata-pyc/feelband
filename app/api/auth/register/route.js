import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req, res) {
  const { firstName, lastName, email, password, confirmPassword } =
    await req.json();

  // Validate the input
  const errors = {};
  if (!firstName) errors.firstName = "กรุณากรอกชื่อ";
  if (!lastName) errors.lastName = "กรุณากรอกนามสกุล";
  if (!email) errors.email = "กรุณากรอกอีเมล";
  if (!password) errors.password = "กรุณากรอกรหัสผ่าน";
  if (!confirmPassword) errors.confirmPassword = "กรุณายืนยันรหัสผ่าน";
  if (password !== confirmPassword)
    errors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
  if (password && password.length < 6)
    errors.password = "รหัสผ่านควรมีความยาวไม่ต่ำกว่า 6 ตัวอักษร";

  if (Object.keys(errors).length > 0) {
    return new Response(JSON.stringify({ errors }), {
      status: 400,
    });
  }

  // Check if the email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return new Response(JSON.stringify({ error: "อีเมลนี้ถูกใช้งานแล้ว" }), {
      status: 400,
    });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the user in the database
  const newUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  return new Response(JSON.stringify({ message: "ลงทะเบียนสำเร็จ" }), {
    status: 201,
  });
}
