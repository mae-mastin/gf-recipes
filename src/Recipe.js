import React from "react"


class Recipe extends React.Component {  
  constructor(props) {
      super(props)

      this.state = {
        imageUrl: "",
        title: "",
        servings: "",
        sourceUrl: "",
        description: "",
        prepTime: "",
        diets: "",
        dishTypes: "",
        cuisines: "",
        pricePerServing: "",
        sourceName: "",
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
          title: data.title.toUpperCase(),
          servings: data.servings,
          sourceUrl: data.sourceUrl,
          description: data.summary.replace(/<b>/g, '').replace(/<\/b>/g, '').slice(0,150) + "...",
          prepTime: data.readyInMinutes,
          diets: data.diets.join(", "),
          dishTypes: data.dishTypes.join(", "),
          cuisines: data.cuisines.join(", "),
          pricePerServing: Math.round(Number(data.pricePerServing))/100,
          sourceName: data.sourceName,
      })
      if (data.cuisines.length === 0 ) {this.setState({cuisines: "N/A"})}
      if (data.diets.length === 0 ) {this.setState({diets: "N/A"})}
    })
      .catch(() => {
        console.log("error")
      })
  }
  

  render () {
    return (
      <div className="recipe" key = {this.props.id}>
        <div className = "recipeImage">
          <a href = {this.state.sourceUrl} target="_blank" rel="noreferrer"><img src={this.state.imageUrl} alt = {this.state.title}></img></a>
        </div>        
        <div className="recipeHover">
          <div className="recipeInfo">
            <h3>{this.state.title}</h3>
            <p>{this.state.description}</p>       
          </div>
          <div className="popup">
            <h3>{this.state.title}</h3>
            <p>Prep time: {this.state.prepTime} minutes</p>
            <p>Servings: {this.state.servings}</p>
            <p>Price per serving: ${this.state.pricePerServing}</p>
            <p>Dish type: {this.state.dishTypes}</p>
            <p>Cuisines: {this.state.cuisines}</p>
            <p>Diets: {this.state.diets}</p>
            <p>From: {this.state.sourceName}</p>
            <a href = {this.state.sourceUrl} target="_blank" rel="noreferrer"><h3>VISIT WEBSITE <span className="material-icons md-18"> arrow_forward_ios</span> </h3></a>
          </div>
        </div>     
        
      </div>
    )
  }
}
export default Recipe;

