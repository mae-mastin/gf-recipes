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
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.getSearchResults = this.getSearchResults.bind(this);
    }   
    
  
  enterSearch(e) {
    this.setState({search: e.target.value});
  }

  handleKeyPress(e) {
    if (e.code === 'Enter') {
      this.btn.click();
    }
  };


  getSearchResults() {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=282f91f48b0046f098420a29351cf325&intolerances=gluten&diet=glutenFree&query=${this.state.search}`
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
        <div className = "top">
          <input
            type="string"
            placeholder="Search for a gluten free recipe..."
            onChange={this.enterSearch}
            onKeyPress={this.handleKeyPress}
          />
          <button ref={node => (this.btn = node)} onClick={this.getSearchResults} type = "submit"><span className="material-icons">search</span></button>
        </div>
        <section className="search">          
          <SearchResults results = {this.state.searchResults}/> 
        </section>      
      </div>
    )
  }
}


export default App;