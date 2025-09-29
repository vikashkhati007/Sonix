import data from "../../data.json";

interface SongData {
  videoId: string;
  name: string;
  artistName: string;
  albumName: string;
  thumbnailUrl: string;
  duration: number;
};
export function GET(request: Request) {
  return Response.json({ response: data.map((item) => ({
    videoId: item.videoId,
    name: item.name,
    artistName: item.artist.name,
    albumName: item.album.name,
    duration: item.duration,
    thumbnailUrl: item.thumbnails[1].url,
  })) });
}
