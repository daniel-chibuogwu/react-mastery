import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date();
  date.setDate(date.getDate() + count);

  function handleReset() {
    setCount(0);
    setStep(1);
  }

  return (
    <div style={{ width: 'max-content', margin: '0 auto' }}>
      <input
        type="range"
        min={0}
        max={10}
        value={step}
        onChange={(e) => setStep(e.target.valueAsNumber)}
      />
      <span>Step: {step}</span>
      <div>
        <button onClick={() => setCount((prev) => prev - step)}>-</button>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.valueAsNumber || 0)}
        />
        <button onClick={() => setCount((prev) => prev + step)}>+</button>
      </div>
      <span>
        {count === 0 || isNaN(count)
          ? 'Today is'
          : count < 0
          ? `${Math.abs(count)} days ago was`
          : `${count} days from now is`}{' '}
        {date.toDateString()}
      </span>
      <br />
      <br />
      {count !== 0 || step !== 1 ? (
        <button onClick={handleReset}>Reset</button>
      ) : null}
    </div>
  );
}

export default Counter;
