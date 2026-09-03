/**
 * Cross-platform haptics.
 *
 * Android/Chrome expose the Vibration API. iOS Safari does not, but toggling a
 * hidden `<input type="checkbox" switch>` fires the system haptic (iOS 17.4+),
 * so that stands in there. Anywhere else this is a no-op — feedback is a bonus,
 * never a requirement.
 */

export type HapticPattern = "tap" | "impact" | "success" | "warning" | "error";

/** Milliseconds of vibration/pause, tuned to feel like taps rather than alarms. */
const PATTERNS: Record<HapticPattern, number | number[]> = {
  tap: 8,
  impact: 14,
  success: [12, 38, 20],
  warning: [16, 55, 16],
  error: [24, 40, 24, 40, 36],
};

/** How many switch toggles stand in for a pattern on iOS. */
const IOS_PULSES: Record<HapticPattern, number> = {
  tap: 1,
  impact: 1,
  success: 2,
  warning: 2,
  error: 3,
};

let iosSwitch: HTMLLabelElement | null = null;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}

function getIosSwitch() {
  if (iosSwitch || typeof document === "undefined") return iosSwitch;

  const label = document.createElement("label");
  label.ariaHidden = "true";
  label.style.cssText =
    "position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);pointer-events:none";

  const input = document.createElement("input");
  input.type = "checkbox";
  // `switch` is the attribute Safari keys the haptic off; React would strip it.
  input.setAttribute("switch", "");
  input.tabIndex = -1;

  label.appendChild(input);
  document.body.appendChild(label);
  iosSwitch = label;
  return iosSwitch;
}

function supportsVibration() {
  return (
    typeof navigator !== "undefined" && typeof navigator.vibrate === "function"
  );
}

/** Fires a short haptic. Safe to call anywhere — it degrades to nothing. */
export function haptic(pattern: HapticPattern = "tap") {
  if (typeof window === "undefined" || prefersReducedMotion()) return;

  try {
    if (supportsVibration()) {
      navigator.vibrate(PATTERNS[pattern]);
      return;
    }

    const element = getIosSwitch();
    if (!element) return;

    for (let pulse = 0; pulse < IOS_PULSES[pattern]; pulse += 1) {
      window.setTimeout(() => element.click(), pulse * 70);
    }
  } catch {
    // Vibration can throw when the document has no user activation yet.
  }
}
