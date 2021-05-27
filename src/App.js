import React from "react"

class App extends React.Component {  
  constructor(props) {
      super(props)

      this.state = {
          searchResults: "",
          search: "",
          recipeTitle: "",
          recipeSource: "",
          recipeImageUrl: ""
      }
      this.enterSearch = this.enterSearch.bind(this);
      this.getSearchResults = this.getSearchResults.bind(this);
      this.getRecipeData = this.getRecipeData.bind(this);
    }      
  
  enterSearch(e) {
    this.setState({search: e.target.value});
  }

  getSearchResults() {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=282f91f48b0046f098420a29351cf325&intolerances=gluten&diet=glutenFree&number=5&query=${this.state.search}`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({searchResults: data.results[0].id});
      })
      .then(data => {
        fetch(
          `https://api.spoonacular.com/recipes/${this.state.searchResults}/information?apiKey=282f91f48b0046f098420a29351cf325&includeNutrition=false` 
        )
          .then(response => response.json())
          .then(data => { 
            console.log(data)
            this.setState({
              recipeTitle: data.title,
              recipeImageUrl: data.image,
              recipeSource: data.sourceUrl
            });
          })
          .catch(() => {
            console.log("error")
          })
      })
      .catch(() => {
        console.log("error")
      })
  }

  getRecipeData() {
    fetch(
      `https://api.spoonacular.com/recipes/${this.state.searchResults}/information?apiKey=282f91f48b0046f098420a29351cf325&includeNutrition=false` 
    )
      .then(response => response.json())
      .then(data => { 
        this.setState({recipeData: [data]});
      })
      .catch(() => {
        console.log("error")
      })
  }

  render () {
    return (
      <div className="App">
        <section className="controls">
          <input
            type="string"
            placeholder="Search for a recipe"
            onChange={this.enterSearch}
          />
          <button onClick={this.getSearchResults}>Get recipes</button>
        </section>
        <section>
          <p>{this.state.searchResults}</p>
          <p>{this.state.recipeTitle}</p>
          <p>{this.state.recipeImageUrl}</p> 
          <p>{this.state.recipeSource}</p>
        </section>       
      </div>
    )
  }
}
export default App;
