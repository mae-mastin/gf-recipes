import React from "react"
import Recipe from "./Recipe"

export default function Results({ searchResults }) {

  if (searchResults.results.length === 0) {
    return (
      <main>
      <section className="recipes">
        Sorry! We didn't find any recipes. Please try again! 
      </section>
    </main>
    )
  }

  return (
    <main>
      <section className="recipes">
        {
          searchResults.results.map(recipe => {
            return <Recipe key={recipe.id} recipe={recipe} />
          })
        }
      </section>
    </main>
  )
}