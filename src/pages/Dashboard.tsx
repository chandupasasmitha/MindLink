import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Heart, 
  MessageCircle, 
  TrendingUp, 
  Calendar,
  Users,
  BookOpen,
  Smile,
  Meh,
  Frown,
  AlertTriangle,
  Sparkles
} from "lucide-react";

interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 1-5 scale
  note?: string;
  timestamp: string;
}

interface User {
  id: string;
  anonymousName: string;
  userType: 'student' | 'volunteer';
  university?: string;
  yearOfStudy?: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentMood, setCurrentMood] = useState<number>(0);
  const [moodNote, setMoodNote] = useState('');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [showMoodForm, setShowMoodForm] = useState(false);

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
        userType: 'student',
        university: 'Demo University',
        yearOfStudy: '3rd Year'
      };
      setUser(mockUser);
    }

    // Load mood history
    const storedMoods = localStorage.getItem('mindlink_moods');
    if (storedMoods) {
      setMoodHistory(JSON.parse(storedMoods));
    }
  }, []);

  const handleMoodSubmit = () => {
    if (currentMood === 0) return;

    const newMoodEntry: MoodEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      mood: currentMood,
      note: moodNote.trim() || undefined,
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [newMoodEntry, ...moodHistory];
    setMoodHistory(updatedHistory);
    localStorage.setItem('mindlink_moods', JSON.stringify(updatedHistory));

    // Reset form
    setCurrentMood(0);
    setMoodNote('');
    setShowMoodForm(false);

    // Check for concerning patterns (simple version)
    const recentMoods = updatedHistory.slice(0, 5);
    const averageMood = recentMoods.reduce((sum, entry) => sum + entry.mood, 0) / recentMoods.length;
    
    if (recentMoods.length >= 3 && averageMood <= 2) {
      // Show support resources
      setTimeout(() => {
        alert("We've noticed you've been feeling down lately. Would you like to connect with a peer supporter or explore some resources?");
      }, 1000);
    }
  };

  const getMoodIcon = (mood: number) => {
    switch (mood) {
      case 1: return <Frown className="h-8 w-8 text-red-500" />;
      case 2: return <Frown className="h-8 w-8 text-orange-500" />;
      case 3: return <Meh className="h-8 w-8 text-orange-500" />;
      case 4: return <Smile className="h-8 w-8 text-green-500" />;
      case 5: return <Smile className="h-8 w-8 text-blue-500" />;
      default: return null;
    }
  };

  const getMoodLabel = (mood: number) => {
    switch (mood) {
      case 1: return "Very Low";
      case 2: return "Low";
      case 3: return "Okay";
      case 4: return "Good";
      case 5: return "Excellent";
      default: return "";
    }
  };

  const getAverageMood = () => {
    if (moodHistory.length === 0) return 0;
    const sum = moodHistory.slice(0, 7).reduce((acc, entry) => acc + entry.mood, 0);
    return (sum / Math.min(moodHistory.length, 7)).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back, {user?.anonymousName || 'Student'}! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            How are you feeling today? Your wellbeing matters.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Mood Check */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border-0 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Heart className="h-5 w-5 text-blue-500" />
                  Daily Mood Check-in
                </h2>
                {!showMoodForm && (
                  <Button
                    onClick={() => setShowMoodForm(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Check In
                  </Button>
                )}
              </div>

              {showMoodForm ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">How are you feeling right now?</p>
                    <div className="flex justify-between gap-2">
                      {[1, 2, 3, 4, 5].map((mood) => (
                        <button
                          key={mood}
                          onClick={() => setCurrentMood(mood)}
                          className={`p-4 rounded-xl border-2 transition-all flex-1 flex flex-col items-center gap-2 ${
                            currentMood === mood
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-slate-200 dark:border-slate-600 hover:border-blue-300'
                          }`}
                        >
                          {getMoodIcon(mood)}
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {getMoodLabel(mood)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <textarea
                      placeholder="What's on your mind? (optional)"
                      value={moodNote}
                      onChange={(e) => setMoodNote(e.target.value)}
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleMoodSubmit}
                      disabled={currentMood === 0}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      Save Check-in
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowMoodForm(false);
                        setCurrentMood(0);
                        setMoodNote('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 dark:text-slate-400">
                    {moodHistory.length > 0 
                      ? `Last check-in: ${new Date(moodHistory[0].timestamp).toLocaleDateString()}`
                      : "Start tracking your daily mood to understand patterns"
                    }
                  </p>
                </div>
              )}
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/peer-chat">
                <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 hover:shadow-lg transition-all duration-300 cursor-pointer p-6 border-0">
                  <MessageCircle className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Connect with Peer Support</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Chat anonymously with trained peer volunteers
                  </p>
                </Card>
              </Link>

              <Link to="/speakup">
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:shadow-lg transition-all duration-300 cursor-pointer p-6 border-0">
                  <Users className="h-8 w-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">SpeakUp Forum</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Share experiences and get community support
                  </p>
                </Card>
              </Link>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border-0 p-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Your Journey
              </h2>
              
              <div className="space-y-3">
                {moodHistory.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    {getMoodIcon(entry.mood)}
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white">
                        {getMoodLabel(entry.mood)} mood
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </p>
                      {entry.note && (
                        <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                          "{entry.note}"
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                {moodHistory.length === 0 && (
                  <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                    Start your mood tracking journey today
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column - Stats & Resources */}
          <div className="space-y-6">
            {/* Mood Stats */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border-0 p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Your Wellness
              </h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {getAverageMood() || '--'}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    7-day average
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Check-ins completed</span>
                    <span className="font-medium text-slate-900 dark:text-white">{moodHistory.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Current streak</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {moodHistory.length > 0 ? Math.min(moodHistory.length, 7) : 0} days
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Crisis Support */}
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 p-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h3 className="font-semibold text-red-900 dark:text-red-200">Need Immediate Help?</h3>
              </div>
              <p className="text-sm text-red-800 dark:text-red-300 mb-4">
                If you're in crisis or having thoughts of self-harm, please reach out immediately.
              </p>
              <Link to="/resources">
                <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-50">
                  View Crisis Resources
                </Button>
              </Link>
            </Card>

            {/* Positive Content */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0 p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Daily Inspiration
              </h3>
              <blockquote className="text-slate-700 dark:text-slate-300 italic text-sm">
                "You are stronger than you think, braver than you feel, and more loved than you know."
              </blockquote>
              <Link to="/resources" className="block mt-3">
                <Button variant="ghost" size="sm" className="text-blue-700 hover:text-blue-800">
                  Explore Resources →
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
