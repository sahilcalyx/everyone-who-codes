import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Otp } from "@/lib/models";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-change-me";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    await dbConnect();

    const otpRecord = await Otp.findOne({
      email,
      otp,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return NextResponse.json({ success: false, error: "Invalid or expired OTP" }, { status: 401 });
    }

    // Delete the OTP after successful verification
    await Otp.deleteOne({ _id: otpRecord._id });

    // Create JWT token
    const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "1h" });

    const response = NextResponse.json({ success: true });
    
    // Set cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 3600, // 1 hour
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
