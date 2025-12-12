import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import WelcomeScreen from './components/WelcomeScreen';
import ChatInterface from './components/ChatInterface';

const SOCKET_URL = 'http://localhost:3001';

function App() {
    const [socket, setSocket] = useState(null);
    const [waiting, setWaiting] = useState(false);
    const [connected, setConnected] = useState(false);
    const [roomID, setRoomID] = useState(null);
    const [messages, setMessages] = useState([]);
    const [partnerLeft, setPartnerLeft] = useState(false);

    useEffect(() => {
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('waiting', () => {
            setWaiting(true);
            setConnected(false);
            setPartnerLeft(false);
            setMessages([]);
        });

        socket.on('chat start', (data) => {
            setRoomID(data.roomID);
            setWaiting(false);
            setConnected(true);
            setPartnerLeft(false);
            setMessages([]);
        });

        socket.on('message', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        socket.on('partner left', () => {
            setPartnerLeft(true);
            setConnected(false);
        });

        return () => {
            socket.off('waiting');
            socket.off('chat start');
            socket.off('message');
            socket.off('partner left');
        };
    }, [socket]);

    const handleJoin = () => {
        if (socket) {
            setPartnerLeft(false);
            socket.emit('join');
        }
    };

    const handleSendMessage = (text) => {
        if (socket && roomID) {
            socket.emit('message', { roomID, text });
        }
    };

    const handleDisconnect = () => {
        setConnected(false);
        setWaiting(false);
        setRoomID(null);
        setMessages([]);
        setPartnerLeft(false);
    };

    return (
        <div className="App">
            {partnerLeft && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-slate-800 p-8 rounded-2xl border border-[rgba(255,255,255,0.2)] text-center max-w-sm w-full animate-[fadeIn_0.5s_ease-out_forwards] shadow-2xl">
                        <h3 className="text-2xl font-bold text-white mb-2">Partner Disconnected</h3>
                        <p className="text-gray-400 mb-6">The stranger has left the chat.</p>
                        <button
                            onClick={() => { setPartnerLeft(false); setConnected(false); setWaiting(false); }}
                            className="w-full py-3 bg-[#6366f1] hover:bg-indigo-600 text-white rounded-xl font-bold transition-transform transform hover:scale-105"
                        >
                            Find New Stranger
                        </button>
                    </div>
                </div>
            )}

            {!connected ? (
                <WelcomeScreen onJoin={handleJoin} isWaiting={waiting} />
            ) : (
                <ChatInterface
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    onDisconnect={handleDisconnect}
                />
            )}
        </div>
    );
}

export default App;
