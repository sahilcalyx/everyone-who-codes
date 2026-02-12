import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Otp } from "@/lib/models";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    // In a real app, you'd verify if the email belongs to an admin
    // For this demo, we'll allow a specific admin email or any if not configured
    const adminEmail = process.env.ADMIN_EMAIL || email;

    await dbConnect();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await Otp.create({ email: adminEmail, otp, expiresAt });

    // NodeMailer setup (using environment variables for credentials)
    // For local testing without a real SMTP, you might want to log the OTP
    console.log(`OTP for ${adminEmail}: ${otp}`);

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
