import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "var(--font-inter), Inter, sans-serif",
      background: "#F4F8F5"
    }}>
      <h1 style={{
        fontSize: "48px",
        fontWeight: 800,
        color: "#1A3530",
        margin: "0 0 16px",
        letterSpacing: "-0.025em"
      }}>404</h1>
      
      <h2 style={{
        fontSize: "24px",
        fontWeight: 600,
        color: "#16140F",
        margin: "0 0 12px"
      }}>Page not found</h2>
      
      <p style={{
        fontSize: "16px",
        color: "#5A5A52",
        margin: "0 0 32px",
        maxWidth: "500px",
        textAlign: "center",
        lineHeight: 1.6
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link href="/" style={{
        fontSize: "14px",
        fontWeight: 700,
        color: "#ffffff",
        background: "#1A3530",
        padding: "12px 24px",
        borderRadius: "8px",
        textDecoration: "none",
        transition: "opacity 0.15s"
      }}>
        Return to home
      </Link>
    </div>
  );
}
