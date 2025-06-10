import React from 'react';
import { Clock, Shield, AlertTriangle, Truck, Package } from 'lucide-react';
import { Skip } from '../types';
import skipImage from '../assets/images/skip.webp';

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onClick: () => void;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onClick }) => {
  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isSelected ? 'shadow-2xl' : ''
      }`}
      onClick={onClick}
    >
      {/* Selection outline with proper rounded corners */}
      {isSelected && (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur-sm opacity-75 animate-pulse"></div>
      )}
      
      <div
        className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 ${
          isSelected
            ? 'border-blue-500 shadow-2xl bg-gradient-to-br from-white to-blue-50'
            : 'border-gray-100 hover:border-gray-200 hover:shadow-xl'
        }`}
      >
        {/* Skip Image as Background */}
        <div 
          className="relative h-48 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center"
          style={{
            backgroundImage: `url(${skipImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        >
          {/* Subtle overlay to ensure the background image blends well */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20"></div>
          
          {/* Size badge */}
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow-md transition-all z-10 ${
              isSelected
                ? 'bg-blue-500 text-white scale-110'
                : 'bg-white text-gray-800'
            }`}
          >
            {skip.size}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Header with name and price */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                {skip.name}
              </h3>
              {/* Capacity with icon - moved above hire period */}
              {skip.capacity && (
                <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-1">
                  <Package className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-400" />
                  <span>{skip.capacity}</span>
                </div>
              )}
              {/* Hire period - moved below capacity */}
              <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span>{skip.hirePeriod}</span>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl sm:text-3xl font-bold transition-colors ${isSelected ? 'text-blue-700' : 'text-blue-600'}`}>
                £{skip.price}
              </div>
              <div className="text-xs text-gray-500">
                £{skip.priceBeforeVat} + VAT
              </div>
            </div>
          </div>

          {/* Short Description */}
          {skip.description && (
            <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">
              {skip.description}
            </p>
          )}

          {/* Key Requirements & Warnings - Better positioned badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {skip.allowedOnRoad ? (
              <div className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                <Shield className="w-3 h-3 mr-1" />
                Road OK
              </div>
            ) : (
              <div className="flex items-center px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Permit Needed
              </div>
            )}
            
            {skip.allowsHeavyWaste && (
              <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                <Truck className="w-3 h-3 mr-1" />
                Heavy Waste
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
              isSelected
                ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isSelected ? 'Selected' : 'Select This Skip'}
          </button>
        </div>

        {/* Enhanced Selection Indicator */}
        {isSelected && (
          <div className="absolute top-0 left-0 w-full h-full bg-blue-500 bg-opacity-5 pointer-events-none rounded-2xl">
            <div className="absolute top-4 left-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/10 to-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkipCard; 