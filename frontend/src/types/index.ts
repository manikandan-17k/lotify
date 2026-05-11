export interface Song{
    _id: string;
    title: string;
    artist: string;
    albumId: string | null;
    audioUrl: string;
    imageUrl: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
}

export interface Album {
    id: number;
    title: string;
    artist: string;
    image_url: string;    
    release_year: number; 
    songs: Song[];
}