"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Calendar, Building2, MapPin, Settings } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface ProfileData {
  displayName: string;
  email: string;
  organization: string;
  location: string;
  memberSince: string;
}

const defaultProfile: ProfileData = {
  displayName: "Alex Chen",
  email: "alex@example.com",
  organization: "Acme Inc",
  location: "San Francisco, CA",
  memberSince: "January 2024",
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("appSettings");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.profile) {
            setProfile((prev) => ({
              ...prev,
              displayName: parsed.profile.displayName || prev.displayName,
              email: parsed.profile.email || prev.email,
            }));
          }
          if (parsed.workspace) {
            setProfile((prev) => ({
              ...prev,
              organization: parsed.workspace.name || prev.organization,
            }));
          }
        } catch (e) {
          console.error("Failed to load profile:", e);
        }
      }
    }
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1">
          <Breadcrumbs />
          <h1 className="mt-2 text-xl sm:text-2xl font-semibold text-white">Profile</h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            View and manage your profile information
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/settings?tab=profile")}
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700/60 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 transition-colors"
        >
          <Settings className="h-4 w-4" />
          Edit in Settings
        </button>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="glass-card transition-fade-in p-4 sm:p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="h-24 w-24 rounded-full bg-indigo-500/30 flex items-center justify-center ring-4 ring-indigo-500/20">
                <User className="h-12 w-12 text-indigo-300" />
              </div>
              <Badge variant="success" className="absolute bottom-0 right-0">
                Active
              </Badge>
            </div>
            <h2 className="text-xl font-semibold text-white">{profile.displayName}</h2>
            <p className="mt-1 text-sm text-zinc-400">{profile.email}</p>
            <Badge variant="info" className="mt-3">
              Administrator
            </Badge>
          </div>
        </div>

        {/* Details Card */}
        <div className="lg:col-span-2 glass-card transition-fade-in p-4 sm:p-6">
          <h3 className="text-lg font-medium text-white mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-white/5 p-2 mt-0.5">
                <User className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-zinc-500">Full Name</p>
                <p className="text-sm text-zinc-200 mt-0.5">{profile.displayName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-white/5 p-2 mt-0.5">
                <Mail className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-zinc-500">Email Address</p>
                <p className="text-sm text-zinc-200 mt-0.5">{profile.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-white/5 p-2 mt-0.5">
                <Building2 className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-zinc-500">Organization</p>
                <p className="text-sm text-zinc-200 mt-0.5">{profile.organization}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-white/5 p-2 mt-0.5">
                <MapPin className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-zinc-500">Location</p>
                <p className="text-sm text-zinc-200 mt-0.5">{profile.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-white/5 p-2 mt-0.5">
                <Calendar className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-zinc-500">Member Since</p>
                <p className="text-sm text-zinc-200 mt-0.5">{profile.memberSince}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-zinc-800/60">
            <button
              type="button"
              onClick={() => router.push("/settings?tab=profile")}
              className="w-full sm:w-auto rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="glass-card transition-fade-in p-4 sm:p-6">
        <h3 className="text-lg font-medium text-white mb-4">Activity Summary</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-zinc-500">Total Logins</p>
            <p className="text-2xl font-semibold text-white mt-1">1,247</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Last Active</p>
            <p className="text-2xl font-semibold text-white mt-1">2m ago</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Sessions This Month</p>
            <p className="text-2xl font-semibold text-white mt-1">89</p>
          </div>
        </div>
      </div>
    </div>
  );
}
