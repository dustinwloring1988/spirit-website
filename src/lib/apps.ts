import {
  Settings,
  Camera,
  MessageSquare,
  Phone,
  Globe,
  Calculator,
  Calendar,
  Music,
  FileText,
  Shield,
  Download,
  Cloud,
  Image,
  Clock,
  Terminal,
  Package,
  Users,
  Heart,
  Coffee,
  Gamepad2,
  Map,
} from 'lucide-react';

import { SettingsApp } from '../components/SettingsApp';
import { PhoneApp } from '../components/PhoneApp';
import { MessagesApp } from '../components/MessagesApp';
import { CameraApp } from '../components/CameraApp';
import { BrowserApp } from '../components/BrowserApp';
import { CalculatorApp } from '../components/CalculatorApp';
import { CalendarApp } from '../components/CalendarApp';
import { MusicApp } from '../components/MusicApp';
import { FilesApp } from '../components/FilesApp';
import { NotesApp } from '../components/NotesApp';
import { PrivacyCentralApp } from '../components/PrivacyCentralApp';
import { TerminalApp } from '../components/TerminalApp';
import { WeatherApp } from '../components/WeatherApp';
import { GalleryApp } from '../components/GalleryApp';
import { ClockApp } from '../components/ClockApp';
import { ContactsApp } from '../components/ContactsApp';
import { RetroArchApp } from '../components/RetroArchApp';
import { MapsApp } from '../components/MapsApp';
import { FDroidApp } from '../components/FDroidApp';
import { AuroraStoreApp } from '../components/AuroraStoreApp';

export interface App {
  id: string;
  name: string;
  icon: React.ElementType;
  component: React.FC<{ onBack: () => void; [key: string]: any }>;
  type: 'main' | 'dock' | 'drawer';
  gradient?: boolean;
}

export const allApps: App[] = [
  // Main Apps
  { id: 'camera', name: 'Camera', icon: Camera, component: CameraApp, type: 'main', gradient: false },
  { id: 'settings', name: 'Settings', icon: Settings, component: SettingsApp, type: 'main', gradient: false },
  { id: 'calculator', name: 'Calculator', icon: Calculator, component: CalculatorApp, type: 'main', gradient: false },
  { id: 'calendar', name: 'Calendar', icon: Calendar, component: CalendarApp, type: 'main', gradient: false },
  { id: 'music', name: 'Music', icon: Music, component: MusicApp, type: 'main', gradient: false },

  // Dock Apps
  { id: 'phone', name: 'Phone', icon: Phone, component: PhoneApp, type: 'dock', gradient: true },
  { id: 'messages', name: 'Messages', icon: MessageSquare, component: MessagesApp, type: 'dock', gradient: false },

  // Drawer Apps
  { id: 'browser', name: 'Browser', icon: Globe, component: BrowserApp, type: 'drawer', gradient: false },
  { id: 'files', name: 'Files', icon: FileText, component: FilesApp, type: 'drawer', gradient: false },
  { id: 'aurora', name: 'Aurora Store', icon: Download, component: AuroraStoreApp, type: 'drawer', gradient: true },
  { id: 'weather', name: 'Weather', icon: Cloud, component: WeatherApp, type: 'drawer', gradient: false },
  { id: 'notes', name: 'Notes', icon: Coffee, component: NotesApp, type: 'drawer', gradient: false },
  { id: 'terminal', name: 'Terminal', icon: Terminal, component: TerminalApp, type: 'drawer', gradient: false },
  { id: 'fdroid', name: 'F-Droid', icon: Package, component: FDroidApp, type: 'drawer', gradient: true },
  { id: 'contacts', name: 'Contacts', icon: Users, component: ContactsApp, type: 'drawer', gradient: false },
  { id: 'health', name: 'Health', icon: Heart, component: () => null, type: 'drawer', gradient: false }, // Placeholder
  { id: 'retroarch', name: 'RetroArch', icon: Gamepad2, component: RetroArchApp, type: 'drawer', gradient: false },
  { id: 'maps', name: 'Maps', icon: Map, component: MapsApp, type: 'drawer', gradient: false },
  { id: 'gallery', name: 'Gallery', icon: Image, component: GalleryApp, type: 'drawer', gradient: false },
  { id: 'clock', name: 'Clock', icon: Clock, component: ClockApp, type: 'drawer', gradient: false },
  { id: 'privacy', name: 'Privacy Central', icon: Shield, component: PrivacyCentralApp, type: 'drawer', gradient: false },
];
