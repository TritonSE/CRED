import Image from "next/image";
import React from "react";

export type ButtonProps = {
  mode: "view" | "hide";
} & React.ComponentProps<"button">;

export const DetailButton = function DetailButton({
  mode,
}: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  // const label = mode === "view" ? "View Details" : "Hide Details";
  const hidden = mode !== "view"; // If not view mode, then details are hidden
  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", width: "55%" }}>
      <Image src="/downCaret.svg" width="16" height="16" alt="Down Carat"></Image>
      <Image
        src={hidden ? "/eyeWithSlash.svg" : "/eye.svg"}
        width="16"
        height="16"
        alt={hidden ? "Hide Details" : "View Details"}
      ></Image>
      <Image src="/more.svg" width="16" height="16" alt="More Options"></Image>
    </div>
  );
};
