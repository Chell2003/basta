
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home, 
  BarChart3, 
  PiggyBank, 
  History, 
  Settings, 
} from "lucide-react";
import { cn } from "@/lib/utils";

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: BarChart3, label: "Budget", path: "/budget" },
    { icon: PiggyBank, label: "Goals", path: "/goals" },
    { icon: History, label: "History", path: "/transactions" },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg animate-fade-in">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-all duration-200",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon 
                className={cn(
                  "h-5 w-5 mb-1 transition-all duration-300",
                  isActive ? "scale-110" : "scale-100"
                )} 
              />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
