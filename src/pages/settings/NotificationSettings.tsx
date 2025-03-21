
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Switch } from "@/components/ui/switch";
import { Bell, CreditCard, PiggyBank, LineChart, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface NotificationSetting {
  id: string;
  icon: any;
  title: string;
  description: string;
  enabled: boolean;
}

const NotificationSettings = () => {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "transaction",
      icon: CreditCard,
      title: "Transaction Alerts",
      description: "Get notified about all transactions",
      enabled: true
    },
    {
      id: "budget",
      icon: LineChart,
      title: "Budget Alerts",
      description: "Alerts when you're close to budget limits",
      enabled: true
    },
    {
      id: "goals",
      icon: PiggyBank,
      title: "Goal Updates",
      description: "Progress updates for your financial goals",
      enabled: true
    },
    {
      id: "security",
      icon: AlertTriangle,
      title: "Security Alerts",
      description: "Important security notifications",
      enabled: true
    },
    {
      id: "marketing",
      icon: Bell,
      title: "Marketing",
      description: "Offers, tips and product updates",
      enabled: false
    }
  ]);

  const handleToggle = (id: string) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, enabled: !setting.enabled } 
          : setting
      )
    );
  };

  return (
    <>
      <Header title="Notifications" showBackButton />
      <PageTransition>
        <div className="p-4 pb-20 space-y-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Notification Preferences</h3>
            </div>
            
            <div>
              {settings.map((setting) => (
                <div 
                  key={setting.id}
                  className="p-4 flex items-center justify-between border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <setting.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{setting.title}</p>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                  </div>
                  <Switch 
                    checked={setting.enabled} 
                    onCheckedChange={() => handleToggle(setting.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Notification Channels</h3>
            </div>
            
            <div>
              <div className="p-4 flex items-center justify-between border-b border-gray-100">
                <p className="font-medium">Push Notifications</p>
                <Switch defaultChecked />
              </div>
              <div className="p-4 flex items-center justify-between border-b border-gray-100">
                <p className="font-medium">Email Notifications</p>
                <Switch defaultChecked />
              </div>
              <div className="p-4 flex items-center justify-between">
                <p className="font-medium">SMS Notifications</p>
                <Switch />
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default NotificationSettings;
