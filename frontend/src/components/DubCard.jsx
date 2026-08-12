import { t } from '../utils/translations.js';

function DubCard({ item, language }) {
  return (
    <div className="col-lg-4 col-md-6 work-card">
      <article className="card">
        {item.video ? (
          <div className="card-video-top">
            <iframe
              referrerPolicy="strict-origin-when-cross-origin"
              width={"100%"}
              src={item.video}
              title={`${item.title} - ${item.mainCharacter || t(language, 'card.defaultCharacter')} - Carlos Lorenzo`}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : item.image ? (
          <div className={item.category === "Locuciones" ? "card-img-top card-img-top-brand" : "card-img-top"}>
            <img
              className="card-image"
              src={item.image}
              alt={`${item.title} - ${item.mainCharacter || t(language, 'card.defaultCharacter')}`}
              loading="lazy"
            />
          </div>
        ) : null}
        <div className="card-body">
          <h3 className="card-title h5">{item.title}</h3>
          <p className="card-text">
            <em>{item.mainCharacter ? item.mainCharacter : item.category === "Locuciones" ? t(language, 'card.corporateCharacter') : t(language, 'card.defaultCharacter')}</em><br />
            <span className="badge bg-info mt-1">{item.year}</span>
            <span className="badge bg-secondary ms-1">{t(language, `doblajes.categories.${item.category}`)}</span>
          </p>
        </div>
      </article>
    </div>
  );
}

export default DubCard;
