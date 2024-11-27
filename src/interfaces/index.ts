export interface ShipmentData {
  provider: string; // e.g., "Bosta"
  CurrentStatus: {
    state: string; // e.g., "DELIVERED", "CANCELLED", "DELIVERED_TO_SENDER"
    timestamp: string; // ISO 8601 date format
    reason?: string; // Optional: Reason for specific states like cancellation
  };
  PromisedDate: string; // The promised delivery date (ISO 8601 format)
  TrackingNumber: string; // Unique identifier for the shipment
  TrackingURL: string; // URL to track the shipment
  CreateDate: string; // ISO 8601 date format of when the shipment was created
  TransitEvents: TransitEvent[]; // Array of events in the shipment lifecycle
  isEditableShipment: boolean; // Indicates if the shipment can be edited
  isOnlinePaymentFeatureEnabled: boolean; // Indicates if online payment is enabled
  SupportPhoneNumbers: string[]; // Array of support phone numbers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextWorkingDay?: any; // Placeholder for additional structure, if defined
}

export interface TransitEvent {
  state: string; // e.g., "TICKET_CREATED", "PACKAGE_RECEIVED"
  timestamp: string; // ISO 8601 date format
  hub?: string; // Optional: Hub location where the event occurred
  reason?: string; // Optional: Reason for specific states like cancellation
}
