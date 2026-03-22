module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false });
    return;
  }

  try {
    res.status(200).json({ ok: true });
  } catch {
    res.status(200).json({ ok: true });
  }
};
