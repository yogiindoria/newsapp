import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div>
        <div className="card my-3" style={{width: '18rem'}}>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger badge" style={{left: '85%', zIndex: '1', color: 'white'}}>{source}
        </span>
          <img src={!imageUrl? "https://th.bing.com/th/id/R.177c2aa34a39821464a08f108e577d3f?rik=E6on3EJVDGOmSg&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f4707746%2fimages%2fo-BREAKING-NEWS-facebook.jpg&ehk=aOZD%2b3ct2JGBC7gowQvtiafkD2%2fQugxJAKZDR7bzdJw%3d&risl=&pid=ImgRaw&r=0" : imageUrl} className="card-img-top" style={{width: "286px",height: "160px"}} alt=""/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className='text-muted'>By { !author?"Unknown": author } on { new Date(date).toGMTString() } </small></p>
            <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-sm btn-primary">Read More</a>
          </div>
          
        </div>
      </div>
    )
  }
}
