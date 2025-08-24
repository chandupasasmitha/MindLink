import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Heart, Users, Shield, ArrowRight, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type AuthMode = 'login' | 'signup';
type UserType = 'student' | 'volunteer';

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [userType, setUserType] = useState<UserType>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    anonymousName: '',
    email: '',
    university: '',
    yearOfStudy: '',
    interests: '',
    volunteerExperience: '',
    specializations: '',
    motivation: ''
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.anonymousName.trim()) {
      toast({
        title: "Please enter an anonymous name",
        description: "This will be your identity in the community.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call to Ballerina backend
    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
      
      // Mock API call - replace with actual Ballerina backend call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        ...formData,
        userType,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };

      // Store user data in localStorage (replace with proper state management)
      localStorage.setItem('mindlink_user', JSON.stringify(userData));
      
      toast({
        title: mode === 'signup' ? "Welcome to MindLink! 🎉" : "Welcome back! 💜",
        description: mode === 'signup' 
          ? "Your safe space for mental wellness is ready." 
          : "Your community missed you.",
      });

      // Navigate based on user type
      if (userType === 'volunteer') {
        navigate('/volunteer-dashboard');
      } else {
        navigate('/dashboard');
      }
      
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateAnonymousName = () => {
    const adjectives = ['Calm', 'Brave', 'Kind', 'Gentle', 'Strong', 'Peaceful', 'Bright', 'Wise'];
    const nouns = ['Soul', 'Heart', 'Spirit', 'Mind', 'Voice', 'Light', 'Star', 'Wave'];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNum = Math.floor(Math.random() * 99) + 1;
    
    setFormData(prev => ({ 
      ...prev, 
      anonymousName: `${randomAdj}${randomNoun}${randomNum}` 
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-10 w-10 text-blue-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              MindLink
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Your private, anonymous space for mental wellness
          </p>
        </div>

        <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-xl border-0 p-8">
          {/* Mode Toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-700 rounded-xl p-1 mb-8">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                mode === 'signup'
                  ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Join Community
            </button>
          </div>

          {/* User Type Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">I want to join as a:</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setUserType('student')}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  userType === 'student'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-slate-600 hover:border-blue-300'
                }`}
              >
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Student</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Seeking support and community
                </p>
              </button>
              
              <button
                onClick={() => setUserType('volunteer')}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  userType === 'volunteer'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-slate-200 dark:border-slate-600 hover:border-green-300'
                }`}
              >
                <UserCheck className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Volunteer</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Trained to provide peer support
                </p>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Anonymous Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Anonymous Name <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., BraveHeart42"
                  value={formData.anonymousName}
                  onChange={(e) => handleInputChange('anonymousName', e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateAnonymousName}
                  className="px-4"
                >
                  Generate
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                This will be your identity in the community. Choose something that feels right to you.
              </p>
            </div>

            {mode === 'signup' && (
              <>
                {/* Email (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email (Optional)
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@university.edu"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    For account recovery only. We won't send you marketing emails.
                  </p>
                </div>

                {/* University */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    University
                  </label>
                  <Input
                    placeholder="Your university name"
                    value={formData.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                  />
                </div>

                {userType === 'student' && (
                  <>
                    {/* Year of Study */}
                    <div>
                      <label htmlFor="yearOfStudy" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Year of Study
                      </label>
                      <select
                        id="yearOfStudy"
                        value={formData.yearOfStudy}
                        onChange={(e) => handleInputChange('yearOfStudy', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="">Select year</option>
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                        <option value="graduate">Graduate</option>
                        <option value="phd">PhD</option>
                      </select>
                    </div>

                    {/* Interests/Concerns */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        What brings you here? (Optional)
                      </label>
                      <Textarea
                        placeholder="e.g., Dealing with academic stress, social anxiety, adjusting to university life..."
                        value={formData.interests}
                        onChange={(e) => handleInputChange('interests', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </>
                )}

                {userType === 'volunteer' && (
                  <>
                    {/* Volunteer Experience */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Relevant Experience
                      </label>
                      <Textarea
                        placeholder="e.g., Peer counseling training, psychology studies, personal experience with mental health..."
                        value={formData.volunteerExperience}
                        onChange={(e) => handleInputChange('volunteerExperience', e.target.value)}
                        rows={3}
                      />
                    </div>

                    {/* Specializations */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Areas you can help with
                      </label>
                      <Textarea
                        placeholder="e.g., Academic stress, social anxiety, relationship issues, LGBTQ+ support..."
                        value={formData.specializations}
                        onChange={(e) => handleInputChange('specializations', e.target.value)}
                        rows={2}
                      />
                    </div>

                    {/* Motivation */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Why do you want to volunteer?
                      </label>
                      <Textarea
                        placeholder="Share your motivation for helping fellow students..."
                        value={formData.motivation}
                        onChange={(e) => handleInputChange('motivation', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <Button
              onClick={handleSubmit}
              disabled={!formData.anonymousName.trim() || isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl text-lg font-medium"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  {mode === 'signup' ? 'Creating your safe space...' : 'Signing you in...'}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {mode === 'signup' ? 'Join MindLink' : 'Enter MindLink'}
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </Button>
          </div>

          {/* Privacy Note */}
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">
                  Your Privacy is Protected
                </h4>
                <p className="text-sm text-green-700 dark:text-green-400">
                  {userType === 'volunteer' 
                    ? "Volunteer applications are reviewed for safety. All interactions remain anonymous."
                    : "We never share personal information. Your anonymous identity keeps you safe."
                  }
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Anonymous Access */}
        <div className="text-center mt-6">
          <p className="text-slate-600 dark:text-slate-400 mb-3">
            Not ready to create an account?
          </p>
          <Button
            variant="ghost"
            onClick={() => navigate('/feed')}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            Continue as Anonymous Guest
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
