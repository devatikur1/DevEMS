/* eslint-disable react-hooks/exhaustive-deps */
import { useScroll } from "framer-motion";
import { Plus, Timer, X, Search, Loader2 } from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";

export default function WorkspaceTechStack({ actTags }) {
  const { activeTags, setActiveTags } = actTags;

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // 🔹 Ref
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);
  const scrollTriggeredRef = useRef(false);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchTags = useCallback(async (searchQuery, pageNum) => {
    try {
      if (pageNum > 1) {
        setIsFetchingMore(true);
      } else {
        setIsLoading(true);
      }

      let url = `https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow&pagesize=15&page=${pageNum}`;
      if (searchQuery.trim().length > 0) {
        url += `&inname=${encodeURIComponent(searchQuery.trim())}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data && data.items) {
        const newItems = data.items.map((item) => item.name);

        setResults((prev) => {
          const combined = pageNum === 1 ? newItems : [...prev, ...newItems];
          return [...new Set(combined)];
        });

        setHasMore(data.has_more);
        data.has_more && setPage((p) => p + 1)
      } else {
        if (pageNum === 1) setResults([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching tools:", error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
      scrollTriggeredRef.current = false;
    }
  }, []);

  // Trigger search on query change or focus
  useEffect(() => {
    if (!isFocused) return;

    setPage(1);
    setHasMore(true);

    const delayDebounceFn = setTimeout(() => {
      fetchTags(query, 1, false);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query, isFocused, fetchTags]);

  // --------------------------------------
  // ✅ INFINITE SCROLL FOR SUBSCRIPTIONS
  // --------------------------------------
  const { scrollYProgress } = useScroll({ container: containerRef });

  const handleScrollChange = useCallback(
    async (value) => {
      if (
        value > 0.85 &&
        hasMore &&
        !scrollTriggeredRef.current &&
        !isFetchingMore
      ) {
        scrollTriggeredRef.current = true;
        await fetchTags(query, page);
      }
    },
    [fetchTags, hasMore, isFetchingMore, query],
  );

  useEffect(() => {
    if (!scrollYProgress) return;
    const unsubscribe = scrollYProgress.on("change", handleScrollChange);
    return () => unsubscribe?.();
  }, [scrollYProgress]);

  const removeTag = (tagToRemove) => {
    setActiveTags(activeTags.filter((t) => t !== tagToRemove));
  };

  const addTag = (tagToAdd) => {
    if (!activeTags.includes(tagToAdd)) {
      setActiveTags([...activeTags, tagToAdd]);
    }
  };

  return (
    <section className="w-full flex flex-col gap-2 mb-10">
      <label className="text-[13px] font-medium text-textMuted mx-1 flex items-center gap-1.5">
        <Timer size={16} /> Workspace Tech Stack (Tags)
      </label>

      {/* Selected tags */}
      <div className="flex flex-wrap gap-2 items-center min-h-[50px] p-3 rounded-lg bg-surface border border-boxHover mb-2 transition-all duration-300">
        {activeTags.length === 0 ? (
          <span className="text-xs text-textMuted opacity-50 italic">
            Search and select tools like reactjs, python...
          </span>
        ) : (
          activeTags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 bg-accent/10 border border-accent/20 text-accent text-[12px] px-3 py-1 rounded-full animate-in fade-in"
            >
              {tag}
              <X
                size={14}
                className="cursor-pointer hover:text-textPrimary transition-colors"
                onClick={() => removeTag(tag)}
              />
            </span>
          ))
        )}
      </div>

      {/* Search Input & Dropdown */}
      <div className="relative w-full" ref={dropdownRef}>
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3 text-textMuted" />
          <input
            type="text"
            className="w-full bg-surface border border-border text-textPrimary text-[13px] rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:border-accent transition-colors placeholder:text-textMuted/50"
            placeholder="Search for programming languages, frameworks, or tools..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsLoading(true);
            }}
            onFocus={() => setIsFocused(true)}
          />
          {isLoading && (
            <Loader2
              size={16}
              className="absolute right-3 text-accent animate-spin"
            />
          )}
        </div>

        {/* Dropdown Results */}
        {isFocused && (
          <div className="absolute top-12 left-0 w-full bg-surfaceSoft border border-border rounded-lg shadow-xl z-20 flex flex-col py-2 px-1 space-y-1">
            {results.length > 0 ? (
              <div
                className="max-h-56 overflow-y-auto flex flex-col px-2 custom-scrollbar relative"
                ref={containerRef}
              >
                <div className="sticky top-0 z-10 bg-surfaceSoft text-[11px] font-medium text-textMuted uppercase tracking-wider px-2 py-1 mb-1">
                  {query ? "Search Results" : "Recommended Tools"}
                </div>
                <ul>
                  {results.map((tag, idx) => (
                    <li
                      key={`${tag}-${idx}`}
                      type="button"
                      onClick={() => addTag(tag)}
                      className="group relative flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-boxHover transition-colors cursor-pointer text-left"
                    >
                      <span className="text-[13px] text-textPrimary/65 group-hover:text-textPrimary">
                        {tag}
                      </span>
                      {activeTags.includes(tag) ? (
                        <span className="text-[10px] text-accent font-medium px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                          Added
                        </span>
                      ) : (
                        <Plus
                          size={16}
                          className="text-textMuted group-hover:text-textPrimary cursor-pointer"
                        />
                      )}
                    </li>
                  ))}
                </ul>

                {/* Show spinner at bottom when fetching more */}
                {isFetchingMore && (
                  <div className="flex justify-center items-center py-3 text-textMuted">
                    <Loader2 size={16} className="animate-spin text-accent" />
                  </div>
                )}
              </div>
            ) : !isLoading ? (
              <div className="px-3 py-4 text-center text-sm text-textMuted italic">
                No tools found. Try a different search.
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-3 py-8 text-textMuted">
                <Loader2 size={24} className="animate-spin text-accent mb-2" />
                <span className="text-[13px] font-medium animate-pulse">
                  {query ? "Searching tools..." : "Loading options..."}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
