import React, { useState, useEffect, useRef } from "react";
import windowWrapper from "#hoc/windowWrapper.jsx";
import { WindowControlls } from "#components";
import useNotificationStore from "#store/notification";
import useWindowStore from "#store/window";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Heart,
  Search,
  Home,
  Library,
  Plus,
  Clock,
  ChevronLeft,
  ChevronRight,
  Disc,
  ListMusic,
  Maximize2,
  Laptop2,
  Mic2,
  Users,
  Bell,
} from "lucide-react";

// Custom Spotify Logo SVG
const SpotifyLogo = ({ size = 22, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.894-.982-.336.076-.67-.135-.746-.47-.076-.336.135-.67.47-.746 3.847-.878 7.14-.51 9.823 1.13.295.18.387.565.207.861zm1.226-2.722c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.075-1.182-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.667-1.112 8.24-.57 11.34 1.34.367.227.487.708.26 1.074zm.106-2.833C14.702 8.87 9.3 8.686 6.18 9.63c-.48.146-.983-.127-1.13-.607-.146-.48.127-.983.607-1.13 3.603-1.093 9.553-.88 13.267 1.325.43.255.57.81.315 1.24-.255.43-.81.57-1.24.315z"/>
  </svg>
);

// Map local tracks and cover images
export const TRACKS = [
  {
    id: 1,
    title: "Best Friends",
    artist: "The Weeknd",
    album: "Dawn FM",
    duration: "2:44",
    durationSec: 164,
    url: "/music/Best Friends.mp3",
    fallbackUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "/images/weeknd.jpeg",
    fallbackCover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop",
    dateAdded: "2 weeks ago"
  },
  {
    id: 2,
    title: "Attitude",
    artist: "Lewis OfMan",
    album: "Sonic Poems",
    duration: "3:13",
    durationSec: 193,
    url: "/music/Attitude.mp3",
    fallbackUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "/images/attitude.jpeg",
    fallbackCover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=150&auto=format&fit=crop",
    dateAdded: "1 week ago"
  },
  {
    id: 3,
    title: "Faded",
    artist: "Alan Walker",
    album: "Different World",
    duration: "3:32",
    durationSec: 212,
    url: "/music/Faded.mp3",
    fallbackUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "/images/faded.jpeg",
    fallbackCover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=150&auto=format&fit=crop",
    dateAdded: "Just now"
  },
  {
    id: 4,
    title: "Mortals",
    artist: "Warriyo",
    album: "NCS Release",
    duration: "3:50",
    durationSec: 230,
    url: "/music/Mortals.mp3",
    fallbackUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: "/images/mortals.jpeg",
    fallbackCover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=150&auto=format&fit=crop",
    dateAdded: "Just now"
  }
];

const Spotify = () => {
  const { isPlayingMusic, setIsPlayingMusic, soundVolume, currentTrackIndex, setCurrentTrackIndex } = useNotificationStore();
  const { windows } = useWindowStore();
  const isSpotifyOpen = windows.spotify?.isOpen;

  const [activeTab, setActiveTab] = useState("home"); // "home" | "search" | "liked" | "all-songs"
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  // Favorites state list (dynamic like/dislike)
  const [likedTrackIds, setLikedTrackIds] = useState([1, 2, 3]);

  // Local volume control relative to system volume
  const [spotifyVolume, setSpotifyVolume] = useState(80);
  const [prevSpotifyVolume, setPrevSpotifyVolume] = useState(80);

  const audioRef = useRef(null);
  const currentTrack = TRACKS[currentTrackIndex] || TRACKS[0];

  const toggleFavorite = (trackId) => {
    setLikedTrackIds((prev) =>
      prev.includes(trackId) ? prev.filter((id) => id !== trackId) : [...prev, trackId]
    );
  };

  const getPlaylistTracks = () => {
    if (activeTab === "liked") {
      return TRACKS.filter(t => likedTrackIds.includes(t.id));
    }
    return TRACKS;
  };

  const playlistTracks = getPlaylistTracks();

  // Keep track of current track index in a ref to avoid stale closures in event listeners
  const trackIndexRef = useRef(currentTrackIndex);
  useEffect(() => {
    trackIndexRef.current = currentTrackIndex;
  }, [currentTrackIndex]);

  // Keep track of play status in a ref
  const isPlayingRef = useRef(isPlayingMusic);
  useEffect(() => {
    isPlayingRef.current = isPlayingMusic;
  }, [isPlayingMusic]);

  // Keep track of repeat status in a ref to avoid stale closure in ended listener
  const isRepeatRef = useRef(isRepeat);
  useEffect(() => {
    isRepeatRef.current = isRepeat;
  }, [isRepeat]);

  // Initialize audio tag
  useEffect(() => {
    const audio = new Audio(currentTrack.url);
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (isRepeatRef.current) {
        audio.currentTime = 0;
        audio.play().catch(err => console.log(err));
      } else {
        handleNext();
      }
    };

    // Fallback if local file load fails
    const handleError = (e) => {
      if (audio.src && !audio.src.includes("soundhelix.com")) {
        const activeIndex = trackIndexRef.current;
        const track = TRACKS[activeIndex];
        console.log(`Local file ${track.url} not found. Falling back to online stream: ${track.fallbackUrl}`);
        audio.src = track.fallbackUrl;
        audio.load();
        if (isPlayingRef.current) {
          audio.play().catch(err => console.log("Fallback play error:", err));
        }
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    // Sync initial volume
    audio.volume = (spotifyVolume / 100) * (soundVolume / 100);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  // Pause music if app is closed
  useEffect(() => {
    if (!isSpotifyOpen) {
      setIsPlayingMusic(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [isSpotifyOpen]);

  // Sync track and play/pause state in a combined effect to prevent race conditions
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Determine if the audio source needs updating
    let needsUpdate = true;
    if (audio.src) {
      try {
        const currentSrcPath = decodeURIComponent(new URL(audio.src).pathname);
        const targetSrcPath = currentTrack.url;
        if (currentSrcPath === targetSrcPath || audio.src.includes(currentTrack.fallbackUrl)) {
          needsUpdate = false;
        }
      } catch (err) {
        console.error("Error parsing audio src:", err);
      }
    }

    if (needsUpdate) {
      audio.src = currentTrack.url;
      audio.load();
    }

    // Play or pause based on state
    if (isPlayingMusic && isSpotifyOpen) {
      audio.play().catch((err) => {
        console.log("Audio playback request handled/delayed:", err);
      });
    } else {
      audio.pause();
    }
  }, [currentTrackIndex, isPlayingMusic, isSpotifyOpen]);

  // Sync volume state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = (spotifyVolume / 100) * (soundVolume / 100);
    }
  }, [spotifyVolume, soundVolume]);

  const handlePlayPause = () => {
    setIsPlayingMusic(!isPlayingMusic);
  };

  const handleNext = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * TRACKS.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    }
    setCurrentTime(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setCurrentTime(0);
  };

  const handleProgressChange = (e) => {
    const newPercent = parseFloat(e.target.value);
    const newTime = (newPercent / 100) * duration;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const selectTrack = (trackId) => {
    const realIndex = TRACKS.findIndex(t => t.id === trackId);
    if (realIndex !== -1) {
      setCurrentTrackIndex(realIndex);
      setIsPlayingMusic(true);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleMuteToggle = () => {
    if (spotifyVolume > 0) {
      setPrevSpotifyVolume(spotifyVolume);
      setSpotifyVolume(0);
    } else {
      setSpotifyVolume(prevSpotifyVolume || 80);
    }
  };

  // Prevent drag-propagation on input components
  const stopDragPropagation = (e) => {
    e.stopPropagation();
  };

  const filteredTracks = TRACKS.filter((track) =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col bg-black text-[#b3b3b3] select-none font-sans overflow-hidden">
      {/* Title Bar Section with Traffic Light Window Controls */}
      <div className="h-10 flex items-center justify-between px-4 bg-black select-none shrink-0 relative border-b border-neutral-900/60">
        <div className="z-10 flex items-center">
          <WindowControlls target="spotify" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs font-semibold text-neutral-400 gap-1.5">
          <SpotifyLogo size={14} className="text-[#1DB954]" />
          Spotify PC
        </div>
        <div className="w-20" />
      </div>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden p-2 gap-2 min-h-0">
        {/* Left Sidebar */}
        <div className="w-64 flex flex-col gap-2 shrink-0">
          {/* Home/Search Navigation Card */}
          <div className="bg-[#121212] rounded-lg p-5 flex flex-col gap-4">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-5 text-sm font-bold border-none outline-none bg-transparent cursor-default transition-colors duration-200 ${
                activeTab === "home" ? "text-white" : "hover:text-white"
              }`}
            >
              <Home size={20} />
              Home
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`flex items-center gap-5 text-sm font-bold border-none outline-none bg-transparent cursor-default transition-colors duration-200 ${
                activeTab === "search" ? "text-white" : "hover:text-white"
              }`}
            >
              <Search size={20} />
              Search
            </button>
          </div>

          {/* Your Library Card */}
          <div className="bg-[#121212] rounded-lg flex-1 flex flex-col overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-neutral-900/40">
              <div className="flex items-center gap-3 font-bold text-sm hover:text-white transition-colors duration-200">
                <Library size={20} />
                Your Library
              </div>
              <Plus size={18} className="hover:text-white cursor-default" />
            </div>

            {/* Pill filters for side list */}
            <div className="px-4 py-2 flex gap-2 shrink-0">
              <span className="text-[11px] font-semibold bg-[#2a2a2a] hover:bg-[#323232] text-white px-3 py-1 rounded-full cursor-default">Playlists</span>
              <span className="text-[11px] font-semibold bg-[#2a2a2a] hover:bg-[#323232] text-white px-3 py-1 rounded-full cursor-default">Artists</span>
              <span className="text-[11px] font-semibold bg-[#2a2a2a] hover:bg-[#323232] text-white px-3 py-1 rounded-full cursor-default">Albums</span>
            </div>

            {/* Sidebar list items search */}
            <div className="px-4 py-1 flex items-center justify-between text-xs text-neutral-400 shrink-0">
              <Search size={12} className="cursor-default hover:text-white" />
              <span className="cursor-default hover:text-white flex items-center gap-1">Recents ≡</span>
            </div>

            {/* Scrollable Playlists List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin scrollbar-thumb-neutral-800">
              {/* Liked Songs Tile */}
              <div
                onClick={() => setActiveTab("liked")}
                className={`flex items-center gap-3 p-2 rounded-md hover:bg-neutral-900 cursor-default transition-colors duration-150 ${
                  activeTab === "liked" ? "bg-neutral-900 text-white" : ""
                }`}
              >
                <div className="w-12 h-12 rounded bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-500 flex items-center justify-center shrink-0">
                  <Heart size={20} fill="white" className="text-white" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`text-sm font-medium leading-5 ${activeTab === "liked" ? "text-[#1DB954]" : "text-white"}`}>
                    Liked Songs
                  </span>
                  <span className="text-xs text-[#1DB954] flex items-center gap-1">
                    <span className="text-[10px]">📌</span> Playlist • Pin
                  </span>
                </div>
              </div>

              {/* My Playlist #6 */}
              <div
                onClick={() => setActiveTab("liked")}
                className={`flex items-center gap-3 p-2 rounded-md hover:bg-neutral-900 cursor-default transition-colors duration-150 ${
                  activeTab === "liked" ? "bg-neutral-900 text-white" : ""
                }`}
              >
                <div className="w-12 h-12 rounded bg-[#1f3264] flex items-center justify-center shrink-0 text-emerald-400 font-bold text-sm">
                  #6
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium leading-5 text-white">My Playlist #6</span>
                  <span className="text-xs text-neutral-400">Playlist • Dhanush</span>
                </div>
              </div>

              {/* All Songs Playlist */}
              <div
                onClick={() => setActiveTab("all-songs")}
                className={`flex items-center gap-3 p-2 rounded-md hover:bg-neutral-900 cursor-default transition-colors duration-150 ${
                  activeTab === "all-songs" ? "bg-neutral-900 text-white" : ""
                }`}
              >
                <div className="w-12 h-12 rounded bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center shrink-0 text-white font-bold text-sm">
                  <ListMusic size={20} className="text-white" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`text-sm font-medium leading-5 ${activeTab === "all-songs" ? "text-[#1DB954]" : "text-white"}`}>
                    All Songs
                  </span>
                  <span className="text-xs text-neutral-400">Playlist • Dhanush</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Panel Content */}
        <div className="flex-1 bg-[#121212] rounded-lg overflow-y-auto flex flex-col relative min-w-0 scrollbar-thin scrollbar-thumb-neutral-800">
          
          {/* Header Bar */}
          <div className="h-14 flex items-center justify-between px-6 sticky top-0 bg-[#121212]/95 backdrop-blur z-20 shrink-0">
            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white border-none outline-none cursor-default opacity-60">
                <ChevronLeft size={18} />
              </button>
              <button className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white border-none outline-none cursor-default opacity-60">
                <ChevronRight size={18} />
              </button>

              {/* Quick Search bar in top navigation when Search tab active */}
              {activeTab === "search" && (
                <div className="relative ml-4 w-72">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="What do you want to play?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onMouseDown={stopDragPropagation}
                    onPointerDown={stopDragPropagation}
                    className="w-full h-9 bg-[#242424] hover:bg-[#2a2a2a] focus:bg-[#242424] focus:ring-1 focus:ring-white text-white text-xs pl-10 pr-4 rounded-full border-none outline-none transition-colors"
                  />
                </div>
              )}
            </div>

            {/* Navigation right utility badges */}
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white border-none outline-none cursor-default hover:scale-105 transition-transform duration-100">
                <Bell size={15} />
              </button>
              <button className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white border-none outline-none cursor-default hover:scale-105 transition-transform duration-100">
                <Users size={15} />
              </button>

              {/* Profile badge (Dhanush Shetty) */}
              <div className="flex items-center gap-2.5 bg-black hover:bg-[#282828] py-1.5 pl-1.5 pr-3.5 rounded-full cursor-default transition-colors">
                <img
                  src="/images/u.jpeg"
                  alt="Dhanush Shetty"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop";
                  }}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-white text-xs font-bold leading-5">Dhanush Shetty</span>
              </div>
            </div>
          </div>

          {/* Tab Pages rendering */}
          {activeTab === "home" && (
            <div className="p-6 space-y-8">
              {/* Welcome Banner */}
              <div>
                <h1 className="text-3xl font-extrabold text-white mb-6">Welcome Back</h1>
                
                {/* Favorites quick link */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div
                    onClick={() => setActiveTab("liked")}
                    className="group flex items-center bg-white/5 hover:bg-white/10 rounded-md overflow-hidden cursor-default transition-colors relative pr-4"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-500 flex items-center justify-center shrink-0 shadow-lg">
                      <Heart size={32} fill="white" className="text-white" />
                    </div>
                    <span className="text-sm font-bold text-white pl-4 flex-1 truncate">Favorites</span>
                    <button className="w-12 h-12 rounded-full bg-[#1DB954] flex items-center justify-center text-black shadow-lg border-none outline-none opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 hover:scale-105 transition-all duration-200">
                      <Play size={20} fill="black" className="translate-x-[1px]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dhanush's Favorites Section */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4 hover:underline cursor-default">Dhanush's Favorites</h2>
                <div className="grid grid-cols-4 lg:grid-cols-5 gap-4">
                  {TRACKS.filter(t => likedTrackIds.includes(t.id)).map((track) => (
                    <div
                      key={`fav-card-${track.id}`}
                      onClick={() => selectTrack(track.id)}
                      className="group bg-[#181818] hover:bg-[#282828] p-4 rounded-md cursor-default transition-colors duration-200 relative"
                    >
                      <div className="relative mb-4">
                        <img 
                          src={track.cover} 
                          onError={(e) => { e.target.src = track.fallbackCover; }}
                          className="w-full aspect-square object-cover rounded shadow-lg" 
                          alt="" 
                        />
                        {/* Green pill badge */}
                        <div className="absolute top-2 left-2 bg-[#1DB954]/95 text-black font-extrabold text-[9px] px-2 py-0.5 rounded tracking-wide uppercase shadow">
                          DHANUSH'S FAVORITE
                        </div>
                        <button className="w-11 h-11 rounded-full bg-[#1DB954] flex items-center justify-center text-black shadow-lg absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 hover:scale-105 transition-all duration-200">
                          <Play size={18} fill="black" className="translate-x-[1px]" />
                        </button>
                      </div>
                      <h3 className="text-sm font-bold text-white truncate mb-1">{track.title}</h3>
                      <p className="text-xs text-neutral-400 line-clamp-2">By {track.artist}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "search" && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">Browse all</h2>
              
              {/* If search query has results */}
              {searchQuery ? (
                <div className="space-y-4">
                  {filteredTracks.length > 0 ? (
                    <div className="bg-[#181818] rounded-md p-4">
                      {filteredTracks.map((track) => {
                        return (
                          <div
                            key={`search-res-${track.id}`}
                            onClick={() => selectTrack(track.id)}
                            className="flex items-center gap-4 p-2 rounded-md hover:bg-white/5 cursor-default transition-colors"
                          >
                            <img 
                              src={track.cover} 
                              onError={(e) => { e.target.src = track.fallbackCover; }}
                              className="w-10 h-10 object-cover rounded" 
                              alt="" 
                            />
                            <div className="flex-1 min-w-0">
                              <span className="block text-sm font-bold text-white truncate">{track.title}</span>
                              <span className="block text-xs text-neutral-400 truncate">{track.artist}</span>
                            </div>
                            <span className="text-xs text-neutral-500">{track.duration}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-neutral-400">No results found for "{searchQuery}"</p>
                  )}
                </div>
              ) : (
                /* Categories grid */
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  <div className="h-40 bg-[#e8125c] rounded-lg p-4 cursor-default font-extrabold text-white text-lg relative overflow-hidden">
                    Podcasts
                  </div>
                  <div className="h-40 bg-[#1e3264] rounded-lg p-4 cursor-default font-extrabold text-white text-lg relative overflow-hidden">
                    Made For You
                  </div>
                  <div className="h-40 bg-[#e1306c] rounded-lg p-4 cursor-default font-extrabold text-white text-lg relative overflow-hidden">
                    New Releases
                  </div>
                  <div className="h-40 bg-[#27856a] rounded-lg p-4 cursor-default font-extrabold text-white text-lg relative overflow-hidden">
                    Lofi Beats
                  </div>
                </div>
              )}
            </div>
          )}

          {(activeTab === "liked" || activeTab === "all-songs") && (
            <div>
              {/* Banner with gradient background */}
              <div className="bg-gradient-to-b from-[#1f3264] to-[#121212]/40 p-6 pt-8 flex items-end gap-6 relative overflow-hidden shrink-0">
                {activeTab === "liked" ? (
                  <div className="w-48 h-48 rounded bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 flex items-center justify-center shrink-0 shadow-2xl">
                    <Heart size={90} fill="white" className="text-white" />
                  </div>
                ) : (
                  <div className="w-48 h-48 rounded bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center shrink-0 shadow-2xl">
                    <ListMusic size={90} className="text-white" />
                  </div>
                )}
                <div className="flex flex-col text-white z-10">
                  <span className="text-xs font-bold uppercase tracking-wide">Playlist</span>
                  <h1 className="text-5xl font-extrabold mt-2 mb-4">
                    {activeTab === "liked" ? "Liked Songs" : "All Songs"}
                  </h1>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-300">
                    <img
                      src="/images/pp.jpeg"
                      alt="Dhanush Shetty"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop";
                      }}
                      className="w-6 h-6 rounded-full object-cover shadow"
                    />
                    <span className="text-white hover:underline">Dhanush Shetty</span>
                    <span>•</span>
                    <span>{playlistTracks.length} songs</span>
                  </div>
                </div>
              </div>

              {/* Table section */}
              <div className="p-6 bg-[#121212] flex-1">
                {/* Control bar */}
                <div className="flex items-center gap-6 mb-6">
                  <button
                    onClick={handlePlayPause}
                    className="w-14 h-14 rounded-full bg-[#1DB954] hover:bg-[#1ed760] hover:scale-105 active:scale-100 flex items-center justify-center text-black border-none outline-none shadow-lg transition-all"
                  >
                    {isPlayingMusic ? (
                      <Pause size={24} fill="black" />
                    ) : (
                      <Play size={24} fill="black" className="translate-x-[1.5px]" />
                    )}
                  </button>
                  {activeTab === "liked" && (
                    <Heart size={32} fill="#1DB954" className="text-[#1DB954] cursor-default" />
                  )}
                </div>

                {/* Song Table */}
                <div className="w-full flex flex-col text-xs text-neutral-400">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 border-b border-white/10 pb-2 mb-3 px-4 font-bold text-neutral-400 uppercase tracking-wider">
                    <div className="col-span-1 text-center font-normal">#</div>
                    <div className="col-span-5">Title</div>
                    <div className="col-span-2">Album</div>
                    <div className="col-span-2">Date Added</div>
                    <div className="col-span-1 text-center">
                      <Heart size={14} className="mx-auto" />
                    </div>
                    <div className="col-span-1 text-right">
                      <Clock size={14} className="ml-auto" />
                    </div>
                  </div>

                  {/* Song list rows */}
                  <div className="flex flex-col space-y-1">
                    {playlistTracks.map((track, index) => {
                      const realIdx = TRACKS.findIndex(t => t.id === track.id);
                      const isCurrent = currentTrackIndex === realIdx;
                      const isRowHovered = hoveredRow === index;

                      return (
                        <div
                          key={`track-${track.id}`}
                          onMouseEnter={() => setHoveredRow(index)}
                          onMouseLeave={() => setHoveredRow(null)}
                          onDoubleClick={() => selectTrack(track.id)}
                          className={`grid grid-cols-12 gap-4 items-center py-2 px-4 rounded-md transition-colors duration-100 cursor-default ${
                            isCurrent ? "bg-white/10" : "hover:bg-white/5"
                          }`}
                        >
                          {/* Col 1: Play button / Number */}
                          <div className="col-span-1 flex items-center justify-center">
                            {isRowHovered ? (
                              <button
                                onClick={() => selectTrack(track.id)}
                                className="w-5 h-5 flex items-center justify-center border-none outline-none bg-transparent text-white hover:text-[#1DB954] transition-colors"
                              >
                                {isCurrent && isPlayingMusic ? (
                                  <Pause size={14} fill="currentColor" />
                                ) : (
                                  <Play size={14} fill="currentColor" className="translate-x-[0.5px]" />
                                )}
                              </button>
                            ) : isCurrent && isPlayingMusic ? (
                              // Equalizer animation
                              <div className="flex items-end justify-center gap-[2.5px] h-3 w-4">
                                <div className="w-[3px] bg-[#1DB954] animate-[eq-bar_1s_infinite_ease-in-out_0.1s] h-1.5" style={{animationDuration: '0.8s'}} />
                                <div className="w-[3px] bg-[#1DB954] animate-[eq-bar_1s_infinite_ease-in-out_0.3s] h-3" style={{animationDuration: '0.6s'}} />
                                <div className="w-[3px] bg-[#1DB954] animate-[eq-bar_1s_infinite_ease-in-out_0.5s] h-2" style={{animationDuration: '0.7s'}} />
                              </div>
                            ) : (
                              <span className={`text-[13px] ${isCurrent ? "text-[#1DB954]" : "text-neutral-400"}`}>
                                {index + 1}
                              </span>
                            )}
                          </div>

                          {/* Col 2: Title & Cover */}
                          <div className="col-span-5 flex items-center gap-3">
                            <img 
                              src={track.cover} 
                              onError={(e) => { e.target.src = track.fallbackCover; }}
                              className="w-10 h-10 object-cover rounded shadow" 
                              alt="" 
                            />
                            <div className="flex flex-col min-w-0">
                              <span className={`text-[13.5px] font-medium truncate leading-5 ${isCurrent ? "text-[#1DB954]" : "text-white"}`}>
                                {track.title}
                              </span>
                              <span className="text-xs text-neutral-400 truncate leading-4">{track.artist}</span>
                            </div>
                          </div>

                          {/* Col 3: Album */}
                          <div className="col-span-2 text-[13px] truncate text-neutral-300">
                            {track.album}
                          </div>

                          {/* Col 4: Date Added */}
                          <div className="col-span-2 text-[13px]">
                            {track.dateAdded}
                          </div>

                          {/* Col 5: Heart Icon */}
                          <div className="col-span-1 flex items-center justify-center">
                            {likedTrackIds.includes(track.id) ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(track.id);
                                }}
                                className="border-none outline-none bg-transparent text-[#1DB954]"
                              >
                                <Heart size={16} fill="#1DB954" />
                              </button>
                            ) : isRowHovered ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(track.id);
                                }}
                                className="border-none outline-none bg-transparent text-neutral-400 hover:text-white"
                              >
                                <Heart size={16} />
                              </button>
                            ) : null}
                          </div>

                          {/* Col 6: Duration */}
                          <div className="col-span-1 text-right text-[13px] font-medium pr-1">
                            {track.duration}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spotify Footer Controls Player Bar */}
      <div className="h-24 bg-[#181818] border-t border-neutral-900 px-4 flex items-center justify-between z-10 shrink-0">
        
        {/* Left: Now Playing Info */}
        <div className="flex items-center gap-4 w-[280px]">
          <img 
            src={currentTrack.cover} 
            onError={(e) => { e.target.src = currentTrack.fallbackCover; }}
            className="w-14 h-14 object-cover rounded shadow-md shrink-0" 
            alt="" 
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-white hover:underline cursor-default truncate">
              {currentTrack.title}
            </span>
            <span className="text-xs text-neutral-400 hover:underline cursor-default truncate">
              {currentTrack.artist}
            </span>
          </div>
          <button
            onClick={() => toggleFavorite(currentTrack.id)}
            className="border-none outline-none bg-transparent ml-2 flex items-center"
          >
            {likedTrackIds.includes(currentTrack.id) ? (
              <Heart size={16} fill="#1DB954" className="text-[#1DB954]" />
            ) : (
              <Heart size={16} className="text-neutral-400 hover:text-white" />
            )}
          </button>
        </div>

        {/* Center: Playback Progress */}
        <div className="flex-1 max-w-[600px] flex flex-col items-center">
          {/* Controls buttons */}
          <div className="flex items-center gap-6 mb-2.5">
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`border-none outline-none bg-transparent cursor-default transition-colors ${
                isShuffle ? "text-[#1DB954]" : "text-neutral-400 hover:text-white"
              }`}
            >
              <Shuffle size={16} />
            </button>
            <button
              onClick={handlePrev}
              className="border-none outline-none bg-transparent text-neutral-400 hover:text-white cursor-default"
            >
              <SkipBack size={18} fill="currentColor" />
            </button>
            
            {/* Corrected & centered Play/Pause button sizing */}
            <button
              onClick={handlePlayPause}
              className="w-10 h-10 rounded-full bg-white hover:scale-105 active:scale-95 flex items-center justify-center text-black border-none outline-none cursor-default transition-all shadow-md shrink-0"
            >
              {isPlayingMusic ? (
                <Pause size={18} fill="black" />
              ) : (
                <Play size={18} fill="black" className="translate-x-[1.5px]" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="border-none outline-none bg-transparent text-neutral-400 hover:text-white cursor-default"
            >
              <SkipForward size={18} fill="currentColor" />
            </button>
            <button
              onClick={() => setIsRepeat(!isRepeat)}
              className={`border-none outline-none bg-transparent cursor-default transition-colors ${
                isRepeat ? "text-[#1DB954]" : "text-neutral-400 hover:text-white"
              }`}
            >
              <Repeat size={16} />
            </button>
          </div>

          {/* Timeline Seek Bar with Drag Propagation Stopper */}
          <div className="w-full flex items-center gap-2.5 text-xs text-neutral-400 font-medium">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleProgressChange}
              onMouseDown={stopDragPropagation}
              onPointerDown={stopDragPropagation}
              onTouchStart={stopDragPropagation}
              className="flex-1 h-1 rounded bg-neutral-600 appearance-none outline-none cursor-default accent-[#1DB954] hover:accent-[#1ed760] transition-colors"
              style={{
                background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${
                  duration ? (currentTime / duration) * 100 : 0
                }%, #404040 ${
                  duration ? (currentTime / duration) * 100 : 0
                }%, #404040 100%)`,
              }}
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Speaker & volume utilities (Local relative volume slider with drag stoppers) */}
        <div className="flex items-center justify-end gap-3.5 w-[280px] text-neutral-400">
          <Mic2 size={16} className="hover:text-white cursor-default" />
          <ListMusic size={16} className="hover:text-white cursor-default" />
          <Laptop2 size={16} className="hover:text-white cursor-default" />
          
          <div className="flex items-center gap-2 group w-28">
            <button
              onClick={handleMuteToggle}
              className="border-none outline-none bg-transparent text-neutral-400 hover:text-white cursor-default"
            >
              {spotifyVolume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={spotifyVolume}
              onChange={(e) => setSpotifyVolume(Number(e.target.value))}
              onMouseDown={stopDragPropagation}
              onPointerDown={stopDragPropagation}
              onTouchStart={stopDragPropagation}
              className="w-full h-1 rounded bg-neutral-600 appearance-none outline-none cursor-default accent-[#1DB954] hover:accent-[#1ed760]"
              style={{
                background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${spotifyVolume}%, #404040 ${spotifyVolume}%, #404040 100%)`,
              }}
            />
          </div>
          <Maximize2 size={16} className="hover:text-white cursor-default" />
        </div>
      </div>
      
      {/* Equalizer animation css injected locally */}
      <style>{`
        @keyframes eq-bar {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
      `}</style>
    </div>
  );
};

export default windowWrapper(Spotify, "spotify");
