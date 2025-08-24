import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Plus, Home, BookOpen, User, MessageSquare, Users, LogOut } from "lucide-react";

interface User {
  id: string;
  anonymousName: string;
  userType: 'student' | 'volunteer';
}

const Navigation = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user data from localStorage (replace with proper auth)
    const userData = localStorage.getItem('mindlink_user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Create a mock user for testing without authentication
      const mockUser: User = {
        id: 'test-user-123',
        anonymousName: 'TestStudent42',
        userType: 'student'
      };
      setUser(mockUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mindlink_user');
    localStorage.removeItem('mindlink_moods');
    setUser(null);
    window.location.href = '/';
  };

  const getNavItems = () => {
    const baseItems = [
      { to: "/", icon: Home, label: "Home", active: location.pathname === "/" },
      { to: "/resources", icon: BookOpen, label: "Resources", active: location.pathname === "/resources" },
    ];

    if (user) {
      if (user.userType === 'volunteer') {
        return [
          ...baseItems,
          { to: "/volunteer-dashboard", icon: Users, label: "Dashboard", active: location.pathname === "/volunteer-dashboard" },
          { to: "/speakup", icon: MessageSquare, label: "Forum", active: location.pathname === "/speakup" },
        ];
      } else {
        return [
          ...baseItems,
          { to: "/dashboard", icon: Heart, label: "Dashboard", active: location.pathname === "/dashboard" },
          { to: "/feed", icon: Heart, label: "Community", active: location.pathname === "/feed" },
          { to: "/speakup", icon: MessageSquare, label: "SpeakUp", active: location.pathname === "/speakup" },
        ];
      }
    }

    return [
      ...baseItems,
      { to: "/feed", icon: Heart, label: "Community", active: location.pathname === "/feed" },
    ];
  };

  const navItems = getNavItems();

  return (
    <nav className="sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
              MindLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200 ${
                  item.active
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-medium"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {user.userType === 'student' && (
                  <Link to="/create">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white hidden md:flex items-center gap-2 rounded-full">
                      <Plus className="h-4 w-4" />
                      Share Thoughts
                    </Button>
                  </Link>
                )}
                
                {/* Mobile create button - only for students */}
                {user.userType === 'student' && (
                  <Link to="/create" className="md:hidden">
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </Link>
                )}

                {/* User info */}
                <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-full">
                  <User className="h-4 w-4" />
                  <span>{user.anonymousName}</span>
                  {user.userType === 'volunteer' && (
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                      Volunteer
                    </span>
                  )}
                </div>

                {/* Logout */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/create">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white hidden md:flex items-center gap-2 rounded-full">
                    <Plus className="h-4 w-4" />
                    Share Thoughts
                  </Button>
                </Link>
                
                {/* Mobile create button */}
                <Link to="/create" className="md:hidden">
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3">
                    <Plus className="h-4 w-4" />
                  </Button>
                </Link>

                {/* Sign In Button */}
                <Link to="/auth">
                  <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex justify-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors duration-200 ${
                item.active
                  ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;