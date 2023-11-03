// src/renderer/NewPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Howl } from 'howler';

// Assuming you have two audio files like this
// Make sure to place your audio files in a publicly accessible folder

import audioFile1 from './assets/audio/noise550ms.wav';
import audioFile2 from './assets/audio/001-001.wav';

// Create Howl instances for each audio file
const sound1 = new Howl({ src: [audioFile1], loop: true });
const sound2 = new Howl({ src: [audioFile2] });

function NewPage() {
  // State to track volume
  const [volume, setVolume] = useState(sound2.volume());

  // Function to play the looping audio
  const playAudio1 = () => {
    sound1.play();
  };

  // Function to play the second audio
  const playAudio2 = () => {
    sound2.play();
  };

  // Function to stop all audios
  const stopAudios = () => {
    sound1.stop();
    sound2.stop();
  };
  // Function to adjust volume
  const adjustVolume = (changeInDb: number) => {
    let newVolume = sound2.volume() * 10 ** (changeInDb / 10);
    newVolume = Math.max(0, Math.min(1, newVolume)); // Ensure volume is between 0 and 1
    sound2.volume(newVolume);
    setVolume(newVolume); // Update state
  };

  // Function to increase volume by 2 dB
  const increaseVolume = () => {
    adjustVolume(2);
  };

  // Function to decrease volume by 2 dB
  const decreaseVolume = () => {
    adjustVolume(-2);
  };

  return (
    <div>
      <h1>This is the New Page</h1>
      <button type="button" onClick={playAudio1}>
        Play Audio 1
      </button>
      <button type="button" onClick={playAudio2}>
        Play Audio 2
      </button>
      <button type="button" onClick={stopAudios}>
        Stop Audios
      </button>
      <button type="button" onClick={increaseVolume}>
        Increase Volume
      </button>
      <button type="button" onClick={decreaseVolume}>
        Decrease Volume
      </button>
      <div>Current Volume: {Math.round(volume * 100)}%</div>
      <Link to="/">
        <button type="button">Back to Main Page</button>
      </Link>
    </div>
  );
}

export default NewPage;
