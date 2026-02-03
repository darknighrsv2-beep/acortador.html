export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let url;

  try {
    // Vercel a veces manda body como string
    if (typeof req.body === "string") {
      const parsed = JSON.parse(req.body);
      url = parsed.url;
    } else {
      url = req.body.url;
    }
  } catch (e) {
    return res.status(400).json({ error: "Body inválido" });
  }

  if (!url) {
    return res.status(400).json({ error: "No URL" });
  }

  try {
    const response = await fetch(
      "https://is.gd/create.php?format=simple&url=" +
        encodeURIComponent(url)
    );

    const short = await response.text();
    return res.status(200).json({ short });

  } catch (err) {
    return res.status(500).json({ error: "Fallo al acortar" });
  }
}
