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
  const [panning, setPanning] = useState(0); // 0 is centered, -1 is left, 1 is right

  const playSound = (sound: Howl, position: number) => {
    sound.stereo(position); // Set the stereo position
    sound.play();
  };

  const playAudio1Left = () => playSound(sound1, -1);
  const playAudio1Right = () => playSound(sound1, 1);
  const playAudio2Left = () => playSound(sound2, -1);
  const playAudio2Right = () => playSound(sound2, 1);

  // Function to pan audio left
  const panLeft = () => {
    const newPanningValue = Math.max(panning - 0.1, -1); // assuming panning ranges from -1 (left) to 1 (right)
    sound1.stereo(newPanningValue);
    setPanning(newPanningValue);
  };

  // Function to pan audio right
  const panRight = () => {
    const newPanningValue = Math.min(panning + 0.1, 1);
    sound1.stereo(newPanningValue);
    setPanning(newPanningValue);
  };

  // Function to stop all audios
  const stopAudios = () => {
    sound1.stop();
    sound2.stop();
  };
  // Function to adjust volume
  const adjustVolume = (changeInDb: number) => {
    let newVolume = volume * 10 ** (changeInDb / 20);
    newVolume = Math.max(0, Math.min(1, newVolume)); // Ensure volume is between 0 and 1
    sound1.volume(newVolume);
    sound2.volume(newVolume);
    setVolume(newVolume); // Update state
  };

  const increaseVolume = () => adjustVolume(2);
  const decreaseVolume = () => adjustVolume(-2);

  // Define a function to get the panning text
  const getPanningText = (panValue: number) => {
    if (panValue === 0) return 'Center';
    if (panValue < 0) return 'Left';
    return 'Right';
  };

  return (
    <div>
      <h1>This is the New Page</h1>
      <button type="button" onClick={playAudio1Left}>
        Play Audio 1 Left
      </button>
      <button type="button" onClick={playAudio1Right}>
        Play Audio 1 Right
      </button>
      <button type="button" onClick={playAudio2Left}>
        Play Audio 2 Left
      </button>
      <button type="button" onClick={playAudio2Right}>
        Play Audio 2 Right
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
      <button type="button" onClick={panLeft}>
        Pan Left
      </button>
      <button type="button" onClick={panRight}>
        Pan Right
      </button>
      <div>Current Volume: {volume} </div>
      <div>
        Current Panning:
        {getPanningText(panning)}
      </div>
      <Link to="/">
        <button type="button">Back to Main Page</button>
      </Link>
    </div>
  );
}

export default NewPage;
