import React, { useState } from 'react';

const questions = [
  {
    id: 'role',
    question: 'What best describes your current role?',
    options: [
      { label: 'I own land or property I might want to sell', value: 'land_owner' },
      { label: 'I’m planning to build a custom home', value: 'future_homebuilder' },
      { label: 'I want to build an ADU or invest in property upgrades', value: 'investor' },
      { label: 'I’m a realtor or developer marketing a property', value: 'realtor' },
    ],
  },
  {
    id: 'stage',
    question: 'Where are you in the process?',
    options: [
      { label: 'Just exploring', value: 'exploring' },
      { label: 'Actively looking for land or design options', value: 'looking' },
      { label: 'Ready to plan, design, or list', value: 'ready' },
      { label: 'Already started and need support', value: 'started' },
    ],
  },
  {
    id: 'need',
    question: 'What kind of help do you need most right now?',
    options: [
      { label: 'Design visuals or renderings', value: 'visuals' },
      { label: 'Help finding the right lot to build on', value: 'find_lot' },
      { label: 'Zoning support and feasibility', value: 'zoning' },
      { label: 'Marketing strategy and listing support', value: 'marketing' },
      { label: 'Guidance for adding an ADU', value: 'adu' },
    ],
  },
  {
    id: 'goal',
    question: 'What do you ultimately want to achieve?',
    options: [
      { label: 'Sell it for maximum value', value: 'sell' },
      { label: 'Build a custom home', value: 'build' },
      { label: 'Create rental or living space', value: 'rental' },
      { label: 'Attract buyers or investors', value: 'attract' },
      { label: 'Increase long-term value', value: 'value' },
    ],
  },
  {
    id: 'timeline',
    question: 'When are you hoping to move forward?',
    options: [
      { label: 'Immediately (next 1–2 months)', value: 'now' },
      { label: 'In the next 3–6 months', value: 'soon' },
      { label: '6+ months or just researching', value: 'later' },
    ],
  },
];

const resultDetails = {
  'Land Owners & Sellers': {
    description:
      'We help you turn your property into a story, complete with visuals, marketing support, and featured listings to maximize value.',
    cta: 'https://www.lotplan.ca/landowners-sellers',
    ctaText: 'Explore Services for Land Owners',
  },
  'Future Homebuilders': {
    description:
      'From finding the perfect lot to visualizing what’s possible, we help you plan your custom home journey.',
    cta: 'https://www.lotplan.ca/future-homebuilders',
    ctaText: 'Start Planning Your Custom Home',
  },
  'Homeowners & Investors': {
    description:
      'We guide you through ADU design and permitting that adds rental or living space and increases property value.',
    cta: 'https://www.lotplan.ca/homeowners-investors',
    ctaText: 'Get ADU Design Help',
  },
  'Realtors & Developers': {
    description:
      'We offer premium visuals, signage, and marketing strategy to help your listings stand out and sell fast.',
    cta: 'https://www.lotplan.ca/realtors-developers',
    ctaText: 'Boost Your Listings',
  },
};

const resultMapping = (answers) => {
  const { role, goal, need } = answers;
  if (role === 'realtor' || need === 'marketing' || goal === 'attract') return 'Realtors & Developers';
  if (role === 'land_owner' && (goal === 'sell' || need === 'marketing')) return 'Land Owners & Sellers';
  if (role === 'investor' && (goal === 'rental' || need === 'adu' || need === 'zoning'))
    return 'Homeowners & Investors';
  return 'Future Homebuilders';
};

export default function LotPlanServiceQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const matchedResult = resultMapping(answers);
      setResult(matchedResult);
    }
  };

  if (result) {
    const { description, ctaText, cta } = resultDetails[result];
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 text-center bg-white rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Ideal LotPlan Service:</h2>
        <p className="text-xl text-[#449955] font-medium mb-4">{result}</p>
        <p className="mb-6 text-gray-600">{description}</p>

        {/* ✅ Opens result page in a new tab */}
        <a
          href={cta}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-md mx-auto mb-4 inline-block bg-[#449955] text-white px-4 py-2 rounded"
        >
          {ctaText}
        </a>

        <button
          onClick={() => {
            setStep(0);
            setAnswers({});
            setResult(null);
          }}
          className="border border-gray-400 px-4 py-2 rounded"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[step];

  return (
    <div className="w-full max-w-xl mx-auto mt-6 px-4 sm:px-6 bg-white ...">
      {/* ✅ Green Progress Dots */}
      <div className="flex justify-center mb-6">
        {questions.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full mx-1 transition-all duration-300 ${
              index === step ? 'bg-[#449955]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">{currentQuestion.question}</h2>

      <div className="space-y-4">
        {currentQuestion.options.map((option) => (
          <label key={option.value} className="flex items-center gap-3 text-gray-700">
            <input
              type="radio"
              name={currentQuestion.id}
              value={option.value}
              checked={answers[currentQuestion.id] === option.value}
              onChange={() => handleChange(currentQuestion.id, option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>

      <div className="mt-6 text-right">
        <button
          disabled={!answers[currentQuestion.id]}
          onClick={handleNext}
          className="bg-[#449955] text-white px-6 py-2 rounded-full disabled:opacity-50"
        >
          {step === questions.length - 1 ? 'See My Result' : 'Next'}
        </button>
      </div>
    </div>
  );
}
