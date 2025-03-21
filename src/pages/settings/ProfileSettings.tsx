
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Camera } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile changes
    console.log("Profile updated:", profile);
  };

  return (
    <>
      <Header title="Profile" showBackButton />
      <PageTransition>
        <div className="p-4 pb-20 space-y-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <h2 className="text-lg font-medium">{profile.name}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name"
                value={profile.name} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                value={profile.email} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone"
                value={profile.phone} 
                onChange={handleChange} 
              />
            </div>
            
            <Button type="submit" className="w-full mt-4">
              Save Changes
            </Button>
          </form>
        </div>
      </PageTransition>
    </>
  );
};

export default ProfileSettings;
