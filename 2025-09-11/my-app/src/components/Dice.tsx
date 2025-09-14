import "../Hello.css"
import { useState } from "react"

function Dice() {
  //const [value, setValue] = useState(1)
  const [value, setValue] = useState<number | null>(null)

  const rollDie = () => {
    const newValue = Math.floor(Math.random() * 6) + 1
    setValue(newValue)
  }

  return (
    <>
      <div className="hello">
        <h2>Dice</h2>
        <button onClick={rollDie}>Roll the Die</button>
        <p>Current value is: {value}</p>
        {value === 6 && <p>🎉 Winner!!</p>}
      </div>
    </>
  )
}

export default Dice
