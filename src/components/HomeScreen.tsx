import React, { useState } from 'react';
import { allApps } from '@/lib/apps';
import { StatusBar } from './StatusBar';
import { AppIcon } from './AppIcon';
import { AppDrawer } from './AppDrawer';
import { NotificationPanel } from './NotificationPanel';
import { CameraCrashDialog } from './CameraCrashDialog';
import { VolumePopup } from './VolumePopup';
import { Smartphone, Search } from 'lucide-react';

interface HomeScreenProps {
  volume?: number;
  batteryEnabled?: boolean;
  gpsEnabled?: boolean;
  micEnabled?: boolean;
  cameraEnabled?: boolean;
  isFullyBooted?: boolean;
  isUnlocked?: boolean;
  onVolumeChange?: (volume: number) => void;
  showVolumePopup?: boolean;
  onHideVolumePopup?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  volume = 50,
  batteryEnabled = true,
  gpsEnabled = true,
  micEnabled = true,
  cameraEnabled = true,
  isFullyBooted = true,
  isUnlocked = true,
  onVolumeChange,
  showVolumePopup = false,
  onHideVolumePopup,
}) => {
  const [currentAppId, setCurrentAppId] = useState<string | null>(null);
  const [showAppDrawer, setShowAppDrawer] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [swipeStartY, setSwipeStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [notificationOffset, setNotificationOffset] = useState(0);
  const [showCameraCrash, setShowCameraCrash] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const mainApps = allApps.filter(app => app.type === 'main');
  const dockApps = allApps.filter(app => app.type === 'dock');

  const openApp = (appId: string) => {
    const app = allApps.find(a => a.id === appId);
    if (app && app.id === 'camera' && !cameraEnabled) {
      setShowCameraCrash(true);
      return;
    }
    setCurrentAppId(appId);
  };

  const closeApp = () => {
    setCurrentAppId(null);
  };

  const openAppDrawer = () => {
    if (!isFullyBooted || !isUnlocked) return;
    setShowAppDrawer(true);
  };

  const closeAppDrawer = () => {
    setShowAppDrawer(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isFullyBooted || !isUnlocked) return;
    setSwipeStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isFullyBooted || !isUnlocked) return;
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - swipeStartY;
    
    // Swipe down from top to show notification bar
    if (swipeStartY < 100 && deltaY > 0) {
      setNotificationOffset(Math.min(deltaY, 300));
      if (deltaY > 100) {
        setShowNotificationPanel(true);
      }
    }
    
    // Swipe up from bottom to lock (handled by parent component)
    if (swipeStartY > window.innerHeight - 100 && deltaY < -50) {
      // This will be handled by the parent component
      const event = new CustomEvent('lockScreen');
      window.dispatchEvent(event);
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    if (!isFullyBooted || !isUnlocked) return;
    setIsDragging(false);
    if (notificationOffset > 100) {
      setShowNotificationPanel(true);
    }
    setNotificationOffset(0);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!isFullyBooted || !isUnlocked) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    
    // Check if double-click is in the top area (status bar area)
    if (clickY < 100) {
      setShowNotificationPanel(true);
    }
  };

  const handleSearchClick = () => {
    if (!isFullyBooted || !isUnlocked) return;
    setShowSearchInput(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      openApp('browser');
      setShowSearchInput(false);
      setSearchQuery('');
    }
  };

  const handleSearchCancel = () => {
    setShowSearchInput(false);
    setSearchQuery('');
  };

  const currentApp = allApps.find(app => app.id === currentAppId);

  if (currentApp) {
    const AppComponent = currentApp.component;
    const props: any = { onBack: closeApp };
    if (currentApp.id === 'phone') props.networkEnabled = gpsEnabled;
    if (currentApp.id === 'weather') props.gpsEnabled = gpsEnabled;
    if (currentApp.id === 'maps') props.gpsEnabled = gpsEnabled;
    return <AppComponent {...props} />;
  }

  if (showAppDrawer) {
    return <AppDrawer onClose={closeAppDrawer} onAppSelect={openApp} cameraEnabled={cameraEnabled} />;
  }

  if (showNotificationPanel) {
    return (
      <NotificationPanel 
        onClose={() => setShowNotificationPanel(false)} 
        isVisible={showNotificationPanel}
        volume={volume}
        batteryEnabled={batteryEnabled}
        gpsEnabled={gpsEnabled}
        micEnabled={micEnabled}
        cameraEnabled={cameraEnabled}
        isFullyBooted={isFullyBooted}
        isUnlocked={isUnlocked}
      />
    );
  }

  return (
    <div 
      className="h-full bg-gradient-surface text-white flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
      style={{
        transform: showNotificationPanel ? 'none' : `translateY(${Math.min(notificationOffset * 0.1, 30)}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      <StatusBar gpsEnabled={gpsEnabled} micEnabled={micEnabled} />
      
      {/* Wallpaper area with apps */}
      <div className="flex-1 relative px-6 py-8">
        {/* Spirit OS Branding */}
        <div className="text-center mb-12 animate-float">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center elevated-shadow">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-light text-white/90">Spirit OS</h1>
          <p className="text-sm text-white/60 mt-1">Privacy-First Android</p>
        </div>

        {/* DuckDuckGo Search Widget */}
        <div className="mb-8">
          {showSearchInput ? (
            <form onSubmit={handleSearchSubmit} className="w-full bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="flex items-center p-4">
                <Search className="w-5 h-5 text-white/70 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search DuckDuckGo"
                  className="flex-1 bg-transparent text-white placeholder-white/60 outline-none"
                  autoFocus
                  onBlur={handleSearchCancel}
                />
              </div>
            </form>
          ) : (
            <button
              onClick={handleSearchClick}
              className="w-full bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-black/30 transition-smooth"
            >
              <div className="flex items-center">
                <Search className="w-5 h-5 text-white/70 mr-3" />
                <span className="text-white/70 text-left">Search DuckDuckGo</span>
              </div>
            </button>
          )}
        </div>

        {/* Main apps grid */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          {mainApps.map((app) => (
            <AppIcon
              key={app.id}
              icon={app.icon}
              name={app.name}
              gradient={app.gradient}
              onClick={() => openApp(app.id)}
            />
          ))}
        </div>

        {/* App drawer button */}
      </div>

      {/* Dock */}
      <div className="px-6 pb-4">
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-center items-center space-x-8">
            <AppIcon
              key={dockApps[0].id}
              icon={dockApps[0].icon}
              name={dockApps[0].name}
              gradient={dockApps[0].gradient}
              onClick={() => openApp(dockApps[0].id)}
            />
            <button
              onClick={openAppDrawer}
              className="flex flex-col items-center space-y-2 cursor-pointer group transition-smooth"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center app-shadow group-hover:scale-110 transition-spring">
                <div className="grid grid-cols-2 gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-white/60 rounded-full" />
                  ))}
                </div>
              </div>
              <span className="text-xs text-white/90 text-center leading-tight max-w-[4rem] break-words">
                Apps
              </span>
            </button>
            <AppIcon
              key={dockApps[1].id}
              icon={dockApps[1].icon}
              name={dockApps[1].name}
              gradient={dockApps[1].gradient}
              onClick={() => openApp(dockApps[1].id)}
            />
          </div>
        </div>
      </div>

      {/* Notification Panel Overlay */}
      {notificationOffset > 0 && !showNotificationPanel && (
        <div 
          className="absolute top-0 left-0 right-0 bg-gradient-surface border-b border-white/10"
          style={{ height: `${Math.min(notificationOffset, 100)}px`, opacity: notificationOffset / 100 }}
        />
      )}

      {/* Camera Crash Dialog */}
      <CameraCrashDialog 
        isOpen={showCameraCrash}
        onClose={() => setShowCameraCrash(false)}
      />

      {/* Volume Popup */}
      <VolumePopup
        volume={volume}
        isVisible={showVolumePopup}
        onHide={onHideVolumePopup || (() => {})}
      />
    </div>
  );
};