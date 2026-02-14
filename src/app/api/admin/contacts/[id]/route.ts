import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Contact } from "@/lib/models";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-change-me";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
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

        await dbConnect();
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return NextResponse.json({ success: false, error: "Contact request not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Contact request deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
