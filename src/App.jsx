import { useState } from 'react'
import './App.css'
import dictionary from './dictionary.json'

function App() {

  const [baseWords] = useState(dictionary);
  const [input, setInput] = useState("");
  const words = baseWords.filter(word => word.english.match(`${input}`));
  const [chosen, setChosen] = useState(null);

  function handleInput(e) {
    setInput(e.target.value);
  }
  
  function handleClick(e) {
    const tempChosen = e.target.textContent;
    setChosen(words.find(w => w.english === tempChosen));
  }

  return (
    <>
      <h1>Mehrileh Dictionary</h1>
      <div>
        <form action="">
          <input type="text" name='word' value={ input } onChange={ handleInput }/>
        </form>
        <div>
          { words.map( word => (
            <h2 key={ word.id } onClick={ handleClick }>{word.english}</h2>
          ))}
        </div>
      </div>
      <div>
          <h2>{ chosen?.english }</h2>
          <p>{ chosen?.mehrileh }</p>
      </div>
    </>
  )
}

export default App
