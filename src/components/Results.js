import React from 'react';
import Result from './Result'


class Results extends React.Component {
    constructor() {
        super()

        this.handleScroll = this.handleScroll.bind(this);
        this.splitResults = this.splitResults.bind(this);
        this.handleClickMore = this.handleClickMore.bind(this);
        this.isFavourite = this.isFavourite.bind(this);
    }

    handleScroll(event) {
        console.log("scroll")

        if (event.target.scrollTop + 1000 > event.target.scrollHeight - event.target.clientHeight) {
          console.log("scroll")
        }
      }

    handleClickMore(event) {
        this.props.receiveMoreMovies()
    }

//****************************************//
// Splliting the results into 2 columns to stop result moving from left to right when more details are shown.
// Odd and evens are split into each column to keep the ordering the same as omdb (first results at top of page)

    splitResults(column) {
        let leftSide = [];
        let rightSide = [];
        for (let i=0; i<this.props.results.length; i++) {
            i % 2 === 0 ? leftSide.push(this.props.results[i]) : rightSide.push(this.props.results[i])
        }

        return column === 'left'?leftSide:rightSide;
    }

    isFavourite(imdbID) {
        return this.props.favObject[imdbID]?true:false
    }




    render() {
        console.log(this.props.resultsLeft)
        return (
            <div className="search-container">
            <div className="search-results" onScroll={this.handleScroll}>
                <div className="search-results__column">
                    {this.splitResults('left').map(result => {
                        return <Result showInfo={result.imdbID === this.props.selectedMovie} result={result} receiveMovie={this.props.receiveMovie} receiveFavourite={this.props.receiveFavourite} isFavourite={this.isFavourite(result.imdbID)} key={result.imdbID} />
                    })}
                </div>
                <div className="search-results__column" onScroll={this.handleScroll}>
                    {this.splitResults('right').map(result => {
                        return <Result showInfo={result.imdbID === this.props.selectedMovie} result={result} 
                        isFavourite={this.isFavourite(result.imdbID)} receiveMovie={this.props.receiveMovie} receiveFavourite={this.props.receiveFavourite} key={result.imdbID} />
                    })}
                </div>
            </div>
            {this.props.resultsLeft < 1? null:  (
                <div className="search-more">
                    <button className="search-more__button" onClick={this.handleClickMore}>Load More</button>
                </div> )
                }
            </div>

        )
    }
}

export default Results;