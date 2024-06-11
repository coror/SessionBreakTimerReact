import { useEffect, useRef, useState } from 'react';
import BreakSessionLabel from './components/BreakSessionLabel';
import Screen from './components/Screen';
import Buttons from './components/Buttons';

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [remainingTime, setRemainingTime] = useState(sessionTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true); // New state to track if it is session or break

  const beepRef = useRef(null);

  const handleIncrementBreak = () => {
    setBreakTime((prev) => (prev > 59 ? 60 : prev + 1));
  };

  const handleDecrementBreak = () => {
    setBreakTime((prev) => (prev < 1 ? 0 : prev - 1));
  };

  const handleIncrementSession = () => {
    setSessionTime((prev) => (prev > 59 ? 60 : prev + 1));
    setRemainingTime((sessionTime + 1) * 60);
  };

  const handleDecrementSession = () => {
    setSessionTime((prev) => (prev < 1 ? 0 : prev - 1));
    setRemainingTime((sessionTime - 1) * 60);
  };

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingTime(25 * 60);
    setSessionTime(25);
    setBreakTime(5);
    setIsSession(true);
    beepRef.current.pause();
    beepRef.current.currentTime = 0;
  };

  useEffect(() => {
    let timer;
    if (isRunning && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && remainingTime === 0) {
      beepRef.current.play();
      if (isSession) {
        setIsSession(false);
        setRemainingTime(breakTime * 60);
      } else {
        setIsSession(true);
        setRemainingTime(sessionTime * 60);
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, remainingTime, isSession, breakTime, sessionTime]);

  return (
    <div className='text-xl lg:text-2xl bg-green-900 text-white flex flex-col items-center justify-center h-screen'>
      <h1>25 + 5 Clock</h1>
      <div id='labels' className='flex text-xs'>
        <BreakSessionLabel
          handleDecrement={handleDecrementBreak}
          handleIncrement={handleIncrementBreak}
          isRunning={isRunning}
          time={breakTime}
        />
        <BreakSessionLabel
          handleDecrement={handleDecrementSession}
          handleIncrement={handleIncrementSession}
          isRunning={isRunning}
          time={sessionTime}
        />
      </div>
      <Screen isSession={isSession} remainingTime={remainingTime} />
      <Buttons
        handleStartStop={handleStartStop}
        isRunning={isRunning}
        handleReset={handleReset}
      />
      <audio
        id='beep'
        ref={beepRef}
        src='../audio/short-beep-countdown-81121.mp3'
      ></audio>
    </div>
  );
}

export default App;
