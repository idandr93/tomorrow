export interface IAlerts {
  name: string;
  email: string;
  location: string;
  parameters: string;
  threshold: number;
}

export interface ICreateAlert {
  name: string;
  email?: string;
  city?: string;
  coords?: string;
  parameters: string;
  threshold: number;
}
