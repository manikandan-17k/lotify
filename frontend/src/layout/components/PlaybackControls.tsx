import {useRef, useState } from "react";
import { useEffect } from "react";
import { usePlayerStore } from "@/stores/usePlayerStore";

const PlaybackControls = () => {
    const { isPlaying, togglePlay, playNext, playPrevious, currentSong } = usePlayerStore();

    const {volume, setVolume} = useState(75);
    const {currentTime, setCurrentTime} = useState(0);
    const {duration, setDuration} = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = document.querySelector('audio');
        const audio = audioRef.current;
        if(!audio) return;

        const updatetime = () => {
            setCurrentTime(audio.currentTime);
        };
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', updatetime);
        audio.addEventListener('loadedmetadata', updateDuration);
     
    }, [currentSong]);

  return (
    <div className="bg-zinc-800 p-4">
      <h3 className="text-lg font-bold">Playback Controls</h3>
      <p className="text-sm text-zinc-400">
        This is a simple playback controls component.
      </p>
    </div>
  );
};
export default PlaybackControls;