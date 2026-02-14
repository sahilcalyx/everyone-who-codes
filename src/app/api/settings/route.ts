import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Settings } from "@/lib/models";

export async function GET() {
  try {
    await dbConnect();

    // Fetch workshop fee
    let feeSetting = await Settings.findOne({ key: "workshop_fee" });
    if (!feeSetting) {
      feeSetting = await Settings.create({ key: "workshop_fee", value: 15 });
    }

    // Fetch experts
    let expertSetting = await Settings.findOne({ key: "experts" });
    if (!expertSetting) {
      const defaultExperts = [
        { id: "expert-1", name: "Sarah Chen", role: "Sr. Engineer @ Google" },
        { id: "expert-2", name: "Marc Riviera", role: "Engineering Mgr @ Meta" },
        { id: "expert-3", name: "Alex Kumar", role: "Staff Engineer @ Netflix" },
      ];
      expertSetting = await Settings.create({ key: "experts", value: defaultExperts });
    }

    // Fetch workshop slots
    let slotsSetting = await Settings.findOne({ key: "workshop_slots" });
    const defaultSlots = [
      { id: "slot-1", date: "March 20, 2026", time: "10:30 AM CST" },
    ];

    if (!slotsSetting) {
      slotsSetting = await Settings.create({ key: "workshop_slots", value: defaultSlots });
    } else if (Array.isArray(slotsSetting.value) && slotsSetting.value.length === 0) {
      await Settings.updateOne({ key: "workshop_slots" }, { value: defaultSlots });
      slotsSetting.value = defaultSlots;
    }

    return NextResponse.json({
      success: true,
      data: {
        fee: feeSetting.value,
        experts: expertSetting.value,
        slots: slotsSetting.value,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
