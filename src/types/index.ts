export interface Skip {
  id: number;
  name: string;
  size: string;
  price: number;
  priceBeforeVat: number;
  vat: number;
  hirePeriod: string;
  allowedOnRoad: boolean;
  allowsHeavyWaste: boolean;
  transportCost?: number;
  description?: string;
  capacity?: string;
}

export interface SkipApiResponse {
  skips: Skip[];
  location: {
    postcode: string;
    area: string;
  };
}

export interface ProgressStep {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
} 