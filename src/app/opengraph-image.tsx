import { ImageResponse } from "next/og";
import { promises as fs } from "fs";
import path from "path";

// Image metadata
export const alt = "Mohammad Irfan — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Load the existing avatar (icon.png in the app dir) and embed as base64
async function loadAvatarBase64(): Promise<string> {
  const avatarPath = path.join(process.cwd(), "src/app/icon.png");
  const buffer = await fs.readFile(avatarPath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

export default async function Image() {
  const avatarDataUrl = await loadAvatarBase64();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(163, 230, 53, 0.12), transparent 50%), radial-gradient(circle at 10% 90%, rgba(37, 99, 235, 0.10), transparent 50%)",
          padding: "72px",
          fontFamily: "monospace",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* Left side — avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "486px",
            height: "486px",
            borderRadius: "32px",
            backgroundColor: "#171717",
            border: "2px solid #262626",
            marginRight: "60px",
            position: "relative",
          }}
        >
          {/* Lime accent ring on the avatar card */}
          <div
            style={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "36px",
              backgroundImage:
                "linear-gradient(135deg, rgba(163, 230, 53, 0.6), transparent 60%)",
              display: "flex",
            }}
          />
          <img
            src={avatarDataUrl}
            width={360}
            height={360}
            style={{
              borderRadius: "24px",
              objectFit: "cover",
              display: "flex",
            }}
          />
        </div>

        {/* Right side — text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            gap: "16px",
          }}
        >
          {/* Terminal eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "22px",
              color: "#a3e635",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <span>~/portfolio/</span>
            <span style={{ color: "#737373" }}>▌</span>
          </div>

          {/* Name */}
          <div
            style={{
              display: "flex",
              fontSize: "76px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#ffffff",
            }}
          >
            Mohammad Irfan
          </div>

          {/* Role */}
          <div
            style={{
              display: "flex",
              fontSize: "32px",
              color: "#a3e635",
              fontFamily: "monospace",
              marginTop: "4px",
            }}
          >
            &gt; Full-stack Developer_
          </div>

          {/* Bio */}
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: "#a3a3a3",
              lineHeight: 1.5,
              marginTop: "16px",
              maxWidth: "560px",
            }}
          >
            Building software people actually use.
          </div>

          {/* Bottom strip — tech chips */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "32px",
              fontSize: "18px",
              color: "#737373",
              fontFamily: "monospace",
            }}
          >
            <span style={{ color: "#a3e635" }}>●</span>
            <span>React</span>
            <span style={{ color: "#525252" }}>·</span>
            <span>Next.js</span>
            <span style={{ color: "#525252" }}>·</span>
            <span>TypeScript</span>
            <span style={{ color: "#525252" }}>·</span>
            <span>Node.js</span>
            <span style={{ color: "#525252" }}>·</span>
            <span>Postgres</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}