"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Search, TrendingUp, Users, Tag, ArrowRight } from "lucide-react";

const HomePage = () => {
  const [trendingQuestions, setTrendingQuestions] = useState([
    {
      id: 1,
      title: "How to implement authentication in Next.js?",
      votes: 42,
      answers: 8,
      tags: ["next.js", "auth", "react"],
      author: "sarah.dev",
    },
    {
      id: 2,
      title: "Best practices for React state management in 2024",
      votes: 38,
      answers: 12,
      tags: ["react", "state-management", "javascript"],
      author: "alex.coding",
    },
  ]);

  const [popularTags] = useState([
    { name: "react", count: 1234 },
    { name: "javascript", count: 892 },
    { name: "python", count: 756 },
    { name: "node.js", count: 645 },
    { name: "database", count: 534 },
  ]);

  const [topUsers] = useState([
    { username: "sarah.dev", score: 15234, answers: 234 },
    { username: "alex.coding", score: 12453, answers: 182 },
    { username: "tech.guru", score: 11234, answers: 156 },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Find the answers you need</h1>
          <p className="text-xl mb-8">
            Join our community of developers helping each other solve problems
          </p>
          <div className="relative max-w-2xl">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full pl-10 p-4 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trending Questions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp size={20} className="text-blue-600" />
                  <span>Trending Questions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trendingQuestions.map((question) => (
                    <div
                      key={question.id}
                      className="border-b last:border-0 pb-4 last:pb-0"
                    >
                      <h3 className="text-lg font-medium mb-2 hover:text-blue-600 cursor-pointer">
                        {question.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span>{question.votes} votes</span>
                        <span>{question.answers} answers</span>
                        <span>by {question.author}</span>
                        <div className="flex gap-2">
                          {question.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <a href="/app">

                <button
                  className="mt-6 w-full p-2 text-blue-600 hover:bg-blue-50 rounded flex items-center justify-center"
                >
                  <span>View all questions</span>
                  <ArrowRight size={16} className="ml-2" />
                </button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Tag size={20} className="text-blue-600" />
                  <span>Popular Tags</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {popularTags.map((tag) => (
                    <div
                      key={tag.name}
                      className="flex items-center justify-between hover:bg-gray-50 p-2 rounded cursor-pointer"
                    >
                      <span className="text-blue-600">#{tag.name}</span>
                      <span className="text-gray-600 text-sm">{tag.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Users */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users size={20} className="text-blue-600" />
                  <span>Top Contributors</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topUsers.map((user) => (
                    <div
                      key={user.username}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <img
                        src="/api/placeholder/40/40"
                        alt={user.username}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{user.username}</div>
                        <div className="text-sm text-gray-600">
                          {user.answers} answers · {user.score} points
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
