export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "No URL" });
  }

  try {
    const r = await fetch(
      "https://is.gd/create.php?format=simple&url=" + encodeURIComponent(url)
    );
    const short = await r.text();
    res.status(200).json({ short });
  } catch (e) {
    res.status(500).json({ error: "Acortador fallo" });
  }
}
