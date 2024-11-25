'use client'

import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, BookmarkPlus, Award, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Fallback data
const FALLBACK_DATA = {
  question: {
    id: 1,
    title: "How to get started with React?",
    content: "I'm new to React and would like to understand the basics. Where should I start?",
    author: "newbie_dev",
    score: 5,
    tags: ["react", "javascript", "web-development"],
    createdAt: new Date().toISOString(),
    answers: []
  },
  answers: [
    {
      id: 1,
      score: 10,
      content: "Start with the official React documentation. It's comprehensive and well-structured.",
      author: "senior_dev",
      isDiamond: true,
      createdAt: new Date().toISOString(),
      tags: ["recommended"]
    },
    {
      id: 2,
      score: 7,
      content: "Try building small projects first. Todo lists are great for learning the basics.",
      author: "tech_mentor",
      createdAt: new Date().toISOString()
    }
  ],
  user: {
    username: "Guest User",
    id: 0
  }
};

interface Answer {
  id: number;
  score: number;
  content: string;
  author: string;
  tags?: string[];
  isDiamond?: boolean;
  createdAt: string;
}

interface Question {
  id: number;
  title: string;
  content: string;
  author: string;
  score: number;
  tags: string[];
  createdAt: string;
  answers: Answer[];
}

// Sidebar Component
interface SidebarProps {
  activeLink: string;
  onLinkClick: (id: string) => void;
}

const Sidebar = ({ activeLink, onLinkClick }: SidebarProps) => {
  const sidebarLinks = [
    { id: 'questions', label: 'My Questions', icon: MessageCircle },
    { id: 'answers', label: 'My Answers', icon: MessageCircle },
    { id: 'bookmarks', label: 'Bookmarks', icon: BookmarkPlus },
    { id: 'credits', label: 'Credits', icon: Award },
  ];

  return (
    <div className="w-64 border-r border-gray-200 p-4 h-screen sticky top-0">
      <div className="flex items-center space-x-2 h-12 mb-8">
        <img 
          src="/api/placeholder/48/48"
          alt="Logo"
          className="h-8 w-8 rounded"
        />
        <span className="font-semibold text-lg">Q&A Platform</span>
      </div>
      <nav className="space-y-2">
        {sidebarLinks.map(({ id, label, icon: Icon }) => (
          <div
            key={id}
            onClick={() => onLinkClick(id)}
            className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors
              ${activeLink === id 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:bg-gray-50'
              }`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </div>
        ))}
      </nav>
      <div className="mt-8">
        <button 
          className="w-full p-2 border border-blue-500 text-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
          onClick={() => window.open('https://chat.openai.com', '_blank')}
        >
          <MessageCircle size={18} />
          <span>Chat with AI</span>
        </button>
      </div>
    </div>
  );
};

// SearchBar Component
interface SearchBarProps {
  onSearch: (query: string) => void;
  user: { username: string } | null;
}

const SearchBar = ({ onSearch, user }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="flex justify-between items-center mb-6 p-4 border-b border-gray-200">
      <form onSubmit={handleSearch} className="flex-1 mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search questions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 p-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </form>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <BookmarkPlus size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="/api/placeholder/32/32"
            alt={user?.username || 'Guest'}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">{user?.username || 'Guest'}</span>
        </div>
      </div>
    </div>
  );
};

// VoteButtons Component
interface VoteButtonsProps {
  score: number;
  onUpvote: () => void;
  onDownvote: () => void;
  userVote: 'up' | 'down' | null;
}

const VoteButtons = ({ score, onUpvote, onDownvote, userVote }: VoteButtonsProps) => {
  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={onUpvote}
        className={`p-1 rounded transition-colors ${
          userVote === 'up' ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
        }`}
      >
        ▲
      </button>
      <span className="my-1 font-medium">{score}</span>
      <button 
        onClick={onDownvote}
        className={`p-1 rounded transition-colors ${
          userVote === 'down' ? 'text-red-600' : 'text-gray-400 hover:text-red-600'
        }`}
      >
        ▼
      </button>
    </div>
  );
};

// QuestionCard Component
interface QuestionCardProps {
  question: Question;
  onVote: (id: number, voteType: 'up' | 'down', contentType: 'question' | 'answer') => void;
  userVotes: { [key: number]: 'up' | 'down' | null };
}

const QuestionCard = ({ question, onVote, userVotes }: QuestionCardProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <VoteButtons
            score={question.score}
            onUpvote={() => onVote(question.id, 'up', 'question')}
            onDownvote={() => onVote(question.id, 'down', 'question')}
            userVote={userVotes[question.id]}
          />
          <div className="flex-1">
            <h1 className="text-xl font-semibold mb-2">
              {question.title}
            </h1>
            <p className="text-gray-600 mb-4">{question.content}</p>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <User size={16} className="mr-1" />
              <span className="mr-4">By {question.author}</span>
              <span>{new Date(question.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// AnswerCard Component
interface AnswerCardProps {
  answer: Answer;
  onVote: (id: number, voteType: 'up' | 'down', contentType: 'question' | 'answer') => void;
  userVotes: { [key: number]: 'up' | 'down' | null };
}

const AnswerCard = ({ answer, onVote, userVotes }: AnswerCardProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex space-x-4">
          <VoteButtons
            score={answer.score}
            onUpvote={() => onVote(answer.id, 'up', 'answer')}
            onDownvote={() => onVote(answer.id, 'down', 'answer')}
            userVote={userVotes[answer.id]}
          />
          <div className="flex-1">
            <p className="mb-4">{answer.content}</p>
            <div className="flex items-center text-sm text-gray-600">
              <User size={16} className="mr-1" />
              <span>By {answer.author}</span>
              {answer.isDiamond && (
                <span className="ml-2 text-blue-600">♦</span>
              )}
              {answer.tags?.map((tag) => (
                <span
                  key={tag}
                  className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-600 rounded"
                >
                  {tag}
                </span>
              ))}
              <span className="ml-auto">
                {new Date(answer.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main QAInterface Component
const QAInterface = () => {
  const [activeLink, setActiveLink] = useState('questions');
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userVotes, setUserVotes] = useState<{ [key: number]: 'up' | 'down' | null }>({});
  const [user, setUser] = useState<{ username: string; id: number } | null>(null);

  // Fetch initial data with error handling and fallback
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        const fetchWithTimeout = async (url: string, timeout = 5000) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeout);

          try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
          } catch (error) {
            clearTimeout(timeoutId);
            throw error;
          }
        };

        const [questionData, answersData, userData] = await Promise.all([
          fetchWithTimeout('/api/questions/1').catch(() => FALLBACK_DATA.question),
          fetchWithTimeout('/api/questions/1/answers').catch(() => FALLBACK_DATA.answers),
          fetchWithTimeout('/api/user').catch(() => FALLBACK_DATA.user)
        ]);
        
        setQuestion(questionData);
        setAnswers(answersData);
        setUser(userData);
      } catch (err) {
        console.error('Error fetching data:', err);
        // Use fallback data if everything fails
        setQuestion(FALLBACK_DATA.question);
        setAnswers(FALLBACK_DATA.answers);
        setUser(FALLBACK_DATA.user);
        setError('Using offline mode due to connection issues.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVote = async (id: number, voteType: 'up' | 'down', contentType: 'question' | 'answer') => {
    try {
      setError('');
      const response = await fetch(`/api/${contentType}s/${id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voteType }),
      });

      if (!response.ok) throw new Error('Vote failed');

      const newVote = userVotes[id] === voteType ? null : voteType;
      setUserVotes(prev => ({ ...prev, [id]: newVote }));

      const voteChange = newVote === 'up' ? 1 : newVote === 'down' ? -1 : 0;
      const prevVoteChange = userVotes[id] === 'up' ? -1 : userVotes[id] === 'down' ? 1 : 0;
      const totalChange = voteChange + prevVoteChange;

      if (contentType === 'question' && question) {
        setQuestion(prev => prev ? ({
          ...prev,
          score: prev.score + totalChange,
        }) : prev);
      } else {
        setAnswers(prev =>
          prev.map(answer =>
            answer.id === id
              ? { ...answer, score: answer.score + totalChange }
              : answer
          )
        );
      }
    } catch (err) {
      console.error('Vote error:', err);
      setError('Failed to save vote. Please try again.');
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      // Handle search results here
      setQuestion(data.question || FALLBACK_DATA.question);
      setAnswers(data.answers || FALLBACK_DATA.answers);
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed. Showing default results.');
      setQuestion(FALLBACK_DATA.question);
        setAnswers(FALLBACK_DATA.answers);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar activeLink={activeLink} onLinkClick={setActiveLink} />
        <div className="flex-1">
          <SearchBar onSearch={handleSearch} user={user} />
          <main className="max-w-4xl mx-auto p-4">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeLink={activeLink} onLinkClick={setActiveLink} />
      <div className="flex-1">
        <SearchBar onSearch={handleSearch} user={user} />
        <main className="max-w-4xl mx-auto p-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {question && (
            <QuestionCard
              question={question}
              onVote={handleVote}
              userVotes={userVotes}
            />
          )}

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
            </h2>
            <button 
              onClick={() => {
                const answerElement = document.getElementById('answer-form');
                answerElement?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Answer
            </button>
          </div>

          <div className="space-y-4">
            {answers.length > 0 ? (
              answers.map((answer) => (
                <AnswerCard
                  key={answer.id}
                  answer={answer}
                  onVote={handleVote}
                  userVotes={userVotes}
                />
              ))
            ) : (
              <Card className="mb-4">
                <CardContent className="p-6 text-center text-gray-500">
                  No answers yet. Be the first to answer this question!
                </CardContent>
              </Card>
            )}
          </div>

          <div id="answer-form" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Your Answer</h3>
                <textarea
                  className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-32"
                  placeholder="Write your answer here..."
                />
                <div className="mt-4 flex justify-end">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      // Handle answer submission
                      setError('Answer submission is not implemented in demo mode');
                    }}
                  >
                    Post Answer
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pagination for answers if needed */}
          {answers.length > 10 && (
            <div className="mt-6 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
                <button className="px-3 py-1 bg-blue-50 border border-blue-500 rounded">1</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
              </nav>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default QAInterface;