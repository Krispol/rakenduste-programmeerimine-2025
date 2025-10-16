type Search = { url?: string };

export default async function Page({ searchParams }: { searchParams: Search }) {
  const url = searchParams?.url;
  let data: any = null;
  let error: string | null = null;

  if (url) {
    try {
      // Basic safety: allow only http/https
      const u = new URL(url);
      if (u.protocol !== "http:" && u.protocol !== "https:") {
        throw new Error("Only http/https URLs are allowed.");
      }

      const res = await fetch(u.toString(), { cache: "no-store" });
      if (!res.ok)
        throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);

      // Assumes JSON; adjust if you need text/HTML
      data = await res.json();
    } catch (e: any) {
      error = e?.message ?? "Unknown error";
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Server-side fetch (no client JS)</h1>

      {/* Minimal form: GET submits ?url=... back to this page */}
      <form method="get" style={{ marginBottom: 12 }}>
        <input
          type="url"
          name="url"
          placeholder="Enter API URL"
          defaultValue={url ?? ""}
          required
          style={{ width: "60%" }}
        />
        <button type="submit" style={{ marginLeft: 8 }}>
          Fetch
        </button>
      </form>

      {/* Render states: nothing by default; show error or JSON after submit */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}
