interface CSVRow {
  [key: string]: string | number | boolean | null | undefined;
}

const exportToCSV = (data: CSVRow[], filename: string): void => {
  if (!data || data.length === 0 || typeof document === "undefined") return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          return typeof value === "string" && value.includes(",")
            ? `"${value}"`
            : value;
        })
        .join(","),
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const exportChartAsPNG = (chartId: string, filename: string): void => {
  if (typeof document === "undefined") return;
  const chartElement = document.getElementById(chartId);
  if (!chartElement) return;

  // Use html2canvas if available, otherwise fallback to SVG
  import("html2canvas")
    .then((html2canvas) => {
      html2canvas.default(chartElement).then((canvas) => {
        canvas.toBlob((blob) => {
          if (!blob || typeof document === "undefined") return;
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.setAttribute("href", url);
          link.setAttribute("download", `${filename}.png`);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        });
      });
    })
    .catch(() => {
      // Fallback: try to export SVG if available
      if (typeof document === "undefined") return;
      const svg = chartElement.querySelector("svg");
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(svgBlob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `${filename}.svg`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    });
};

const exportTableToCSV = <T extends Record<string, unknown>>(
  data: T[],
  columns: Array<{ key: string; label: string }>,
  filename: string,
): void => {
  if (typeof document === "undefined") return;

  const headers = columns.map((col) => col.label);
  const rows = data.map((row) =>
    columns.map((col) => {
      const value = row[col.key];
      return value !== null && value !== undefined ? String(value) : "";
    }),
  );

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export { exportToCSV, exportChartAsPNG, exportTableToCSV };
