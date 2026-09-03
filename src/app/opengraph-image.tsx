import { ImageResponse } from "next/og";

import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export const alt = `${SITE_NAME} — hiring pipeline board`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STAGES = [
  { label: "Applied", color: "#64748b" },
  { label: "Interview", color: "#3b82f6" },
  { label: "Test", color: "#8b5cf6" },
  { label: "Offer", color: "#f59e0b" },
  { label: "Accepted", color: "#10b981" },
];

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b1120",
        color: "#f8fafc",
        padding: 72,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2 }}>
          {SITE_NAME}
        </div>
        <div style={{ fontSize: 30, color: "#94a3b8", maxWidth: 900 }}>
          {SITE_DESCRIPTION}
        </div>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        {STAGES.map((stage) => (
          <div
            key={stage.label}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              flex: 1,
              padding: 20,
              borderRadius: 16,
              background: "#131c31",
              borderTop: `4px solid ${stage.color}`,
            }}
          >
            <div style={{ fontSize: 22, color: "#cbd5e1" }}>{stage.label}</div>
            <div
              style={{ height: 10, borderRadius: 6, background: "#1e293b" }}
            />
            <div
              style={{
                height: 10,
                borderRadius: 6,
                background: "#1e293b",
                width: "70%",
              }}
            />
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
