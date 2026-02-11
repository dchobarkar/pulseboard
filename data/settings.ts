/**
 * Settings-related constants and default data
 */

export interface SettingsData {
  profile: {
    displayName: string;
    email: string;
  };
  workspace: {
    name: string;
  };
  preferences: {
    language: string;
    timezone: string;
    dateFormat: string;
    theme: "dark" | "light";
  };
  notifications: {
    email: boolean;
    push: boolean;
    weekly: boolean;
  };
  security: {
    currentPassword: string;
    newPassword: string;
  };
}

export const DEFAULT_SETTINGS: SettingsData = {
  profile: {
    displayName: "Alex Chen",
    email: "alex@example.com",
  },
  workspace: {
    name: "Acme Inc",
  },
  preferences: {
    language: "English",
    timezone: "Pacific Time (PT)",
    dateFormat: "MM/DD/YYYY",
    theme: "dark",
  },
  notifications: {
    email: true,
    push: true,
    weekly: true,
  },
  security: {
    currentPassword: "",
    newPassword: "",
  },
};

export const SETTINGS_TABS = [
  { id: "profile", label: "Profile" },
  { id: "workspace", label: "Workspace" },
  { id: "preferences", label: "Preferences" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
] as const;

export interface ProfileData {
  displayName: string;
  email: string;
  organization: string;
  location: string;
  memberSince: string;
}

export const DEFAULT_PROFILE: ProfileData = {
  displayName: "Alex Chen",
  email: "alex@example.com",
  organization: "Acme Inc",
  location: "San Francisco, CA",
  memberSince: "January 2024",
};
