import { useState } from "react"
import "./App.css"

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
        onChange={event => { setUserInput(event.target.value) }}
      />
    </div>
  </div>
}
