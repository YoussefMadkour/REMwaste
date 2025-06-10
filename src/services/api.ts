import axios from 'axios';
import { Skip, SkipApiResponse } from '../types';

const API_BASE_URL = 'https://app.wewantwaste.co.uk/api';

// API response interface based on actual API structure
interface ApiSkip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

// Function to transform API skip data to our Skip interface
const transformApiSkip = (apiSkip: ApiSkip): Skip => {
  // Calculate total price including VAT
  const basePrice = apiSkip.price_before_vat * (1 + apiSkip.vat / 100);
  const totalPrice = Math.round(basePrice);
  
  return {
    id: apiSkip.id,
    name: `${apiSkip.size} Yard Skip`,
    size: `${apiSkip.size} Yards`,
    price: totalPrice,
    priceBeforeVat: apiSkip.price_before_vat,
    vat: apiSkip.vat,
    hirePeriod: `${apiSkip.hire_period_days} day hire period`,
    allowedOnRoad: apiSkip.allowed_on_road,
    allowsHeavyWaste: apiSkip.allows_heavy_waste,
    transportCost: apiSkip.transport_cost || undefined,
    capacity: getCapacityBySize(apiSkip.size),
    description: getDescriptionBySize(apiSkip.size)
  };
};

// Helper function to get capacity description by size
const getCapacityBySize = (size: number): string => {
  const capacityMap: { [key: number]: string } = {
    4: '30-40 bin bags',
    6: '50-60 bin bags',
    8: '60-80 bin bags',
    10: '80-100 bin bags',
    12: '100-120 bin bags',
    14: '120-140 bin bags',
    16: '140-160 bin bags',
    20: '160-200 bin bags',
    40: '300-400 bin bags'
  };
  return capacityMap[size] || `${size * 10}-${size * 12} bin bags`;
};

// Helper function to get description by size
const getDescriptionBySize = (size: number): string => {
  const descriptionMap: { [key: number]: string } = {
    4: 'Perfect for small home clearances, garden waste, and light DIY projects.',
    6: 'Ideal for medium home renovations, kitchen or bathroom refits.',
    8: 'Great for larger home clearances, construction waste, and major garden projects.',
    10: 'Perfect for large construction projects and commercial waste disposal.',
    12: 'Suitable for large commercial projects and extensive home renovations.',
    14: 'Our largest domestic skip for major construction and commercial waste disposal.',
    16: 'Extra large skip for major construction projects and commercial use.',
    20: 'Commercial skip ideal for construction sites and large-scale projects.',
    40: 'Large commercial skip for major construction and industrial waste disposal.'
  };
  return descriptionMap[size] || `Suitable for projects requiring ${size} yards of waste disposal.`;
};



// No mock data - using real API only

export const fetchSkipsByLocation = async (postcode: string, area?: string): Promise<SkipApiResponse> => {
  try {
    const params = new URLSearchParams({ postcode });
    if (area) params.append('area', area);
    
    const response = await axios.get(`${API_BASE_URL}/skips/by-location?${params.toString()}`);
    
    // Transform API response to match our expected format
    const apiSkips: ApiSkip[] = response.data;
    const transformedSkips: Skip[] = apiSkips.map(transformApiSkip);
    
    console.log('API Response - Raw skips:', apiSkips.length, 'skips');
    console.log('API Response - Transformed skips:', transformedSkips);
    
    return {
      skips: transformedSkips,
      location: {
        postcode,
        area: area || ''
      }
    };
  } catch (error) {
    console.error('Failed to fetch skips from API:', error);
    
    // Throw error - no fallback data
    throw new Error('Unable to load skip data. Please check your internet connection and try again.');
  }
}; 