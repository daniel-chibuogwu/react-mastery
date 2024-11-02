import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
  'Have fun!',
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentStep < messages.length) setCurrentStep((prev) => prev + 1);
  };
  return (
    <div className="steps">
      <div className="numbers">
        {messages.map((msg, i) => (
          <div key={msg} className={currentStep === i + 1 ? 'active' : ''}>
            {i + 1}
          </div>
        ))}
      </div>

      <p className="message">
        Step {currentStep}: {messages[currentStep - 1]}
      </p>

      <div className="buttons">
        <button
          style={{ background: '#7950f2', color: '#fff' }}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          style={{ background: '#7950f2', color: '#fff' }}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
