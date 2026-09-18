export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Nomor WhatsApp wajib diisi' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const FONNTE_TOKEN = process.env.FONNTE_TOKEN || 'DEMO_TOKEN';
  const msg = `*KODE VERIFIKASI PROMO*\n\nKode OTP Anda: *${otp}*.\nBerlaku 5 menit. Jangan berikan ke siapapun.`;

  try {
    if (FONNTE_TOKEN !== 'DEMO_TOKEN') {
      await fetch('https://api.fonnte.com/send', {
        method: 'POST',
        headers: { 'Authorization': FONNTE_TOKEN, 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: phone, message: msg })
      });
    }
    return res.status(200).json({
      success: true,
      message: 'OTP berhasil dikirim',
      demoOtp: FONNTE_TOKEN === 'DEMO_TOKEN' ? otp : undefined,
      phone
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}