export async function GET(request: Request, response: Response) {
  const res = await fetch(
    `${process.env.PLAYLIST_API_TOKEN}`,
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
        "x-goog-visitor-id": "CgtueDVEeDN2YmxaUSiR4_7GBjIKCgJJThIEGgAgPA%3D%3D",
        "x-youtube-bootstrap-logged-in": "false",
        "x-youtube-client-name": "67",
        "x-youtube-client-version": "1.20250929.03.00",
        cookie:
          "VISITOR_INFO1_LIVE=nx5Dx3vblZQ; VISITOR_PRIVACY_METADATA=CgJJThIEGgAgPA%3D%3D; __Secure-ROLLOUT_TOKEN=CPT85rmVu_SsnAEQk-m7iNjGjwMYl421sd6FkAM%3D; YSC=08BK3PvnxIU; wide=1; PREF=f4=4000000&f6=40000000&tz=Asia.Calcutta&f5=30000&f7=100&repeat=NONE&autoplay=true&volume=23",
        Referer: `${process.env.API_URL}/`,
      },
      body: '{"context":{"client":{"hl":"en","gl":"IN","remoteHost":"2405:201:682c:4820:d107:8d4e:8da9:b61c","deviceMake":"Apple","deviceModel":"","visitorData":"CgtueDVEeDN2YmxaUSiR4_7GBjIKCgJJThIEGgAgPA%3D%3D","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36,gzip(gfe)","clientName":"WEB_REMIX","clientVersion":"1.20250929.03.00","osName":"Macintosh","osVersion":"10_15_7","originalUrl":"https://music.youtube.com/","screenPixelDensity":2,"platform":"DESKTOP","clientFormFactor":"UNKNOWN_FORM_FACTOR","configInfo":{"appInstallData":"CJHj_sYGEMn3rwUQrtbPHBCt788cELargBMQnNfPHBCHrM4cEMfqzxwQlbGAExC45M4cENPhrwUQmZixBRC9idAcELvZzhwQq53PHBCD588cENDgzxwQvvrPHBC36v4SEN68zhwQlPLPHBCW288cEMXDzxwQmY2xBRCK688cEMT0zxwQlffPHBDU688cEJi5zxwQjOnPHBC9irAFEODpzxwQxILQHBCe0LAFEPLozxwQzN-uBRDwnLAFEIHNzhwQ4riwBRC9tq4FEKX5zxwQvZmwBRCL988cEImwzhwQudnOHBCbiNAcEN7pzxwQtuTPHBDwnc8cEK_4zxwQvqmAExCp6M8cENr3zhwQ96qAExCIh7AFEParsAUQlP6wBRD8ss4cEIH3zxwqOENBTVNKUlVtLVpxLURNZVVFdjBFdHRMd0N6S19YLW5WQlFQTl93V1FVLUUyeWkya1lvb3hIUWM9MAA%3D","coldConfigData":"CJHj_sYGGjJBT2pGb3gzSVJ2NlNoMG52c0lFM3FEYnRDNVM4OTJBSkMtNDZSaF9QbkkyNUI3ajJBZyIyQU9qRm94M0lSdjZTaDBudnNJRTNxRGJ0QzVTODkyQUpDLTQ2UmhfUG5JMjVCN2oyQWc%3D","coldHashData":"CJHj_sYGEhM4MzcyMjg4Nzg1MDY2MDg0NzkyGJHj_sYGMjJBT2pGb3gzSVJ2NlNoMG52c0lFM3FEYnRDNVM4OTJBSkMtNDZSaF9QbkkyNUI3ajJBZzoyQU9qRm94M0lSdjZTaDBudnNJRTNxRGJ0QzVTODkyQUpDLTQ2UmhfUG5JMjVCN2oyQWc%3D","hotHashData":"CJHj_sYGEhQxMjI0NjE5MzMzMDM2NjU0MjE4NRiR4_7GBjIyQU9qRm94M0lSdjZTaDBudnNJRTNxRGJ0QzVTODkyQUpDLTQ2UmhfUG5JMjVCN2oyQWc6MkFPakZveDNJUnY2U2gwbnZzSUUzcURidEM1Uzg5MkFKQy00NlJoX1BuSTI1QjdqMkFn"},"screenDensityFloat":2,"userInterfaceTheme":"USER_INTERFACE_THEME_DARK","timeZone":"Asia/Calcutta","browserName":"Chrome","browserVersion":"140.0.0.0","acceptHeader":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7","deviceExperimentId":"ChxOelUxTmprMU16a3pOamd3TURRMU9EVTBOZz09EJHj_sYGGJHj_sYG","rolloutToken":"CPT85rmVu_SsnAEQk-m7iNjGjwMYl421sd6FkAM%3D","screenWidthPoints":438,"screenHeightPoints":831,"utcOffsetMinutes":330,"musicAppInfo":{"pwaInstallabilityStatus":"PWA_INSTALLABILITY_STATUS_UNKNOWN","webDisplayMode":"WEB_DISPLAY_MODE_FULLSCREEN","storeDigitalGoodsApiSupportStatus":{"playStoreDigitalGoodsApiSupportStatus":"DIGITAL_GOODS_API_SUPPORT_STATUS_UNSUPPORTED"}}},"user":{"lockedSafetyMode":false},"request":{"useSsl":true,"internalExperimentFlags":[],"consistencyTokenJars":[]},"adSignalsInfo":{"params":[{"key":"dt","value":"1759490450193"},{"key":"flash","value":"0"},{"key":"frm","value":"0"},{"key":"u_tz","value":"330"},{"key":"u_his","value":"16"},{"key":"u_h","value":"956"},{"key":"u_w","value":"1470"},{"key":"u_ah","value":"924"},{"key":"u_aw","value":"1470"},{"key":"u_cd","value":"30"},{"key":"bc","value":"31"},{"key":"bih","value":"831"},{"key":"biw","value":"438"},{"key":"brdim","value":"0,120,0,120,1470,32,1470,836,438,831"},{"key":"vis","value":"1"},{"key":"wgl","value":"true"},{"key":"ca_type","value":"image"}]}}}',
      method: "POST",
    }
  );

  const data = await res.json();

  const fulldata =
    data.continuationContents.sectionListContinuation.contents.map(
    (item:any) => {
        const playlisttitle =
          item?.musicCarouselShelfRenderer?.header
            ?.musicCarouselShelfBasicHeaderRenderer?.title?.runs?.[0]?.text ??
          "";
        const items = item?.musicCarouselShelfRenderer?.contents?.map(
          (item:any) => {
            const playlistID =
              item?.musicTwoRowItemRenderer?.navigationEndpoint
                ?.browseEndpoint?.browseId ?? "";
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
