export interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: number;
    audio_url: string;
    image_url: string;
    created_at: string; 
    updatedAt: string;
}

export interface Album {
    id: string;
    title: string;
    artist: string;
    release_date: string;
    image_url: string;
    songs: Song[];
}
export interface Stats{
    totalSongs: number;
    totalAlbums: number;
    totalUsers: number;
    totalArtists: number;
}