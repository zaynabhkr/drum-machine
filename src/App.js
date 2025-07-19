import React, { useState } from "react";

const bankOne = [
  {
    key: "Q",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    name: "Heater 1",
  },
  {
    key: "W",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    name: "Heater 2",
  },
  {
    key: "E",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    name: "Heater 3",
  },
  {
    key: "A",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    name: "Heater 4",
  },
  {
    key: "S",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    name: "Clap",
  },
  {
    key: "D",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    name: "Open-HH",
  },
  {
    key: "Z",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    name: "Kick-n-Hat",
  },
  {
    key: "X",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    name: "Kick",
  },
  {
    key: "C",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    name: "Closed-HH",
  },
];

const bankTwo = [
  {
    key: "Q",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    name: "Chord 1",
  },
  {
    key: "W",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    name: "Chord 2",
  },
  {
    key: "E",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    name: "Chord 3",
  },
  {
    key: "A",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    name: "Shaker",
  },
  {
    key: "S",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    name: "Open-HH",
  },
  {
    key: "D",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    name: "Closed-HH",
  },
  {
    key: "Z",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    name: "Punchy Kick",
  },
  {
    key: "X",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    name: "Side Stick",
  },
  {
    key: "C",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    name: "Snare",
  },
];

function App() {
  const [display, setDisplay] = useState("");
  const [volume, setVolume] = useState(0.5);
  const [power, setPower] = useState(true);
  const [bank, setBank] = useState(true);

  const pads = bank ? bankOne : bankTwo;

  const playSound = (pad) => {
    if (!power) return;
    const audio = document.getElementById(pad.key);
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
    setDisplay(pad.name);
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!power) return;
      const pad = pads.find((p) => p.key === e.key.toUpperCase());
      if (pad) playSound(pad);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [pads, power, volume]);

  React.useEffect(() => {
    const slider = document.querySelector('input[type="range"]');
    if (slider) {
      slider.style.setProperty("--percent", `${volume * 100}%`);
    }
  }, [volume]);

  return (
    <div id="drum-machine">
      <div id="display"> {power ? display : "Power Off"}</div>

      <div className="controls">
        <label>
          Power
          <span className="toggle-switch">
            <input
              type="checkbox"
              checked={power}
              onChange={() => setPower(!power)}
            />
            <span className="toggle-slider"></span>
          </span>
        </label>

        <label>
          Bank
          <span className="toggle-switch">
            <input
              type="checkbox"
              checked={bank}
              onChange={() => {
                setBank(!bank);
                setDisplay(bank ? "Bank 2" : "Bank 1");
              }}
            />
            <span className="toggle-slider"></span>
          </span>
        </label>
        <label>
          Volume
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              setVolume(e.target.valueAsNumber);
              setDisplay("Volume: " + Math.round(e.target.value * 100));
            }}
          />
        </label>
      </div>

      <div className="pad-bank">
        {pads.map((pad) => (
          <div
            key={pad.key}
            className="drum-pad"
            id={pad.name}
            onClick={() => playSound(pad)}
            tabIndex={0}
          >
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.sound}></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
