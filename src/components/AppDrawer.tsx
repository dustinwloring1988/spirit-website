import React from 'react';
import { AppIcon } from './AppIcon';
import { StatusBar } from './StatusBar';
import { allApps } from '@/lib/apps';
import { ArrowLeft } from 'lucide-react';

interface AppDrawerProps {
  onClose: () => void;
  onAppSelect: (appId: string) => void;
  cameraEnabled?: boolean;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({
  onClose,
  onAppSelect,
  cameraEnabled = true,
}) => {
  const drawerApps = allApps.filter(app => app.type === 'drawer');

  return (
    <div className="h-full bg-gradient-surface text-white flex flex-col">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-medium">All Apps</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Apps grid */}
      <div className="flex-1 px-6 pb-8">
        <div className="grid grid-cols-4 gap-6">
          {drawerApps.map((app) => (
            <AppIcon
              key={app.id}
              icon={app.icon}
              name={app.name}
              gradient={app.gradient}
              onClick={() => onAppSelect(app.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};