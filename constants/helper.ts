  export const getThumbnailUri = (song: any) => {
    if (!song.videoId) {
      return "https://via.placeholder.com/90x90/222/999?text=No+Image";
    }
    // Standard HQ thumbnail: reliable, larger, no blocking params
    return `https://i.ytimg.com/vi/${song.videoId}/maxresdefault.jpg`;
  };
