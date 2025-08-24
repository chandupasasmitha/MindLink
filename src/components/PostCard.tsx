import { useState } from "react";
import { Heart, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostCardProps {
  id: string;
  username: string;
  content: string;
  timestamp: string;
  supportCount: number;
  commentCount: number;
  tags?: string[];
  isSupported?: boolean;
}

const PostCard = ({ 
  id, 
  username, 
  content, 
  timestamp, 
  supportCount, 
  commentCount, 
  tags = [],
  isSupported = false 
}: PostCardProps) => {
  const [supported, setSupported] = useState(isSupported);
  const [currentSupportCount, setCurrentSupportCount] = useState(supportCount);

  const handleSupport = () => {
    if (supported) {
      setSupported(false);
      setCurrentSupportCount(prev => prev - 1);
    } else {
      setSupported(true);
      setCurrentSupportCount(prev => prev + 1);
    }
  };

  return (
    <article className="bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-2xl shadow-sm p-6 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white">{username}</h3>
            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <Clock className="h-3 w-3" />
              {timestamp}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{content}</p>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSupport}
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all duration-200 ${
              supported 
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" 
                : "hover:bg-green-50 text-slate-600 hover:text-green-600 dark:hover:bg-green-900/20 dark:text-slate-400 dark:hover:text-green-400"
            }`}
          >
            <Heart 
              className={`h-4 w-4 ${supported ? "fill-current" : ""}`} 
            />
            <span>Send Support</span>
            {currentSupportCount > 0 && (
              <span className="bg-green-200/60 dark:bg-green-800/60 text-xs px-2 py-0.5 rounded-full">
                {currentSupportCount}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-blue-900/20 px-3 py-2 rounded-full text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Comments</span>
            {commentCount > 0 && (
              <span className="bg-blue-100 dark:bg-blue-900/30 text-xs px-2 py-0.5 rounded-full">
                {commentCount}
              </span>
            )}
          </Button>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400">
          Your words matter ✨
        </div>
      </div>
    </article>
  );
};

export default PostCard;