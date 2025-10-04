function DubCard({ item }) {
  return (
    <div className="col-lg-4 col-md-6 work-card">
      <div className="card">
        {item.video ? (
          <div className="card-video-top">
            <iframe
              width={"100%"}
              aspectRatio={"16/9"}
              src={item.video}
              title={item.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : item.image ? (
          <div className="card-img-top">
            <img className="card-image" src={item.image} alt={item.title} />
          </div>
        ) : null}
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <p className="card-text">
            <i>{item.mainCharacter ? item.mainCharacter : "Voces adicionales"}</i><br />
            <span className="badge bg-info mt-1">{item.year}</span>
            <span className="badge bg-secondary ms-1">{item.category}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DubCard;
