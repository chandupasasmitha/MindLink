import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Heart } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl p-8 shadow-xl">
          <Heart className="h-16 w-16 text-blue-500 mx-auto mb-6" />
          <h1 className="text-6xl font-bold mb-4 text-slate-900 dark:text-white">404</h1>
          <h2 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-200">Page Not Found</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Looks like this path doesn't exist. Let's get you back to safety.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Heart className="h-4 w-4" />
            Return to MindLink
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
