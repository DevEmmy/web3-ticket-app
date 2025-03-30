import React from 'react';
import { Clock, Gamepad2, Award, Users, Lock } from 'lucide-react';
import Button from '@/components/ui/Button';

const InteractiveGamesSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 mb-5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Interactive Event Games</h2>
          <p className="text-purple-300 text-xl max-w-2xl mx-auto">
            Engage your audience with real-time interactive games during your events
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Clock className="text-purple-400 w-5 h-5" />
            <p className="text-purple-400 font-bold">Coming Soon</p>
          </div>
        </div>

        {/* Game Preview */}
        <div className="mb-16 relative">
          <div className="bg-gray-900 rounded-xl p-8 border-2 border-purple-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-purple-900/30 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="bg-gray-900/80 p-6 rounded-xl border border-purple-500 flex flex-col items-center">
                <Lock className="w-16 h-16 text-purple-500 mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">Coming Soon</h3>
                <p className="text-purple-300 text-center">This feature is currently in development</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Game Interface Preview */}
              <div className="flex-1">
                <div className="bg-indigo-900 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-bold text-white text-center mb-6">Web3 Knowledge Quiz</h3>
                  
                  <div className="mb-8">
                    <p className="text-white text-lg mb-2 text-center">What is the main advantage of NFT tickets?</p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-red-500 rounded-lg p-3 text-white text-center cursor-not-allowed">
                        Lower prices
                      </div>
                      <div className="bg-blue-500 rounded-lg p-3 text-white text-center cursor-not-allowed">
                        Faster checkout
                      </div>
                      <div className="bg-yellow-500 rounded-lg p-3 text-white text-center cursor-not-allowed">
                        More colors
                      </div>
                      <div className="bg-green-500 rounded-lg p-3 text-white text-center cursor-not-allowed">
                        Verifiable authenticity
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-purple-300"><Users className="inline mr-2" /> 238 players</div>
                    <div className="text-purple-300"><Clock className="inline mr-2" /> 15 seconds</div>
                  </div>
                </div>
              </div>
              
              {/* Features List */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-4">Interactive Games Features</h3>
                <ul className="space-y-4">
                  {[
                    { icon: <Gamepad2 className="w-5 h-5" />, title: "Multiple Game Formats", desc: "Quizzes, polls, word clouds, and more" },
                    { icon: <Users className="w-5 h-5" />, title: "Unlimited Participants", desc: "Scale to thousands of concurrent players" },
                    { icon: <Award className="w-5 h-5" />, title: "Real-time Leaderboards", desc: "Competitive gameplay with instant results" },
                    { icon: <Clock className="w-5 h-5" />, title: "Token Rewards", desc: "Distribute NFT prizes to winners automatically" },
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start bg-gray-800/50 p-3 rounded-lg">
                      <div className="bg-purple-700 p-2 rounded-lg mr-3 text-white">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{feature.title}</h4>
                        <p className="text-purple-300 text-sm">{feature.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300">
            Join the Waitlist
          </Button>
          <p className="text-purple-300 mt-4">Be the first to know when interactive games launch</p>
        </div>
      </div>
    </section>
  );
};

export default InteractiveGamesSection;