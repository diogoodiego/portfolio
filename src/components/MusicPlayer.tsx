"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import abba from "../assets/abbapb.png";
import Image from "next/image";

export const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const knobRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(80); // Start at ~80% (3:56 of 4:55)
  const [currentTime, setCurrentTime] = useState("3:56");
  const [duration, setDuration] = useState("4:55");
  const [volume, setVolume] = useState(0.4);
  const [isDragging, setIsDragging] = useState(false);
  const [showVolumeOverlay, setShowVolumeOverlay] = useState(false);
  const volumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstVolumeChange = useRef(true);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
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

  const updateVolume = (newVolume: number) => {
    const clamped = Math.max(0, Math.min(1, newVolume));
    setVolume(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  };

  const calculateVolumeFromCoords = (clientX: number, clientY: number) => {
    if (!knobRef.current) return;
    const rect = knobRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = clientX - centerX;
    const y = clientY - centerY;

    // Angle in degrees: 0 at top, 90 at right, 180 at bottom, -90 at left
    let angle = Math.atan2(x, -y) * (180 / Math.PI);

    const minAngle = -135;
    const maxAngle = 135;

    // Handle dead zone at the bottom
    if (angle < -135 && angle >= -180) {
      updateVolume(0);
      return;
    }
    if (angle > 135 && angle <= 180) {
      updateVolume(1);
      return;
    }

    const normalized = (angle - minAngle) / (maxAngle - minAngle);
    updateVolume(normalized);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    calculateVolumeFromCoords(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if (e.touches[0]) {
      calculateVolumeFromCoords(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    const knob = knobRef.current;
    if (!knob) return;

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.001; // Sensitivity
      setVolume((prev) => {
        const newVal = Math.max(0, Math.min(1, prev + delta));
        if (audioRef.current) {
          audioRef.current.volume = newVal;
        }
        return newVal;
      });
    };

    knob.addEventListener("wheel", handleWheelNative, { passive: false });

    return () => {
      knob.removeEventListener("wheel", handleWheelNative);
    };
  }, []);

  useEffect(() => {
    if (isFirstVolumeChange.current) {
      isFirstVolumeChange.current = false;
      return;
    }

    setShowVolumeOverlay(true);

    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }

    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeOverlay(false);
    }, 1000);

    return () => {
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current);
      }
    };
  }, [volume]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      calculateVolumeFromCoords(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        calculateVolumeFromCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  // Initialize audio on mount and seek to 3:56
  useEffect(() => {
    const audio = new Audio("/assets/ABBA-The-Winner-Takes-It-All.m4a");
    audio.volume = volume;
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

  const rotation = -135 + volume * 270;

  return (
    <div className="group z-10 relative flex flex-row items-stretch gap-0 bg-stone-950 p-2 pr-0 rounded-tl-2xl overflow-hidden">
      <div className="flex flex-row items-center gap-1 bg-stone-900 p-1 rounded-lg">
        <div className="relative flex flex-col items-center gap-2 bg-stone-950 m-0 p-3 border-4 border-stone-950 rounded-lg overflow-hidden">
          <div className="top-0 left-0 z-2 absolute bg-linear-to-bl from-30% from-white/0 via-white/8 to-80% to-white/0 w-full h-full pointer-events-none"></div>

          <div className="flex flex-row items-center gap-3">
            <div className="relative rounded-md w-12 h-12 overflow-hidden shrink-0">
              <Image src={abba} alt="Abba" className="w-full h-full object-cover" />
              <div
                className={`absolute inset-0 flex items-center justify-center bg-black/75 backdrop-blur-[1px] transition-all duration-300 pointer-events-none ${showVolumeOverlay ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
              >
                <span className="font-bold text-white text-xs">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-md text-stone-50 truncate leading-tight">
                The Winner Takes It All
              </h3>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="font-medium text-stone-400 text-xs">ABBA</span>
                {isPlaying && (
                  <span className="flex items-center gap-[1px] h-2" aria-hidden="true">
                    <span className="bg-stone-500 rounded-full w-[1.5px] h-[3px] animate-[pulse_0.6s_infinite_alternate]" />
                    <span className="bg-stone-500 rounded-full w-[1.5px] h-[6px] animate-[pulse_0.4s_infinite_alternate_0.15s]" />
                    <span className="bg-stone-500 rounded-full w-[1.5px] h-[4px] animate-[pulse_0.5s_infinite_alternate_0.3s]" />
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full min-w-[140px]">
            <span className="text-stone-200 text-xs">
              {currentTime} / {duration}
            </span>

            {/* Progress bar container */}
            <div
              id="music-progress-bar"
              onClick={handleProgressBarClick}
              className="bg-stone-200/30 hover:bg-stone-50/40 mt-4 rounded-full w-full h-1 overflow-hidden transition-colors cursor-pointer"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Music progress"
            >
              <div
                className="bg-stone-50 h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex flex-row items-center gap-1 shrink-0">
            <button
              id="music-skip-back-btn"
              aria-label="Previous track"
              className="bg-transparent hover:bg-stone-50/10 p-2 border-0 rounded-full outline-none text-stone-50/80 transition-colors cursor-pointer shrink-0"
            >
              <SkipBack size={16} />
            </button>

            <button
              id="music-play-pause-btn"
              onClick={handlePlayClick}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              className="flex justify-center items-center bg-stone-50 shadow-lg shadow-stone-900/10 hover:shadow-xl p-2.5 border-0 rounded-full outline-none w-9 h-9 text-black hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer shrink-0"
            >
              {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} className="ml-[1px]" fill="currentColor" />}
            </button>

            <button
              id="music-skip-forward-btn"
              aria-label="Next track"
              className="bg-transparent hover:bg-stone-50/10 p-2 border-0 rounded-full outline-none text-stone-50/80 transition-colors cursor-pointer shrink-0"
            >
              <SkipForward size={16} />
            </button>
          </div>


        </div>

        {/* Volume Knob */}
        <div className="flex flex-col justify-center items-center gap-1.5 bg-linear-to-br from-stone-400 via-stone-600 to-stone-500 p-4 border border-white/2 rounded-lg h-full select-none shrink-0">
          <div className="knob-bezel">
            <div
              ref={knobRef}
              id="music-volume-knob"
              className="knob"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              style={{ transform: `rotate(${rotation}deg)` }}
              role="slider"
              aria-valuenow={Math.round(volume * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Volume controller"
              tabIndex={0}
            />
          </div>
          <span className="font-semibold text-[10px] text-stone-900 uppercase tracking-widest">Vol</span>
        </div>
      </div>
    </div>
  );
};

