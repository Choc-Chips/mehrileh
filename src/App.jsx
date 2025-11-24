import { useState } from "react";
import "./App.css";
import dictionary from "./dictionary.json";

function App() {
  const [baseWords] = useState(dictionary);
  const [input, setInput] = useState("");
  const words = baseWords.filter((word) => word.english.match(`${input}`));
  const [chosen, setChosen] = useState(null);

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleClick(e) {
    const tempChosen = e.target.textContent;
    setChosen(words.find((w) => w.english === tempChosen));
  }

  return (
    <>
      <h1>Mehrileh Dictionary</h1>
      <div className="cards">
        <div className='card'>
          <form action="">
            <input
              type="text"
              name="word"
              value={input}
              onChange={handleInput}
            />
          </form>
          <div>
            {words.map((word) => (
              <p  key={word.id} onClick={handleClick} className={`word ${word === chosen?'chosen':null}`}>
                {word.english}
              </p>
            ))}
          </div>
        </div>
        <div className="separation"></div>
        <div className='card'>
          <h2>{chosen?.english}</h2>
          <p>{chosen?.mehrileh}</p>
        </div>
      </div>
    </>
  );
}

export default App;
