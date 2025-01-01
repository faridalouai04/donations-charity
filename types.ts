// src/types.ts
export interface Charity {
  id: string;
  name: string;
  description: string;
  location: string;
  websiteURL: string;
  contactInfo: string;
  documentStatus: 'Pending' | 'Approved' | 'Declined';
  documentPath?: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  preferredCurrency: string;
  startDate: string;
  endDate: string;
  status: 'ENUM' | 'Active' | 'Ended';
  charityId: string;
}

export interface Donor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  preferredLanguage: string;
  address: string;
  createdAt: string;
}