import reactLogo from './assets/react.svg'
import './App.css'
import DeckViewer from './DeckViewer'

function App() {

  return (
    <div className="App">
      <div>
        <h1>LoR deck viewer with&nbsp;
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="react" alt="React logo" />
          </a>
        </h1>
      </div>
      <DeckViewer />
    </div>
  )
}

export default App
