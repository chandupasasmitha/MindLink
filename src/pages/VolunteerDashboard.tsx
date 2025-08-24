import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  UserCheck, 
  MessageCircle, 
  Users, 
  Heart,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  AlertTriangle,
  Calendar
} from "lucide-react";

interface ChatRequest {
  id: string;
  studentName: string;
  topic: string;
  urgency: 'low' | 'medium' | 'high';
  waitTime: number; // minutes
  message?: string;
}

interface VolunteerStats {
  totalChats: number;
  hoursVolunteered: number;
  averageRating: number;
  studentsHelped: number;
  currentStreak: number;
}

const VolunteerDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<ChatRequest[]>([]);
  const [activeChats, setActiveChats] = useState<number>(0);
  const [stats, setStats] = useState<VolunteerStats>({
    totalChats: 47,
    hoursVolunteered: 23.5,
    averageRating: 4.8,
    studentsHelped: 31,
    currentStreak: 5
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockRequests: ChatRequest[] = [
      {
        id: '1',
        studentName: 'AnxiousStudent23',
        topic: 'Academic Stress',
        urgency: 'medium',
        waitTime: 12,
        message: 'Feeling overwhelmed with final exams approaching'
      },
      {
        id: '2',
        studentName: 'QuietVoice42',
        topic: 'Social Anxiety',
        urgency: 'low',
        waitTime: 5,
      },
      {
        id: '3',
        studentName: 'StrugglingFreshman',
        topic: 'Homesickness',
        urgency: 'high',
        waitTime: 25,
        message: 'Really missing home and feeling isolated'
      }
    ];
    
    if (isOnline) {
      setPendingRequests(mockRequests);
    } else {
      setPendingRequests([]);
    }
  }, [isOnline]);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  const acceptChatRequest = (requestId: string) => {
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
    setActiveChats(prev => prev + 1);
    // In real app, this would redirect to chat interface
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      default: return 'text-green-600 bg-green-50 dark:bg-green-900/20';
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      default: return 'Low Priority';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-green-500" />
              Volunteer Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Help fellow students in their mental wellness journey
            </p>
          </div>
          
          {/* Online Status Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Status:
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isOnline 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
              }`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            <Button
              onClick={toggleOnlineStatus}
              className={`${
                isOnline 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Stats and Quick Actions */}
          <div className="space-y-6">
            {/* Stats Overview */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border-0 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Your Impact
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Total Chats</span>
                  <span className="text-2xl font-bold text-blue-600">{stats.totalChats}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Hours Volunteered</span>
                  <span className="text-2xl font-bold text-green-600">{stats.hoursVolunteered}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Average Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-blue-500 fill-current" />
                    <span className="text-2xl font-bold text-blue-600">{stats.averageRating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Students Helped</span>
                  <span className="text-2xl font-bold text-purple-600">{stats.studentsHelped}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Current Streak</span>
                  <span className="text-2xl font-bold text-orange-600">{stats.currentStreak} days</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border-0 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              
              <div className="space-y-3">
                <Link to="/volunteer-training">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Training Resources
                  </Button>
                </Link>
                
                <Link to="/volunteer-schedule">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    My Schedule
                  </Button>
                </Link>
                
                <Link to="/speakup">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Monitor Forum
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Guidelines Reminder */}
            <Card className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200 dark:border-blue-800 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900 dark:text-blue-200">
                  Remember
                </h3>
              </div>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>• Listen without judgment</li>
                <li>• Validate their feelings</li>
                <li>• Don't give professional advice</li>
                <li>• Know when to escalate</li>
                <li>• Take care of yourself too</li>
              </ul>
            </Card>
          </div>

          {/* Center Column - Chat Requests */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Status */}
            <Card className={`backdrop-blur-md shadow-sm border-0 p-6 ${
              isOnline 
                ? 'bg-green-50/90 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                : 'bg-slate-50/90 dark:bg-slate-800/90'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    isOnline ? 'bg-green-500 animate-pulse' : 'bg-slate-400'
                  }`} />
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {isOnline ? 'Available for Support' : 'Currently Offline'}
                  </h2>
                </div>
                
                {activeChats > 0 && (
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">{activeChats} active chat{activeChats !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
              
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                {isOnline 
                  ? 'Students can now request support from you' 
                  : 'Go online to start helping students'}
              </p>
            </Card>

            {/* Pending Chat Requests */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border-0 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-purple-500" />
                  Chat Requests ({pendingRequests.length})
                </h2>
                
                {pendingRequests.length > 0 && (
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Sorted by urgency & wait time
                  </span>
                )}
              </div>

              {!isOnline ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Go online to see chat requests from students
                  </p>
                </div>
              ) : pendingRequests.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
                  <p className="text-slate-600 dark:text-slate-400">
                    No pending requests right now. Great job staying available!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingRequests
                    .sort((a, b) => {
                      // Sort by urgency first, then by wait time
                      const urgencyOrder = { 'high': 3, 'medium': 2, 'low': 1 };
                      const urgencyDiff = urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
                      if (urgencyDiff !== 0) return urgencyDiff;
                      return b.waitTime - a.waitTime;
                    })
                    .map((request) => (
                    <div
                      key={request.id}
                      className="p-4 border border-slate-200 dark:border-slate-600 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-slate-900 dark:text-white">
                              {request.studentName}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                              {getUrgencyLabel(request.urgency)}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                            <span>Topic: <strong>{request.topic}</strong></span>
                            <span>Waiting: <strong>{request.waitTime} min</strong></span>
                          </div>
                          
                          {request.message && (
                            <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                              "{request.message}"
                            </p>
                          )}
                        </div>
                        
                        <Button
                          onClick={() => acceptChatRequest(request.id)}
                          className="bg-green-500 hover:bg-green-600 text-white ml-4"
                        >
                          Accept Chat
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Crisis Alert Training */}
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 p-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h3 className="font-semibold text-red-900 dark:text-red-200">Crisis Intervention Reminder</h3>
              </div>
              <p className="text-sm text-red-800 dark:text-red-300 mb-4">
                If a student mentions self-harm, suicide, or is in immediate danger:
              </p>
              <ol className="text-sm text-red-800 dark:text-red-300 space-y-1 mb-4">
                <li>1. Stay calm and listen</li>
                <li>2. Don't leave them alone</li>
                <li>3. Immediately escalate to crisis resources</li>
                <li>4. Use the emergency alert button in chat</li>
              </ol>
              <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                Review Crisis Protocol
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VolunteerDashboard;
