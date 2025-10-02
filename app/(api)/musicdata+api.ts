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

  try {
    const res = await fetch(
      `${process.env.API_URL}/${process.env.API_KEY}`,
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
          "sec-ch-ua-arch": '"arm"',
          "sec-ch-ua-bitness": '"64"',
          "sec-ch-ua-form-factors": '"Desktop"',
          "sec-ch-ua-full-version": '"140.0.7339.186"',
          "sec-ch-ua-full-version-list":
            '"Chromium";v="140.0.7339.186", "Not=A?Brand";v="24.0.0.0", "Google Chrome";v="140.0.7339.186"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-model": '""',
          "sec-ch-ua-platform": '"macOS"',
          "sec-ch-ua-platform-version": '"15.6.1"',
          "sec-ch-ua-wow64": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "same-origin",
          "sec-fetch-site": "same-origin",
          "x-client-data": "CKCXywE=",
          "x-goog-visitor-id":
            "CgtueDVEeDN2YmxaUSiC5vfGBjIKCgJJThIEGgAgPA%3D%3D",
          "x-youtube-bootstrap-logged-in": "false",
          "x-youtube-client-name": "67",
          "x-youtube-client-version": "1.20250929.03.00",
          cookie:
            "VISITOR_INFO1_LIVE=nx5Dx3vblZQ; VISITOR_PRIVACY_METADATA=CgJJThIEGgAgPA%3D%3D; YSC=Fkh1Czi_qs4; wide=1; __Secure-ROLLOUT_TOKEN=CPT85rmVu_SsnAEQk-m7iNjGjwMYvLvOwJmDkAM%3D; PREF=f4=4000000&f6=40000000&tz=Asia.Calcutta&f5=30000&f7=100&repeat=NONE; ST-nb482m=csn=DomQT1JKLr9Huyc4&itct=CJMCEPleGAEiEwiDo_b8y4SQAxUuzHMBHWMHPFTKAQRdica7",
          Referer: `${process.env.API_URL}/search?q=${encodeURIComponent(
            query
          )}`,
        },
        body: JSON.stringify({
          context: {
            client: {
              hl: "en",
              gl: "IN",
              remoteHost: "2405:201:682c:4820:7457:2dc7:fe31:86b6",
              deviceMake: "Apple",
              deviceModel: "",
              visitorData: "CgtueDVEeDN2YmxaUSiC5vfGBjIKCgJJThIEGgAgPA==",
              userAgent:
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36,gzip(gfe)",
              clientName: "WEB_REMIX",
              clientVersion: "1.20250929.03.00",
              osName: "Macintosh",
              osVersion: "10_15_7",
              originalUrl: `${process.env.API_URL}/explore`,
              screenPixelDensity: 2,
              platform: "DESKTOP",
              clientFormFactor: "UNKNOWN_FORM_FACTOR",
              configInfo: {
                appInstallData:
                  "CILm98YGEJmNsQUQlPLPHBCB988cELjkzhwQxILQHBD3qoATEMXDzxwQxPTPHBDx6M8cEL2ZsAUQltvPHBDH6s8cEJzXzxwQgc3OHBD2q7AFEL22rgUQmZixBRDevM4cEIeszhwQpfnPHBDd688cEJi5zxwQlP6wBRDZhdAcEJX3zxwQiuvPHBC-qYATELfq/hIQi4KAExCu1s8cEK/4zxwQzN-uBRDwnLAFEOHpzxwQiIewBRDiuLAFEIzpzxwQq53PHBDT4a8FEPCdzxwQlbGAExCJsM4cENr3zhwQ0ODPHBC--s8cEK3vzxwQg-fPHBDe6c8cELnZzhwQtquAExCp6M8cELbkzxwQyfevBRCe0LAFEIv3zxwQu9nOHBC9irAFEPyyzhwQuYLQHCo0Q0FNU0l4VVktWnEtRE1lVUV2MEV0dEx3Q3pLX1gtblZCUVBOX3dXUVUtRTJ5aTJrWWgwSDAA",
                coldConfigData:
                  "CILm98YGGjJBT2pGb3gzSVJ2NlNoMG52c0lFM3FEYnRDNVM4OTJBSkMtNDZSaF9QbkkyNUI3ajJBZyIyQU9qRm94M0lSdjZTaDBudnNJRTNxRGJ0QzVTODkyQUpDLTQ2UmhfUG5JMjVCN2oyQWc=",
                coldHashData:
                  "CILm98YGEhM4MzcyMjg4Nzg1MDY2MDg0NzkyGILm98YGMjJBT2pGb3gzSVJ2NlNoMG52c0lFM3FEYnRDNVM4OTJBSkMtNDZSaF9QbkkyNUI3ajJBZzoyQU9qRm94M0lSdjZTaDBudnNJRTNxRGJ0QzVTODkyQUpDLTQ2UmhfUG5JMjVCN2oyQWc=",
                hotHashData:
                  "CILm98YGEhQxMjI0NjE5MzMzMDM2NjU0MjE4NRiC5vfGBjIyQU9qRm94M0lSdjZTaDBudnNJRTNxRGJ0QzVTODkyQUpDLTQ2UmhfUG5JMjVCN2oyQWc6MkFPakZveDNJUnY2U2gwbnZzSUUzcURidEM1Uzg5MkFKQy00NlJoX1BuSTI1QjdqMkFn",
              },
              screenDensityFloat: 2,
              userInterfaceTheme: "USER_INTERFACE_THEME_DARK",
              timeZone: "Asia/Calcutta",
              browserName: "Chrome",
              browserVersion: "140.0.0.0",
              acceptHeader:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
              deviceExperimentId:
                "ChxOelUxTmpRMk1qa3pPVGsxTVRZNU9URTBPQT09EILm98YGGILm98YG",
              rolloutToken: "CPT85rmVu_SsnAEQk-m7iNjGjwMYvLvOwJmDkAM=",
              screenWidthPoints: 435,
              screenHeightPoints: 831,
              utcOffsetMinutes: 330,
              musicAppInfo: {
                pwaInstallabilityStatus: "PWA_INSTALLABILITY_STATUS_UNKNOWN",
                webDisplayMode: "WEB_DISPLAY_MODE_FULLSCREEN",
                storeDigitalGoodsApiSupportStatus: {
                  playStoreDigitalGoodsApiSupportStatus:
                    "DIGITAL_GOODS_API_SUPPORT_STATUS_UNSUPPORTED",
                },
              },
            },
            user: { lockedSafetyMode: false },
            request: {
              useSsl: true,
              internalExperimentFlags: [],
              consistencyTokenJars: [],
            },
            clickTracking: {
              clickTrackingParams:
                "CJMCEPleGAEiEwiDo_b8y4SQAxUuzHMBHWMHPFTKAQRdica7",
            },
            adSignalsInfo: {
              params: [
                { key: "dt", value: "1759376130570" },
                { key: "flash", value: "0" },
                { key: "frm", value: "0" },
                { key: "u_tz", value: "330" },
                { key: "u_his", value: "18" },
                { key: "u_h", value: "956" },
                { key: "u_w", value: "1470" },
                { key: "u_ah", value: "924" },
                { key: "u_aw", value: "1470" },
                { key: "u_cd", value: "30" },
                { key: "bc", value: "31" },
                { key: "bih", value: "831" },
                { key: "biw", value: "435" },
                { key: "brdim", value: "0,120,0,120,1470,32,1470,836,435,831" },
                { key: "vis", value: "1" },
                { key: "wgl", value: "true" },
                { key: "ca_type", value: "image" },
              ],
            },
            activePlayers: [{ playerContextParams: "Q0FFU0FnZ0I=" }],
          },
          query,
          params: "EgWKAQIIAWoSEAMQBBAJEA4QChAFEBAQERAV",
          inlineSettingStatus: "INLINE_SETTING_STATUS_ON",
        }),
        method: "POST",
      }
    );
    const data = await res.json();

    // Locate the array containing songs
    // Locate the array containing songs
    const items =
      data.contents?.tabbedSearchResultsRenderer?.tabs?.[0]?.tabRenderer?.content?.sectionListRenderer?.contents?.find(
        (section: any) => section.musicShelfRenderer
      )?.musicShelfRenderer?.contents;

    // Extract song details
    const songs = items?.map((item: any) => {
      const renderer = item.musicResponsiveListItemRenderer;
      // Song Name (usually first flexColumn)
      const songName =
        renderer?.flexColumns?.[0]?.musicResponsiveListItemFlexColumnRenderer
          ?.text?.runs?.[0]?.text;
      // Artist Name (usually second flexColumn)
      const artistName =
        renderer?.flexColumns?.[1]?.musicResponsiveListItemFlexColumnRenderer
          ?.text?.runs?.[0]?.text;

      // Album Name (usually third flexColumn)
      const albumName =
        renderer?.flexColumns?.[1]?.musicResponsiveListItemFlexColumnRenderer
          ?.text?.runs?.[2]?.text;

      // Video ID
      const videoId =
        renderer?.playlistItemData?.videoId ||
        renderer?.navigationEndpoint?.watchEndpoint?.videoId;
      // Thumbnails
      const thumbnails =
        renderer?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails;

      return {
        type: "SONG",
        name: songName,
        artist: { name: artistName },
        album: { name: albumName },
        videoId,
        thumbnails,
      };
    });

    return Response.json({ response: songs });
  } catch (error) {
    return Response.json(
      { response: null, error: (error as Error).message },
      { status: 500 }
    );
  }
}
