import React from "react";

import VoiceLayout from "./voiceLayout";

export default function VoiceMode() {
  return (
    <VoiceLayout>
      <div>
        <div className="border border-twitterLightGray bg-gray-900 text-white rounded-xl p-6 max-w-2xl mx-auto shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Knowing Technology Better</h1>
            <div className="bg-twitterBlue text-white px-3 py-1 rounded-full text-sm">
              Live
            </div>
          </div>

          <div className="mt-4 text-gray-400 text-sm">
            <span className="mr-2">tags:</span>
            <span className="bg-gray-700 px-2 py-1 rounded-full">
              #technology
            </span>
            <span className="bg-gray-700 px-2 py-1 rounded-full ml-2">
              #this
            </span>
            <span className="bg-gray-700 px-2 py-1 rounded-full ml-2">
              #something
            </span>
          </div>

          <div className="mt-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex justify-center items-center text-xl">
                🎙️
              </div>
              <div>
                <p className="font-semibold">Moderator: Ansh Arora</p>
                <p className="text-gray-400 text-sm">10 people are speaking</p>
              </div>
            </div>

            {/* Speaker Avatars */}
            <div className="mt-4 flex space-x-4">
              {/* Dummy speakers */}
              <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
                👤
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
                👤
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
                👤
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
                👤
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
                👤
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-10 right-10 text-white rounded-lg transition-opacity duration-500">
          <button className="bg-twitterBlue rounded p-3">Create Room</button>
        </div>
      </div>
    </VoiceLayout>
  );
}
