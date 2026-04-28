export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const { name, company, email, service, message } = body;

  if (!name || !email || !message) {
    return new Response('Missing required fields', { status: 400 });
  }

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
      <h2 style="margin-bottom:4px">New Enquiry — Cornerstone AI Group</h2>
      <p style="color:#888;font-size:13px;margin-top:0">Submitted via cornerstoneaigroup.com</p>
      <table style="width:100%;border-collapse:collapse;margin-top:20px;font-size:14px">
        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#555;width:130px">Name</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600">${name}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#555">Company</td><td style="padding:10px 0;border-bottom:1px solid #eee">${company || '—'}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#555">Email</td><td style="padding:10px 0;border-bottom:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#555">Service</td><td style="padding:10px 0;border-bottom:1px solid #eee">${service || '—'}</td></tr>
        <tr><td style="padding:10px 0;color:#555;vertical-align:top">Message</td><td style="padding:10px 0;white-space:pre-wrap">${message}</td></tr>
      </table>
    </div>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'CAIG Website <hello@cornerstoneaigroup.com>',
      to: ['hello@cornerstoneaigroup.com'],
      reply_to: email,
      subject: `New enquiry from ${name}${company ? ` — ${company}` : ''}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Resend error:', err);
    return new Response('Failed to send', { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
