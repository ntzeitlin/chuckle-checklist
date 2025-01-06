import { useState } from "react"
import "./App.css"
import { addJoke } from "../services/jokeService"

export const App = () => {
  const [userInput, setUserInput] = useState("")



  return <div className="app-container">
    <div className="joke-add-form">
      <input
        id="jokeinput"
        className="joke-input"
        type="text"
        placeholder="New One Liner"
        value={userInput}
        onChange={event => {
          setUserInput(event.target.value)
        }}
      />

      <button
        id="addButton"
        className="joke-input-submit"
        onClick={event => {
          if (event.target.id === "addButton") {
            addJoke(
              {
                id: "",
                text: userInput,
                told: false
              }
            )
          }
        }
        }
      >

        Add
      </button>
    </div>
  </div>
}
