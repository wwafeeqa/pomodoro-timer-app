import React, { useState, useEffect, useRef } from 'react';
import alarm_sound from './assets/alarm_sound.wav';
import './index.css';
import { FaSun, FaMoon } from 'react-icons/fa';

function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(1500); // seconds
  const [currentMode, setCurrentMode] = useState('pomodoro'); // 'pomodoro', 'shortBreak', 'longBreak'
  const alarmRef = useRef(new Audio(alarm_sound));
  const [darkMode, setDarkMode] = useState(false);
  const startTimeRef = useRef(null); // Store the last start time
  const remainingTimeRef = useRef(1500); // Tracks remaining time

  useEffect(() => {
    let timer;
    if (isRunning) {
      startTimeRef.current = Date.now();
      timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const newRemainingTime = Math.max(remainingTimeRef.current - elapsed, 0);
        setElapsedTime(newRemainingTime);

        if (newRemainingTime === 0) {
          setIsRunning(false);
          alarmRef.current.play();
          clearInterval(timer);
        }
      }, 100);

      return () => clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
    remainingTimeRef.current = elapsedTime;
  };

  const stop = () => {
    setIsRunning(false);
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    remainingTimeRef.current = Math.max(remainingTimeRef.current - elapsed, 0);
    alarmRef.current.pause();
  };

  const reset = () => {
    setIsRunning(false);
    if (currentMode === 'pomodoro') {
      setElapsedTime(1500); // reset to 25 minutes
    } else if (currentMode === 'shortBreak') {
      setElapsedTime(300); // reset to 5 minutes
    } else if (currentMode === 'longBreak') {
      setElapsedTime(600); // reset to 10 minutes
    }
    remainingTimeRef.current = elapsedTime;
    alarmRef.current.pause();
  };

  const shortBreak = () => {
    setIsRunning(false);
    setElapsedTime(300); // reset to 5 minutes
    setCurrentMode('shortBreak');
    remainingTimeRef.current = 300;
    alarmRef.current.pause();
  };

  const longBreak = () => {
    setIsRunning(false);
    setElapsedTime(600); // reset to 10 minutes
    setCurrentMode('longBreak');
    remainingTimeRef.current = 600;
    alarmRef.current.pause();
  };

  const pomodoro = () => {
    setIsRunning(false);
    setElapsedTime(1500); // reset to 25 minutes
    setCurrentMode('pomodoro');
    remainingTimeRef.current = 1500;
    alarmRef.current.pause();
  };

  const formatTime = () => {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <main className="timer h-screen flex flex-col justify-center items-center dark:bg-this-black bg-this-white">
        <div className="text-center space-x-8 mb-16">
          <button onClick={pomodoro} className="bg-yellow dark:bg-purple dark:hover:bg-this-black hover:outline hover:bg-this-white font-gotham-bold hover:text-purple dark:hover:text-yellow text-this-black py-3 px-7 rounded-full text-2xl">pomodoro</button>
          <button onClick={shortBreak} className="bg-yellow dark:bg-purple dark:hover:bg-this-black hover:outline hover:bg-this-white font-gotham-bold hover:text-purple dark:hover:text-yellow text-this-black py-3 px-7 rounded-full text-2xl">short break</button>
          <button onClick={longBreak} className="bg-yellow dark:bg-purple dark:hover:bg-this-black hover:outline hover:bg-this-white font-gotham-bold hover:text-purple dark:hover:text-yellow text-this-black py-3 px-7 rounded-full text-2xl">long break</button>
        </div>
        <div className="text-center text-9xl font-semibold font-gotham-italic mb-16 dark:text-yellow text-purple">{formatTime()}</div>
        <div className="text-center space-x-8">
          <button onClick={start} className="bg-yellow dark:bg-purple hover:outline hover:bg-this-white dark:hover:bg-this-black font-gotham-bold hover:text-purple dark:hover:text-yellow text-this-black py-3 px-7 rounded-full text-2xl">start</button>
          <button onClick={stop} className="bg-yellow dark:bg-purple hover:outline hover:bg-this-white dark:hover:bg-this-black font-gotham-bold hover:text-purple dark:hover:text-yellow text-this-black py-3 px-7 rounded-full text-2xl">stop</button>
          <button onClick={reset} className="bg-yellow dark:bg-purple hover:outline hover:bg-this-white dark:hover:bg-this-black font-gotham-bold hover:text-purple dark:hover:text-yellow text-this-black py-3 px-7 rounded-full text-2xl">reset</button>
        </div>
        <button onClick={toggleDarkMode} className="flex items-center text-center justify-center absolute w-16 h-16 bottom-12 right-12 bg-yellow dark:bg-purple hover:outline hover:bg-this-white dark:hover:bg-this-black font-gotham-bold hover:text-purple dark:hover:text-yellow text-this-black rounded-full text-2xl">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </main>
    </div>
  );
}

export default Timer;
