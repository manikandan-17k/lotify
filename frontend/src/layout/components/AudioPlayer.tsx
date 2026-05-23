import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const { currentSong, isPlaying, playNext } = usePlayerStore();

  // Handle play/pause
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  // Handle song end
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      playNext();
    };
    audio?.addEventListener("ended", handleEnded);
    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext]);

  // Handle song change
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    const audio = audioRef.current;

    const isSongChange = prevSongRef.current !== currentSong.audio_url; // ✅ audioUrl → audio_url
    if (isSongChange) {
      audio.src = currentSong.audio_url;        // ✅ audioUrl → audio_url
      audio.currentTime = 0;
      prevSongRef.current = currentSong.audio_url; // ✅ audioUrl → audio_url
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;