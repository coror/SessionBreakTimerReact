import React from 'react';

const Screen = ({ isSession, remainingTime }) => {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div
      id='screen-time'
      className='border-2 border-black w-24 h-16 rounded-md text-center mt-4 lg:w-64 lg:h-24 flex flex-col items-center justify-center'
    >
      <div id='timer-label' className='text-xs lg:text-xl'>
        {isSession ? 'Session' : 'Break'}
      </div>
      <div id='time-left' className='text-2xl'>
        {formatTime(remainingTime)}
      </div>
    </div>
  );
};

export default Screen;
