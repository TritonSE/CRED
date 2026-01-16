import React from "react";

import { DirectorBox } from "./components/DirectorBox";
import styles from "./page.module.css";

export default function ExamplePage() {
  return (
    <div className={styles.directorBoxContainer}>
      {/* test boxes */}
      <DirectorBox
        title="test"
        textBody="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        buttonlabel="test"
      />
      <DirectorBox
        title="test"
        textBody="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        buttonlabel="test"
      />
    </div>
  );
}
