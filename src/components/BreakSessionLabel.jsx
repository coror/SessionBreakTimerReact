import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const BreakSessionLabel = ({
  handleDecrement,
  handleIncrement,
  isRunning,
  time,
}) => {
  return (
    <div id='break-label' className='mt-3 mr-5'>
      Break length
      <div className='flex flex-row items-center justify-center'>
        <button
          id='break-decrement'
          onClick={handleDecrement}
          disabled={isRunning}
          className='mr-2'
        >
          <FaArrowDown />
        </button>
        <div id='break-length' className='mr-2'>
          {time}
        </div>
        <button
          id='break-increment'
          onClick={handleIncrement}
          disabled={isRunning}
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

export default BreakSessionLabel;
