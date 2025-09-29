import sanitizeHtml from "sanitize-html";

function stripAllHtml(input:any) {
  return sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} });
}

async function fetchDownloadLink(videoUrl:any) {
  try {
    // Step 1: Search
    const searchRes = await fetch(process.env.SITE_URL + "api/ajax/search?hl=en", {
      method: "POST",
      headers: {
        accept: "/",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest",
        Referer: process.env.SITE_URL + "en20/youtube-to-mp3",
      },
      body: `query=${encodeURIComponent(videoUrl)}&cf_token=&vt=youtube`,
    });

    const searchJson = await searchRes.json();

    // Flexible `k` extraction
    const mp3Links = searchJson?.links?.mp3;
    const firstKey = mp3Links ? Object.keys(mp3Links)[0] : null;
    const k = firstKey ? mp3Links[firstKey]?.k : null;


    if (!k) throw new Error("No `k` found in search response.");

    const vid =
      searchJson?.vid ||
      new URL(videoUrl).searchParams.get("v");

    // Step 2: Convert
    const convertRes = await fetch(process.env.SITE_URL + "api/ajax/convert?hl=en", {
      method: "POST",
      headers: {
        accept: "/",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest",
        Referer: process.env.SITE_URL + "en20/youtube-to-mp3",
      },
      body: `vid=${encodeURIComponent(vid)}&k=${encodeURIComponent(k)}`,
    });

    const convertJson = await convertRes.json();
    const directLink = convertJson?.dlink || "";

    return { directLink };
  } catch (err) {
    console.error("Error:", err instanceof Error ? err.message : String(err));
    return { safeMessage: "Something went wrong.", directLink: "" };
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("id");
  
  if (!videoId) {
    return new Response(JSON.stringify({ error: "id is required" }), {
      status: 400,
    });
  }
  
  const result = await fetchDownloadLink("https://www.youtube.com/watch?v=" + videoId);
  return Response.json({ response: result }, {status: 200});
}