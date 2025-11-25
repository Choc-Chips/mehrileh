import { useState } from "react";
import "./App.css";
import dictionary from "./dictionary.json";


function Word({ word, language, selected, setSelected }) {

  function handleClick() {
    setSelected(word);
  } 

  return (
    <p
      key={word.id}
      onClick={() => handleClick(word.english)}
      className={`word ${word === selected ? "selected" : null}`}
    >
      {language === "english" ? word.english : word.mehrileh}
    </p>
  );
}

function Dictionary({ baseWords, language }) {
  const [input, setInput] = useState("");
  let words;
  if (language === "english") words = baseWords.filter((word) => word.english.match(`${input}`));
  if (language === "mehrileh") words = baseWords.filter((word) => word.mehrileh.match(`${input}`));
  const [selected, setSelected] = useState(null);

  function handleInput(e) {
    setInput(e.target.value);
  }

  return (
    <div className="cards">
      <div className="card">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="word"
            value={input}
            onChange={handleInput}
            placeholder="Search a word"
          />
        </form>
        <div>
          {words.map((word) => (
           <Word word={word} language={language} selected={selected} setSelected={setSelected} />
          ))}
        </div>
      </div>
      <div className="separation"></div>
      <div className="card">
        {selected ? (
          <>
            <h3>{selected.mehrileh}</h3>
            <p className="pronunciation">/{selected.pronunciation}/</p>
            <p className="class">{selected.class}</p>
            <p>{selected.englishFull}</p>
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
  const [baseWords] = useState([
    ...dictionary.sort((a, b) => a.english > b.english),
  ]);

  // Remove redudant instances where the full english translation is the same
  function removeDuplicatesByEnglishFull(dictionary) {
    let temp = [...dictionary.sort((a, b) => a.mehrileh > b.mehrileh)];
    const seen = new Map();
    return temp.filter((item) => {
      if (!seen.has(item.englishFull)) {
        seen.set(item.englishFull, true);
        return true;
      }
    });
  }

  // Sort dictionary for mehrileh
  const [baseWordsMehrileh] = useState(
    removeDuplicatesByEnglishFull(dictionary)
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
          <Dictionary baseWords={baseWordsMehrileh} language="mehrileh" />
        </div>
      </div>
    </>
  );
}

export default App;
