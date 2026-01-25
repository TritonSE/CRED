import React from "react";

import { DirectorBox } from "./components/DirectorBox";
import styles from "./page.module.css";

export default function ExamplePage() {
  return (
    <div>
      <div className={styles.directorBoxContainer}>
        {/* test boxes */}
        <DirectorBox
          title="What We Do"
          textBody="We empower individuals to thrive by offering clients financial literacy training, comprehensive re-entry services, job opportunities, and a path to entrepreneurship."
          buttonlabel="Our Services"
          imageUrl="Map_Marker.svg"
          backgroundUrl="Our_Goal_Background.jpg"
        />
        <DirectorBox
          title="Our Goal"
          textBody="CRED's main goal is to provide case management support along with interpersonal skill training support so our clients can thrive as self-sufficient individuals."
          buttonlabel="Support Us"
          imageUrl="folder_people.svg"
          backgroundUrl="Our_Goal_Background.jpg"
        />
      </div>

      <div className={styles.startJourneyContainer}>
        {/* below the why cred? */}
        <div className={styles.textContainer}>
          <h2>Start Your Journey With CRED</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum sunt minima, iure
            recusandae fuga ipsum quo reprehenderit impedit debitis consequuntur corporis nisi
            sapiente suscipit placeat nemo, doloremque id, nobis voluptatem esse optio? Quidem animi
            temporibus quisquam tempore nulla debitis vel odio nisi error, quo facilis voluptatem
            dolores, distinctio, ex similique mollitia officiis quos facere numquam illum obcaecati
            laboriosa.
          </p>
        </div>
        {/* apply to cred page link */}
        <a className={styles.applyButton} href="">
          Apply to CRED
        </a>
      </div>
    </div>
  );
}
