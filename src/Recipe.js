import React from "react"



class Recipe extends React.Component {  
  constructor(props) {
      super(props)

      this.state = {
        imageUrl: "",
        title: "",
        readyInMinutes: "",
        servings: "",
        sourceUrl: "",
        glutenFreeCheck: "",
      }

      console.log("got here")
      console.log("id is " + this.props.recipeId)

      fetch(
        `https://api.spoonacular.com/recipes/${this.props.recipeId}/information?apiKey=282f91f48b0046f098420a29351cf325&includeNutrition=false` 
      )
        .then(response => response.json())
        .then(data => { 
          this.setState({imageUrl: data.imageUrl});
          this.setState({title: data.title});
          this.setState({readyInMinutes: data.readyInMinutes});
          this.setState({servings: data.servings});
          this.setState({sourceUrl: data.sourceUrl});
          this.setState({glutenFreeCheck: data.glutenFree});
        })
        .catch(() => {
          console.log("error")
        })
    }      

  render () {
    return (
      <div className="Recipe">
        <p>{this.state.imageUrl}</p>
        <p>{this.state.title}</p>  
        <p>{this.state.readyInMinutes}</p> 
        <p>{this.state.servings}</p>    
        <p>{this.state.sourceUrl}</p>
        <p>{this.state.glutenFreeCheck}</p>
      </div>
    )
  }
}
export default Recipe;
