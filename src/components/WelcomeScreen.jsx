import React from 'react';
import { FaUserSecret, FaComments } from 'react-icons/fa';

const WelcomeScreen = ({ onJoin, isWaiting }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-900 text-white">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="flex justify-center">
                    <div className="p-4 bg-slate-800 rounded-full">
                        <FaComments className="text-4xl text-white" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-white">
                        Random Chat
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Talk to strangers, anonymously.
                    </p>
                </div>

                <button
                    onClick={onJoin}
                    disabled={isWaiting}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-3
            ${isWaiting
                            ? 'bg-slate-700 text-gray-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                >
                    {isWaiting ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
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
                    <p className="text-sm text-gray-500">
                        Waiting for someone to join...
                    </p>
                )}
            </div>
        </div>
    );
};

export default WelcomeScreen;
