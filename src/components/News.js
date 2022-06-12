import React, { Component } from "react";
import NewItem from "./NewItem";
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    category: "",
    pageSize: 3,
    country: "in",
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalize(this.props.category)} - NewRat`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=6d3f912896364169b86250a1775cab40&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults, 
      loading: false
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1);
  };

  fetchMoreData = async() => {
      const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=6d3f912896364169b86250a1775cab40&pageSize=${this.props.pageSize}`;
      this.setState({page: this.state.page + 1})
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults, 
      loading: false
    });
  };

  render() {
    return (
      <div className="container my-2">
        <h1 className="text-center p-2">
          NewsRat - TOP {this.capitalize(this.props.category)} HEADLINES
        </h1>
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.totalResults}
                loader={<h4>Loading...</h4>}
            >
            <div className="row">
                {this.state.articles.map((element) => {
                return (
                    <div className="col-md-4" key={element.url}>
                    <NewItem
                        title={element.title}
                        description={element.description ? element.description : ""}
                        imageURL={element.urlToImage}
                        newsURL={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source}
                    ></NewItem>
                    </div>
                );
                })}
            </div>
        </InfiniteScroll>
      </div>
    );
  }
}
