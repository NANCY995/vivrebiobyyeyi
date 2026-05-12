declare module 'lucide-react' {
  import { ComponentType, SVGProps, RefAttributes } from 'react';

  interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
    strokeWidth?: number | string;
  }

  type LucideIcon = ComponentType<LucideProps & RefAttributes<SVGSVGElement>>;

  export const FileText: LucideIcon;
  export const Lock: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Scale: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const Package: LucideIcon;
  export const RotateCcw: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const BookOpen: LucideIcon;
  export const Award: LucideIcon;
  export const Users: LucideIcon;
  export const Camera: LucideIcon;
  export const CirclePlay: LucideIcon;
  export const Play: LucideIcon;
  export const Globe: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const Share: LucideIcon;
  export const Link: LucideIcon;
}
