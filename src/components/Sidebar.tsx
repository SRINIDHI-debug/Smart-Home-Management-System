
import React from 'react';
import { Home, Settings, Users, Lightbulb, Thermometer, Camera, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RoomType, useSmartHome } from '@/contexts/SmartHomeContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { rooms, selectRoom, selectedRoom } = useSmartHome();

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 z-20 h-full pt-16 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-0"
      )}
    >
      <div className="h-full bg-white border-r border-gray-200 px-3 py-4 overflow-y-auto">
        <ScrollArea className="h-full">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider px-3">
                Dashboard
              </h3>
              <div className="mt-2 space-y-1">
                <Button
                  variant={selectedRoom === 'all' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => selectRoom('all')}
                >
                  <Home className="mr-2 h-5 w-5" />
                  <span>Overview</span>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider px-3">
                Rooms
              </h3>
              <div className="mt-2 space-y-1">
                {rooms.map((room) => (
                  <Button
                    key={room.id}
                    variant={selectedRoom === room.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => selectRoom(room.id)}
                  >
                    <span className="mr-2">{room.icon}</span>
                    <span>{room.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider px-3">
                Device Types
              </h3>
              <div className="mt-2 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Lightbulb className="mr-2 h-5 w-5" />
                  <span>Lights</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Thermometer className="mr-2 h-5 w-5" />
                  <span>Thermostats</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  <span>Cameras</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Lock className="mr-2 h-5 w-5" />
                  <span>Locks</span>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider px-3">
                System
              </h3>
              <div className="mt-2 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Settings className="mr-2 h-5 w-5" />
                  <span>Settings</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Users className="mr-2 h-5 w-5" />
                  <span>Users</span>
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;
