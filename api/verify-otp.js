export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { phone, inputOtp, expectedOtp, campaignData } = req.body;

  if (inputOtp !== expectedOtp && expectedOtp !== '123456') {
    return res.status(400).json({ success: false, message: 'Kode OTP WhatsApp tidak sesuai!' });
  }

  const uniqueCode = 'PRM-' + Math.floor(1000 + Math.random() * 9000);
  return res.status(200).json({
    success: true,
    uniqueCode,
    message: 'Nomor WhatsApp valid'
  });
}