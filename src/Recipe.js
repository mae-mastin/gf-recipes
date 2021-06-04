import React from "react"


class Recipe extends React.Component {  
  constructor(props) {
      super(props)

      this.state = {
        imageUrl: "",
        title: "",
        servings: "",
        sourceUrl: "",
        glutenFreeCheck: "",
      }
  }


  componentDidMount() {
    fetch(
      `https://api.spoonacular.com/recipes/${this.props.id}/information?apiKey=282f91f48b0046f098420a29351cf325&includeNutrition=false` 
    )
      .then(response => response.json())
      .then(data => { 
        console.log(data)
        this.setState({
          imageUrl: data.image,
          title: data.title,
          servings: data.servings,
          sourceUrl: data.sourceUrl,
          glutenFreeCheck: data.glutenFree
      })
      
    })
      .catch(() => {
        console.log("error")
      })
  }
  

  render () {
    return (
      <div className="recipe" key = {this.props.id}>
        <img src={this.state.imageUrl} alt = {this.state.title}></img>
        <p>{this.state.title}</p>  
        <p>Servings: {this.state.servings}</p>
        <a href = {this.state.sourceUrl}>Get full recipe</a>    
        <p>{this.state.glutenFreeCheck}</p>
      </div>
    )
  }
}
export default Recipe;

