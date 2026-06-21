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
      className="group z-10 relative flex flex-row items-center gap-2 col-start-2 row-start-1 bg-white/10 backdrop-blur-2xl rounded-2xl w-full overflow-hidden music-player p-3 ps-0"
    >
      <div className="relative h-32 aspect-1/2">
        <Image
          src={abba}
          alt="Album"
          className={`absolute top-0 left-0 -translate-x-1/2 !h-32 !max-w-32 !aspect-square   rounded-full object-cover shadow-2xl transition-transform duration-1000 ${isPlaying ? "animate-[spin_10s_linear_infinite]" : ""
            }`}
        />
        <span className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 h-12 aspect-square rounded-full bg-white/20 border border-white/10 backdrop-blur-2xl"></span>
        <span className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 h-10 aspect-square rounded-full bg-stone-400"></span>
        <span className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 h-6 aspect-square rounded-full bg-stone-100 shadow-inner"></span>
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <p className="font-semibold text-md text-stone-50 truncate">
          The Winner Takes It All
        </p>
        <div className="flex items-center gap-1">
          <p className="font-medium text-stone-400 text-xs">ABBA</p>
          {isPlaying && (
            <span className="flex items-center gap-[1px] h-2">
              <span className="bg-stone-500 rounded-full w-[1.5px] h-[3px] animate-[pulse_0.6s_infinite_alternate]" />
              <span className="bg-stone-500 rounded-full w-[1.5px] h-[6px] animate-[pulse_0.4s_infinite_alternate_0.15s]" />
              <span className="bg-stone-500 rounded-full w-[1.5px] h-[4px] animate-[pulse_0.5s_infinite_alternate_0.3s]" />
            </span>
          )}
        </div>
        <p className="mt-0.5 font-regular font-mono text-stone-200 text-xs">
          {currentTime} / {duration}
        </p>

        {/* Progress bar container */}
        <div
          onClick={handleProgressBarClick}
          className="mt-4 bg-stone-200/30 rounded-full hover:bg-stone-50/40 w-full h-1 transition-colors cursor-pointer overflow-hidden"
        >
          <div
            className="bg-stone-50 h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-transparent hover:bg-stone-50/10 p-2 rounded-full text-stone-50/80 transition-colors cursor-pointer shrink-0">
        <SkipBack size={16} />
      </div>

      <button
        onClick={handlePlayClick}
        className="flex justify-center items-center bg-stone-50 hover:scale-105 shadow-lg shadow-stone-900/10 hover:shadow-xl p-2.5 rounded-full w-9 h-9 text-white hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer shrink-0"
      >
        {isPlaying ? <Pause size={14} fill="#000" /> : <Play size={14} className="ml-[1px]" fill="#000" />}
      </button>

      <div className="bg-transparent hover:bg-stone-50/10 p-2 rounded-full text-stone-50/80 transition-colors cursor-pointer shrink-0">
        <SkipForward size={16} />
      </div>
    </div>
  );
};
