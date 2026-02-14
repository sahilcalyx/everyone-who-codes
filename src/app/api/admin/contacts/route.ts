import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Contact } from "@/lib/models";

export async function GET() {
    try {
        await dbConnect();
        const contacts = await Contact.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: contacts });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
