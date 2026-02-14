import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Otp, Admin } from "@/lib/models";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    await dbConnect();

    // Validate if the email belongs to an authorized admin
    const isAuthorized = await Admin.findOne({ email }) || (process.env.ADMIN_EMAIL && email === process.env.ADMIN_EMAIL);

    if (!isAuthorized) {
      return NextResponse.json({ success: false, error: "Unauthorized access attempt" }, { status: 403 });
    }

    const adminEmail = email;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await Otp.create({ email: adminEmail, otp, expiresAt });

    // NodeMailer setup (using environment variables for credentials)
    // For local testing without a real SMTP, you might want to log the OTP
    // console.log(`OTP for ${adminEmail}: ${otp}`);

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: '"Admin System" <noreply@aiworkshop.com>',
        to: adminEmail,
        subject: "Your Admin OTP Code",
        text: `Your OTP for admin login is: ${otp}. It expires in 10 minutes.`,
      });
    }

    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
