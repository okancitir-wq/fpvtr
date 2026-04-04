import type { FrequencyBand, PidProfile, MotorThrustResult } from "@/types/calculator";

// 5.8GHz Frequency Band Table
export const frequencyBands: FrequencyBand[] = [
  {
    band: "A",
    label: "Band A (Boscam A)",
    channels: [
      { channel: 1, frequency: 5865 },
      { channel: 2, frequency: 5845 },
      { channel: 3, frequency: 5825 },
      { channel: 4, frequency: 5805 },
      { channel: 5, frequency: 5785 },
      { channel: 6, frequency: 5765 },
      { channel: 7, frequency: 5745 },
      { channel: 8, frequency: 5725 },
    ],
  },
  {
    band: "B",
    label: "Band B (Boscam B)",
    channels: [
      { channel: 1, frequency: 5733 },
      { channel: 2, frequency: 5752 },
      { channel: 3, frequency: 5771 },
      { channel: 4, frequency: 5790 },
      { channel: 5, frequency: 5809 },
      { channel: 6, frequency: 5828 },
      { channel: 7, frequency: 5847 },
      { channel: 8, frequency: 5866 },
    ],
  },
  {
    band: "E",
    label: "Band E",
    channels: [
      { channel: 1, frequency: 5705 },
      { channel: 2, frequency: 5685 },
      { channel: 3, frequency: 5665 },
      { channel: 4, frequency: 5645 },
      { channel: 5, frequency: 5885 },
      { channel: 6, frequency: 5905 },
      { channel: 7, frequency: 5925 },
      { channel: 8, frequency: 5945 },
    ],
  },
  {
    band: "F",
    label: "Band F (ImmersionRC/FatShark)",
    channels: [
      { channel: 1, frequency: 5740 },
      { channel: 2, frequency: 5760 },
      { channel: 3, frequency: 5780 },
      { channel: 4, frequency: 5800 },
      { channel: 5, frequency: 5820 },
      { channel: 6, frequency: 5840 },
      { channel: 7, frequency: 5860 },
      { channel: 8, frequency: 5880 },
    ],
  },
  {
    band: "R",
    label: "Band R (Raceband)",
    channels: [
      { channel: 1, frequency: 5658 },
      { channel: 2, frequency: 5695 },
      { channel: 3, frequency: 5732 },
      { channel: 4, frequency: 5769 },
      { channel: 5, frequency: 5806 },
      { channel: 6, frequency: 5843 },
      { channel: 7, frequency: 5880 },
      { channel: 8, frequency: 5917 },
    ],
  },
  {
    band: "L",
    label: "Band L (Low Band)",
    channels: [
      { channel: 1, frequency: 5362 },
      { channel: 2, frequency: 5399 },
      { channel: 3, frequency: 5436 },
      { channel: 4, frequency: 5473 },
      { channel: 5, frequency: 5510 },
      { channel: 6, frequency: 5547 },
      { channel: 7, frequency: 5584 },
      { channel: 8, frequency: 5621 },
    ],
  },
];

export function findByFrequency(
  freq: number
): { band: string; channel: number } | null {
  for (const band of frequencyBands) {
    for (const ch of band.channels) {
      if (Math.abs(ch.frequency - freq) <= 2) {
        return { band: band.band, channel: ch.channel };
      }
    }
  }
  return null;
}

// PID recommendations
type FrameSize = "3" | "5" | "7";
type WeightClass = "hafif" | "orta" | "agir";
type FlyStyle = "freestyle" | "yaris" | "sinematik";

const pidTable: Record<FrameSize, Record<WeightClass, Record<FlyStyle, PidProfile>>> = {
  "3": {
    hafif: {
      freestyle: { roll: { p: 55, i: 80, d: 35 }, pitch: { p: 58, i: 85, d: 38 }, yaw: { p: 40, i: 90, d: 0 }, description: "3\" hafif freestyle" },
      yaris: { roll: { p: 65, i: 70, d: 30 }, pitch: { p: 68, i: 75, d: 32 }, yaw: { p: 45, i: 85, d: 0 }, description: "3\" hafif yarış" },
      sinematik: { roll: { p: 40, i: 90, d: 30 }, pitch: { p: 42, i: 95, d: 32 }, yaw: { p: 35, i: 95, d: 0 }, description: "3\" hafif sinematik" },
    },
    orta: {
      freestyle: { roll: { p: 50, i: 75, d: 32 }, pitch: { p: 53, i: 80, d: 35 }, yaw: { p: 38, i: 88, d: 0 }, description: "3\" orta freestyle" },
      yaris: { roll: { p: 60, i: 65, d: 28 }, pitch: { p: 63, i: 70, d: 30 }, yaw: { p: 42, i: 82, d: 0 }, description: "3\" orta yarış" },
      sinematik: { roll: { p: 38, i: 85, d: 28 }, pitch: { p: 40, i: 90, d: 30 }, yaw: { p: 32, i: 92, d: 0 }, description: "3\" orta sinematik" },
    },
    agir: {
      freestyle: { roll: { p: 45, i: 70, d: 30 }, pitch: { p: 48, i: 75, d: 32 }, yaw: { p: 35, i: 85, d: 0 }, description: "3\" ağır freestyle" },
      yaris: { roll: { p: 55, i: 60, d: 25 }, pitch: { p: 58, i: 65, d: 28 }, yaw: { p: 40, i: 80, d: 0 }, description: "3\" ağır yarış" },
      sinematik: { roll: { p: 35, i: 80, d: 25 }, pitch: { p: 38, i: 85, d: 28 }, yaw: { p: 30, i: 90, d: 0 }, description: "3\" ağır sinematik" },
    },
  },
  "5": {
    hafif: {
      freestyle: { roll: { p: 48, i: 80, d: 38 }, pitch: { p: 50, i: 85, d: 42 }, yaw: { p: 38, i: 90, d: 0 }, description: "5\" hafif freestyle" },
      yaris: { roll: { p: 58, i: 70, d: 32 }, pitch: { p: 60, i: 75, d: 35 }, yaw: { p: 42, i: 85, d: 0 }, description: "5\" hafif yarış" },
      sinematik: { roll: { p: 35, i: 90, d: 32 }, pitch: { p: 38, i: 95, d: 35 }, yaw: { p: 30, i: 95, d: 0 }, description: "5\" hafif sinematik" },
    },
    orta: {
      freestyle: { roll: { p: 45, i: 75, d: 35 }, pitch: { p: 48, i: 80, d: 40 }, yaw: { p: 35, i: 88, d: 0 }, description: "5\" orta freestyle" },
      yaris: { roll: { p: 55, i: 65, d: 30 }, pitch: { p: 58, i: 70, d: 33 }, yaw: { p: 40, i: 82, d: 0 }, description: "5\" orta yarış" },
      sinematik: { roll: { p: 32, i: 85, d: 30 }, pitch: { p: 35, i: 90, d: 33 }, yaw: { p: 28, i: 92, d: 0 }, description: "5\" orta sinematik" },
    },
    agir: {
      freestyle: { roll: { p: 42, i: 70, d: 32 }, pitch: { p: 45, i: 75, d: 38 }, yaw: { p: 32, i: 85, d: 0 }, description: "5\" ağır freestyle" },
      yaris: { roll: { p: 50, i: 60, d: 28 }, pitch: { p: 53, i: 65, d: 30 }, yaw: { p: 38, i: 80, d: 0 }, description: "5\" ağır yarış" },
      sinematik: { roll: { p: 30, i: 80, d: 28 }, pitch: { p: 32, i: 85, d: 30 }, yaw: { p: 25, i: 90, d: 0 }, description: "5\" ağır sinematik" },
    },
  },
  "7": {
    hafif: {
      freestyle: { roll: { p: 40, i: 75, d: 35 }, pitch: { p: 42, i: 80, d: 38 }, yaw: { p: 32, i: 88, d: 0 }, description: "7\" hafif freestyle" },
      yaris: { roll: { p: 48, i: 65, d: 30 }, pitch: { p: 50, i: 70, d: 32 }, yaw: { p: 38, i: 82, d: 0 }, description: "7\" hafif yarış" },
      sinematik: { roll: { p: 30, i: 85, d: 30 }, pitch: { p: 32, i: 90, d: 32 }, yaw: { p: 25, i: 92, d: 0 }, description: "7\" hafif sinematik" },
    },
    orta: {
      freestyle: { roll: { p: 38, i: 70, d: 32 }, pitch: { p: 40, i: 75, d: 35 }, yaw: { p: 30, i: 85, d: 0 }, description: "7\" orta freestyle" },
      yaris: { roll: { p: 45, i: 60, d: 28 }, pitch: { p: 48, i: 65, d: 30 }, yaw: { p: 35, i: 80, d: 0 }, description: "7\" orta yarış" },
      sinematik: { roll: { p: 28, i: 80, d: 28 }, pitch: { p: 30, i: 85, d: 30 }, yaw: { p: 22, i: 90, d: 0 }, description: "7\" orta sinematik" },
    },
    agir: {
      freestyle: { roll: { p: 35, i: 65, d: 30 }, pitch: { p: 38, i: 70, d: 32 }, yaw: { p: 28, i: 82, d: 0 }, description: "7\" ağır freestyle" },
      yaris: { roll: { p: 42, i: 55, d: 25 }, pitch: { p: 45, i: 60, d: 28 }, yaw: { p: 32, i: 78, d: 0 }, description: "7\" ağır yarış" },
      sinematik: { roll: { p: 25, i: 75, d: 25 }, pitch: { p: 28, i: 80, d: 28 }, yaw: { p: 20, i: 88, d: 0 }, description: "7\" ağır sinematik" },
    },
  },
};

export function getPidRecommendation(
  frameSize: FrameSize,
  weight: WeightClass,
  style: FlyStyle
): PidProfile {
  return pidTable[frameSize]?.[weight]?.[style] ?? pidTable["5"]["orta"]["freestyle"];
}

export function generateBetaflightCommands(profile: PidProfile): string {
  return [
    `set p_roll = ${profile.roll.p}`,
    `set i_roll = ${profile.roll.i}`,
    `set d_roll = ${profile.roll.d}`,
    `set p_pitch = ${profile.pitch.p}`,
    `set i_pitch = ${profile.pitch.i}`,
    `set d_pitch = ${profile.pitch.d}`,
    `set p_yaw = ${profile.yaw.p}`,
    `set i_yaw = ${profile.yaw.i}`,
    `save`,
  ].join("\n");
}

// Motor thrust calculator
const cellVoltage = 3.7; // nominal

// Simplified thrust lookup by prop size (grams per motor at full throttle, baseline for 2306/1800KV on 6S)
const propThrustBase: Record<string, number> = {
  "3": 450,
  "4": 900,
  "5": 1500,
  "5.1": 1650,
  "6": 2000,
  "7": 2500,
};

export function calculateMotorThrust(
  kv: number,
  cells: number,
  propSize: string,
  motorCount: number,
  auw: number
): MotorThrustResult {
  const voltage = cells * cellVoltage;
  const rpm = kv * voltage;

  // Scale thrust based on KV and voltage relative to baseline (1800KV, 6S)
  const baseThrust = propThrustBase[propSize] ?? 1500;
  const kvFactor = kv / 1800;
  const voltageFactor = voltage / (6 * cellVoltage);
  const thrustPerMotor = Math.round(baseThrust * kvFactor * voltageFactor);
  const totalThrust = thrustPerMotor * motorCount;
  const ratio = totalThrust / auw;

  let recommendation: string;
  let color: string;

  if (ratio < 3) {
    recommendation = "Düşük itki/ağırlık oranı. Drone ağır hissedecek, taşıma amaçlı uygundur.";
    color = "text-red-400";
  } else if (ratio < 5) {
    recommendation = "İyi itki/ağırlık oranı. Sinematik uçuş ve genel freestyle için uygun.";
    color = "text-yellow-400";
  } else if (ratio < 8) {
    recommendation = "Çok iyi itki/ağırlık oranı. Agresif freestyle ve yarış için ideal.";
    color = "text-fpv-lime";
  } else {
    recommendation = "Aşırı yüksek itki/ağırlık oranı. Yarış odaklı, çok tepkili olacaktır.";
    color = "text-fpv-cyan";
  }

  return {
    rpm,
    thrustPerMotor,
    totalThrust,
    thrustToWeightRatio: Math.round(ratio * 100) / 100,
    recommendation,
    color,
  };
}
