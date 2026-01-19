
import { MenuPageContent } from "@/components/menu-page-content";

export default function MenuPage() {
    // This default export is for direct navigation to /menu.
    // It renders the content component without the sheet-specific functionality
    // to prevent build errors during prerendering.
    return <MenuPageContent isInSheet={false} />;
}
