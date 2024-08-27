import React, { Component } from "react";

export default class NewsItem extends Component {
 
  render() {
    let { title, description, imageUrl ,newsUrl,author,date ,source} = this.props;
    return (
      <div>
        <div className="card my-4">
          <img src={!imageUrl?"https://s.yimg.com/ny/api/res/1.2/Tm2tNZPHeep0w6tjK.9T8Q--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/c9a75eb46f0f1e0f602d3d74ec0ba927" :imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                {source}
            </span>
            <h5 className="card-title">{title}
           

            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary" rel="noreferrer">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
