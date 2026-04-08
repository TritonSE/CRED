import React from "react";

export type NeedsCheckboxProps = {
  aid: string;
  onButtonClick: () => void;
};

export const NeedsCheckbox: React.FC<NeedsCheckboxProps> = ({ aid, onButtonClick }) => {
  return (
    <div>
      {/* checkbox */}
      <button onClick={onButtonClick}></button>
      <p>{aid}</p>
    </div>
  );
};
