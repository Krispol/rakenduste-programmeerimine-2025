export const dynamic = "force-dynamic";

import ClientFetcher from "./client";

export default function Page() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <ClientFetcher />
    </main>
  );
}
