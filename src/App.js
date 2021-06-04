import React from "react"
import SearchResults from "./SearchResults"

class App extends React.Component {  
  constructor(props) {
      super(props)

      this.state = {
          searchResults: [],
          search: "",
      }

      this.enterSearch = this.enterSearch.bind(this);
      this.getSearchResults = this.getSearchResults.bind(this);
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
        this.setState({searchResults: data});
      })
      .catch(() => {
        console.log("error")
      })
  }


  render () {
    return (
      <div className="container">
        <section className="search">
          <input
            type="string"
            placeholder="Search for a recipe"
            onChange={this.enterSearch}
          />
          <button onClick={this.getSearchResults}>Get recipes</button>
          <SearchResults results = {this.state.searchResults}/> 
        </section>      
      </div>
    )
  }
}


export default App;