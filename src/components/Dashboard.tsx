
import React from 'react';
import { useSmartHome, RoomType } from '@/contexts/SmartHomeContext';
import DeviceCard from './DeviceCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard: React.FC = () => {
  const { devices, rooms, selectedRoom } = useSmartHome();

  // Get devices for the selected room or all devices
  const filteredDevices = selectedRoom === 'all' 
    ? devices 
    : devices.filter(device => device.room === selectedRoom);

  // Count active devices
  const activeDevices = devices.filter(device => device.isOn).length;

  // Group devices by room if showing all
  const devicesByRoom = selectedRoom === 'all' 
    ? devices.reduce<Record<string, typeof devices>>((acc, device) => {
        if (!acc[device.room]) {
          acc[device.room] = [];
        }
        acc[device.room].push(device);
        return acc;
      }, {})
    : { [selectedRoom]: filteredDevices };

  // Get room name from id
  const getRoomName = (roomId: RoomType) => {
    return rooms.find(room => room.id === roomId)?.name || 'Unknown Room';
  };

  // Get stats for the current view
  const getStats = () => {
    const relevantDevices = selectedRoom === 'all' ? devices : filteredDevices;
    const totalDevices = relevantDevices.length;
    const activeCount = relevantDevices.filter(d => d.isOn).length;
    
    return {
      total: totalDevices,
      active: activeCount,
      inactive: totalDevices - activeCount
    };
  };

  const stats = getStats();

  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {selectedRoom === 'all' ? 'Smart Home Dashboard' : `${getRoomName(selectedRoom)} Devices`}
        </h1>
        <p className="text-gray-500">
          {selectedRoom === 'all' 
            ? `Monitoring all ${devices.length} devices across your home` 
            : `Managing ${filteredDevices.length} devices in ${getRoomName(selectedRoom)}`
          }
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-lg font-medium">Total Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
            <p className="text-sm text-gray-500">Connected devices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-lg font-medium text-smart-success">Active Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-smart-success">{stats.active}</p>
            <p className="text-sm text-gray-500">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-lg font-medium text-gray-500">Inactive Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-500">{stats.inactive}</p>
            <p className="text-sm text-gray-500">Currently off</p>
          </CardContent>
        </Card>
      </div>

      {/* Devices Grid */}
      {selectedRoom === 'all' ? (
        Object.entries(devicesByRoom).map(([roomId, roomDevices]) => (
          <div key={roomId} className="mb-8">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold">{getRoomName(roomId as RoomType)}</h2>
              <Badge variant="outline" className="ml-2">
                {roomDevices.length} devices
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {roomDevices.map(device => (
                <DeviceCard key={device.id} device={device} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDevices.map(device => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
