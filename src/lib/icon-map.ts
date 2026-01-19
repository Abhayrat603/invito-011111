
import {
    Heart,
    Gift,
    Star,
    CalendarDays,
    Home,
    Clapperboard,
    School,
    Building,
    PartyPopper,
    Mail,
    FileText,
    Info,
    LayoutGrid,
    LucideIcon,
    Edit
} from 'lucide-react';

export const iconMap: { [key: string]: LucideIcon } = {
    Heart,
    Gift,
    Star,
    CalendarDays,
    Home,
    Clapperboard,
    School,
    Building,
    PartyPopper,
    Mail,
    FileText,
    Info,
    LayoutGrid,
    Edit
};

export const getIconByName = (name: string): LucideIcon => {
    return iconMap[name] || LayoutGrid;
};


export const getIconForMenuItem = (itemName: string): string => {
    const lowerCaseName = itemName.toLowerCase();
    if (lowerCaseName.includes('wedding')) return 'Heart';
    if (lowerCaseName.includes('birthday')) return 'Gift';
    if (lowerCaseName.includes('engagement')) return 'Star';
    if (lowerCaseName.includes('anniversary')) return 'CalendarDays';
    if (lowerCaseName.includes('housewarming')) return 'Home';
    if (lowerCaseName.includes('baby shower')) return 'Clapperboard';
    if (lowerCaseName.includes('graduation')) return 'School';
    if (lowerCaseName.includes('corporate')) return 'Building';
    if (lowerCaseName.includes('party')) return 'PartyPopper';
    if (lowerCaseName.includes('e-invite') || lowerCaseName.includes('digital')) return 'Mail';
    if (lowerCaseName.includes('save-the-date')) return 'CalendarDays';
    if (lowerCaseName.includes('poster')) return 'FileText';
    if (lowerCaseName.includes('video')) return 'Clapperboard';
    if (lowerCaseName.includes('formal')) return 'Info';
    if (lowerCaseName.includes('casual')) return 'PartyPopper';
    if (lowerCaseName.includes('handmade')) return 'Edit';
    return 'LayoutGrid';
};
