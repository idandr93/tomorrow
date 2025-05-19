export interface IAlerts {
  _id: string;
  name: string;
  email: string;
  location: string;
  parameters: string[];
  threshold: string;
}

export interface IAlertsResponse {
  _id: string;
  name?: string;
  email?: string;
  city?: string;
  coordinates?: string;
  parameters: string[];
  conditions: { [key: string]: { operator: string; value: string } };
  alertState: string;
  createdAt: string;
}

export interface ICreateAlert {
  name: string;
  email?: string;
  city?: string;
  coords?: string;
  parameters: string[];
  threshold: string;
}
export interface IUpdateAlert extends ICreateAlert {
  _id?: string;
}
