import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const suggestedTags = [
  "anxiety", "depression", "support", "motivation", "therapy",
  "self-care", "healing", "hope", "advice", "gratitude",
  "breakthrough", "struggle", "community", "recovery"
];

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const maxChars = 500;
  const remainingChars = maxChars - content.length;

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({
        title: "Please share your thoughts",
        description: "Your message cannot be empty.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Your thoughts have been shared! 💜", 
        description: "Thank you for being vulnerable and sharing with our community.",
      });
      navigate("/feed");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/feed">
            <Button 
              variant="ghost" 
              size="sm"
              className="p-2 hover:bg-blue-50 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Share Your Thoughts</h1>
            <p className="text-slate-600 dark:text-slate-300">Your feelings are valid and your voice matters</p>
          </div>
        </div>

        {/* Create Form */}
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-2xl shadow-sm p-8">
          {/* Text Input */}
          <div className="mb-6">
            <Textarea
              placeholder="What's on your mind? Share your thoughts, feelings, experiences, or ask for support. This is a safe space..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] text-base leading-relaxed resize-none border-blue-200 focus:border-blue-500 rounded-2xl p-4 bg-white dark:bg-slate-700"
              maxLength={maxChars}
            />
            <div className="flex justify-between items-center mt-2 px-1">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Express yourself honestly and openly
              </span>
              <span className={`text-sm ${remainingChars < 50 ? 'text-orange-500' : 'text-slate-500'}`}>
                {remainingChars} characters left
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Add up to 3 tags (optional)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  onClick={() => handleTagToggle(tag)}
                  className={`rounded-full text-xs transition-all duration-200 ${
                    selectedTags.includes(tag)
                      ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                      : "border-blue-200 text-blue-600 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                  disabled={!selectedTags.includes(tag) && selectedTags.length >= 3}
                >
                  #{tag}
                </Button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <div className="mt-3 p-3 bg-blue-50 dark:bg-slate-700 rounded-xl">
                <span className="text-sm text-blue-600 dark:text-blue-400">Selected: </span>
                {selectedTags.map((tag, index) => (
                  <span key={tag} className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    #{tag}{index < selectedTags.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 text-white flex-1 justify-center rounded-xl"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sharing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Share Anonymously
                </div>
              )}
            </Button>
          </div>

          {/* Privacy Note */}
          <div className="mt-6 p-4 bg-green-50 dark:bg-slate-700 rounded-xl border border-green-200 dark:border-slate-600">
            <p className="text-sm text-green-700 dark:text-green-400 text-center">
              🔒 Your post will be shared anonymously. No personal information is collected or stored.
              You're safe here.
            </p>
          </div>
        </div>

        {/* Guidelines */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-2xl shadow-sm p-6">
          <h3 className="font-medium mb-3 text-center text-slate-900 dark:text-white">Community Guidelines</h3>
          <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
            <li>• Be kind and supportive to others</li>
            <li>• Share your authentic experiences</li>
            <li>• Respect others' vulnerability and courage</li>
            <li>• If you're in crisis, please reach out to professional help</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default CreatePost;