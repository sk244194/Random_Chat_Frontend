import React from 'react';
import { FaUserSecret, FaComments } from 'react-icons/fa';

const WelcomeScreen = ({ onJoin, isWaiting }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white relative overflow-hidden">
            <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

            <div className="relative z-10 p-8 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-2xl border border-[rgba(255,255,255,0.2)] shadow-2xl max-w-md w-full text-center animate-[fadeIn_0.5s_ease-out_forwards]">
                <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-gradient-to-tr from-[#6366f1] to-[#a855f7] rounded-full shadow-lg">
                        <FaComments className="text-4xl text-white" />
                    </div>
                </div>

                <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                    Random Chat
                </h1>
                <p className="text-gray-300 mb-8 text-lg">
                    Talk to strangers, anonymously.
                </p>

                <button
                    onClick={onJoin}
                    disabled={isWaiting}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-3
            ${isWaiting
                            ? 'bg-gray-600 cursor-not-allowed opacity-70'
                            : 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:shadow-purple-500/50'
                        }`}
                >
                    {isWaiting ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            <span>Searching...</span>
                        </>
                    ) : (
                        <>
                            <FaUserSecret className="text-2xl" />
                            <span>Find a Stranger</span>
                        </>
                    )}
                </button>

                {isWaiting && (
                    <p className="mt-4 text-sm text-gray-400 animate-pulse">
                        Waiting for someone to join...
                    </p>
                )}
            </div>
        </div>
    );
};

export default WelcomeScreen;
