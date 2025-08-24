import { useState } from "react";
import Navigation from "@/components/Navigation";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for demonstration
const mockPosts = [
  {
    id: "1",
    username: "CalmOtter42",
    content: "I've been struggling with anxiety lately, especially in social situations. It feels like everyone is watching and judging me. Sometimes I just want to stay home forever. Does anyone else feel this way?",
    timestamp: "2 hours ago",
    supportCount: 12,
    commentCount: 8,
    tags: ["anxiety", "social", "support"],
    isSupported: false
  },
  {
    id: "2", 
    username: "QuietWaves19",
    content: "Today I managed to get out of bed and take a shower. I know it sounds small, but it felt like a huge victory. Some days the little wins are everything.",
    timestamp: "4 hours ago",
    supportCount: 24,
    commentCount: 15,
    tags: ["depression", "small-wins", "motivation"],
    isSupported: true
  },
  {
    id: "3",
    username: "BraveHeart88",
    content: "Started therapy last week. It's scary but I'm hopeful. To anyone thinking about it - you deserve support and healing. We're all in this together.",
    timestamp: "6 hours ago", 
    supportCount: 31,
    commentCount: 12,
    tags: ["therapy", "hope", "healing"],
    isSupported: false
  },
  {
    id: "4",
    username: "SoftMoon27",
    content: "Having trouble sleeping again. My mind won't stop racing with all the things I should be doing differently. How do you all quiet your thoughts at night?",
    timestamp: "8 hours ago",
    supportCount: 18,
    commentCount: 22,
    tags: ["insomnia", "overthinking", "advice"],
    isSupported: false
  }
];

const filterOptions = [
  { label: "All Posts", value: "all", active: true },
  { label: "Most Supported", value: "supported", active: false },
  { label: "Recent", value: "recent", active: false },
];

const Feed = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [posts] = useState(mockPosts);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Community Support
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            A safe space where every voice matters and every feeling is valid.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <div className="flex gap-2">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={activeFilter === option.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveFilter(option.value)}
                  className={
                    activeFilter === option.value
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "text-slate-600 hover:text-slate-900 hover:bg-blue-50"
                  }
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick create button */}
          <Link to="/create">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-xl">
              <Plus className="h-4 w-4" />
              Share
            </Button>
          </Link>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-xl"
          >
            Load More Posts
          </Button>
        </div>

        {/* Encouragement */}
        <div className="text-center mt-8 p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-2xl shadow-sm">
          <p className="text-slate-600 dark:text-slate-300 italic">
            "You are not alone in this journey. Every step forward, no matter how small, is progress worth celebrating."
          </p>
        </div>
      </main>
    </div>
  );
};

export default Feed;