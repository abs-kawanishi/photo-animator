export default async function handler(req, res) {
  const { url } = req.query;
  if (!url || !url.startsWith('https://v3b.fal.media/')) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', 'attachment; filename="kiokulive.mp4"');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(Buffer.from(buffer));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
