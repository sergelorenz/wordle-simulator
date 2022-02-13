import LetterGrid from './components/GameArea/LetterGrid/LetterGrid';

import { Provider } from 'react-redux';
import store from './store';

import './App.scss';


function App() {
  return (
    <Provider store={store}>
      <div id="parent">
        <div className="banner">
          WORDLE SIMULATOR
        </div>
        <div className="game-area">
          <div><LetterGrid /></div>
          <div></div>
        </div>
      </div>
    </Provider>
  )
}

export default App;
