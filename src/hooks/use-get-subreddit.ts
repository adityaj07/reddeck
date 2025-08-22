import axios from "axios";
import { useState } from "react";

interface RedditPost {
  id: string;
  title: string;
  author: string;
  url: string;
  ups: number;
  num_comments: number;
  permalink: string;
}

interface Subreddit {
  name: string;
  posts: RedditPost[];
}

export default function useGetSubredditData() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const fetchSubreddit = async (name: string): Promise<Subreddit | null> => {
    if (!name) return null;
    setIsLoading(true);
    setError(undefined);

    try {
      const res = await axios.get(
        `https://www.reddit.com/r/${name}.json?limit=25`
      );
      const posts: RedditPost[] = res.data.data.children.map((child: any) => ({
        id: child.data.id,
        title: child.data.title,
        author: child.data.author,
        url: child.data.url,
        ups: child.data.ups,
        num_comments: child.data.num_comments,
        permalink: child.data.permalink,
      }));
      return { name, posts };
    } catch (err: any) {
      // show a more specific message when possible
      const status = err?.response?.status;
      setError(
        status === 404 ? "Subreddit not found" : "Failed to fetch subreddit"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(undefined);

  return { error, isLoading, fetchSubreddit, clearError };
}
