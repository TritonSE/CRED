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
  description,
  link,
  onClose,
}: CollaboratorPopupProps) {
  const desc = description[0];

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
          {image && <Image src={image} alt={name + "'s logo"} width="86" height="86" />}
          <div className={styles.modalInfoWrapper}>
            <h2 className={styles.modalTitle}>{name}</h2>
            <p className={styles.modalProgram}>{program}</p>
          </div>
          <div
            className={styles.modalClose}
            onClick={() => {
              onClose();
            }}
          >
            <Image src="/home/close.svg" width={30} height={30} alt="close button"></Image>
          </div>
        </div>
        {description && (
          <p className={styles.modalDescription}>
            {(() => {
              if (description[0].startsWith(name)) {
                return (
                  <>
                    <strong>{name}</strong>
                    {description[0].slice(name.length)}
                  </>
                );
              }
              return desc;
            })()}
          </p>
        )}
        <div className={styles.modalButtonWrapper}>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.learnMoreButton}
            >
              Visit Website
            </a>
          ) : (
            <button className={styles.learnMoreButton}>Learn More</button>
          )}
        </div>
      </div>
    </div>
  );
}
