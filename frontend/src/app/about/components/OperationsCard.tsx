// import styles from "./OperationsCard.module.css";
import React from "react";

export type OperationsCardProps = {
  num: number;
  title: string;
  textBody: string;
};

export const OperationsCard: React.FC<OperationsCardProps> = ({ num, title, textBody }) => {
  return (
    <div className="cardContainer">
      <div className="cardNumberCircle">
        <h3>{num}</h3>
      </div>
      <h2 className="cardTitle">{title}</h2>

      <p className="cardText">{textBody}</p>
    </div>
  );
};
