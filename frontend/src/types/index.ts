export interface Song {
    _id: string;
    title: string;
    artist: string;
    album: string;
    duration: number;
    audio_url: string;
    image_url: string;
    createdAt: string;
    updatedAt: string;
}

export interface Album {
    _id: string;
    title: string;
    artist: string;
    release_date: string;
    image_url: string;
    songs: Song[];
}