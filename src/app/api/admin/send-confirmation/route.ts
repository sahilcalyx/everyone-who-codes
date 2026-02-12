import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { User } from "@/lib/models";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-change-me";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }

    const { userId, zoomLink, message } = await req.json();

    if (!userId || !zoomLink) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const sessionDate = user.sessionDate || user.date || "Date Unspecified";
    const sessionTime = user.sessionTime || user.time || "Time Unspecified";

    const mailOptions = {
      from: `"Workshop Admin" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Workshop Confirmation & Zoom Link",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg: 12px;">
          <h2 style="color: #10b981; margin-bottom: 20px;">Workshop Registration Confirmed!</h2>
          <p>Hello <strong>${user.name} ${user.surname}</strong>,</p>
          <p>Your registration for the Live Tech Interview Workshop has been confirmed. We're excited to have you join us!</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: bold;">Session Details</p>
            <p style="margin: 10px 0 0 0; font-size: 18px; color: #0f172a; font-weight: bold;">${sessionDate}</p>
            <p style="margin: 5px 0 0 0; font-size: 16px; color: #10b981; font-weight: bold;">${sessionTime}</p>
            <p style="margin: 10px 0 0 0; font-size: 14px; color: #475569;">Expert: <strong>${user.expert}</strong></p>
          </div>

          <div style="margin: 25px 0;">
            <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: bold;">Zoom Link</p>
            <a href="${zoomLink}" style="display: block; margin-top: 10px; color: #3b82f6; text-decoration: none; font-weight: bold; font-size: 16px;">${zoomLink}</a>
          </div>

          ${message ? `
          <div style="margin: 25px 0; border-top: 1px solid #e2e8f0; pt: 20px;">
            <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: bold;">Message from Admin</p>
            <p style="margin-top: 10px; color: #334155; line-height: 1.6;">${message}</p>
          </div>
          ` : ""}

          <p style="margin-top: 30px; font-size: 14px; color: #64748b;">
            If you have any questions, feel free to reply to this email.
          </p>
          
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          <p style="font-size: 12px; color: #94a3b8; text-align: center;">
            Live Tech Interview Workshop &copy; 2026
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Confirmation email sent successfully" });
  } catch (error: any) {
    console.error("Email sending error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
