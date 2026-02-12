"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Search,
  Mail,
  Users,
  DollarSign,
  Download,
  LogOut,
  Send,
  Settings as SettingsIcon,
  Clock,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IPhoneDateTimePicker } from "@/components/ui/IPhoneDateTimePicker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [emailContent, setEmailContent] = useState("");
  const [loading, setLoading] = useState(true);

  // New state for dynamic settings
  const [activeTab, setActiveTab] = useState<"registrants" | "settings">(
    "registrants",
  );
  const [settings, setSettings] = useState({
    fee: 15,
    experts: [] as any[],
    slots: [] as any[],
  });
  const [newExpert, setNewExpert] = useState({ name: "", role: "" });
  const [newSlot, setNewSlot] = useState({ date: "", time: "" });
  const [updating, setUpdating] = useState(false);

  // Confirmation Email States
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [zoomLink, setZoomLink] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchSettings();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const json = await res.json();
      if (json.success) {
        setUsers(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const json = await res.json();
      if (json.success) {
        setSettings(json.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    setUpdating(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });
      if (res.ok) {
        fetchSettings();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleAddExpert = () => {
    if (!newExpert.name || !newExpert.role) return;
    const updatedExperts = [
      ...settings.experts,
      { id: Date.now().toString(), ...newExpert },
    ];
    updateSetting("experts", updatedExperts);
    setNewExpert({ name: "", role: "" });
  };

  const handleRemoveExpert = (id: string) => {
    const updatedExperts = settings.experts.filter((e) => e.id !== id);
    updateSetting("experts", updatedExperts);
  };

  const handleAddSlot = () => {
    if (!newSlot.date || !newSlot.time) return;

    // Prevent exact duplicate slots (same date AND same time)
    const slotExists = settings.slots.some(
      (s: any) => s.date === newSlot.date && s.time === newSlot.time,
    );
    if (slotExists) {
      alert(`A session is already configured for ${newSlot.date} at ${newSlot.time}.`);
      return;
    }

    const updatedSlots = [
      ...settings.slots,
      { id: Date.now().toString(), ...newSlot },
    ];
    updateSetting("workshop_slots", updatedSlots);
    // Keep the date, reset the time to encourage adding more slots for the same day
    setNewSlot({ ...newSlot, time: "" });
  };

  const handleRemoveSlot = (id: string) => {
    const updatedSlots = settings.slots.filter((s) => s.id !== id);
    updateSetting("workshop_slots", updatedSlots);
  };

  const handleSendConfirmation = async () => {
    if (!selectedUser || !zoomLink) return;

    setSendingEmail(true);
    try {
      const res = await fetch("/api/admin/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUser._id,
          zoomLink,
          message: customMessage,
        }),
      });

      if (res.ok) {
        setShowConfirmDialog(false);
        setZoomLink("");
        setCustomMessage("");
        alert("Confirmation email sent successfully!");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to send confirmation email");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while sending the email");
    } finally {
      setSendingEmail(false);
    }
  };

  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.surname} ${u.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const handleLogout = () => {
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-slate-950 text-white flex flex-col h-screen sticky top-0">
        <div className="p-8 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl bg-primary text-white">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-black uppercase italic tracking-tighter">
              Admin UI
            </h1>
          </div>
        </div>

        <nav className="p-6 flex-1 space-y-2 overflow-y-auto">
          <SidebarLink
            active={activeTab === "registrants"}
            onClick={() => setActiveTab("registrants")}
            icon={Users}
            label="Registrants"
          />
          <SidebarLink
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
            icon={SettingsIcon}
            label="Form Settings"
          />
        </nav>

        <div className="p-6 border-t border-white/10 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-slate-400 hover:text-red-400 font-bold text-xs uppercase tracking-widest transition-colors w-full p-4 rounded-xl hover:bg-white/5"
          >
            <LogOut className="h-4 w-4" />
            Sign Out System
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30">
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">
              Dashboard / <span className="text-slate-900">{activeTab}</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                placeholder="Quick search..."
                className="bg-transparent border-none outline-none text-sm font-medium text-slate-600 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        <main className="p-8 max-w-[1400px]">
          {activeTab === "registrants" ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Stats */}
              <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  icon={Users}
                  label="Total Registrants"
                  value={users.length}
                  color="bg-primary"
                />
                <StatCard
                  icon={DollarSign}
                  label="Total Revenue"
                  value={`$${users.reduce((acc, u) => acc + (u.fees || 0), 0)}`}
                  color="bg-emerald-500"
                />
                <StatCard
                  icon={Mail}
                  label="Active Users"
                  value={users.length}
                  color="bg-blue-500"
                />
              </div>

              {/* User Table */}
              <div className="lg:col-span-8">
                <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden min-h-[600px]">
                  <CardHeader className="bg-white border-b border-slate-50 p-6 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter">
                        Participants
                      </CardTitle>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                        Live attendee data
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50/50 border-b border-slate-50">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                              Name
                            </th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                              Expert
                            </th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                              Selected Session
                            </th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                              Fee
                            </th>
                            <th className="px-6 py-4 text-right"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr>
                              <td
                                colSpan={5}
                                className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest animate-pulse"
                              >
                                Loading data...
                              </td>
                            </tr>
                          ) : (
                            filteredUsers.map((user) => (
                              <tr
                                key={user._id}
                                className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors group text-sm"
                              >
                                <td className="px-6 py-4">
                                  <div className="font-bold text-slate-900">
                                    {user.name} {user.surname}
                                  </div>
                                  <div className="text-xs text-slate-500 font-medium">
                                    {user.email}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                                    {user.expert}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                                      {user.sessionDate || user.date || "Not set"}
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">
                                      {user.sessionTime || user.time || "—"}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="font-black text-slate-900">
                                    ${user.fees}
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <Button
                                    onClick={() => setSelectedUser(user)}
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-xl text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20"
                                  >
                                    View
                                  </Button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Panel */}
              <div className="lg:col-span-4">
                <AnimatePresence mode="wait">
                  {selectedUser ? (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      key="action-pane"
                    >
                      <Card className="rounded-[2rem] border-slate-100 shadow-2xl overflow-hidden border-2 border-slate-50">
                        <CardHeader className="bg-emerald-400 text-white p-6 shadow-lg shadow-emerald-400/20 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                          <CardTitle className="text-2xl font-black uppercase italic tracking-tighter flex items-center justify-between relative z-10">
                            User Profile
                            <button
                              onClick={() => setSelectedUser(null)}
                              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all backdrop-blur-sm"
                            >
                              ✕
                            </button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                          <div className="space-y-6">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                                Full Name
                              </p>
                              <p className="text-xl font-bold text-slate-950 tracking-tight">
                                {selectedUser.name} {selectedUser.surname}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                                Contact
                              </p>
                              <p className="text-lg font-bold text-slate-900 tabular-nums">
                                {selectedUser.contactNumber}
                              </p>
                            </div>
                            <div className="space-y-2 pt-4 border-t border-slate-100">
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/80 ml-1">
                                Selected Session
                              </p>
                              <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 shadow-inner group transition-all hover:bg-emerald-50/30 hover:border-emerald-100">
                                <p className="font-extrabold text-slate-900 italic uppercase tracking-tighter text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                                  {selectedUser.sessionDate || selectedUser.date || "Date Unspecified"}
                                </p>
                                <p className="text-xl font-black text-slate-950 tracking-widest flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-emerald-500" />
                                  {selectedUser.sessionTime || selectedUser.time || "—"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="pt-4">
                            <Button
                              onClick={() => setShowConfirmDialog(true)}
                              className="w-full h-16 rounded-[1.25rem] bg-[#1a1c24] hover:bg-black text-white font-black uppercase tracking-[0.2em] italic text-xs shadow-xl shadow-slate-900/10 transition-all hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
                            >
                              Send Confirmation
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ) : (
                    <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center text-slate-400">
                      <Users className="h-12 w-12 mb-4 opacity-20" />
                      <p className="text-xs font-bold uppercase tracking-widest">
                        Select user to view details
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-950 uppercase italic tracking-tighter">
                    Form Settings
                  </h1>
                  <p className="text-slate-500 font-medium mt-1">
                    Configure the dynamic elements of the landing page form.
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  <SettingsIcon className="h-3.5 w-3.5" />
                  System Configuration Mode
                </div>
              </div>

              <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
                  <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    Workshop Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                        Workshop Fee ($)
                      </label>
                      <div className="flex gap-4">
                        <Input
                          type="number"
                          value={settings.fee}
                          onChange={(e: any) =>
                            setSettings({
                              ...settings,
                              fee: parseInt(e.target.value),
                            })
                          }
                          className="h-14 rounded-2xl border-slate-200 font-bold text-lg focus:ring-emerald-500/20"
                        />
                        <Button
                          onClick={() =>
                            updateSetting("workshop_fee", settings.fee)
                          }
                          disabled={updating}
                          className="h-14 px-8 rounded-2xl bg-primary text-white font-black uppercase tracking-widest italic shadow-lg shadow-primary/20"
                        >
                          {updating ? "..." : "Save"}
                        </Button>
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase ml-1">
                        This price will be updated across the landing page form.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-500">
                  <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6 flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                        <Users className="h-5 w-5" />
                      </div>
                      Expert Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6 flex-1">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                          Full Name
                        </label>
                        <Input
                          placeholder="e.g. Sarah Chen"
                          value={newExpert.name}
                          onChange={(e: any) =>
                            setNewExpert({ ...newExpert, name: e.target.value })
                          }
                          className="h-12 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                          Role/Company
                        </label>
                        <Input
                          placeholder="e.g. Sr. Engineer @ Google"
                          value={newExpert.role}
                          onChange={(e: any) =>
                            setNewExpert({ ...newExpert, role: e.target.value })
                          }
                          className="h-12 rounded-xl"
                        />
                      </div>
                      <Button
                        onClick={handleAddExpert}
                        disabled={updating}
                        className="w-full h-12 rounded-xl bg-slate-900 text-white font-black uppercase text-xs tracking-widest"
                      >
                        Add Expert
                      </Button>
                    </div>

                    <div className="pt-6 border-t border-slate-100 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      <div className="space-y-3">
                        {settings.experts.map((expert) => (
                          <div
                            key={expert.id}
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all"
                          >
                            <div>
                              <p className="font-bold text-slate-900">
                                {expert.name}
                              </p>
                              <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">
                                {expert.role}
                              </p>
                            </div>
                            <Button
                              onClick={() => handleRemoveExpert(expert.id)}
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-500">
                  <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6 flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                        <Clock className="h-5 w-5" />
                      </div>
                      Timing Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6 flex-1">
                    <div className="space-y-4">
                      <div className="space-y-4 bg-slate-50/50 p-6 rounded-[2.5rem] border border-slate-100 shadow-inner">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">
                            Set Session Date
                          </label>
                          <IPhoneDateTimePicker
                            type="date"
                            value={newSlot.date}
                            onChange={(val) => setNewSlot({ ...newSlot, date: val })}
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">
                            Set Session Time
                          </label>
                          <IPhoneDateTimePicker
                            type="time"
                            value={newSlot.time}
                            onChange={(val) => setNewSlot({ ...newSlot, time: val })}
                          />
                        </div>
                        <Button
                          onClick={handleAddSlot}
                          disabled={updating}
                          className="w-full h-14 rounded-3xl bg-slate-900 text-white font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:shadow-2xl hover:bg-black transition-all"
                        >
                          Add Session
                        </Button>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      <div className="space-y-6">
                        {Object.entries(
                          (settings.slots || []).reduce(
                            (acc: any, slot: any) => {
                              if (!acc[slot.date]) acc[slot.date] = [];
                              acc[slot.date].push(slot);
                              return acc;
                            },
                            {},
                          ),
                        ).map(([date, dateSlots]: [string, any]) => (
                          <div key={date} className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="h-px flex-1 bg-slate-100" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">
                                {date}
                              </span>
                              <div className="h-px flex-1 bg-slate-100" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {dateSlots.map((slot: any) => (
                                <div
                                  key={slot.id}
                                  className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 group hover:border-amber-200 hover:shadow-sm transition-all"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                                      <Clock className="h-4 w-4" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-700">
                                      {slot.time}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => handleRemoveSlot(slot.id)}
                                    className="h-8 w-8 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        {(!settings.slots || settings.slots.length === 0) && (
                          <div className="py-8 text-center text-slate-400">
                            <p className="text-xs font-bold uppercase tracking-widest italic opacity-50">
                              No workshop slots configured
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md rounded-[2rem] border-slate-100 shadow-2xl p-0 overflow-hidden">
          <DialogHeader className="bg-slate-950 text-white p-8">
            <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">
              Send Confirmation
            </DialogTitle>
            <DialogDescription className="text-slate-400 font-medium">
              Confirm registration for {selectedUser?.name}{" "}
              {selectedUser?.surname}
            </DialogDescription>
          </DialogHeader>
          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="zoom"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                >
                  Zoom Meeting Link
                </Label>
                <Input
                  id="zoom"
                  placeholder="https://zoom.us/j/..."
                  value={zoomLink}
                  onChange={(e) => setZoomLink(e.target.value)}
                  className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all text-sm font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                >
                  Custom Message (Optional)
                </Label>
                <textarea
                  id="message"
                  placeholder="Add a personalized note..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full min-h-[120px] rounded-2xl bg-slate-50 border-slate-100 p-4 focus:bg-white focus:outline-none focus:ring-0 border-2 transition-all text-sm font-bold resize-none"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="p-8 bg-slate-50 border-t border-slate-100 flex flex-row gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowConfirmDialog(false)}
              className="flex-1 h-14 rounded-2xl font-bold text-slate-500 hover:bg-slate-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendConfirmation}
              disabled={!zoomLink || sendingEmail}
              className={cn(
                "flex-[2] h-14 rounded-2xl font-black uppercase italic tracking-widest text-xs transition-all",
                sendingEmail ? "bg-slate-400" : "bg-emerald-500 hover:bg-emerald-600",
              )}
            >
              {sendingEmail ? (
                <div className="flex items-center gap-2">
                   <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.div>
                  Sending...
                </div>
              ) : (
                "Send Email Now"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SidebarLink({ active, onClick, icon: Icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all",
        active
          ? "bg-primary text-white shadow-lg shadow-primary/20"
          : "text-slate-400 hover:text-white hover:bg-white/5",
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {label}
    </button>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <Card className="rounded-3xl border-slate-100 shadow-lg p-6 flex items-center gap-6 overflow-hidden relative">
      <div className={cn("p-4 rounded-2xl text-white", color)}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {label}
        </p>
        <p className="text-2xl font-black text-slate-950 tracking-tighter">
          {value}
        </p>
      </div>
      <div
        className={cn(
          "absolute -bottom-4 -right-4 w-20 h-20 opacity-10 rounded-full",
          color,
        )}
      />
    </Card>
  );
}
