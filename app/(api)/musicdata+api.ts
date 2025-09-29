import data from "../../data.json";

interface SongData {
  videoId: string;
  name: string;
  artistName: string;
  albumName: string;
  thumbnailUrl: string;
  duration: number;
}
export function GET(request: Request) {
  return Response.json({ response: data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { query } = body;

  const url = `https://youtube-music-api-yt.p.rapidapi.com/search-songs?q=${encodeURIComponent(query)}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY || '',
      'x-rapidapi-host': 'youtube-music-api-yt.p.rapidapi.com'
    }
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return Response.json({ response: data });
  } catch (error) {
    return Response.json({ response: null, error: (error as Error).message }, { status: 500 });
  }
}
