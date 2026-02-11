"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Bell, X, CheckCircle2, AlertCircle, Info, CreditCard, Users, FileText, TrendingUp } from "lucide-react";
import type { Notification } from "@/data/dashboard";

const notificationIcons = {
  success: CheckCircle2,
  warning: AlertCircle,
  info: Info,
  payment: CreditCard,
  user: Users,
  report: FileText,
  growth: TrendingUp,
};

const notificationColors = {
  success: "text-emerald-400 bg-emerald-500/20",
  warning: "text-amber-400 bg-amber-500/20",
  info: "text-blue-400 bg-blue-500/20",
  payment: "text-indigo-400 bg-indigo-500/20",
  user: "text-purple-400 bg-purple-500/20",
  report: "text-cyan-400 bg-cyan-500/20",
  growth: "text-green-400 bg-green-500/20",
};

interface NotificationsDropdownProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onMarkAllRead?: () => void;
  align?: "left" | "right";
}

export function NotificationsDropdown({
  notifications,
  onDismiss,
  onMarkAllRead,
  align = "right",
}: NotificationsDropdownProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      // Calculate position
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY + 8,
          right: window.innerWidth - rect.right,
        });
      }
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const dropdownContent = open ? (
    <div
      ref={dropdownRef}
      className="fixed w-80 max-w-[calc(100vw-2rem)] rounded-lg border border-zinc-700/60 bg-zinc-900/95 shadow-xl backdrop-blur transition-opacity"
      role="menu"
      style={{
        top: `${position.top}px`,
        right: align === "right" ? `${position.right}px` : "auto",
        left: align === "left" ? `${position.right}px` : "auto",
        zIndex: 9999,
      }}
    >
      <div className="flex items-center justify-between border-b border-zinc-800/60 px-4 py-3">
        <h3 className="text-sm font-semibold text-white">Notifications</h3>
        {notifications.length > 0 && onMarkAllRead && (
          <button
            type="button"
            onClick={() => {
              onMarkAllRead();
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300"
          >
            Mark all read
          </button>
        )}
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <Bell className="mx-auto h-8 w-8 text-zinc-600 mb-2" />
            <p className="text-sm text-zinc-400">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/60">
            {notifications.map((notification) => {
              const Icon = notificationIcons[notification.type];
              const colorClass = notificationColors[notification.type];
              return (
                <div
                  key={notification.id}
                  className={`relative px-4 py-3 transition-colors hover:bg-white/5 ${
                    !notification.read ? "bg-indigo-500/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`rounded-lg p-1.5 shrink-0 ${colorClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-200">
                        {notification.title}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-400 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">{notification.time}</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDismiss(notification.id);
                      }}
                      className="shrink-0 rounded p-1 text-zinc-500 hover:bg-white/5 hover:text-zinc-300 transition-colors"
                      aria-label="Dismiss notification"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {!notification.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-500" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="relative inline-block">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="relative rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200"
          aria-label="Notifications"
          aria-expanded={open}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </div>
      {typeof window !== "undefined" && createPortal(dropdownContent, document.body)}
    </>
  );
}
