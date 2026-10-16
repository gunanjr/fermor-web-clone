import type { CSSProperties } from "react";

// Style helpers matching the design handoff's exact conventions (navTabStyle,
// chipStyle, badgePill, tabBtn -- see Competitive Intelligence.dc.html), ported to
// real CSSProperties objects instead of the prototype's inline style strings.

export function navTabStyle(active: boolean): CSSProperties {
  return {
    height: 44, padding: "0 14px", border: "none", borderBottom: `2px solid ${active ? "#56d2c0" : "transparent"}`,
    background: "transparent", fontFamily: "inherit", fontSize: 13, fontWeight: 500, cursor: "pointer",
    whiteSpace: "nowrap", color: active ? "#f2f2f5" : "#9b9ba3",
  };
}

export function chipStyle(active: boolean): CSSProperties {
  return {
    height: 28, padding: "0 12px", display: "inline-flex", alignItems: "center", borderRadius: 999, fontSize: 12, cursor: "pointer",
    border: `1px solid ${active ? "#56d2c0" : "#34343a"}`, background: active ? "rgba(86,210,192,.12)" : "#1f1f21", color: active ? "#56d2c0" : "#b0b0b8",
  };
}

export function badgePill(color: string): CSSProperties {
  return {
    height: 22, padding: "0 9px", display: "inline-flex", alignItems: "center", background: `${color}1a`,
    border: `1px solid ${color}40`, borderRadius: 6, fontSize: 11, fontWeight: 500, color,
  };
}

export function tabBtn(active: boolean, big = false): CSSProperties {
  return {
    height: big ? 32 : 28, padding: "0 14px", border: "none", borderRadius: 7, fontFamily: "inherit", fontSize: 12.5,
    cursor: "pointer", background: active ? "#2d2d31" : "transparent", color: active ? "#f2f2f5" : "#9b9ba3",
  };
}
