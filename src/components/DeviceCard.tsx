
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Device, useSmartHome } from '@/contexts/SmartHomeContext';
import { Lightbulb, Thermometer, Lock, Camera, Volume2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface DeviceCardProps {
  device: Device;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
  const { 
    toggleDevice, 
    updateDeviceBrightness,
    updateDeviceTemperature,
    updateDeviceVolume,
    toggleLock 
  } = useSmartHome();

  const renderDeviceIcon = () => {
    switch (device.type) {
      case 'light':
        return <Lightbulb className={cn("h-5 w-5", device.isOn ? "text-smart-warning" : "text-gray-400")} />;
      case 'thermostat':
        return <Thermometer className={cn("h-5 w-5", device.isOn ? "text-smart-success" : "text-gray-400")} />;
      case 'lock':
        return <Lock className={cn("h-5 w-5", device.isOn ? "text-smart-blue" : "text-gray-400")} />;
      case 'camera':
        return <Camera className={cn("h-5 w-5", device.isOn ? "text-smart-danger" : "text-gray-400")} />;
      case 'speaker':
        return <Volume2 className={cn("h-5 w-5", device.isOn ? "text-smart-teal" : "text-gray-400")} />;
      default:
        return null;
    }
  };

  const renderDeviceControls = () => {
    if (!device.isOn) {
      return <div className="text-gray-500 text-sm">Device is off</div>;
    }

    switch (device.type) {
      case 'light':
        return (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Brightness</span>
              <span className="text-sm">{device.brightness}%</span>
            </div>
            <Slider 
              defaultValue={[device.brightness || 0]} 
              max={100} 
              step={1}
              onValueChange={([value]) => updateDeviceBrightness(device.id, value)}
              className="mt-2"
            />
          </div>
        );
      case 'thermostat':
        return (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Temperature</span>
              <span className="text-sm">{device.temperature}°F</span>
            </div>
            <Slider 
              defaultValue={[device.temperature || 68]} 
              min={60} 
              max={80} 
              step={1}
              onValueChange={([value]) => updateDeviceTemperature(device.id, value)}
              className="mt-2"
            />
          </div>
        );
      case 'lock':
        return (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium">Status</span>
            <Badge variant={device.locked ? "default" : "destructive"}>
              {device.locked ? "Locked" : "Unlocked"}
            </Badge>
          </div>
        );
      case 'speaker':
        return (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Volume</span>
              <span className="text-sm">{device.volume}%</span>
            </div>
            <Slider 
              defaultValue={[device.volume || 0]} 
              max={100} 
              step={1}
              onValueChange={([value]) => updateDeviceVolume(device.id, value)}
              className="mt-2"
            />
          </div>
        );
      case 'camera':
        return (
          <div className="mt-4">
            <Badge variant="outline" className="bg-smart-gray">
              Live Stream Available
            </Badge>
          </div>
        );
      default:
        return null;
    }
  };

  const handleAction = () => {
    if (device.type === 'lock') {
      toggleLock(device.id);
    } else {
      toggleDevice(device.id);
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-300",
      device.isOn ? "border-l-4 border-l-smart-blue" : "border-l-4 border-l-gray-200"
    )}>
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center">
          {renderDeviceIcon()}
          <CardTitle className="text-lg ml-2 font-medium">{device.name}</CardTitle>
        </div>
        <div>
          {device.type === 'lock' ? (
            <Switch 
              checked={device.locked} 
              onCheckedChange={handleAction}
              className="data-[state=checked]:bg-smart-blue"
            />
          ) : (
            <Switch 
              checked={device.isOn} 
              onCheckedChange={handleAction}
              className="data-[state=checked]:bg-smart-blue"
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {renderDeviceControls()}
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
