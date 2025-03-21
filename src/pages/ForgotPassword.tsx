
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This is a placeholder for actual password reset logic
      // You would typically make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      toast.success("Password reset link sent to your email");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-background px-4 py-8 md:py-12 bg-gradient-to-b from-background to-secondary/30"
    >
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-0 h-auto" 
          onClick={() => navigate("/login")}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back to login</span>
        </Button>
      </div>

      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full justify-center">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Reset your password</h1>
          <p className="text-muted-foreground">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>
        
        <div className="bg-card rounded-xl p-6 shadow-lg dark:shadow-primary/5 border border-border backdrop-blur-sm">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-10 text-sm border-input bg-background/50 focus-visible:ring-primary/50"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-6 h-11 transition-all bg-primary hover:bg-primary/90 hover:shadow-md"
                disabled={isLoading}
                size={isMobile ? "sm" : "default"}
              >
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          ) : (
            <div className="text-center py-5">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
                <Mail className="h-7 w-7" />
              </div>
              <h3 className="text-base font-medium mb-3">Check your inbox</h3>
              <p className="text-muted-foreground text-sm mb-6">
                We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>
              </p>
              <Button 
                variant="outline" 
                className="w-full h-11 hover:bg-primary/5 transition-colors" 
                onClick={() => setIsSubmitted(false)}
                size={isMobile ? "sm" : "default"}
              >
                Try another email
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
