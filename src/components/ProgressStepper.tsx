import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { ProgressStep } from '../types';

interface ProgressStepperProps {
  steps: ProgressStep[];
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ steps }) => {
  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-6">
          <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto px-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center space-x-2">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      step.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : step.current
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }`}
                  >
                    {step.completed ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                      step.completed || step.current
                        ? 'text-gray-900'
                        : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-1 sm:mx-2 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper; 