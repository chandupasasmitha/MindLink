import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle, 
  Send, 
  Heart, 
  Users, 
  ArrowLeft,
  Clock,
  Shield,
  AlertTriangle
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'peer';
  timestamp: string;
  senderName: string;
}

interface ChatSession {
  id: string;
  peerId: string;
  peerName: string;
  status: 'waiting' | 'connected' | 'ended';
  topic?: string;
  startTime: string;
}

const PeerChat = () => {
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const topics = [
    { id: 'academic', label: 'Academic Stress', emoji: '📚' },
    { id: 'social', label: 'Social Anxiety', emoji: '😰' },
    { id: 'relationships', label: 'Relationships', emoji: '💝' },
    { id: 'homesickness', label: 'Homesickness', emoji: '🏠' },
    { id: 'depression', label: 'Feeling Down', emoji: '💙' },
    { id: 'general', label: 'General Support', emoji: '🤗' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startSearching = () => {
    if (!selectedTopic) return;
    
    setIsSearching(true);
    
    // Simulate finding a peer volunteer (replace with actual Ballerina backend call)
    setTimeout(() => {
      const mockSession: ChatSession = {
        id: Math.random().toString(36).substr(2, 9),
        peerId: Math.random().toString(36).substr(2, 9),
        peerName: 'SupportiveSoul24', // This would come from backend matching
        status: 'connected',
        topic: selectedTopic,
        startTime: new Date().toISOString()
      };
      
      setCurrentSession(mockSession);
      setIsSearching(false);
      
      // Add welcome message from peer
      const welcomeMessage: Message = {
        id: '1',
        text: `Hi there! I'm here to listen and support you. I understand you're looking for help with ${topics.find(t => t.id === selectedTopic)?.label.toLowerCase()}. Feel free to share what's on your mind. 💜`,
        sender: 'peer',
        timestamp: new Date().toISOString(),
        senderName: mockSession.peerName
      };
      
      setMessages([welcomeMessage]);
    }, 3000);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !currentSession) return;

    const message: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text: newMessage.trim(),
      sender: 'me',
      timestamp: new Date().toISOString(),
      senderName: 'You'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate peer response (replace with actual WebSocket/real-time communication)
    setTimeout(() => {
      const responses = [
        "I hear you, and what you're feeling is completely valid.",
        "That sounds really challenging. How are you coping with this?",
        "Thank you for sharing that with me. You're being really brave.",
        "It's okay to feel this way. You're not alone in this experience.",
        "Have you tried any strategies for dealing with this before?",
        "I'm here to listen. Take your time to share whatever feels comfortable."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const peerMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        text: randomResponse,
        sender: 'peer',
        timestamp: new Date().toISOString(),
        senderName: currentSession.peerName
      };
      
      setMessages(prev => [...prev, peerMessage]);
    }, 1000 + Math.random() * 3000);
  };

  const endSession = () => {
    if (currentSession) {
      setCurrentSession({ ...currentSession, status: 'ended' });
    }
  };

  const resetChat = () => {
    setCurrentSession(null);
    setMessages([]);
    setSelectedTopic('');
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="p-2 hover:bg-blue-50 rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-green-500" />
              Peer Support Chat
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Connect with trained volunteers for anonymous support
            </p>
          </div>
        </div>

        {!currentSession && !isSearching ? (
          /* Topic Selection */
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border-0 p-8">
              <div className="text-center mb-8">
                <Users className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                  What would you like support with?
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  We'll match you with a peer volunteer who can help
                </p>
              </div>

              <div className="grid gap-3 mb-8">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedTopic === topic.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-slate-200 dark:border-slate-600 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{topic.emoji}</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {topic.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <Button
                onClick={startSearching}
                disabled={!selectedTopic}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg"
              >
                <Users className="h-5 w-5 mr-2" />
                Find a Peer Supporter
              </Button>

              {/* Safety Notice */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                      Safe & Anonymous
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      All chats are anonymous and confidential. Our volunteers are trained to provide peer support.
                      This is not professional therapy or crisis intervention.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : isSearching ? (
          /* Searching for Peer */
          <div className="max-w-md mx-auto text-center">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border-0 p-8">
              <div className="animate-pulse">
                <Users className="h-16 w-16 text-green-500 mx-auto mb-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Finding you a supporter...
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                We're matching you with someone who can help with{' '}
                <span className="font-medium">
                  {topics.find(t => t.id === selectedTopic)?.label}
                </span>
              </p>
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </Card>
          </div>
        ) : (
          /* Chat Interface */
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border-0 overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white">
                        {currentSession?.peerName}
                      </h3>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Peer Volunteer • {topics.find(t => t.id === selectedTopic)?.label}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                      <Clock className="h-4 w-4" />
                      {currentSession?.status === 'connected' ? 'Connected' : 'Ended'}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={endSession}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      End Chat
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.sender === 'me'
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'me' 
                          ? 'text-blue-100' 
                          : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              {currentSession?.status === 'connected' ? (
                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                  <div className="text-center">
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      This chat session has ended. Thank you for connecting!
                    </p>
                    <Button
                      onClick={resetChat}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Start New Session
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Crisis Alert */}
            <Card className="mt-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div className="flex-1">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    <strong>In Crisis?</strong> If you're having thoughts of self-harm, please contact emergency services or a crisis hotline immediately.
                  </p>
                </div>
                <Link to="/resources">
                  <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                    Crisis Resources
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default PeerChat;
