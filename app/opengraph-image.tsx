import { ImageResponse } from "next/og";

import { site, siteCity } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card is part of the world, so it is printed on the same stock as
 * the page: paper, hairlines, square corners, and semantic ink only. The one
 * accent is the `+` added-mark — the same gesture the homepage headline uses.
 */
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
          background: "#f4f4f1",
          color: "#1a1c20",
          fontFamily: "sans-serif",
        }}
      >
        {/* Status line: CHANGELOG.md · rev · location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#565b63",
            borderBottom: "1px solid rgba(26,28,32,0.16)",
            paddingBottom: 20,
          }}
        >
          <span>CHANGELOG.md</span>
          <span>rev {site.rev} · {siteCity}</span>
        </div>

        {/* The name as the first added line. */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
              marginTop: 22,
              fontSize: 30,
              color: "#1a1c20",
            }}
          >
            <span style={{ color: "#1b6e36", fontFamily: "monospace" }}>+</span>
            <span>{site.headline}</span>
          </div>
        </div>

        {/* Footer: square hairline initials tile + location. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(26,28,32,0.16)",
            paddingTop: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              border: "1px solid rgba(26,28,32,0.16)",
              background: "#ffffff",
              fontFamily: "monospace",
              fontSize: 24,
              letterSpacing: 1,
            }}
          >
            {site.initials}
          </div>
          <span
            style={{
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#565b63",
            }}
          >
            {site.name}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
