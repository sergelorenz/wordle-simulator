import LetterGrid from './components/GameArea/LetterGrid/LetterGrid';

import './App.scss';


function App() {
  return (
    <div id="parent">
      <div className="banner">
        WORDLE SIMULATOR
      </div>
      <div className="game-area">
        <div><LetterGrid /></div>
        <div></div>
      </div>
    </div>
  )
}

export default App;
