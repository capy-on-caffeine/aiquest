import React from 'react';

const QAInterface = () => {
  const sidebarLinks = [
    "My questions",
    "My answers",
    "Bookmarks",
    "Credits"
  ];

  const answers = [
    {
      score: 56,
      content: "Expert answer to the problem",
      author: "TechLead",
      tags: ["Verified"]
    },
    {
      score: 13,
      content: "AI generated answer based on other questions and documentation",
      author: "NakamaAI",
      isDiamond: true
    },
    {
      score: 8,
      content: "A normal answer presumably",
      author: "RandoEmployee89"
    }
  ];

  const questionTags = ["AI Agents", "Llama3", "AI/ML"];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 p-4">
        <div className="h-12 mb-8 bg-gray-200 rounded"></div>
        <nav className="space-y-2">
          {sidebarLinks.map((link) => (
            <div key={link} className="text-gray-700 hover:text-gray-900 cursor-pointer py-1">
              {link}
            </div>
          ))}
        </nav>
        <div className="mt-8">
          <button className="w-full p-2 border border-gray-200 rounded text-gray-700 hover:bg-gray-50">
            Chat with AI
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        {/* Search bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 mx-4">
            <input
              type="text"
              placeholder="Search things here"
              className="w-full p-2 border border-gray-200 rounded"
            />
          </div>
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <button className="text-green-500">▲</button>
              <span className="my-1">14</span>
              <button className="text-red-500">▼</button>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-semibold mb-2">
                Some question about what's buggin me
              </h1>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <span>By NoobDev123</span>
              </div>
              <div className="flex space-x-2">
                {questionTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Answers */}
        <div className="space-y-4">
          {answers.map((answer, index) => (
            <div key={index} className="flex space-x-4 p-4 border border-gray-200 rounded">
              <div className="flex flex-col items-center">
                <button className="text-green-500">▲</button>
                <span className="my-1">{answer.score}</span>
                <button className="text-red-500">▼</button>
              </div>
              <div className="flex-1">
                <p className="mb-2">{answer.content}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <span>By {answer.author}</span>
                  {answer.isDiamond && (
                    <span className="ml-2">♦</span>
                  )}
                  {answer.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QAInterface;