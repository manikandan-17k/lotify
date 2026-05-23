import { create } from "zustand";
import type { Song } from "@/types";

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;
  initializeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,

  initializeQueue: (songs) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },

  // Fix 1: renamed parameter from `song` to `songs` (it's an array)
  // Fix 2: removed bogus sessionStorage guard
  // Fix 3: queue should hold all songs, not just one
  playAlbum: (songs, startIndex = 0) => {
    const song = songs[startIndex];
    set({
      queue: songs,
      currentIndex: startIndex,
      currentSong: song,
      isPlaying: true,
    });
  },

  // Fix 4: `(song | null)` is not valid JS — parameter is just `song`
  setCurrentSong: (song) => {
    const songIndex = get().queue.findIndex((s) => s.id === song?.id);
    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },

  togglePlay: () => {
    const willStartPlaying = !get().isPlaying;
    set({ isPlaying: willStartPlaying });
  },

  playNext: () => {
    const { queue, currentIndex } = get();
    const nextIndex = currentIndex + 1;
    if (nextIndex < queue.length) {
      set({
        currentSong: queue[nextIndex],
        currentIndex: nextIndex,
        isPlaying: true,
      });
    } else {
      set({ currentSong: null, currentIndex: -1, isPlaying: false });
    }
  },

  playPrevious: () => {
    const { queue, currentIndex } = get();
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      set({
        currentSong: queue[prevIndex],
        currentIndex: prevIndex,
        isPlaying: true,
      });
    } else {
      set({ currentSong: null, currentIndex: -1, isPlaying: false });
    }
  },
}));