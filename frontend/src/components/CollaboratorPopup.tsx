export function CollaboratorPopup() {
    return (
        {selectedCollab && (
            <div
              className={styles.modalOverlay}
              onClick={() => {
                setSelectedCollab(null);
              }}
            >
              <div
                className={styles.modal}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <button
                  className={styles.modalClose}
                  onClick={() => {
                    setSelectedCollab(null);
                  }}
                >
                  ✕
                </button>
                <h2 className={styles.modalTitle}>
                  {selectedCollab.name} {selectedCollab.category} Programs
                </h2>
                {COLLABORATOR_INFO[selectedCollab.name]?.description && (
                  <p className={styles.modalDescription}>
                    {(() => {
                      const desc = COLLABORATOR_INFO[selectedCollab.name].description;
                      const name = selectedCollab.name;
                      if (desc.startsWith(name)) {
                        return (
                          <>
                            <strong>{name}</strong>
                            {desc.slice(name.length)}
                          </>
                        );
                      }
                      return desc;
                    })()}
                  </p>
                )}
                <div className={styles.modalButtonWrapper}>
                  {COLLABORATOR_INFO[selectedCollab.name]?.link ? (
                    <a
                      href={COLLABORATOR_INFO[selectedCollab.name].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.learnMoreButton}
                    >
                      Learn More
                    </a>
                  ) : (
                    <button className={styles.learnMoreButton}>Learn More</button>
                  )}
                </div>
              </div>
            </div>
          )}
    )
}