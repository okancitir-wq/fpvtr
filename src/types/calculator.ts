export interface FrequencyChannel {
  channel: number;
  frequency: number;
}

export interface FrequencyBand {
  band: string;
  label: string;
  channels: FrequencyChannel[];
}

export interface PidValues {
  p: number;
  i: number;
  d: number;
}

export interface PidProfile {
  roll: PidValues;
  pitch: PidValues;
  yaw: PidValues;
  description: string;
}

export interface MotorThrustResult {
  rpm: number;
  thrustPerMotor: number;
  totalThrust: number;
  thrustToWeightRatio: number;
  recommendation: string;
  color: string;
}
