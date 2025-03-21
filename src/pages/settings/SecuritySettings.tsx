
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Fingerprint, Shield, Key, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const SecuritySettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  return (
    <>
      <Header title="Security" showBackButton />
      <PageTransition>
        <div className="p-4 pb-20 space-y-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Change Password</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input 
                    id="currentPassword" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter current password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter new password"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input 
                  id="confirmPassword" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Confirm new password"
                />
              </div>
              
              <Button className="w-full">Update Password</Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Security Features</h3>
            </div>
            
            <div>
              <div className="p-4 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Fingerprint className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Biometric Authentication</p>
                    <p className="text-sm text-gray-500">Use your fingerprint to log in</p>
                  </div>
                </div>
                <Switch 
                  checked={biometricAuth} 
                  onCheckedChange={setBiometricAuth}
                />
              </div>
              
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                </div>
                <Switch 
                  checked={twoFactorAuth} 
                  onCheckedChange={setTwoFactorAuth}
                />
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="w-full">View Login History</Button>
        </div>
      </PageTransition>
    </>
  );
};

export default SecuritySettings;
