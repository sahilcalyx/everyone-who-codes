import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Contact } from "@/lib/models";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, lastname, email, subject, message } = body;

        await dbConnect();

        const newContact = await Contact.create({
            name,
            lastname,
            email,
            subject,
            message,
        });

        return NextResponse.json({ success: true, data: newContact }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
