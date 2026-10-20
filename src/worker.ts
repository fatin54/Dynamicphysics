interface Env {
  GEMINI_API_KEY?: string;
  ASSETS?: { fetch: (request: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle Tutor API route
    if (url.pathname === '/api/tutor' && request.method === 'POST') {
      const corsHeaders = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      };

      try {
        const body = (await request.json()) as {
          message?: string;
          history?: { role: string; text: string }[];
        };
        const userMessage = body.message?.trim();

        if (!userMessage) {
          return new Response(
            JSON.stringify({
              error: 'EMPTY_PROMPT',
              message: 'Question cannot be empty.',
              liveAI: false,
            }),
            { status: 400, headers: corsHeaders }
          );
        }

        const apiKey = env.GEMINI_API_KEY;
        if (!apiKey) {
          return new Response(
            JSON.stringify({
              liveAI: false,
              fallback: true,
              message:
                'GEMINI_API_KEY is not configured on Cloudflare. Falling back to deterministic Socratic engine.',
            }),
            { status: 200, headers: corsHeaders }
          );
        }

        const systemPrompt = `You are an expert Bangladesh HSC Physics tutor for Class XI-XII, specializing in Chapter 3: Dynamics (গতিবিদ্যা) from the official NCTB textbook by Dr. Shahjahan Tapan, Muhammad Aziz Hasan, Dr. Rana Chowdhury, and reference benchmarks by Ishak Sir.
1. Deliver intuitive explanations first, followed by formal mathematical derivations with correct SI units.
2. Standard g = 9.8 m/s².
3. Projectile motion: parabolic path y = x tan θ - [g / (2 v0² cos² θ)] x², range R = (v0² sin 2θ)/g, height H = (v0² sin² θ)/2g.
4. Relative velocity: v_AB = v_A - v_B. River crossing minimum time t_min = d/v (steer 90°), shortest path cos α = -u/v. Rain umbrella tan θ = v_person / v_rain.
5. Circular motion: ω = 2π/T = 2πf, v = ω r, a_c = v²/r = ω² r.
6. Provide structured LaTeX formulas and encouraging explanations.`;

        const contents: { role: string; parts: { text: string }[] }[] = [];
        if (body.history && Array.isArray(body.history)) {
          for (const h of body.history.slice(-4)) {
            contents.push({
              role: h.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: h.text }],
            });
          }
        }
        contents.push({ role: 'user', parts: [{ text: userMessage }] });

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const geminiRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig: { temperature: 0.35, maxOutputTokens: 1200 },
          }),
        });

        if (!geminiRes.ok) {
          return new Response(
            JSON.stringify({ liveAI: false, fallback: true }),
            { status: 200, headers: corsHeaders }
          );
        }

        const data = (await geminiRes.json()) as any;
        const replyText =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          'Could not generate a response. Please try again.';

        return new Response(
          JSON.stringify({ liveAI: true, text: replyText }),
          { status: 200, headers: corsHeaders }
        );
      } catch (err: any) {
        return new Response(
          JSON.stringify({ liveAI: false, fallback: true, error: err?.message }),
          { status: 200, headers: corsHeaders }
        );
      }
    }

    if (url.pathname === '/api/tutor' && request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Pass any other request to static assets if binding exists
    if (env.ASSETS) {
      return await env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
