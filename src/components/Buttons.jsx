import { FaPlay, FaPause } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';

const Buttons = ({ isRunning, handleReset, handleStartStop }) => {
  return (
    <div id='screen-buttons' className='flex flex-row mt-2'>
      <button id='start_stop' onClick={handleStartStop} className='text-xs'>
        {isRunning ? <FaPause /> : <FaPlay />}
      </button>

      <button id='reset' onClick={handleReset} className='text-base'>
        <MdRefresh />
      </button>
    </div>
  );
};

export default Buttons;
