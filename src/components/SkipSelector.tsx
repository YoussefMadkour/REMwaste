import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Loader2, Filter, ChevronDown } from 'lucide-react';
import { Skip, ProgressStep } from '../types';
import { fetchSkipsByLocation } from '../services/api';
import ProgressStepper from './ProgressStepper';
import SkipCard from './SkipCard';

interface FilterState {
  size: string;
  allowedOnRoad: string;
  heavyWaste: string;
  sortBy: 'price' | 'size';
}

const SkipSelector: React.FC = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    size: 'all',
    allowedOnRoad: 'all',
    heavyWaste: 'all',
    sortBy: 'price'
  });

  // Ref for the selected skip summary section
  const selectedSectionRef = useRef<HTMLDivElement>(null);

  const progressSteps: ProgressStep[] = [
    { id: 'postcode', label: 'Postcode', completed: true, current: false },
    { id: 'waste-type', label: 'Waste Type', completed: true, current: false },
    { id: 'select-skip', label: 'Select Skip', completed: false, current: true },
    { id: 'permit-check', label: 'Permit Check', completed: false, current: false },
    { id: 'choose-date', label: 'Choose Date', completed: false, current: false },
    { id: 'payment', label: 'Payment', completed: false, current: false },
  ];

  useEffect(() => {
    loadSkips();
  }, []);

  // Smooth scroll to selected section when a skip is selected
  useEffect(() => {
    if (selectedSkip && selectedSectionRef.current) {
      setTimeout(() => {
        selectedSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [selectedSkip]);

  const loadSkips = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchSkipsByLocation('NR32', 'Lowestoft');
      setSkips(response.skips);
    } catch (err) {
      setError('Failed to load skip options. Please try again.');
      console.error('Error loading skips:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedSkips = React.useMemo(() => {
    let filtered = skips;
    
    // Filter by size
    if (filters.size !== 'all') {
      if (filters.size === '16+') {
        filtered = filtered.filter(skip => {
          const sizeNumber = parseInt(skip.size);
          return sizeNumber >= 16;
        });
      } else {
        filtered = filtered.filter(skip => skip.size.includes(filters.size));
      }
    }
    
    // Filter by road placement
    if (filters.allowedOnRoad !== 'all') {
      filtered = filtered.filter(skip => 
        filters.allowedOnRoad === 'yes' ? skip.allowedOnRoad : !skip.allowedOnRoad
      );
    }
    
    // Filter by heavy waste
    if (filters.heavyWaste !== 'all') {
      filtered = filtered.filter(skip => 
        filters.heavyWaste === 'yes' ? skip.allowsHeavyWaste : !skip.allowsHeavyWaste
      );
    }
    
    // Sort results
    return filtered.sort((a, b) => {
      if (filters.sortBy === 'price') {
        return a.price - b.price;
      } else {
        const aSizeNumber = parseInt(a.size);
        const bSizeNumber = parseInt(b.size);
        return aSizeNumber - bSizeNumber;
      }
    });
  }, [skips, filters]);

  const handleSkipSelect = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  const handleContinue = () => {
    if (selectedSkip) {
      alert(`Selected: ${selectedSkip.name} for £${selectedSkip.price}`);
      // Here you would navigate to the next step
    }
  };

  const handleBack = () => {
    // Here you would navigate to the previous step
    alert('Going back to waste type selection');
  };

  const clearFilters = () => {
    setFilters({
      size: 'all',
      allowedOnRoad: 'all',
      heavyWaste: 'all',
      sortBy: 'price'
    });
  };

  const activeFilterCount = Object.values(filters).filter(value => value !== 'all' && value !== 'price').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProgressStepper steps={progressSteps} />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600">Loading skip options...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProgressStepper steps={progressSteps} />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadSkips}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressStepper steps={progressSteps} />
      
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Skip
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Select the skip size that best fits your project needs. All prices include delivery, collection, and disposal.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filter Toggle & Results Count */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                showFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <span className="text-gray-600 text-sm">
              {filteredAndSortedSkips.length} skip{filteredAndSortedSkips.length !== 1 ? 's' : ''} found
            </span>
          </div>
          
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Collapsible Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Skip Size Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skip Size</label>
                <select
                  value={filters.size}
                  onChange={(e) => setFilters({...filters, size: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Sizes</option>
                  <option value="4">4 Yard</option>
                  <option value="6">6 Yard</option>
                  <option value="8">8 Yard</option>
                  <option value="10">10 Yard</option>
                  <option value="12">12 Yard</option>
                  <option value="14">14 Yard</option>
                  <option value="16+">16+ Yard</option>
                </select>
              </div>

              {/* Road Placement Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Road Placement</label>
                <select
                  value={filters.allowedOnRoad}
                  onChange={(e) => setFilters({...filters, allowedOnRoad: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Options</option>
                  <option value="yes">Road OK</option>
                  <option value="no">Permit Needed</option>
                </select>
              </div>

              {/* Heavy Waste Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Heavy Waste</label>
                <select
                  value={filters.heavyWaste}
                  onChange={(e) => setFilters({...filters, heavyWaste: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Options</option>
                  <option value="yes">Heavy Waste OK</option>
                  <option value="no">Light Waste Only</option>
                </select>
              </div>

              {/* Sort By Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value as 'price' | 'size'})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="price">Price (Low to High)</option>
                  <option value="size">Size (Small to Large)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Skip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredAndSortedSkips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkip?.id === skip.id}
              onClick={() => handleSkipSelect(skip)}
            />
          ))}
        </div>

        {/* No Results Message */}
        {filteredAndSortedSkips.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No skips match your current filters.</p>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters to see all options
            </button>
          </div>
        )}

        {/* Selected Skip Summary */}
        {selectedSkip && (
          <div 
            ref={selectedSectionRef}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-8 animate-fade-in shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2">
                  Selected: {selectedSkip.name}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-blue-700">
                  <span>£{selectedSkip.priceBeforeVat} + VAT (£{selectedSkip.price} total)</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{selectedSkip.hirePeriod}</span>
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-blue-600">
                £{selectedSkip.price}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <button
            onClick={handleContinue}
            disabled={!selectedSkip}
            className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all ${
              selectedSkip
                ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipSelector; 