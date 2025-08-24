
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users, MessageCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-illustration.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        <div className="container mx-auto px-4 py-16 lg:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <Heart className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-semibold text-blue-600">
                  MindLink
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900 dark:text-white">
                A safe place to talk about your{" "}
                <span className="text-blue-600">
                  mental health
                </span>{" "}
                — anonymously
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg mx-auto lg:mx-0">
                Share your feelings, find support, and connect with others who understand. 
                No judgment, no pressure, just genuine human compassion.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/auth">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto text-lg px-8 py-4 rounded-xl">
                    <Heart className="h-5 w-5 mr-2" />
                    Join MindLink
                  </Button>
                </Link>
                <Link to="/feed">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 px-8 py-4 rounded-xl"
                  >
                    Browse Anonymously
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-100 to-purple-100">
                <img 
                  src={heroImage} 
                  alt="Calming illustration representing mental health support"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                <MessageCircle className="h-6 w-6 text-purple-500" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4 text-slate-900 dark:text-white">
            Why Choose MindLink?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A comprehensive platform designed specifically for university students' mental wellness
          </p>
        </div>          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-blue-50 dark:bg-slate-700 rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Anonymous & Safe</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Choose your level of privacy. Create an account for mood tracking and peer support, 
                or browse completely anonymously.
              </p>
            </div>
            
            <div className="text-center bg-purple-50 dark:bg-slate-700 rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Peer Support & Forums</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Connect with trained peer volunteers for one-on-one support, or join community discussions 
                in our moderated forum.
              </p>
            </div>
            
            <div className="text-center bg-green-50 dark:bg-slate-700 rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Mood Tracking & Wellness</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Track your daily mood, receive personalized resources, and get gentle nudges 
                toward professional help when needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-100 via-purple-100 to-green-100 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-6 text-slate-900 dark:text-white">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Take the first step towards feeling less alone. Your courage to be vulnerable 
            might be exactly what someone else needs to hear today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto text-lg px-8 py-4 rounded-xl">
                <MessageCircle className="h-5 w-5 mr-2" />
                Get Started
              </Button>
            </Link>
            <Link to="/resources">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 px-8 py-4 rounded-xl"
              >
                Find Resources
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
            🔒 Always anonymous • Student & volunteer verified • Professional resources available
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
