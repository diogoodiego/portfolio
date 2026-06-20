"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import abba from "../assets/abba.jpg";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(80); // Start at ~80% (3:56 of 4:55)
  const [currentTime, setCurrentTime] = useState("3:56");
  const [duration, setDuration] = useState("4:55");

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleMouseEnter = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Playback prevented by browser autoplay policy:", err);
      });
    }
  };

  const handleMouseLeave = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log("Playback prevented:", err);
        });
      }
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (audioRef.current && audioRef.current.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const pct = Math.max(0, Math.min(1, clickX / width));
      const newTime = pct * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(pct * 100);
      setCurrentTime(formatTime(newTime));
    }
  };

  // Initialize audio on mount and seek to 3:56
  useEffect(() => {
    const audio = new Audio("/assets/ABBA-The-Winner-Takes-It-All.m4a");
    audio.volume = 0.4;
    audio.loop = true;
    audio.currentTime = 236; // 3:56 in seconds

    audio.onloadedmetadata = () => {
      setDuration(formatTime(audio.duration));
      if (audio.duration) {
        setProgress((236 / audio.duration) * 100);
      }
    };

    audio.ontimeupdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(formatTime(audio.currentTime));
      }
    };

    audioRef.current = audio;

    // Optional autoplay on mount (usually blocked by browsers until click, but handles smoothly)
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch((err) => {
      console.log("Autoplay on mount prevented:", err);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group z-10 relative flex flex-row items-center gap-2 col-start-2 row-start-1 bg-white shadow-xl backdrop-blur-md p-3 pb-4 rounded-2xl w-full overflow-hidden music-player"
    >
      <div className="relative rounded-md w-12 h-12 overflow-hidden shrink-0">
        <Image
          src={abba}
          alt="Album"
          className={`rounded-md w-full h-full object-cover transition-transform duration-1000 ${isPlaying ? "scale-110 rotate-[5deg]" : "scale-100"
            }`}
        />
        {isPlaying && (
          <div className="absolute inset-0 flex justify-center items-center bg-black/25">
            {/* Equalizer animation bars */}
            <div className="flex items-end gap-[2px] h-4">
              <div className="bg-white rounded-full w-[2.5px] h-full animate-bounce [animation-duration:0.6s]" />
              <div className="bg-white rounded-full w-[2.5px] h-[60%] animate-bounce [animation-delay:0.2s] [animation-duration:0.4s]" />
              <div className="bg-white rounded-full w-[2.5px] h-[80%] animate-bounce [animation-delay:0.1s] [animation-duration:0.5s]" />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <p className="font-semibold text-md text-stone-900 truncate">
          The Winner Takes It All
        </p>
        <div className="flex items-center gap-1">
          <p className="font-medium text-stone-500 text-xs">ABBA</p>
          {isPlaying && (
            <span className="flex items-center gap-[1px] h-2">
              <span className="bg-stone-500 rounded-full w-[1.5px] h-[3px] animate-[pulse_0.6s_infinite_alternate]" />
              <span className="bg-stone-500 rounded-full w-[1.5px] h-[6px] animate-[pulse_0.4s_infinite_alternate_0.15s]" />
              <span className="bg-stone-500 rounded-full w-[1.5px] h-[4px] animate-[pulse_0.5s_infinite_alternate_0.3s]" />
            </span>
          )}
        </div>
        <p className="mt-0.5 font-regular font-mono text-stone-600 text-xs">
          {currentTime} / {duration}
        </p>
      </div>

      <div className="bg-transparent hover:bg-stone-100/50 p-2 rounded-full text-stone-600 hover:text-stone-900 transition-colors cursor-pointer shrink-0">
        <SkipBack size={16} />
      </div>

      <button
        onClick={handlePlayClick}
        className="flex justify-center items-center bg-stone-900 hover:bg-stone-800 shadow-lg shadow-stone-900/10 hover:shadow-xl p-2.5 rounded-full w-9 h-9 text-white hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer shrink-0"
      >
        {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} className="ml-[1px]" fill="currentColor" />}
      </button>

      <div className="bg-transparent hover:bg-stone-100/50 p-2 rounded-full text-stone-600 hover:text-stone-900 transition-colors cursor-pointer shrink-0">
        <SkipForward size={16} />
      </div>

      {/* Progress bar container */}
      <div
        onClick={handleProgressBarClick}
        className="bottom-0 left-0 absolute bg-stone-200/50 hover:bg-stone-200/80 w-full h-1.5 transition-colors cursor-pointer"
      >
        <div
          className="bg-stone-800 h-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
