export type ProductCategory = 'drone' | 'motor' | 'esc' | 'kamera' | 'vtx';

export interface ProductBase {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  image?: string;
  price?: number;
  purchaseUrl?: string;
}

export interface Drone extends ProductBase {
  category: 'drone';
  wheelbase: number;
  weight: number;
  flightController: string;
  motorSize: string;
  propSize: string;
  batterySpec: string;
  maxSpeed?: number;
  vtxPower?: number;
}

export interface Motor extends ProductBase {
  category: 'motor';
  size: string;
  kv: number;
  weight: number;
  maxThrust: number;
  testProp: string;
  voltage: string;
}

export interface ESC extends ProductBase {
  category: 'esc';
  current: number;
  burstCurrent: number;
  firmware: string;
  protocol: string;
  weight: number;
  voltage: string;
}

export interface Camera extends ProductBase {
  category: 'kamera';
  sensor: string;
  resolution: string;
  fov: number;
  latency: string;
  weight: number;
  voltage: string;
}

export interface VTX extends ProductBase {
  category: 'vtx';
  power: string;
  channels: number;
  protocol: string;
  weight: number;
  antenna: string;
}

export type Product = Drone | Motor | ESC | Camera | VTX;

export const categoryLabels: Record<ProductCategory, string> = {
  drone: 'Drone',
  motor: 'Motor',
  esc: 'ESC',
  kamera: 'Kamera',
  vtx: 'VTX',
};

export const categorySpecs: Record<ProductCategory, string[]> = {
  drone: ['wheelbase', 'weight', 'flightController', 'motorSize', 'propSize', 'batterySpec', 'maxSpeed', 'vtxPower'],
  motor: ['size', 'kv', 'weight', 'maxThrust', 'testProp', 'voltage'],
  esc: ['current', 'burstCurrent', 'firmware', 'protocol', 'weight', 'voltage'],
  kamera: ['sensor', 'resolution', 'fov', 'latency', 'weight', 'voltage'],
  vtx: ['power', 'channels', 'protocol', 'weight', 'antenna'],
};

export const specLabels: Record<string, string> = {
  wheelbase: 'Çerçeve (mm)',
  weight: 'Ağırlık (g)',
  flightController: 'Uçuş Kontrol',
  motorSize: 'Motor Boyutu',
  propSize: 'Pervane',
  batterySpec: 'Batarya',
  maxSpeed: 'Maks Hız (km/s)',
  vtxPower: 'VTX Gücü (mW)',
  size: 'Boyut',
  kv: 'KV',
  maxThrust: 'Maks İtki (g)',
  testProp: 'Test Pervanesi',
  voltage: 'Voltaj',
  current: 'Akım (A)',
  burstCurrent: 'Burst Akım (A)',
  firmware: 'Firmware',
  protocol: 'Protokol',
  sensor: 'Sensör',
  resolution: 'Çözünürlük',
  fov: 'FOV (°)',
  latency: 'Gecikme',
  antenna: 'Anten',
  channels: 'Kanal Sayısı',
  power: 'Güç',
};
