import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaUserCircle, FaRobot } from 'react-icons/fa';

const ChatInterface = ({ messages, onSendMessage, onDisconnect }) => {
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim()) {
            onSendMessage(inputText);
            setInputText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-slate-900 text-white relative">
            <header className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <FaUserCircle className="text-3xl text-gray-400" />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></span>
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg">Stranger</h2>
                        <div className="text-xs text-green-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
                        </div>
                    </div>
                </div>
                <button
                    onClick={onDisconnect}
                    className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium"
                >
                    Disconnect
                </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-50">
                        <FaRobot className="text-6xl mb-4" />
                        <p>Say hello to your new friend!</p>
                    </div>
                ) : (
                    messages.map((msg, index) => {
                        const isSelf = msg.sender === 'self';
                        return (
                            <div
                                key={index}
                                className={`flex w-full ${isSelf ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-2 rounded-lg text-sm md:text-base leading-relaxed break-words
                    ${isSelf
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-slate-700 text-white'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-slate-800 border-t border-slate-700">
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-3 max-w-4xl mx-auto"
                >
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 bg-slate-900 border border-slate-700 text-white placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;
