"use client";

import React, { useState, useEffect } from "react";
import { WheelPicker } from "./WheelPicker";
import { cn } from "@/lib/utils";

interface IPhoneDateTimePickerProps {
  type: "date" | "time" | "datetime";
  value: string; // Internal format: YYYY-MM-DD or HH:mm or combined
  onChange: (value: string) => void;
  availableOptions?: { date?: string[]; time?: string[] };
}

export const IPhoneDateTimePicker: React.FC<IPhoneDateTimePickerProps> = ({
  type,
  value,
  onChange,
  availableOptions,
}) => {
  // Helper to generate arrays
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => i + start);

  const fullMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Default initial parsing (very basic)
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    fullMonths[now.getMonth()],
  );
  const [selectedDay, setSelectedDay] = useState(now.getDate());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const [selectedHour, setSelectedHour] = useState("06");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("PM");

  // For User Side (Simple Time Slots)
  const [selectedDateStr, setSelectedDateStr] = useState(
    availableOptions?.date?.[0] || "",
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    availableOptions?.time?.[0] || "",
  );

  // Sync internal state when value prop changes from outside
  useEffect(() => {
    if (!value) return;

    if (type === "date" && !availableOptions?.date) {
      // Parse "Month Day, Year"
      const match = value.match(/^(\w+)\s(\d+),\s(\d+)$/);
      if (match) {
        setSelectedMonth(match[1]);
        setSelectedDay(parseInt(match[2]));
        setSelectedYear(parseInt(match[3]));
      }
    } else if (type === "time" && !availableOptions?.time) {
      // Parse "HH:mm Period IST"
      const match = value.match(/^(\d{2}):(\d{2})\s(AM|PM)\sIST$/);
      if (match) {
        setSelectedHour(match[1]);
        setSelectedMinute(match[2]);
        setSelectedPeriod(match[3]);
      }
    }
  }, [value, type, availableOptions]);

  useEffect(() => {
    let newValue = "";
    if (type === "date") {
      newValue = `${selectedMonth} ${selectedDay}, ${selectedYear}`;
    } else if (type === "time") {
      if (availableOptions?.time) {
        newValue = selectedTimeSlot;
      } else {
        newValue = `${selectedHour}:${selectedMinute} ${selectedPeriod} IST`;
      }
    }

    if (newValue && newValue !== value) {
      onChange(newValue);
    }
  }, [
    selectedMonth,
    selectedDay,
    selectedYear,
    selectedHour,
    selectedMinute,
    selectedPeriod,
    selectedTimeSlot,
    type,
    value,
    availableOptions
  ]);

  return (
    <div className="flex flex-col gap-4 border border-slate-100 rounded-3xl overflow-hidden shadow-inner bg-slate-50/30 p-1">
      <div className="flex items-center justify-center bg-white rounded-2xl overflow-hidden">
        {type === "date" &&
          (availableOptions?.date ? (
            <WheelPicker
              options={availableOptions.date}
              value={selectedDateStr || ""}
              onChange={(v) => {
                setSelectedDateStr(v as string);
                onChange(v as string);
              }}
              className="w-full"
            />
          ) : (
            <>
              <WheelPicker
                options={fullMonths}
                value={selectedMonth}
                onChange={(v) => setSelectedMonth(v as string)}
                className="w-1/2"
              />
              <WheelPicker
                options={range(1, 31)}
                value={selectedDay}
                onChange={(v) => setSelectedDay(v as number)}
                className="w-1/4 border-x border-slate-50"
              />
              <WheelPicker
                options={range(now.getFullYear(), now.getFullYear() + 2)}
                value={selectedYear}
                onChange={(v) => setSelectedYear(v as number)}
                className="w-1/4"
              />
            </>
          ))}

        {type === "time" &&
          (availableOptions?.time ? (
            <WheelPicker
              options={availableOptions.time}
              value={selectedTimeSlot}
              onChange={(v) => {
                setSelectedTimeSlot(v as string);
                onChange(v as string);
              }}
              className="w-full"
            />
          ) : (
            <>
              <WheelPicker
                options={range(1, 12).map((h) => h.toString().padStart(2, "0"))}
                value={selectedHour}
                onChange={(v) => setSelectedHour(v as string)}
                className="w-1/3"
              />
              <WheelPicker
                options={range(0, 59).map((m) => m.toString().padStart(2, "0"))}
                value={selectedMinute}
                onChange={(v) => setSelectedMinute(v as string)}
                className="w-1/3 border-x border-slate-50"
              />
              <WheelPicker
                options={["AM", "PM"]}
                value={selectedPeriod}
                onChange={(v) => setSelectedPeriod(v as string)}
                className="w-1/3"
              />
            </>
          ))}
      </div>
    </div>
  );
};
