
import { Header } from "@/components/layout/Header";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { 
  User, 
  CreditCard, 
  Lock, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Moon
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleSignOut = () => {
    toast.success("Signed out successfully");
    // In a real app, we would handle signout logic here
    navigate("/login");
  };

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { 
          icon: User, 
          label: "Profile", 
          onClick: () => navigate("/settings/profile"),
        },
        { 
          icon: CreditCard, 
          label: "Payment Methods", 
          onClick: () => navigate("/settings/payment-methods"),
        },
        { 
          icon: Lock, 
          label: "Security", 
          onClick: () => navigate("/settings/security"),
        }
      ]
    },
    {
      title: "Preferences",
      items: [
        { 
          icon: Bell, 
          label: "Notifications", 
          onClick: () => navigate("/settings/notifications"), 
          toggle: true,
          toggled: notifications,
          onToggle: () => setNotifications(!notifications)
        },
        {
          icon: Moon,
          label: "Dark Mode",
          onClick: () => {},
          toggle: true,
          toggled: isDarkMode,
          onToggle: toggleDarkMode
        }
      ]
    },
    {
      title: "Support",
      items: [
        { 
          icon: HelpCircle, 
          label: "Help & Support", 
          onClick: () => navigate("/settings/help-support"),
        }
      ]
    }
  ];

  return (
    <>
      <Header title="Settings" />
      <PageTransition>
        <div className="p-4 space-y-6">
          {settingsGroups.map((group, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 px-1">
                {group.title}
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                {group.items.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer border-b last:border-b-0 border-gray-100 dark:border-gray-700"
                    onClick={item.onClick}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium dark:text-white">{item.label}</span>
                    </div>
                    
                    {item.toggle ? (
                      <Switch 
                        checked={item.toggled} 
                        onCheckedChange={item.onToggle}
                      />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="mt-8">
            <button 
              onClick={handleSignOut}
              className="w-full p-4 flex items-center justify-center gap-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </PageTransition>
      <BottomNavigation />
    </>
  );
};

export default Settings;
