import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { User, Settings } from "@/lib/models";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, surname, email, contactNumber, expert, date, time } = body;

    await dbConnect();

    // Fetch current fee from settings or default to 999
    const feeSetting = await Settings.findOne({ key: "workshop_fee" });
    const fees = feeSetting ? feeSetting.value : 999;

    const newUser = await User.create({
      name,
      surname,
      email,
      contactNumber,
      expert,
      sessionDate: date,
      sessionTime: time,
      fees,
    });

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
