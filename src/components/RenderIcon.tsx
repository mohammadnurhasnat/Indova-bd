import React from 'react';
import {
  Stethoscope,
  Briefcase,
  RefreshCw,
  DoorOpen,
  Clock,
  Plane,
  MessageCircle,
  FolderOpen,
  FileSpreadsheet,
  FileText,
  Calendar,
  Loader,
  Package,
  Activity,
  User,
  Users,
  ShieldCheck,
  Star,
  ChevronDown,
  X,
  Check,
  Phone,
  Mail,
  Facebook,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Award,
  Heart,
  MapPin,
  MessageSquare,
  Bot,
  Send,
  Copy,
  Trash2,
  Brain,
  Bone,
  Eye,
  Baby,
  Droplet
} from 'lucide-react';

const IconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Stethoscope,
  Briefcase,
  RefreshCw,
  DoorOpen,
  Clock,
  Plane,
  MessageCircle,
  FolderOpen,
  FileSpreadsheet,
  FileText,
  Calendar,
  Loader,
  Package,
  Activity,
  User,
  Users,
  ShieldCheck,
  Star,
  ChevronDown,
  X,
  Check,
  Phone,
  Mail,
  Facebook,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Award,
  Heart,
  MapPin,
  MessageSquare,
  Bot,
  Send,
  Copy,
  Trash2,
  Brain,
  Bone,
  Eye,
  Baby,
  Droplet
};

interface RenderIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function RenderIcon({ name, className, size = 20 }: RenderIconProps) {
  const IconComponent = IconMap[name] || Sparkles;
  return <IconComponent className={className} size={size} />;
}
