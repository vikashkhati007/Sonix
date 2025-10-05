export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  const innerBody = {
    context: {
      client: {
        hl: "en",
        gl: "IN",
        remoteHost: "2405:201:682c:4820:549b:904:5fd8:dbf8",
        deviceMake: "Apple",
        deviceModel: "",
        visitorData: "CgtueDVEeDN2YmxaUSj3l4jHBjIKCgJJThIEGgAgPA%3D%3D",
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36,gzip(gfe)",
        clientName: "WEB_REMIX",
        clientVersion: "1.20250929.03.00",
        osName: "Macintosh",
        osVersion: "10_15_7",
        originalUrl: `${process.env.API_URL}/moods_and_genres`,
        screenPixelDensity: 2,
        platform: "DESKTOP",
        clientFormFactor: "UNKNOWN_FORM_FACTOR",
        configInfo: {
          appInstallData:
            "CPeXiMcGEPLozxwQg-fPHBCZjbEFEIH3zxwQntCwBRCBzc4cEMT0zxwQmZixBRC9mbAFENr3zhwQibDOHBCYuc8cELbkzxwQpvnPHBCt788cEPeqgBMQlPLPHBC52c4cEKnozxwQuOTOHBCK688cEJzXzxwQrtbPHBCv-M8cEIiHsAUQh6zOHBCM6c8cEIv3zxwQ8J3PHBDT4a8FELfq_hIQvqmAExCW288cEN68zhwQlP6wBRDFw88cEL2KsAUQqYbQHBDJ968FEPqH0BwQvvrPHBDg6c8cEL22rgUQlffPHBDwnLAFELargBMQlbGAExCrnc8cEL2J0BwQ0ODPHBCbiNAcELvZzhwQ9quwBRDEgtAcEOK4sAUQ_LLOHBDM364FENTrzxwQ3unPHCo0Q0FNU0l4VVktWnEtRE1lVUV2MEV0dEx3Q3pLX1gtblZCUVBOX3dXUVUtRTJ5aTJrWWgwSDAA",
          coldConfigData:
            "CPeXiMcGGjJBT2pGb3gzSVJ2NlNoMG52c0lFM3FEYnRDNVM4OTJBSkMtNDZSaF9QbkkyNUI3ajJBZyIyQU9qRm94M0lSdjZTaDBudnNJRTNxRGJ0QzVTODkyQUpDLTQ2UmhfUG5JMjVCN2oyQWc%3D",
          coldHashData:
            "CPeXiMcGEhM4MzcyMjg4Nzg1MDY2MDg0NzkyGPeXiMcGMjJBT2pGb3gzSVJ2NlNoMG52c0lFM3FEYnRDNVM4OTJBSkMtNDZSaF9QbkkyNUI3ajJBZzoyQU9qRm94M0lSdjZTaDBudnNJRTNxRGJ0QzVTODkyQUpDLTQ2UmhfUG5JMjVCN2oyQWc%3D",
          hotHashData:
            "CPeXiMcGEhI1NTM0NzUyNzExNjkwNDgyMjYY95eIxwYyMkFPakZveDNJUnY2U2gwbnZzSUUzcURidEM1Uzg5MkFKQy00NlJoX1BuSTI1QjdqMkFnOjJBT2pGb3gzSVJ2NlNoMG52c0lFM3FEYnRDNVM4OTJBSkMtNDZSaF9QbkkyNUI3ajJBZw%3D%3D",
        },
      },
      screenDensityFloat: 2,
      userInterfaceTheme: "USER_INTERFACE_THEME_DARK",
      timeZone: "Asia/Calcutta",
      browserName: "Chrome",
      browserVersion: "140.0.0.0",
      acceptHeader:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      deviceExperimentId:
        "ChxOelUxTnpZeE5qSTRNVGszTnpBNU9UazRNZz09EPeXiMcGGPeXiMcG",
      rolloutToken: "CPT85rmVu_SsnAEQk-m7iNjGjwMYn7Wx_oSMkAM%3D",
      screenWidthPoints: 456,
      screenHeightPoints: 835,
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
    user: {
      lockedSafetyMode: false,
    },
    request: {
      useSsl: true,
      internalExperimentFlags: [],
      consistencyTokenJars: [],
    },
    clickTracking: {
      clickTrackingParams: "CDQQuKEFGAAiEwijtt6Ys4yQAxVHLbcAHfyeA27KAQRdica7",
    },
    adSignalsInfo: {
      params: [
        { key: "dt", value: "1759644663680" },
        { key: "flash", value: "0" },
        { key: "frm", value: "0" },
        { key: "u_tz", value: "330" },
        { key: "u_his", value: "43" },
        { key: "u_h", value: "956" },
        { key: "u_w", value: "1470" },
        { key: "u_ah", value: "922" },
        { key: "u_aw", value: "1470" },
        { key: "u_cd", value: "30" },
        { key: "bc", value: "31" },
        { key: "bih", value: "835" },
        { key: "biw", value: "456" },
        { key: "brdim", value: "0,116,0,116,1470,34,1470,840,456,835" },
        { key: "vis", value: "1" },
        { key: "wgl", value: "true" },
        { key: "ca_type", value: "image" },
      ],
    },
    browseId: "FEmusic_moods_and_genres_category",
    params: token, // Insert your variable here
  };

  const res = await fetch(
    `${process.env.API_URL}/youtubei/v1/browse?prettyPrint=false`,
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
        "sec-ch-ua-platform-version": '"26.0.1"',
        "sec-ch-ua-wow64": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "same-origin",
        "sec-fetch-site": "same-origin",
        "x-client-data": "CKCXywE=",
        "x-goog-visitor-id": "CgtueDVEeDN2YmxaUSj3l4jHBjIKCgJJThIEGgAgPA%3D%3D",
        "x-youtube-bootstrap-logged-in": "false",
        "x-youtube-client-name": "67",
        "x-youtube-client-version": "1.20250929.03.00",
        cookie:
          "VISITOR_INFO1_LIVE=nx5Dx3vblZQ; VISITOR_PRIVACY_METADATA=CgJJThIEGgAgPA%3D%3D; YSC=l01HJTJH_w0; __Secure-ROLLOUT_TOKEN=CPT85rmVu_SsnAEQk-m7iNjGjwMYn7Wx_oSMkAM%3D; wide=1; PREF=f4=4000000&f6=40000000&tz=Asia.Calcutta&f5=30000&f7=100&repeat=NONE&autoplay=true&volume=9",
        Referer: `${process.env.API_URL}/moods_and_genres`,
      },
      body: JSON.stringify(innerBody),
      method: "POST",
    }
  );
  const result = await res.json();

  // console.log([0].musicCarouselShelfRenderer.header.musicCarouselShelfBasicHeaderRenderer.title.runs[0].text);

  const fulldata =
    result.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.map(
      (item: any) => {
        const playlisttitle =
          item?.musicCarouselShelfRenderer?.header
            ?.musicCarouselShelfBasicHeaderRenderer?.title?.runs?.[0]?.text ??
          "";
        const items = item?.musicCarouselShelfRenderer?.contents?.map(
          (item: any) => {
            const playlistID =
              item?.musicTwoRowItemRenderer?.navigationEndpoint?.browseEndpoint
                ?.browseId ?? "";
            const playlisttitle =
              item?.musicTwoRowItemRenderer?.title?.runs?.[0]?.text ?? "";
            const playlistsubtitle =
              item?.musicTwoRowItemRenderer?.subtitle?.runs?.[0]?.text ?? "";
            const thumbnail =
              item?.musicTwoRowItemRenderer?.thumbnailRenderer
                ?.musicThumbnailRenderer?.thumbnail?.thumbnails?.[0]?.url ?? "";
            return {
              playlisttitle,
              playlistsubtitle,
              thumbnail,
              playlistID,
            };
          }
        );
        return {
          playlisttitle,
          items,
        };
      }
    );

  return Response.json({ response: fulldata });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { playlistID } = body;

  const res = await fetch(
    `${process.env.API_URL}youtubei/v1/browse?prettyPrint=false`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        authorization:
          "SAPISIDHASH 1759486607_4ae6a4e8c8c77b5cd73113a0763d968d407b0b6e_u SAPISID1PHASH 1759486607_4ae6a4e8c8c77b5cd73113a0763d968d407b0b6e_u SAPISID3PHASH 1759486607_4ae6a4e8c8c77b5cd73113a0763d968d407b0b6e_u",
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
        "x-goog-authuser": "0",
        "x-goog-visitor-id": "CgtueDVEeDN2YmxaUSjCw_7GBjIKCgJJThIEGgAgPA%3D%3D",
        "x-origin": `${process.env.API_URL}`,
        "x-youtube-bootstrap-logged-in": "true",
        "x-youtube-client-name": "67",
        "x-youtube-client-version": "1.20250929.03.00",
        cookie:
          "VISITOR_INFO1_LIVE=nx5Dx3vblZQ; VISITOR_PRIVACY_METADATA=CgJJThIEGgAgPA%3D%3D; HSID=AuWRxLO-z1mF4ihSb; SSID=AS_1QfBPKVcFSmsBa; APISID=-5fNQvkGa6HD-j5H/AQ2qEpevcqgMmjzfA; SAPISID=TjL-gpGdaC5JGzMa/AWaeA9tL65nhvIo3s; __Secure-1PAPISID=TjL-gpGdaC5JGzMa/AWaeA9tL65nhvIo3s; __Secure-3PAPISID=TjL-gpGdaC5JGzMa/AWaeA9tL65nhvIo3s; SID=g.a0002AjstH-vLLuWx9jYqFS9-ChqozdXv6dYxrY7iWa3njDbSK9bbOVat_8JTVHsGz7iVy5BWgACgYKAUMSARESFQHGX2MiFFagFyEQ3frJjEweZaPaFRoVAUF8yKr6k8XjenkgfuWTrmcVI-P10076; __Secure-1PSID=g.a0002AjstH-vLLuWx9jYqFS9-ChqozdXv6dYxrY7iWa3njDbSK9bOYKXO97h6J64iOGXJ8DcwgACgYKAV0SARESFQHGX2MihQlF8L1BM6uDHE-Xa_K7SRoVAUF8yKqfA-tFLJQHrt17bIOTE7M_0076; __Secure-3PSID=g.a0002AjstH-vLLuWx9jYqFS9-ChqozdXv6dYxrY7iWa3njDbSK9bb_1zfocFvQi-kSrZsAXMtAACgYKATkSARESFQHGX2MiL_atJmBSIH7Xk9Zgyr3tBhoVAUF8yKpae5HqBz1IzsrujAYmT6Gx0076; LOGIN_INFO=AFmmF2swRQIhAMTooBz1X_hy4G1SHPHYEzcC4113CLDVGf-JNFtERt5cAiBKLhbfngySAkfDnfr2QQVC6DOPFPs9y6o7Cm-N6z_ktA:QUQ3MjNmeXBST2U3OVhldi1MS1NxaGVQMl9QLUNoS2p5RzZpdzNLM2ZTVGtrMnMyOUR6Qk1SRkxKY3hPcThURWRWNHdwd0gwT041UG9rQ05id0syS2xGUkdWM1RkNXZBbUNOWmNVOUdva3VXMlg1TEZ2SGlJeTA3cWxLYVhqRDdicE52UnJpWWE0QjIwQm5mSnhEWFdGVWIzX1RBT3k0bHBR; __Secure-ROLLOUT_TOKEN=CPT85rmVu_SsnAEQk-m7iNjGjwMYl421sd6FkAM%3D; __Secure-1PSIDTS=sidts-CjQBmkD5S6I0ShGb4mhBBundzPAm0gsbKcHPfs1tsOcziMSpb4aOMuxdfXIxiV8P0GjEUEMGEAA; __Secure-3PSIDTS=sidts-CjQBmkD5S6I0ShGb4mhBBundzPAm0gsbKcHPfs1tsOcziMSpb4aOMuxdfXIxiV8P0GjEUEMGEAA; YSC=08BK3PvnxIU; wide=1; PREF=f4=4000000&f6=40000000&tz=Asia.Calcutta&f5=30000&f7=100&repeat=NONE&autoplay=true&volume=23; SIDCC=AKEyXzXKleQQ1qAZXbWidUeplTO5Xm-ZFOSxcH1nGgHgQPApg3al_fZCyxY6-mqy6IJbGPnqOw; __Secure-1PSIDCC=AKEyXzV43kscYrpSE8ALFaMjFowTJuev9bigl-APjLR0ZUl9CvMo1KE1wslsJ0fVPOSR7_A903M; __Secure-3PSIDCC=AKEyXzWZpkPN6Ol2irP-fbDNee2emsMBoM9fgjXQkdlYDzTvtxn5FkgGz6LjH3dL0IvCT8wteBU; ST-19fs039=csn=QtbX7hcSW4-wmwL6&itct=CJ4gEKCzAhgAIhMI0LOCquaHkAMV-i63AB38SyB5ygEEoCgHTA%3D%3D",
        Referer: `${process.env.API_URL}` + "moods_and_genres",
      },
      body: JSON.stringify({
        context: {
          client: {
            hl: "en-GB",
            gl: "IN",
            remoteHost: "2405:201:682c:4820:d107:8d4e:8da9:b61c",
            deviceMake: "Apple",
            deviceModel: "",
            visitorData: "CgtueDVEeDN2YmxaUSjCw_7GBjIKCgJJThIEGgAgPA%3D%3D",
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36,gzip(gfe)",
            clientName: "WEB_REMIX",
            clientVersion: "1.20250929.03.00",
            osName: "Macintosh",
            osVersion: "10_15_7",
            originalUrl: `${process.env.API_URL}` + "new_releases",
            screenPixelDensity: 2,
            platform: "DESKTOP",
            clientFormFactor: "UNKNOWN_FORM_FACTOR",
            configInfo: {
              appInstallData:
                "CMLD_sYGEL2pgBMQiIewBRCaiNAcEL6KsAUQ9quwBRDiuLAFEOK4zxwQu9nOHBCB988cEKX5zxwQudnOHBDwnc8cEJWxgBMQlffPHBC25M8cEImwzhwQh6zOHBCv-M8cEJ7QsAUQveawBRCC588cEPHozxwQvvrPHBD7idAcEJOZgBMQmY2xBRDe6c8cEJT-sAUQvZmwBRDa984cEJ3XzxwQvbauBRD8ss4cEIzpzxwQxcPPHBCvj_8SEMn3rwUQgc3OHBCZmLEFEMj3zxwQqejPHBCYuc8cEMfqzxwQ0-GvBRC36v4SEJbbzxwQxILQHBD3qoATEJTyzxwQi_fPHBDg6c8cEMT0zxwQuOTOHBDU688cEK3vzxwQzN-uBRC2q4ATEK7WzxwQ3rzOHCo0Q0FNU0l4VVktWnEtRE1lVUV2MEV0dEx3Q3pLX1gtblZCUVBOX3dXUVUtRTJ5aTJrWWgwSDAA",
              coldConfigData:
                "CMLD_sYGGjJBT2pGb3gzYi00S0NaOWxBZVRNY211WC1WYlFlVElEbUUxVGNiSVZNY19RMDNWYkY2QSIyQU9qRm94M0lSdjZTaDBudnNJRTNxRGJ0QzVTODkyQUpDLTQ2UmhfUG5JMjVCN2oyQWc%3D",
              coldHashData:
                "CMLD_sYGEhM4MzcyMjg4Nzg1MDY2MDg0NzkyGMLD_sYGMjJBT2pGb3gzYi00S0NaOWxBZVRNY211WC1WYlFlVElEbUUxVGNiSVZNY19RMDNWYkY2QToyQU9qRm94M0lSdjZTaDBudnNJRTNxRGJ0QzVTODkyQUpDLTQ2UmhfUG5JMjVCN2oyQWc%3D",
              hotHashData:
                "CMLD_sYGEhQxMzE3NTM2NjAzNTE1MzY3Mzk3NxjCw_7GBjIyQU9qRm94M2ItNEtDWjlsQWVUTWNtdVgtVmJRZVRJRG1FMVRjYklWTWNfUTAzVmJGNkE6MkFPakZveDNJUnY2U2gwbnZzSUUzcURidEM1Uzg5MkFKQy00NlJoX1BuSTI1QjdqMkFn",
            },
            screenDensityFloat: 2,
            userInterfaceTheme: "USER_INTERFACE_THEME_DARK",
            timeZone: "Asia/Calcutta",
            browserName: "Chrome",
            browserVersion: "140.0.0.0",
            acceptHeader:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            deviceExperimentId:
              "ChxOelUxTmprek5qVTFORGM1T0RneE5URXpNQT09EMLD_sYGGMLD_sYG",
            rolloutToken: "CPT85rmVu_SsnAEQk-m7iNjGjwMYl421sd6FkAM%3D",
            screenWidthPoints: 438,
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
          user: {
            lockedSafetyMode: false,
          },
          request: {
            useSsl: true,
            internalExperimentFlags: [],
            consistencyTokenJars: [],
          },
          clickTracking: {
            clickTrackingParams:
              "CJ4gEKCzAhgAIhMI0LOCquaHkAMV-i63AB38SyB5ygEEoCgHTA==",
          },
          adSignalsInfo: {
            params: [
              { key: "dt", value: "1759486403083" },
              { key: "flash", value: "0" },
              { key: "frm", value: "0" },
              { key: "u_tz", value: "330" },
              { key: "u_his", value: "9" },
              { key: "u_h", value: "956" },
              { key: "u_w", value: "1470" },
              { key: "u_ah", value: "924" },
              { key: "u_aw", value: "1470" },
              { key: "u_cd", value: "30" },
              { key: "bc", value: "31" },
              { key: "bih", value: "831" },
              { key: "biw", value: "438" },
              { key: "brdim", value: "0,120,0,120,1470,32,1470,836,438,831" },
              { key: "vis", value: "1" },
              { key: "wgl", value: "true" },
              { key: "ca_type", value: "image" },
            ],
          },
        },
        browseId: playlistID,
      }),
      method: "POST",
    }
  );

  const response = await res.json();

  const playlistSongs =
    response.contents.twoColumnBrowseResultsRenderer.secondaryContents.sectionListRenderer.contents[0].musicPlaylistShelfRenderer.contents.map(
      (item: any) => {
        const songTitle =
          item?.musicResponsiveListItemRenderer?.flexColumns?.[0]
            ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.[0]
            ?.text ?? "";
        const songArtist =
          item?.musicResponsiveListItemRenderer?.flexColumns?.[1]
            ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.[0]
            ?.text ?? "";
        const songDuration =
          item?.musicResponsiveListItemRenderer?.flexColumns?.[2]
            ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.[0]
            ?.text ?? "";
        const videoID =
          item?.musicResponsiveListItemRenderer?.playlistItemData?.videoId ??
          "";
        return {
          songTitle,
          songArtist,
          songDuration,
          videoID,
        };
      }
    );

  const playlisttitle = response.microformat.microformatDataRenderer.title;
  const playlistdescription =
    response.microformat.microformatDataRenderer.description;
  const thumbnailUrl =
    response.microformat.microformatDataRenderer.thumbnail.thumbnails;

  const fullData = {
    playlisttitle,
    playlistdescription,
    thumbnailUrl,
    playlistSongs,
  };
  return Response.json({ response: fullData });
}
