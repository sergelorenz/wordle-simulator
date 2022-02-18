import LetterGrid from './components/GameArea/LetterGrid/LetterGrid';
import KeyHandler from './components/KeyHandler/KeyHandler';

import { Provider } from 'react-redux';
import store from './store';

import './App.scss';


function App() {
  return (
    <Provider store={store}>
      <KeyHandler>
        <div id="parent">
          <div className="banner">
            WORDLE SIMULATOR
          </div>
          <div className="game-area">
            <div><LetterGrid /></div>
            <div></div>
          </div>
        </div>
      </KeyHandler>
    </Provider>
  )
}

export default App;
