// api.js
const API_URL = 'https://ai-quest-kueu.onrender.com';

// Authentication service
export const authService = {
  async register(userData:any) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  },

  async login(credentials:any) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  },

  logout() {
    localStorage.removeItem('token');
  }
};

// Q&A service
export const qaService = {
  async getQuestion(id:any) {
    const response = await fetch(`${API_URL}/questions/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.json();
  },

  async getAnswers(questionId:any) {
    const response = await fetch(`${API_URL}/questions/${questionId}/answers`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.json();
  },

  async vote(contentType:any, id:any, voteType:any) {
    const response = await fetch(`${API_URL}/${contentType}s/${id}/vote`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ voteType })
    });
    return response.json();
  },

  async search(query:any) {
    const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.json();
  },

  async createQuestion(questionData:any) {
    const response = await fetch(`${API_URL}/questions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(questionData)
    });
    return response.json();
  },

  async createAnswer(questionId:any, answerData:any) {
    const response = await fetch(`${API_URL}/questions/${questionId}/answers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(answerData)
    });
    return response.json();
  }
};