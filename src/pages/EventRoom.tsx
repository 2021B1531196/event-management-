import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockEvents } from '../data/mockEvents';
import { 
  MessageSquare, 
  Users, 
  Send, 
  HelpCircle, 
  ThumbsUp, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  ScreenShare,
  Grid,
  Settings,
  LogOut
} from 'lucide-react';

// Mock message data
const initialMessages = [
  { id: 1, user: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?u=sarah@example.com' }, text: 'Hello everyone! Excited to be here today.', time: new Date(Date.now() - 15 * 60000) },
  { id: 2, user: { name: 'John Smith', avatar: 'https://i.pravatar.cc/150?u=john@example.com' }, text: 'Looking forward to this session!', time: new Date(Date.now() - 10 * 60000) },
  { id: 3, user: { name: 'Emily Chen', avatar: 'https://i.pravatar.cc/150?u=emily@example.com' }, text: 'Does anyone have questions about the agenda?', time: new Date(Date.now() - 5 * 60000) }
];

type Tab = 'chat' | 'participants' | 'questions';

const EventRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [event, setEvent] = useState(mockEvents[0]);
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [questions, setQuestions] = useState([
    { id: 1, user: { name: 'Michael Lee', avatar: 'https://i.pravatar.cc/150?u=michael@example.com' }, text: 'Will the slides be available after the event?', votes: 5, answered: false },
    { id: 2, user: { name: 'Lisa Wang', avatar: 'https://i.pravatar.cc/150?u=lisa@example.com' }, text: 'Can you explain more about the implementation details?', votes: 3, answered: false }
  ]);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'John Smith (Host)', avatar: 'https://i.pravatar.cc/150?u=john@example.com', role: 'host', isActive: true },
    { id: 2, name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?u=sarah@example.com', role: 'attendee', isActive: true },
    { id: 3, name: 'Emily Chen', avatar: 'https://i.pravatar.cc/150?u=emily@example.com', role: 'attendee', isActive: true },
    { id: 4, name: 'Michael Lee', avatar: 'https://i.pravatar.cc/150?u=michael@example.com', role: 'attendee', isActive: true },
    { id: 5, name: 'Lisa Wang', avatar: 'https://i.pravatar.cc/150?u=lisa@example.com', role: 'attendee', isActive: true }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Find event by id
    const foundEvent = mockEvents.find(e => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
    }
  }, [id]);
  
  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;
    
    const message = {
      id: messages.length + 1,
      user: {
        name: user.name,
        avatar: user.avatar || `https://i.pravatar.cc/150?u=${user.email}`
      },
      text: newMessage,
      time: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };
  
  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;
    
    const question = {
      id: questions.length + 1,
      user: {
        name: user.name,
        avatar: user.avatar || `https://i.pravatar.cc/150?u=${user.email}`
      },
      text: newMessage,
      votes: 0,
      answered: false
    };
    
    setQuestions([...questions, question]);
    setNewMessage('');
  };
  
  const handleVoteQuestion = (id: number) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, votes: q.votes + 1 } : q
    ).sort((a, b) => b.votes - a.votes));
  };
  
  const toggleAudio = () => setIsAudioOn(!isAudioOn);
  const toggleVideo = () => setIsVideoOn(!isVideoOn);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Event Header */}
      <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-900">{event.title}</h1>
          <span className="ml-3 px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
            {event.category}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            <Settings size={18} className="mr-1" />
            <span className="hidden sm:inline">Settings</span>
          </button>
          <button className="flex items-center text-sm text-accent-600 hover:text-accent-700">
            <LogOut size={18} className="mr-1" />
            <span className="hidden sm:inline">Leave Event</span>
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 bg-gray-900 flex flex-col">
          <div className="flex-1 p-4 flex items-center justify-center">
            <div className="relative w-full max-w-4xl aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/7647974/pexels-photo-7647974.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                alt="Event live stream" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white">
                  <h2 className="text-xl font-semibold mb-2">
                    {event.title}
                  </h2>
                  <p className="text-sm text-gray-300">
                    Live presentation by {event.organizer.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Video Controls */}
          <div className="bg-gray-800 p-3 flex items-center justify-center space-x-4">
            <button 
              className={`p-3 rounded-full ${isAudioOn ? 'bg-gray-700 text-white' : 'bg-accent-600 text-white'}`}
              onClick={toggleAudio}
            >
              {isAudioOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
            <button 
              className={`p-3 rounded-full ${isVideoOn ? 'bg-gray-700 text-white' : 'bg-accent-600 text-white'}`}
              onClick={toggleVideo}
            >
              {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
            </button>
            <button className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600">
              <ScreenShare size={20} />
            </button>
            <button className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600">
              <Grid size={20} />
            </button>
            <button className="px-4 py-2 bg-accent-600 text-white rounded-md hover:bg-accent-700">
              Raise Hand
            </button>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="w-full md:w-80 bg-white border-l border-gray-200 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button 
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center
                ${activeTab === 'chat' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('chat')}
            >
              <MessageSquare size={18} className="mr-1" />
              Chat
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center
                ${activeTab === 'participants' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('participants')}
            >
              <Users size={18} className="mr-1" />
              Participants ({participants.length})
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center
                ${activeTab === 'questions' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('questions')}
            >
              <HelpCircle size={18} className="mr-1" />
              Q&A
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'chat' && (
              <div className="p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-start">
                      <img 
                        src={message.user.avatar} 
                        alt={message.user.name} 
                        className="h-8 w-8 rounded-full mr-3" 
                      />
                      <div className="flex-1">
                        <div className="flex items-baseline">
                          <h4 className="text-sm font-medium text-gray-900">{message.user.name}</h4>
                          <span className="ml-2 text-xs text-gray-500">
                            {message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{message.text}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
            
            {activeTab === 'participants' && (
              <div className="p-4">
                <div className="space-y-3">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative">
                          <img 
                            src={participant.avatar} 
                            alt={participant.name} 
                            className="h-8 w-8 rounded-full mr-3" 
                          />
                          {participant.isActive && (
                            <span className="absolute bottom-0 right-2 h-2 w-2 rounded-full bg-green-400 ring-1 ring-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{participant.role}</p>
                        </div>
                      </div>
                      {participant.role === 'host' && (
                        <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800">
                          Host
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'questions' && (
              <div className="p-4">
                <div className="space-y-4">
                  {questions.map((question) => (
                    <div key={question.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-start">
                        <img 
                          src={question.user.avatar} 
                          alt={question.user.name} 
                          className="h-8 w-8 rounded-full mr-2" 
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{question.user.name}</h4>
                          <p className="text-sm text-gray-700 mt-1">{question.text}</p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <button 
                              className="flex items-center text-xs text-gray-500 hover:text-primary-600"
                              onClick={() => handleVoteQuestion(question.id)}
                            >
                              <ThumbsUp size={14} className="mr-1" />
                              Upvote ({question.votes})
                            </button>
                            {question.answered && (
                              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                Answered
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
          </div>
          
          {/* Message Input */}
          <div className="p-3 border-t border-gray-200">
            <form 
              onSubmit={activeTab === 'questions' ? handleAskQuestion : handleSendMessage}
              className="flex items-center"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={activeTab === 'questions' ? "Ask a question..." : "Type a message..."}
                className="flex-1 form-input py-2 text-sm"
              />
              <button 
                type="submit" 
                className="ml-2 p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700"
                disabled={!newMessage.trim()}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRoom;