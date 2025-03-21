import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const validatePassword = () => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumber
    };
  };

  const passwordChecks = validatePassword();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (!passwordChecks.isValid) {
      toast.error("Password does not meet requirements");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8"
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            <span className="text-indigo-600">Personal</span>
            <span className="text-emerald-500">Finance</span>
          </h1>
        </div>
        
        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 bg-white border-gray-200 rounded-lg"
            />
          </div>
          
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-white border-gray-200 rounded-lg"
            />
          </div>
          
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-white border-gray-200 rounded-lg"
            />
            
            {password && (
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 text-xs">
                <div className="flex items-center gap-1">
                  <CheckCircle2 
                    className={`h-3 w-3 ${passwordChecks.minLength ? 'text-emerald-500' : 'text-gray-400'}`} 
                  />
                  <span className={passwordChecks.minLength ? 'text-emerald-500' : 'text-gray-500'}>
                    8+ characters
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 
                    className={`h-3 w-3 ${passwordChecks.hasUpperCase ? 'text-emerald-500' : 'text-gray-400'}`} 
                  />
                  <span className={passwordChecks.hasUpperCase ? 'text-emerald-500' : 'text-gray-500'}>
                    Uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 
                    className={`h-3 w-3 ${passwordChecks.hasLowerCase ? 'text-emerald-500' : 'text-gray-400'}`} 
                  />
                  <span className={passwordChecks.hasLowerCase ? 'text-emerald-500' : 'text-gray-500'}>
                    Lowercase letter
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 
                    className={`h-3 w-3 ${passwordChecks.hasNumber ? 'text-emerald-500' : 'text-gray-400'}`} 
                  />
                  <span className={passwordChecks.hasNumber ? 'text-emerald-500' : 'text-gray-500'}>
                    Number
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-12 bg-white border-gray-200 rounded-lg"
            />
            {password && confirmPassword && (
              password !== confirmPassword ? (
                <p className="text-xs text-red-500">Passwords do not match</p>
              ) : (
                <p className="text-xs text-emerald-500">Passwords match</p>
              )
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 mt-6 bg-indigo-600 hover:bg-indigo-700 rounded-full font-medium"
            disabled={isLoading}
            size={isMobile ? "sm" : "default"}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
        
        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <div className="text-sm text-gray-500">- Or sign up with -</div>
        </div>
        
        {/* Google Sign Up */}
        <div className="flex justify-center">
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={() => toast.info("Google sign-up not implemented")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </button>
        </div>
        
        {/* Login Link */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
