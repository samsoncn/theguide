// api.ts
export async function fetchResponse(message: string) {
  const res = await fetch("/api/openai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();
  return data.description;
}
