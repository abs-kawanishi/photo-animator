export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.REPLICATE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { image, prompt, duration, resolution } = req.body;

    const submitRes = await fetch('https://api.replicate.com/v1/models/wan-video/wan-2.2-i2v/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: {
          image,
          prompt,
          duration: duration || 5,
          resolution: resolution || '720p',
          frames_per_second: 16,
        }
      }),
    });

    const data = await submitRes.json();
    if (!submitRes.ok) {
      return res.status(submitRes.status).json({ error: data.detail || 'Replicate error' });
    }

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
