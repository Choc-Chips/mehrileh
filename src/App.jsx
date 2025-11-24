import { useState } from "react";
import "./App.css";
import dictionary from "./dictionary.json";

function Dictionary({ baseWords, language }) {
  const [input, setInput] = useState("");
  const words = baseWords.filter((word) => word.english.match(`${input}`));
  const [chosen, setChosen] = useState(null);

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleClick(clickedWord) {
    setChosen(words.find((w) => w.english === clickedWord));
  }

  return (
    <div className="cards">
      <div className="card">
        <form action="">
          <input type="text" name="word" value={input} onChange={handleInput} placeholder="Search a word"/>
        </form>
        <div>
          {words.map((word) => (
            <p
              key={word.id}
              onClick={() => handleClick(word.english)}
              className={`word ${word === chosen ? "chosen" : null}`}
            >
              {language === "english" ? word.english : word.mehrileh}
            </p>
          ))}
        </div>
      </div>
      <div className="separation"></div>
      <div className="card">
        {chosen ? (
          <>
            <h3>{chosen.mehrileh}</h3>
            <p>/{chosen.pronunciation}/</p>
            <p>{chosen.english}</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function App() {
  // Sort dictionary alphabetically
  const [baseWords] = useState(
    dictionary.sort((a, b) => a.english > b.english)
  );
  // Sort dictionary for mehrileh
  const [baseWordsDifSort] = useState(
    baseWords.sort((a, b) => a.mehrileh > b.mehrileh)
  );

  return (
    <>
      <h1>Mehrileh Dictionary</h1>
      <div className="sections">
        <div className="section">
          <h2>English to Mehrileh</h2>
          <Dictionary baseWords={baseWords} language="english" />
        </div>
        <div className="section">
          <h2>Mehrileh to English</h2>
          <Dictionary baseWords={baseWordsDifSort} language="mehrileh" />
        </div>
      </div>
    </>
  );
}

export default App;
