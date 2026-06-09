import Image from "next/image";

import styles from "./CollaboratorPopup.module.css";

type CollaboratorPopupProps = {
  name: string;
  program: string;
  image: string;
  titles: string[];
  description: string[];
  link: string;
  onClose: () => void;
};

export function CollaboratorPopup({
  image,
  name,
  program,
  titles,
  description,
  link,
  onClose,
}: CollaboratorPopupProps) {
  const data = titles.map((title, i) => (
    <div key={i}>
      <h2 className={styles.descriptionTitle}>{title}</h2>
      <p className={styles.descriptionDetail}>{description[i]}</p>
    </div>
  ));

  return (
    <div
      className={styles.modalOverlay}
      onClick={() => {
        onClose();
      }}
    >
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.modalTop}>
          <Image
            src={image}
            alt={`${name} logo`}
            width="86"
            height="86"
            className={styles.modalLogo}
          />
          <div className={styles.modalInfoWrapper}>
            <h2 className={styles.modalTitle}>{name}</h2>
            <p className={styles.modalProgram}>{program}</p>
          </div>
          <button
            type="button"
            className={styles.modalClose}
            onClick={() => {
              onClose();
            }}
            aria-label="Close"
          >
            <Image src="/home/collaborators/close.svg" width={30} height={30} alt="" />
          </button>
        </div>
        {description.length === titles.length && <div className={styles.description}>{data}</div>}
        <div className={styles.modalButtonWrapper}>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.learnMoreButton}
          >
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
}
