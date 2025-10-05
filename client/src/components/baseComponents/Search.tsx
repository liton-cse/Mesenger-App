import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { motion, AnimatePresence } from "framer-motion";
import type { RootState, AppDispatch } from "../../redux/app/store";
import {
  setQuery,
  fetchSearchResults,
} from "../../redux/feature/user/userSearchSlice";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

const SearchInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, results, loading } = useSelector(
    (state: RootState) => state.search
  );
  // Debounced search
  const debouncedSearch = useCallback(
    debounce((q: string) => {
      dispatch(fetchSearchResults(q));
    }, 500),
    [dispatch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setQuery(value));
    debouncedSearch(value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-gray-400" />
      <Input
        placeholder="Search conversations..."
        className="pl-10 bg-gradient-to-r from-input/80 via-input/60 to-input/80 dark:bg-[#1a1a1a] border-border/30 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        value={query}
        onChange={handleChange}
      />

      {/* Loading state */}
      {loading && <p className="mt-1 text-sm text-gray-500">Loading...</p>}

      {/* Smoothly animate search results */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 bg-white dark:bg-[#1a1a1a] border mt-1 w-full max-h-60 overflow-auto z-50 rounded-md shadow-lg"
          >
            {results.map((user) => (
              <li
                key={user._id}
                className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition"
              >
                {/* Profile picture */}
                <img
                  src={
                    user?.image
                      ? `http://10.10.7.102:5000/${user.image}`
                      : "/default-avatar.png"
                  }
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border"
                />

                {/* User info */}
                <div className="flex flex-col overflow-hidden">
                  <span className="font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </span>
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchInput;
