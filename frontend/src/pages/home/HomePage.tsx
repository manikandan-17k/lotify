import Topbar from "@/components/ui/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";


const HomePage = () => {
  const {
    madeForYouSongs,
    trendingSongs,
    featuredSongs,
    featuredLoading,
    trendingLoading,
    madeForYouLoading,
    fetchFeaturedSongs,
    fetchTrendingSongs,
    fetchMadeForYouSongs,
  } = useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchTrendingSongs();
    fetchMadeForYouSongs();
  }, [fetchFeaturedSongs, fetchTrendingSongs, fetchMadeForYouSongs]);
  console.log("Loading States - Featured:", featuredLoading, "Trending:", trendingLoading, "Made For You:", madeForYouLoading);
  console.log("Made For You Songs:", madeForYouSongs);
  console.log("Trending Songs:", trendingSongs);
  console.log("Featured Songs:", featuredSongs);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)] ">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Welcome back, 
          </h1>
          <FeaturedSection />
        </div>
        <div className="space-y-8">
        <SectionGrid title = "madeForYouSongs" songs = {madeForYouSongs}/>
        <SectionGrid title = "trendingSongs" songs={trendingSongs} />

        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;