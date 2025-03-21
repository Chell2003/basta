
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <p className="text-xl text-gray-700">Oops! We couldn't find that page.</p>
        <p className="text-gray-500">
          The page you're looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Button 
          onClick={() => navigate("/")}
          className="mt-6 gap-2"
        >
          <Home className="h-4 w-4" />
          <span>Return to Home</span>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
