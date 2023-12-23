import logo from './logo.svg';
import './App.css';

import { useState } from 'react';
import VideoPlayer from './Components/VideoPlayer';

function App() {

  const [videoId, setVideoId] = useState(null);

  function playVideo(e, videoId) {
    e.preventDefault()
    setVideoId(videoId)
  }

  return (
    <div className="App">
      <h1>Video Streaming App! Choose your Movie!</h1>
      <button onClick={(e) => { playVideo(e, 'MemoriesOfMurder') }}>Play Memories of Murder </button>
      <button onClick={(e) => { playVideo(e, 'FightClub') }}>Play Fight Club</button>
      <button onClick={(e) => { playVideo(e, 'HistoryOfViolence') }}>Play History of Violence</button>
      {videoId && <VideoPlayer videoId={videoId}></VideoPlayer>} <br />
    </div>
  );
}

export default App;