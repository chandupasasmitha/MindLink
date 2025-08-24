import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Plus, 
  ThumbsUp, 
  MessageCircle,
  Tag,
  TrendingUp,
  Clock,
  ArrowLeft,
  Filter,
  Search
} from "lucide-react";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorName: string;
  timestamp: string;
  tags: string[];
  upvotes: number;
  replies: number;
  isUpvoted?: boolean;
}

interface Reply {
  id: string;
  postId: string;
  content: string;
  authorName: string;
  timestamp: string;
  upvotes: number;
  isUpvoted?: boolean;
}

const SpeakUp = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('recent');
  
  // Form states
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [newReply, setNewReply] = useState('');

  const availableTags = [
    'stress', 'anxiety', 'depression', 'relationships', 'academic', 
    'social', 'family', 'self-care', 'motivation', 'success', 
    'lgbtq+', 'financial', 'career', 'health', 'sleep'
  ];

  const filterOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'discussed', label: 'Most Discussed' }
  ];

  // Load mock data
  useEffect(() => {
    const mockPosts: ForumPost[] = [
      {
        id: '1',
        title: 'Dealing with imposter syndrome in my final year',
        content: 'I\'m in my final year and constantly feel like I don\'t belong here. Everyone seems so confident and I feel like I\'m just pretending to know what I\'m doing. Anyone else experience this?',
        authorName: 'QuietAchiever23',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        tags: ['academic', 'stress', 'self-doubt'],
        upvotes: 24,
        replies: 8,
        isUpvoted: false
      },
      {
        id: '2',
        title: 'Small win: I asked for help in class today! 🎉',
        content: 'This might seem tiny but I\'ve been struggling with social anxiety and today I finally raised my hand to ask a question. My heart was pounding but I did it! Sometimes the small steps matter most.',
        authorName: 'BraveVoice88',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        tags: ['success', 'social', 'anxiety'],
        upvotes: 45,
        replies: 12,
        isUpvoted: true
      },
      {
        id: '3',
        title: 'Healthy study break ideas?',
        content: 'I keep falling into the trap of scrolling social media during study breaks which makes me feel worse. What are some quick 10-15 minute activities that actually help you recharge?',
        authorName: 'StudyBuddy42',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        tags: ['self-care', 'academic', 'motivation'],
        upvotes: 18,
        replies: 15,
        isUpvoted: false
      }
    ];
    setPosts(mockPosts);
  }, []);

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const tagsArray = newPost.tags
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0)
      .slice(0, 5);

    const post: ForumPost = {
      id: Math.random().toString(36).substr(2, 9),
      title: newPost.title.trim(),
      content: newPost.content.trim(),
      authorName: 'You', // This would come from user context
      timestamp: new Date().toISOString(),
      tags: tagsArray,
      upvotes: 0,
      replies: 0,
      isUpvoted: false
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', tags: '' });
    setShowCreateForm(false);
  };

  const handleUpvote = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          upvotes: post.isUpvoted ? post.upvotes - 1 : post.upvotes + 1,
          isUpvoted: !post.isUpvoted
        };
      }
      return post;
    }));
  };

  const handleReply = (postId: string) => {
    if (!newReply.trim()) return;

    const reply: Reply = {
      id: Math.random().toString(36).substr(2, 9),
      postId,
      content: newReply.trim(),
      authorName: 'You',
      timestamp: new Date().toISOString(),
      upvotes: 0,
      isUpvoted: false
    };

    setReplies(prev => [...prev, reply]);
    
    // Update post reply count
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, replies: post.replies + 1 } : post
    ));
    
    setNewReply('');
  };

  const filteredPosts = posts
    .filter(post => 
      searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (selectedFilter) {
        case 'popular':
          return b.upvotes - a.upvotes;
        case 'discussed':
          return b.replies - a.replies;
        default: // recent
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });

  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back Button */}
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedPost(null)}
              className="p-2 hover:bg-blue-50 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
              Back to Forum
            </h1>
          </div>

          {/* Post Detail */}
          <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border-0 p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {selectedPost.authorName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <span>{selectedPost.authorName}</span>
                  <span>•</span>
                  <span>{getTimeAgo(selectedPost.timestamp)}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  {selectedPost.content}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpvote(selectedPost.id)}
                    className={`flex items-center gap-2 ${
                      selectedPost.isUpvoted 
                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                        : 'text-slate-600 hover:text-blue-600'
                    }`}
                  >
                    <ThumbsUp className={`h-4 w-4 ${selectedPost.isUpvoted ? 'fill-current' : ''}`} />
                    {selectedPost.upvotes}
                  </Button>
                  
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <MessageCircle className="h-4 w-4" />
                    {selectedPost.replies} replies
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Replies */}
          <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border-0 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Replies ({selectedPost.replies})
            </h3>

            {/* Reply Form */}
            <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
              <Textarea
                placeholder="Share your thoughts, experiences, or offer support..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                rows={3}
                className="mb-3"
              />
              <Button
                onClick={() => handleReply(selectedPost.id)}
                disabled={!newReply.trim()}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                Post Reply
              </Button>
            </div>

            {/* Mock replies */}
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">S</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-slate-900 dark:text-white">SupportiveSoul</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">2h ago</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      I completely relate to this! Imposter syndrome is so real, especially in final year. 
                      Remember that you earned your place here. ✨
                    </p>
                  </div>
                </div>
              </div>

              {replies
                .filter(reply => reply.postId === selectedPost.id)
                .map(reply => (
                  <div key={reply.id} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-white">Y</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-slate-900 dark:text-white">{reply.authorName}</span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">{getTimeAgo(reply.timestamp)}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-sm">
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-purple-500" />
              SpeakUp Forum
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Share experiences, ask questions, and support each other
            </p>
          </div>
          
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border-0 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search posts, tags, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                aria-label="Filter posts"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Create Post Form */}
        {showCreateForm && (
          <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border-0 p-6 mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Share Your Experience
            </h2>
            
            <div className="space-y-4">
              <Input
                placeholder="What's your post about?"
                value={newPost.title}
                onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              />
              
              <Textarea
                placeholder="Share your thoughts, ask a question, or offer support to the community..."
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                rows={4}
              />
              
              <div>
                <Input
                  placeholder="Tags (comma separated, e.g., stress, academic, self-care)"
                  value={newPost.tags}
                  onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableTags.slice(0, 8).map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        const currentTags = newPost.tags.split(',').map(t => t.trim()).filter(t => t);
                        if (!currentTags.includes(tag)) {
                          setNewPost(prev => ({ 
                            ...prev, 
                            tags: [...currentTags, tag].join(', ') 
                          }));
                        }
                      }}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/20"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={handleCreatePost}
                  disabled={!newPost.title.trim() || !newPost.content.trim()}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  Post to Community
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewPost({ title: '', content: '', tags: '' });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card 
              key={post.id} 
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border-0 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {post.authorName.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 hover:text-purple-600 dark:hover:text-purple-400">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-700 dark:text-slate-300 line-clamp-2 mb-3">
                    {post.content}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      {post.authorName} • {getTimeAgo(post.timestamp)}
                    </span>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpvote(post.id);
                      }}
                      className={`flex items-center gap-1 hover:text-blue-600 ${
                        post.isUpvoted ? 'text-blue-600' : ''
                      }`}
                    >
                      <ThumbsUp className={`h-4 w-4 ${post.isUpvoted ? 'fill-current' : ''}`} />
                      {post.upvotes}
                    </button>
                    
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {post.replies}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          
          {filteredPosts.length === 0 && (
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm border-0 p-12 text-center">
              <MessageSquare className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                No posts found
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {searchTerm ? 'Try adjusting your search terms' : 'Be the first to start a conversation!'}
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  Create First Post
                </Button>
              )}
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default SpeakUp;
