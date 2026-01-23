/**
 * DetailButton Component
 *
 * Renders a set of action icons for application table rows including:
 * - Expand/collapse caret
 * - View/hide details eye icon
 * - More options menu icon
 *
 * @module DetailButton
 */
import Image from "next/image";
import React from "react";

/**
 * Props for the DetailButton component
 * @property {"view" | "hide"} mode - Controls which eye icon to display
 */
export type ButtonProps = {
  mode: "view" | "hide";
} & React.ComponentProps<"button">;

/**
 * DetailButton - Renders action icons for table row interactions
 *
 * @param {ButtonProps} props - Component props
 * @param {string} props.mode - "view" shows open eye, "hide" shows eye with slash
 * @returns {JSX.Element} A flex container with three action icons
 */
export const DetailButton = function DetailButton({
  mode,
}: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  // Determine if details should be hidden based on mode
  const hidden = mode !== "view";

  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", width: "55%" }}>
      {/* Expand/collapse caret icon */}
      <Image src="/downCaret.svg" width="16" height="16" alt="Down Carat"></Image>

      {/* Toggle visibility icon - shows slashed eye when hidden */}
      <Image
        src={hidden ? "/eyeWithSlash.svg" : "/eye.svg"}
        width="16"
        height="16"
        alt={hidden ? "Hide Details" : "View Details"}
      ></Image>

      {/* More options menu icon */}
      <Image src="/more.svg" width="16" height="16" alt="More Options"></Image>
    </div>
  );
};
