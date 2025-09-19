import React, { useState, useEffect, useRef } from 'react';
import { FaVolumeUp, FaVolumeMute, FaMusic } from 'react-icons/fa';

const AmbientAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef(null);

  // Ambient sound URLs (using free ambient sounds)
  const ambientSounds = [
    'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Fallback
    // You can replace with actual ambient music URLs
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.loop = true;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
            title={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
          >
            <FaMusic className="w-4 h-4" />
          </button>
          
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-colors duration-200"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <FaVolumeMute className="w-4 h-4" /> : <FaVolumeUp className="w-4 h-4" />}
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Vol:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
        </div>
        
        <audio
          ref={audioRef}
          preload="auto"
          onEnded={() => setIsPlaying(false)}
          onError={() => console.log('Audio not available')}
        >
          <source src={ambientSounds[0]} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default AmbientAudio;

