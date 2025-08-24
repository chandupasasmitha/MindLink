import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Globe, Heart, Book, Users } from "lucide-react";

const crisisResources = [
  {
    country: "United States",
    resources: [
      { name: "988 Suicide & Crisis Lifeline", number: "988", available: "24/7" },
      { name: "Crisis Text Line", number: "Text HOME to 741741", available: "24/7" },
      { name: "NAMI Helpline", number: "1-800-950-NAMI (6264)", available: "Mon-Fri 10am-10pm ET" }
    ]
  },
  {
    country: "United Kingdom", 
    resources: [
      { name: "Samaritans", number: "116 123", available: "24/7" },
      { name: "Crisis Text Line UK", number: "Text SHOUT to 85258", available: "24/7" },
      { name: "Mind Infoline", number: "0300 123 3393", available: "Mon-Fri 9am-6pm" }
    ]
  },
  {
    country: "Canada",
    resources: [
      { name: "Talk Suicide Canada", number: "1-833-456-4566", available: "24/7" },
      { name: "Crisis Text Line Canada", number: "Text TALK to 686868", available: "24/7" },
      { name: "Kids Help Phone", number: "1-800-668-6868", available: "24/7" }
    ]
  }
];

const selfCareArticles = [
  {
    title: "5-Minute Breathing Exercises for Anxiety",
    description: "Simple techniques you can use anywhere to calm your mind",
    readTime: "3 min read"
  },
  {
    title: "Building Daily Routines for Mental Wellness", 
    description: "Small habits that can make a big difference in your mental health",
    readTime: "5 min read"
  },
  {
    title: "When to Seek Professional Help",
    description: "Knowing the signs and taking the brave step forward",
    readTime: "4 min read"
  },
  {
    title: "Supporting a Friend in Crisis",
    description: "How to be there for someone without overwhelming yourself",
    readTime: "6 min read"
  }
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Resources & Support
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Professional help and self-care resources to support your mental health journey
          </p>
        </div>

        {/* Crisis Resources */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-2xl shadow-sm p-8 border-2 border-red-200 dark:border-red-900">
            <div className="flex items-center gap-3 mb-6">
              <Phone className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-semibold text-red-600">Crisis Support</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              If you're in immediate danger or having thoughts of self-harm, please reach out for help right away.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {crisisResources.map((region) => (
                <div key={region.country} className="bg-white dark:bg-slate-700 rounded-2xl p-6 border border-red-200 dark:border-slate-600 shadow-sm">
                  <h3 className="font-semibold mb-4 text-lg text-slate-900 dark:text-white">{region.country}</h3>
                  <div className="space-y-3">
                    {region.resources.map((resource, index) => (
                      <div key={index} className="space-y-1">
                        <h4 className="font-medium text-sm text-slate-700 dark:text-slate-200">{resource.name}</h4>
                        <p className="text-red-600 font-mono text-sm">{resource.number}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{resource.available}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Self-Care Articles */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Book className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Wellness Articles</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {selfCareArticles.map((article, index) => (
              <article key={index} className="bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-2xl shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors text-slate-900 dark:text-white">
                  {article.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 bg-white/60 dark:bg-slate-700/60 px-2 py-1 rounded-full">
                    {article.readTime}
                  </span>
                  <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700">
                    Read More →
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Professional Help */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-2xl shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Finding Professional Help</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium mb-3 text-slate-900 dark:text-white">Types of Mental Health Professionals</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li>• <span className="font-medium text-slate-900 dark:text-white">Therapists/Counselors:</span> Talk therapy and coping strategies</li>
                  <li>• <span className="font-medium text-slate-900 dark:text-white">Psychiatrists:</span> Medical doctors who can prescribe medication</li>
                  <li>• <span className="font-medium text-slate-900 dark:text-white">Social Workers:</span> Therapy and connecting you with resources</li>
                  <li>• <span className="font-medium text-slate-900 dark:text-white">Peer Support:</span> People with lived experience who can relate</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-3 text-slate-900 dark:text-white">Finding the Right Fit</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li>• It's okay to "shop around" for the right therapist</li>
                  <li>• Ask about their approach and specialties</li>
                  <li>• Consider online therapy if in-person isn't accessible</li>
                  <li>• Check if your insurance covers mental health services</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Community Reminder */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-green-100 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 rounded-2xl shadow-sm p-8">
            <Heart className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">You're Not Alone</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
              Remember that seeking help is a sign of strength, not weakness. Our community is here to support you, 
              and professional resources are available when you need them.
            </p>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
              <MessageCircle className="h-4 w-4" />
              Join Our Community
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Resources;