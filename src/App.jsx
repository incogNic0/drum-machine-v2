import Sequencer from './containers/Sequencer';
import { PlayerProvider } from './contexts/PlayerContext';
import bgImage from './assets/images/brushed-aluminium.jpg';


function App() {
  return (
    <div className="App">
        <img src={bgImage} className='bg-image' alt="brushed aluminium" />
        <PlayerProvider>
            < Sequencer />
        </PlayerProvider>
    </div>
  );
}

export default App;


