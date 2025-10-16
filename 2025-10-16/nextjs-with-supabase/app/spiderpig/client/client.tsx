"use client";

import { useState } from "react";

export default function ClientFetcher() {
  const [url, setUrl] = useState("https://swapi.dev/api/people/1");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFetch(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${url}`);
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleFetch}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.currentTarget.value)}
          placeholder="Enter API URL"
          required
          style={{ width: "60%" }}
        />
        <button type="submit">Fetch</button>
      </form>

      {loading && <p>Loading</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
