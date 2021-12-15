import Sequencer from './containers/Sequencer';
import { PlayerProvider } from './contexts/PlayerContext';


function App() {
  return (
    <div className="App">
        <PlayerProvider>
            < Sequencer />
        </PlayerProvider>
    </div>
  );
}

export default App;


