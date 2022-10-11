```
import logo from './logo.svg';
import './App.css';

import {useEffect, useState} from 'react'

import iauction from "iauction";

function App() {
  const [time, setTime] = useState("");
  const [siap, setSiap] = useState("false")

  //1665213396293

  const setupIauction = () => {
    iauction({
      startDate: "2022/10/08 14:30:00",
      endDate: "2022/10/08 14:35:00",
      callback: (time) => {
        setTime(JSON.stringify(time));
        if (time.start === true) {
          setSiap("true")
        } else {
          setSiap("false")
        }
      },
    });
  }

  useEffect(() => {
    setupIauction();
  }, [siap]);
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {time}
        {siap}
      </header>
    </div>
  );
}

export default App;
```