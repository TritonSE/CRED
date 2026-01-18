import React from "react";

export type ButtonProps = {
  mode: "view" | "hide";
} & React.ComponentProps<"button">;

export const DetailButton = function DetailButton({
  ref,
  mode,
  ...props
}: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  const label = mode === "view" ? "View Details" : "Hide Details";
  return (
    <button ref={ref} type="button" {...props}>
      <p>{label}</p>
      <img src="/downCarat.svg"></img>
    </button>
  );
};
