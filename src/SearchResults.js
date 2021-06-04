import React from "react"
import Recipe from "./Recipe"


class SearchResults extends React.Component {  


  render () {
    const recipes = this.props.results.results
    if (recipes === undefined) {
      return (
        <div className="searchResults">
        </div>
    );
    }
    if (recipes.length === 0) {
        return <div>Sorry! No recipes found.</div>
    }
    return (
        <div className="searchResults" key = {recipes[0].id}>
          {recipes.map(recipe => {return <Recipe recipe={recipe} id={recipe.id}/>})}
        </div>
    );
  }
}


export default SearchResults;