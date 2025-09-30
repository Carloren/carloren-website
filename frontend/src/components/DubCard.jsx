function DubCard({ item }) {
  return (
    <div className="col-lg-4 col-md-6 work-card">
      <div className="card">
        <div className="card-img-top">
          <i className="bi bi-film"></i>
        </div>
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <p className="card-text">
            <strong>Rol:</strong> {item.mainCharacter}<br />
            <span className="badge bg-info">{item.year}</span>
            <span className="badge bg-secondary ms-1">{item.category}</span>
          </p>
          {item.video && (
            <a href={item.video} className="btn btn-sm btn-outline-info" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-play-circle"></i> Ver Video
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default DubCard;
