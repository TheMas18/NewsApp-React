import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize:3,
        category:'general',
      }
    static propTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
      }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page:1,
            totalResults: 0
        }
        document.title=`${this.props.category.toUpperCase()} - NewsMonkey`;
    }
    //This is an life cycle method which will run after the render() method
     async componentDidMount(){
        this.updateNews();
    }


    async updateNews(){
        this.setState({ loading:true})
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=76eaeb031e1643cb8962419db8b9ff6e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data= await fetch(url);
        let parseData=await data.json();
        console.log("Fetched data: ", parseData);
        this.setState({articles:parseData.articles, totalResults:parseData.totalResults,loading:false})
    }
  
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 }, this.updateNews);
    }

    handlePreviousClick = async () => {
        this.setState({ page: this.state.page - 1 }, this.updateNews);
    }


    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">News Monkey - Top Headlines from {this.props.category}</h1>
               {this.state.loading && <Spinner/>}
                <div className="row">
                  {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title? element.title.slice(0, 45):" "} 
                                      description={element.description?element.description.slice(0, 80):" "}
                                      imageUrl={element.urlToImage} 
                                      newsUrl={element.url}
                                      author={element.author}
                                      date={element.publishedAt}
                                      source={element.source.name}
                            />
                        </div>
                    })}
                </div>


                <div className="container  d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> Previous</button>
                    <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark"  onClick={this.handleNextClick}>Next</button>

                </div>
            </div>
        );
    }
}

export default News;
