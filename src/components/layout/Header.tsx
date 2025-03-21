
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, Bell, PlusCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showNotification?: boolean;
  showAddButton?: boolean;
  onAddClick?: () => void;
}

export const Header = ({
  title,
  showBackButton = false,
  showNotification = true,
  showAddButton = false,
  onAddClick
}: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine title based on path if not provided
  const determineTitle = () => {
    if (title) return title;
    
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/budget":
        return "Budget";
      case "/goals":
        return "Financial Goals";
      case "/transactions":
        return "Transactions";
      case "/settings":
        return "Settings";
      default:
        return "Finance";
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-4 px-4",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="mr-3 h-10 w-10 rounded-full flex items-center justify-center hover:bg-muted transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <h1 className="text-xl font-semibold animate-fade-in">
            {determineTitle()}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          {showAddButton && (
            <button
              onClick={onAddClick}
              className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
            >
              <PlusCircle className="h-5 w-5" />
            </button>
          )}
          {showNotification && (
            <button className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-muted transition-colors duration-200">
              <Bell className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
