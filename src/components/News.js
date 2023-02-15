import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {

  articles = []

  static defaultProps = {
    country: "in",
    pageSize: 10,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitaliseFunc = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 
  constructor(props) {
    super(props);
    console.log("hello i ma constructor");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1
    }
    document.title = `${this.capitaliseFunc(this.props.category)} - NewsHub`;
  }

  async updateNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c4fe6fd5e84147edb31e7242b44a2961&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState(
      {articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false
      }
    )
  }

  async componentDidMount(){
    this.updateNews();
  }

  handleNextClick = async() => {
    this.setState({page: this.state.page +1})
    this.updateNews();
  }

  handlePreviousClick = async() => {
    this.setState({page: this.state.page -1});
    this.updateNews();
  }

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={ { margin: '35px 0px' }}> NewsHub - Top {this.capitaliseFunc(this.props.category)} Headlines </h2>
        {this.state.loading && <Spinner/>}
        <div className="row my-4">
          { !this.state.loading && this.state.articles.map( (element) => {
            return <div className='col md-2' key={element.url}>
              <NewsItem title={element.title?element.title.slice(0, 40):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}  source={element.source.name}/>
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-center">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-2 my-2" onClick={this.handlePreviousClick}> &larr; Previous </button>
        <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark mx-2 my-2" onClick={this.handleNextClick}> Next &rarr; </button>
        </div>
      </div>
    )
  }
}
