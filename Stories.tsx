import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, BookOpen, Heart, Bookmark, Share2 } from 'lucide-react';
import { getStories, Story } from '../firebase/firestore';

const Stories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await getStories();
        setStories(data);
        setError(null);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         story.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || story.state === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-tighter serif leading-tight">Folklore & <span className="text-saffron italic">Ancient Narratives</span></h1>
          <p className="text-white/50 max-w-2xl text-lg font-light leading-relaxed">
            Discover the myths, legends, and regional stories that have shaped Indian culture for millennia. From the Himalayas to the coastal capes.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass p-4 rounded-2xl">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search stories, traditions, regions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {['All', 'Karnataka', 'Kerala', 'Rajasthan', 'Punjab', 'Gujarat'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  filter === f ? 'bg-saffron text-navy-blue' : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 space-y-2">
            <h3 className="font-bold">Database Error</h3>
            <pre className="text-xs overflow-auto bg-black/20 p-4 rounded-lg">{error}</pre>
            <p className="text-sm">This usually happens when the security rules are not yet propagated or there's a configuration mismatch.</p>
          </div>
        )}

        {/* Story Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card aspect-[4/5] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.length > 0 ? (
              filteredStories.map((story, i) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card group cursor-pointer overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={story.image || 'https://images.unsplash.com/photo-1514222139-b576bb5ce003?q=80&w=800&auto=format&fit=crop'} 
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 glass bg-black/40 rounded-full hover:bg-saffron hover:text-navy-blue transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-2 glass bg-black/40 rounded-full hover:bg-saffron hover:text-navy-blue transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 glass bg-black/40 text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {story.state}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold group-hover:text-saffron transition-colors line-clamp-1">{story.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                      {story.content}
                    </p>
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-saffron to-india-green p-[1px]">
                          <div className="w-full h-full rounded-full bg-navy-blue flex items-center justify-center text-[10px] font-bold">
                            {story.author?.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <span className="text-sm text-white/40 font-medium">{story.author}</span>
                      </div>
                      <button className="text-saffron hover:underline text-sm font-bold flex items-center gap-1">
                        Read More <Share2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-4">
                <BookOpen className="w-12 h-12 text-white/20 mx-auto" />
                <p className="text-white/40 font-medium uppercase tracking-widest">No stories found matching your criteria</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
