import { useEffect, useState } from "react"
import "./App.css"
import { addJoke, delData, getAllJokes, putData } from "../services/jokeService"
import stevePic from "./assets/steve.png"

export const App = () => {
  const [userInput, setUserInput] = useState("")
  const [allJokes, setAllJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])

  const numToldJokes = toldJokes.length
  const numUntoldJokes = untoldJokes.length


  const getAndSetJokes = () => {
    getAllJokes().then((jokeArray) => {
      setAllJokes(jokeArray)
    })
  }

  const handleTellUntell = (event) => {
    if (event.target.name = "telluntellbutton") {
      const dataToPut = allJokes.find((joke) => joke.id === parseInt(event.target.value))
      dataToPut.told = !dataToPut.told
      putData(dataToPut, `http://localhost:8088/jokes/${dataToPut.id}`)
      getAndSetJokes()
    }
  }

  const handleDelete = (event) => {
    if (event.target.name === "deletebutton") {
      const targetJoke = event.target.value
      delData(targetJoke)
      getAndSetJokes()
    }
  }

  // INITIALIZE STATE
  // set all jokes
  useEffect(() => {
    getAndSetJokes()
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
    <h2>Add Joke</h2>
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
            getAndSetJokes()
          }
        }
        }
      >
        Add
      </button>
    </div>
    <div className="joke-lists-container">
      <div className="joke-list-container">
        <h2>Untold<span className="untold-count">{numUntoldJokes}</span></h2>
        <ul>
          {untoldJokes.map((joke) => {
            return (
              <li className="joke-list-item" key={joke.id}>
                <p className="joke-list-item-text">{joke.text}</p>
                <button className="joke-list-action-delete" name="deletebutton" value={joke.id} onClick={handleDelete}>del</button>
                <button className="joke-list-action-toggle" name="telluntellbutton" onClick={handleTellUntell} value={joke.id}>Tell</button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="joke-list-container">
        <h2>Told<span className="told-count">{numToldJokes}</span></h2>
        <ul>
          {toldJokes.map((joke) => {
            return (
              <li className="joke-list-item" key={joke.id}>
                <p className="joke-list-item-text">{joke.text}</p>
                <button className="joke-list-action-delete" name="deletebutton" value={joke.id} onClick={handleDelete}>del</button>
                <button className="joke-list-action-toggle" name="telluntellbutton" onClick={handleTellUntell} value={joke.id}>Untell</button>

              </li>
            )
          })}
        </ul>
      </div>

    </div>
  </div>
}
