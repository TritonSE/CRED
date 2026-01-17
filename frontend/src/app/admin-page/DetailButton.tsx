import React from "react";

export type ButtonProps = {
  label: string;
  iconImageURL?: string;
} & React.ComponentProps<"button">;

export const Button = function Button({
  ref,
  label,
  iconImageURL,
  ...props
}: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  return (
    <button ref={ref} type="button" {...props}>
      <p>{label}</p>
      <img src={iconImageURL}></img>
    </button>
  );
};
