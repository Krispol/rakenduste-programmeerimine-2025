type Search = { url?: string };

export default async function Page({ searchParams }: { searchParams: Search }) {
  const defaultUrl = "https://swapi.dev/api/people/1";

  const url = searchParams?.url || defaultUrl;
  let data: any = null;
  let error: string | null = null;

  if (url) {
    try {
      const u = new URL(url);
      if (u.protocol !== "http:" && u.protocol !== "https:") {
        throw new Error("Only http/https URLs are allowed.");
      }

      const res = await fetch(u.toString(), { cache: "no-store" });
      if (!res.ok)
        throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);

      data = await res.json();
    } catch (e: any) {
      error = e?.message ?? "Unknown error";
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Server-side fetch (no client JS)</h1>

      <form method="get" style={{ marginBottom: 12 }}>
        <input
          type="url"
          name="url"
          placeholder="https://swapi.dev/api/people/1"
          defaultValue={url ?? ""}
          required
          style={{ width: "60%" }}
        />
        <button type="submit" style={{ marginLeft: 8 }}>
          Fetch
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}
