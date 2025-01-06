import { useEffect, useState } from "react"
import "./App.css"
import { addJoke, getAllJokes } from "../services/jokeService"
import stevePic from "./assets/steve.png"

export const App = () => {
  const [userInput, setUserInput] = useState("")
  const [allJokes, setAllJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])

  // set all jokes
  useEffect(() => {
    getAllJokes().then((jokeArray) => {
      setAllJokes(jokeArray)
    })
  }, [])

  // set untold and told jokes
  useEffect(() => {
    const untoldJokeArray = allJokes.filter((joke) => !joke.told)
    const toldJokeArray = allJokes.filter((joke) => joke.told)
    setToldJokes(toldJokeArray)
    setUntoldJokes(untoldJokeArray)
  }, [allJokes])



  return <div className="app-container">
    <div className="app-heading">
      <div className="app-heading-circle">
        <img className="app-logo" src={stevePic} alt="Good job Steve" />
      </div>
      <h1 className="app-heading-text">Chuckle Checklist</h1>
    </div>
    <div><h2>Add Joke</h2></div>
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
            setUserInput("")
          }
        }
        }
      >

        Add
      </button>
    </div>
  </div>
}
