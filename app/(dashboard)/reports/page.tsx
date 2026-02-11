"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Download,
  FileText,
  Loader2,
  AlertCircle,
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  RefreshCw,
  X,
  Mail,
  Calendar,
  Clock,
  FileDown,
  FileJson,
} from "lucide-react";
import {
  reportsData,
  reportTemplates,
  reportCategories,
  type Report,
} from "@/data/dashboard";
import { Modal } from "@/components/ui/Modal";
import { Dropdown } from "@/components/ui/Dropdown";
import { Badge } from "@/components/ui/Badge";

const statusConfig: Record<
  Report["status"],
  {
    icon: typeof FileText;
    label: string;
    color: string;
    badgeVariant: "success" | "warning" | "error";
  }
> = {
  ready: {
    icon: Download,
    label: "Download",
    color: "text-emerald-400",
    badgeVariant: "success",
  },
  generating: {
    icon: Loader2,
    label: "Generating...",
    color: "text-amber-400",
    badgeVariant: "warning",
  },
  failed: {
    icon: AlertCircle,
    label: "Failed",
    color: "text-rose-400",
    badgeVariant: "error",
  },
};

const reportTypes = ["CSV", "PDF", "Excel", "JSON", "PNG"];
const scheduleFrequencies = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const datePresets = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
  { label: "This month", days: null, preset: "thisMonth" },
  { label: "Last month", days: null, preset: "lastMonth" },
];

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(reportsData);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Report["status"] | "">("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [generatingReports, setGeneratingReports] = useState<Set<string>>(
    new Set()
  );
  const [useTemplate, setUseTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    type: "CSV",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    scheduled: false,
    scheduleFrequency: "weekly" as "daily" | "weekly" | "monthly",
    emailRecipients: [] as string[],
    emailInput: "",
  });

  const filtered = useMemo(() => {
    return reports.filter((report) => {
      const matchSearch =
        !search ||
        report.name.toLowerCase().includes(search.toLowerCase()) ||
        report.type.toLowerCase().includes(search.toLowerCase()) ||
        report.category?.toLowerCase().includes(search.toLowerCase()) ||
        report.description?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || report.status === statusFilter;
      const matchType = !typeFilter || report.type === typeFilter;
      const matchCategory =
        !categoryFilter || report.category === categoryFilter;
      
      // Date range filtering: check if report date range overlaps with selected date range
      let matchDateRange = true;
      if (dateFrom && dateTo) {
        // Only filter if both dates are selected
        const reportFrom = report.dateFrom || report.date;
        const reportTo = report.dateTo || report.date;
        
        // Check if report date range overlaps with selected date range
        // Overlap occurs if: reportFrom <= dateTo && reportTo >= dateFrom
        matchDateRange = reportFrom <= dateTo && reportTo >= dateFrom;
      } else if (dateFrom) {
        // If only from date is selected, show reports that end on or after from date
        const reportTo = report.dateTo || report.date;
        matchDateRange = reportTo >= dateFrom;
      }
      
      return matchSearch && matchStatus && matchType && matchCategory && matchDateRange;
    });
  }, [reports, search, statusFilter, typeFilter, categoryFilter, dateFrom, dateTo]);

  // Simulate report generation
  useEffect(() => {
    generatingReports.forEach((reportId) => {
      const timer = setTimeout(() => {
        setReports((prev) =>
          prev.map((r) =>
            r.id === reportId ? { ...r, status: "ready" as const } : r
          )
        );
        setGeneratingReports((prev) => {
          const next = new Set(prev);
          next.delete(reportId);
          return next;
        });
      }, 3000);

      return () => clearTimeout(timer);
    });
  }, [generatingReports]);

  const handleDateFromChange = (value: string) => {
    setDateFrom(value);
    // If to date is before the new from date, reset to date
    if (dateTo && value && dateTo < value) {
      setDateTo("");
    }
  };

  const handleDateToChange = (value: string) => {
    // Don't allow setting to date if from date is empty
    if (!dateFrom) {
      return;
    }
    // Only allow setting to date if value is not before from date
    if (value && value >= dateFrom) {
      setDateTo(value);
    }
  };

  const applyDatePreset = (preset: typeof datePresets[0]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    if (preset.preset === "thisMonth") {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      setDateFrom(firstDay.toISOString().split("T")[0]);
      setDateTo(today.toISOString().split("T")[0]);
    } else if (preset.preset === "lastMonth") {
      const firstDayLastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      );
      const lastDayLastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      );
      setDateFrom(firstDayLastMonth.toISOString().split("T")[0]);
      setDateTo(lastDayLastMonth.toISOString().split("T")[0]);
    } else if (preset.days) {
      // For "Last N days", we want to include today, so we go back (days - 1) days
      const fromDate = new Date(today);
      fromDate.setDate(fromDate.getDate() - (preset.days - 1));
      setDateFrom(fromDate.toISOString().split("T")[0]);
      setDateTo(today.toISOString().split("T")[0]);
    }
  };

  const handleAddReport = () => {
    setFormData({
      name: "",
      type: "CSV",
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      scheduled: false,
      scheduleFrequency: "weekly",
      emailRecipients: [],
      emailInput: "",
    });
    setUseTemplate(false);
    setSelectedTemplate("");
    setIsAddModalOpen(true);
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = reportTemplates.find((t) => t.id === templateId);
    if (template) {
      setFormData({
        ...formData,
        name: template.name,
        category: template.category,
        description: template.description,
      });
      setSelectedTemplate(templateId);
    }
  };

  const handleAddEmail = () => {
    if (
      formData.emailInput &&
      !formData.emailRecipients.includes(formData.emailInput)
    ) {
      setFormData({
        ...formData,
        emailRecipients: [...formData.emailRecipients, formData.emailInput],
        emailInput: "",
      });
    }
  };

  const handleRemoveEmail = (email: string) => {
    setFormData({
      ...formData,
      emailRecipients: formData.emailRecipients.filter((e) => e !== email),
    });
  };

  const handleEditReport = (report: Report) => {
    setSelectedReport(report);
    setFormData({
      name: report.name,
      type: report.type,
      category: report.category || "",
      date: report.date,
      description: report.description || "",
      scheduled: report.scheduled || false,
      scheduleFrequency: report.scheduleFrequency || "weekly",
      emailRecipients: report.emailRecipients || [],
      emailInput: "",
    });
    setIsEditModalOpen(true);
  };

  const handleScheduleReport = (report: Report) => {
    setSelectedReport(report);
    setFormData({
      name: report.name,
      type: report.type,
      category: report.category || "",
      date: report.date,
      description: report.description || "",
      scheduled: report.scheduled || false,
      scheduleFrequency: report.scheduleFrequency || "weekly",
      emailRecipients: report.emailRecipients || [],
      emailInput: "",
    });
    setIsScheduleModalOpen(true);
  };

  const handleDeleteReport = (report: Report) => {
    setSelectedReport(report);
    setIsDeleteModalOpen(true);
  };

  const handleGenerateReport = (report: Report) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === report.id ? { ...r, status: "generating" as const } : r
      )
    );
    setGeneratingReports((prev) => new Set(prev).add(report.id));
  };

  const handleRetryReport = (report: Report) => {
    handleGenerateReport(report);
  };

  const handleSaveReport = () => {
    if (!formData.name) return;

    if (isAddModalOpen) {
      const newReport: Report = {
        id: String(reports.length + 1),
        name: formData.name,
        type: formData.type,
        category: formData.category || undefined,
        date: formData.date,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
        status: "generating",
        description: formData.description || undefined,
        scheduled: formData.scheduled,
        scheduleFrequency: formData.scheduled
          ? formData.scheduleFrequency
          : undefined,
        emailRecipients:
          formData.scheduled && formData.emailRecipients.length > 0
            ? formData.emailRecipients
            : undefined,
      };
      setReports([newReport, ...reports]);
      setGeneratingReports((prev) => new Set(prev).add(newReport.id));
      setIsAddModalOpen(false);
    } else if (isEditModalOpen && selectedReport) {
      setReports(
        reports.map((r) =>
          r.id === selectedReport.id
            ? {
                ...r,
                name: formData.name,
                type: formData.type,
                category: formData.category || undefined,
                date: formData.date,
                dateFrom: dateFrom || undefined,
                dateTo: dateTo || undefined,
                description: formData.description || undefined,
                scheduled: formData.scheduled,
                scheduleFrequency: formData.scheduled
                  ? formData.scheduleFrequency
                  : undefined,
                emailRecipients:
                  formData.scheduled && formData.emailRecipients.length > 0
                    ? formData.emailRecipients
                    : undefined,
              }
            : r
        )
      );
      setIsEditModalOpen(false);
      setSelectedReport(null);
    } else if (isScheduleModalOpen && selectedReport) {
      setReports(
        reports.map((r) =>
          r.id === selectedReport.id
            ? {
                ...r,
                scheduled: formData.scheduled,
                scheduleFrequency: formData.scheduled
                  ? formData.scheduleFrequency
                  : undefined,
                emailRecipients:
                  formData.scheduled && formData.emailRecipients.length > 0
                    ? formData.emailRecipients
                    : undefined,
              }
            : r
        )
      );
      setIsScheduleModalOpen(false);
      setSelectedReport(null);
    }
    setFormData({
      name: "",
      type: "CSV",
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      scheduled: false,
      scheduleFrequency: "weekly",
      emailRecipients: [],
      emailInput: "",
    });
  };

  const handleConfirmDelete = () => {
    if (selectedReport) {
      setReports(reports.filter((r) => r.id !== selectedReport.id));
      setIsDeleteModalOpen(false);
      setSelectedReport(null);
    }
  };

  const handleDownload = (report: Report) => {
    // Simulate download
    console.log(`Downloading ${report.name}...`);
    // In a real app, this would trigger an actual download
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-white">
            Reports
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Generate, schedule, and export operational reports
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddReport}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Generate Report
        </button>
      </div>

      {/* Date Range with Presets */}
      <div className="glass-card p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-zinc-400" />
            <span className="text-sm font-medium text-zinc-300">
              Date Range
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="date-from" className="text-sm text-zinc-400">
                From
              </label>
              <input
                id="date-from"
                type="date"
                value={dateFrom}
                onChange={(e) => handleDateFromChange(e.target.value)}
                max={dateTo || undefined}
                className="rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="date-to" className="text-sm text-zinc-400">
                To
              </label>
              <input
                id="date-to"
                type="date"
                value={dateTo}
                onChange={(e) => handleDateToChange(e.target.value)}
                disabled={!dateFrom}
                min={dateFrom || undefined}
                className="rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {datePresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyDatePreset(preset)}
                  className="rounded-lg border border-zinc-700/60 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/5 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:flex-initial sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 py-2 pl-9 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter((e.target.value || "") as Report["status"] | "")
          }
          className="rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
        >
          <option value="">All statuses</option>
          <option value="ready">Ready</option>
          <option value="generating">Generating</option>
          <option value="failed">Failed</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
        >
          <option value="">All types</option>
          {reportTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
        >
          <option value="">All categories</option>
          {reportCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Reports List */}
      <div className="glass-card transition-fade-in divide-y divide-zinc-800/60">
        {filtered.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-zinc-600 mb-3" />
            <p className="text-sm text-zinc-400">No reports found</p>
          </div>
        ) : (
          filtered.map((report) => {
            const config = statusConfig[report.status];
            const Icon = config.icon;
            return (
              <div
                key={report.id}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="rounded-lg bg-white/5 p-2 shrink-0">
                    <FileText className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-medium text-zinc-200 truncate">
                        {report.name}
                      </p>
                      <Badge variant={config.badgeVariant} className="text-xs">
                        {report.status}
                      </Badge>
                      {report.category && (
                        <Badge variant="default" className="text-xs">
                          {report.category}
                        </Badge>
                      )}
                      {report.scheduled && (
                        <Badge variant="default" className="text-xs">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {report.scheduleFrequency}
                        </Badge>
                      )}
                    </div>
                    {report.description && (
                      <p className="text-xs text-zinc-500 mb-1">
                        {report.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 flex-wrap text-xs text-zinc-500">
                      <span>{report.type}</span>
                      <span>·</span>
                      <span>{report.date}</span>
                      {report.dateFrom && report.dateTo && (
                        <>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {report.dateFrom === report.dateTo
                              ? report.dateFrom
                              : `${report.dateFrom} to ${report.dateTo}`}
                          </span>
                        </>
                      )}
                      {report.emailRecipients &&
                        report.emailRecipients.length > 0 && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {report.emailRecipients.length} recipient
                              {report.emailRecipients.length > 1 ? "s" : ""}
                            </span>
                          </>
                        )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {report.status === "ready" && (
                    <button
                      type="button"
                      onClick={() => handleDownload(report)}
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-700/60 px-4 py-2 text-sm text-emerald-400 hover:bg-white/5 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  )}
                  {report.status === "generating" && (
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-700/60 px-4 py-2 text-sm text-amber-400 cursor-not-allowed opacity-50"
                    >
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </button>
                  )}
                  {report.status === "failed" && (
                    <button
                      type="button"
                      onClick={() => handleRetryReport(report)}
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-700/60 px-4 py-2 text-sm text-rose-400 hover:bg-white/5 transition-colors"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Retry
                    </button>
                  )}
                  <Dropdown
                    trigger={
                      <button
                        type="button"
                        className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-colors"
                        aria-label="Report actions"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    }
                    items={[
                      {
                        label: "Edit",
                        onClick: () => handleEditReport(report),
                      },
                      {
                        label: report.scheduled
                          ? "Edit Schedule"
                          : "Schedule Report",
                        onClick: () => handleScheduleReport(report),
                      },
                      ...(report.status === "failed"
                        ? [
                            {
                              label: "Retry Generation",
                              onClick: () => handleRetryReport(report),
                            },
                          ]
                        : []),
                      {
                        label: "Delete",
                        onClick: () => handleDeleteReport(report),
                      },
                    ]}
                    align="right"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add/Generate Report Modal */}
      <Modal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Generate New Report"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <button
              type="button"
              onClick={() => setUseTemplate(false)}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                !useTemplate
                  ? "bg-indigo-600 text-white"
                  : "border border-zinc-700/60 text-zinc-300 hover:bg-white/5"
              }`}
            >
              Custom Report
            </button>
            <button
              type="button"
              onClick={() => setUseTemplate(true)}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                useTemplate
                  ? "bg-indigo-600 text-white"
                  : "border border-zinc-700/60 text-zinc-300 hover:bg-white/5"
              }`}
            >
              <FileJson className="h-4 w-4 inline mr-1" />
              Use Template
            </button>
          </div>

          {useTemplate && (
            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Select Template
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {reportTemplates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`w-full text-left rounded-lg border p-3 transition-colors ${
                      selectedTemplate === template.id
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-zinc-700/60 hover:bg-white/5"
                    }`}
                  >
                    <div className="font-medium text-zinc-200">
                      {template.name}
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      {template.description}
                    </div>
                    <Badge variant="default" className="mt-2 text-xs">
                      {template.category}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm text-zinc-400">
              Report Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Monthly Revenue Summary"
              className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-zinc-400">
                Export Format *
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
              >
                {reportTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-400">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
              >
                <option value="">Select category</option>
                {reportCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-400">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Optional description for this report"
              rows={2}
              className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Report Date Range
            </label>
            <p className="mb-3 text-xs text-zinc-500">
              Select the date range for the data included in this report
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="modal-date-from" className="mb-1 block text-xs text-zinc-400">
                  From Date *
                </label>
                <input
                  id="modal-date-from"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => handleDateFromChange(e.target.value)}
                  max={dateTo || undefined}
                  className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="modal-date-to" className="mb-1 block text-xs text-zinc-400">
                  To Date {dateFrom ? "" : "(select From Date first)"}
                </label>
                <input
                  id="modal-date-to"
                  type="date"
                  value={dateTo}
                  onChange={(e) => handleDateToChange(e.target.value)}
                  disabled={!dateFrom}
                  min={dateFrom || undefined}
                  className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {datePresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyDatePreset(preset)}
                  className="rounded-lg border border-zinc-700/60 bg-zinc-900/50 px-2.5 py-1 text-xs text-zinc-300 hover:bg-white/5 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-400">
              Report Date
            </label>
            <p className="mb-2 text-xs text-zinc-500">
              The date this report will be associated with (for organization purposes)
            </p>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
            />
          </div>

          <div className="border-t border-zinc-800/60 pt-4">
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={formData.scheduled}
                onChange={(e) =>
                  setFormData({ ...formData, scheduled: e.target.checked })
                }
                className="rounded border-zinc-700/60 bg-zinc-900/80 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-zinc-300">
                Schedule this report
              </span>
            </label>

            {formData.scheduled && (
              <div className="space-y-3 pl-6">
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">
                    Frequency
                  </label>
                  <select
                    value={formData.scheduleFrequency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scheduleFrequency: e.target.value as
                          | "daily"
                          | "weekly"
                          | "monthly",
                      })
                    }
                    className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
                  >
                    {scheduleFrequencies.map((freq) => (
                      <option key={freq.value} value={freq.value}>
                        {freq.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">
                    Email Recipients
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={formData.emailInput}
                      onChange={(e) =>
                        setFormData({ ...formData, emailInput: e.target.value })
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddEmail();
                        }
                      }}
                      placeholder="email@example.com"
                      className="flex-1 rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddEmail}
                      className="rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {formData.emailRecipients.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.emailRecipients.map((email) => (
                        <span
                          key={email}
                          className="inline-flex items-center gap-1 rounded-lg bg-indigo-500/20 px-2 py-1 text-xs text-indigo-300"
                        >
                          {email}
                          <button
                            type="button"
                            onClick={() => handleRemoveEmail(email)}
                            className="hover:text-indigo-200"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveReport}
              disabled={!formData.name}
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Generate Report
            </button>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="rounded-lg border border-zinc-700/60 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Report Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedReport(null);
        }}
        title="Edit Report"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-400">
              Report Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-zinc-400">
                Export Format *
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
              >
                {reportTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-400">Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
              >
                <option value="">Select category</option>
                {reportCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={2}
              className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none resize-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveReport}
              disabled={!formData.name}
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedReport(null);
              }}
              className="rounded-lg border border-zinc-700/60 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Schedule Report Modal */}
      <Modal
        open={isScheduleModalOpen}
        onClose={() => {
          setIsScheduleModalOpen(false);
          setSelectedReport(null);
        }}
        title="Schedule Report"
      >
        <div className="space-y-4">
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/50 p-3">
            <p className="text-sm font-medium text-zinc-200 mb-1">
              {selectedReport?.name}
            </p>
            <p className="text-xs text-zinc-400">
              {selectedReport?.type} · {selectedReport?.category || "Uncategorized"}
            </p>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.scheduled}
              onChange={(e) =>
                setFormData({ ...formData, scheduled: e.target.checked })
              }
              className="rounded border-zinc-700/60 bg-zinc-900/80 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-zinc-300">Enable scheduling</span>
          </label>

          {formData.scheduled && (
            <div className="space-y-3 pl-6">
              <div>
                <label className="mb-1 block text-sm text-zinc-400">
                  Frequency
                </label>
                <select
                  value={formData.scheduleFrequency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      scheduleFrequency: e.target.value as
                        | "daily"
                        | "weekly"
                        | "monthly",
                    })
                  }
                  className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
                >
                  {scheduleFrequencies.map((freq) => (
                    <option key={freq.value} value={freq.value}>
                      {freq.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">
                  Email Recipients
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={formData.emailInput}
                    onChange={(e) =>
                      setFormData({ ...formData, emailInput: e.target.value })
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddEmail();
                      }
                    }}
                    placeholder="email@example.com"
                    className="flex-1 rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddEmail}
                    className="rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {formData.emailRecipients.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.emailRecipients.map((email) => (
                      <span
                        key={email}
                        className="inline-flex items-center gap-1 rounded-lg bg-indigo-500/20 px-2 py-1 text-xs text-indigo-300"
                      >
                        {email}
                        <button
                          type="button"
                          onClick={() => handleRemoveEmail(email)}
                          className="hover:text-indigo-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveReport}
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
            >
              Save Schedule
            </button>
            <button
              type="button"
              onClick={() => {
                setIsScheduleModalOpen(false);
                setSelectedReport(null);
              }}
              className="rounded-lg border border-zinc-700/60 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedReport(null);
        }}
        title="Delete Report"
      >
        <div className="space-y-4">
          <p className="text-sm text-zinc-300">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-white">
              {selectedReport?.name}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="flex-1 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500 transition-colors"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedReport(null);
              }}
              className="rounded-lg border border-zinc-700/60 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
