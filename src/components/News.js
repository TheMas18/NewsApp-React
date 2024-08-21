import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
    // articles = [
    //     {
    //         "source": {
    //             "id": "bbc-sport",
    //             "name": "BBC Sport"
    //         },
    //         "author": null,
    //         "title": "England vs New Zealand LIVE: Fifth women’s T20 – cricket score, radio commentary, video highlights and text updates",
    //         "description": "England host New Zealand in the fifth women’s international T20 at Lord's, London – follow text updates, radio commentary and video highlights.",
    //         "url": "http://www.bbc.co.uk/sport/cricket/live/cg33jge3dkvt",
    //         "urlToImage": "https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/poster-1024x576.png",
    //         "publishedAt": "2024-07-17T16:52:20.7163082Z",
    //         "content": "England captain Heather Knight: \"We want to go unbeaten this summer, that's our main objective. We want to take that momentum into our next game. The support has been really good and the crowd is rea… [+368 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn-cric-info",
    //             "name": "ESPN Cric Info"
    //         },
    //         "author": null,
    //         "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //         "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //         "publishedAt": "2020-04-27T11:41:47Z",
    //         "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn-cric-info",
    //             "name": "ESPN Cric Info"
    //         },
    //         "author": null,
    //         "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //         "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //         "publishedAt": "2020-03-30T15:26:05Z",
    //         "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //     }
    // ];

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
        
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1,
        }
    }
    //This is an life cycle method which will run after the render() method
     async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=76eaeb031e1643cb8962419db8b9ff6e&page=1&pageSize=${this.props.pageSize}`;
        let data= await fetch(url);
        let parseData=await data.json();
        this.setState({articles:parseData.articles, totalResults:parseData.totalResults});
    }
     handlePreviousClick=async ()=>{
           
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=76eaeb031e1643cb8962419db8b9ff6e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
            this.setState({
                loading:true
            })
            let data= await fetch(url);
            let parseData=await data.json();
           
            console.log("Previous");
            this.setState({
                page:this.state.page-1,
                articles:parseData.articles,
                loading:false
            })
    }
    handleNextClick=async()=>{
        console.log("Next");
        if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=76eaeb031e1643cb8962419db8b9ff6e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({
                loading:true
            })
            let data= await fetch(url);
            let parseData=await data.json()
            this.setState({
                page:this.state.page+1,
                articles:parseData.articles,
                loading:false
            })
          }
    }
    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">News Monkey - Top Headlines</h1>
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
