
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define device types
export type DeviceType = 'light' | 'thermostat' | 'lock' | 'camera' | 'speaker';

// Define room types
export type RoomType = 'living_room' | 'kitchen' | 'bedroom' | 'bathroom' | 'office';

// Define device model
export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  room: RoomType;
  isOn: boolean;
  brightness?: number; // for lights
  temperature?: number; // for thermostats
  locked?: boolean; // for locks
  volume?: number; // for speakers
}

// Define room model with display name
export interface Room {
  id: RoomType;
  name: string;
  icon: string;
}

interface SmartHomeContextType {
  devices: Device[];
  rooms: Room[];
  selectedRoom: RoomType | 'all';
  toggleDevice: (id: string) => void;
  updateDeviceBrightness: (id: string, brightness: number) => void;
  updateDeviceTemperature: (id: string, temperature: number) => void;
  updateDeviceVolume: (id: string, volume: number) => void;
  toggleLock: (id: string) => void;
  selectRoom: (room: RoomType | 'all') => void;
}

const initialRooms: Room[] = [
  { id: 'living_room', name: 'Living Room', icon: '🛋️' },
  { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
  { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
  { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
  { id: 'office', name: 'Office', icon: '💼' }
];

const initialDevices: Device[] = [
  { id: '1', name: 'Living Room Light', type: 'light', room: 'living_room', isOn: true, brightness: 80 },
  { id: '2', name: 'Kitchen Light', type: 'light', room: 'kitchen', isOn: false, brightness: 60 },
  { id: '3', name: 'Bedroom Light', type: 'light', room: 'bedroom', isOn: false, brightness: 40 },
  { id: '4', name: 'Living Room AC', type: 'thermostat', room: 'living_room', isOn: true, temperature: 72 },
  { id: '5', name: 'Kitchen Thermostat', type: 'thermostat', room: 'kitchen', isOn: true, temperature: 68 },
  { id: '6', name: 'Front Door Lock', type: 'lock', room: 'living_room', isOn: true, locked: true },
  { id: '7', name: 'Office Speaker', type: 'speaker', room: 'office', isOn: false, volume: 50 },
  { id: '8', name: 'Living Room Camera', type: 'camera', room: 'living_room', isOn: true },
  { id: '9', name: 'Kitchen Speaker', type: 'speaker', room: 'kitchen', isOn: false, volume: 40 },
  { id: '10', name: 'Bedroom Thermostat', type: 'thermostat', room: 'bedroom', isOn: true, temperature: 70 },
  { id: '11', name: 'Office Light', type: 'light', room: 'office', isOn: true, brightness: 70 },
  { id: '12', name: 'Bathroom Light', type: 'light', room: 'bathroom', isOn: false, brightness: 60 }
];

const SmartHomeContext = createContext<SmartHomeContextType | undefined>(undefined);

export const SmartHomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | 'all'>('all');
  
  const toggleDevice = (id: string) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, isOn: !device.isOn } : device
    ));
  };
  
  const updateDeviceBrightness = (id: string, brightness: number) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, brightness } : device
    ));
  };
  
  const updateDeviceTemperature = (id: string, temperature: number) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, temperature } : device
    ));
  };
  
  const updateDeviceVolume = (id: string, volume: number) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, volume } : device
    ));
  };
  
  const toggleLock = (id: string) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, locked: !device.locked } : device
    ));
  };
  
  const selectRoom = (room: RoomType | 'all') => {
    setSelectedRoom(room);
  };
  
  return (
    <SmartHomeContext.Provider 
      value={{ 
        devices, 
        rooms: initialRooms,
        selectedRoom,
        toggleDevice, 
        updateDeviceBrightness, 
        updateDeviceTemperature,
        updateDeviceVolume,
        toggleLock,
        selectRoom
      }}
    >
      {children}
    </SmartHomeContext.Provider>
  );
};

export const useSmartHome = (): SmartHomeContextType => {
  const context = useContext(SmartHomeContext);
  if (!context) {
    throw new Error('useSmartHome must be used within a SmartHomeProvider');
  }
  return context;
};
