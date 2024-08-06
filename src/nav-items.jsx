import { FileText, HelpCircle, Info } from "lucide-react";
import Index from "./pages/Index.jsx";
import UserGuide from "./pages/UserGuide.jsx";
import About from "./pages/About.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Translator",
    to: "/",
    icon: <FileText className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Hướng dẫn sử dụng",
    to: "/guide",
    icon: <HelpCircle className="h-4 w-4" />,
    page: <UserGuide />,
  },
  {
    title: "Về chúng tôi",
    to: "/about",
    icon: <Info className="h-4 w-4" />,
    page: <About />,
  },
];
