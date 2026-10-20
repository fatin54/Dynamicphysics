interface Env {
  GEMINI_API_KEY?: string;
}

interface RequestBody {
  message?: string;
  history?: { role: 'user' | 'assistant'; text: string }[];
  preferBangla?: boolean;
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const { request, env } = context;

    // Parse incoming request body
    let body: RequestBody;
    try {
      body = (await request.json()) as RequestBody;
    } catch {
      return new Response(
        JSON.stringify({
          error: 'INVALID_JSON',
          message: 'Malformed request JSON payload.',
          liveAI: false,
        }),
        { status: 400, headers: corsHeaders }
      );
    }

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

    // If no server-side key is configured, return fallback instruction
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          liveAI: false,
          fallback: true,
          message:
            'GEMINI_API_KEY is not configured in Cloudflare Pages environment variables. Switching to deterministic offline Socratic physics engine.',
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    // HSC Physics System Prompt
    const systemPrompt = `You are an expert Bangladesh HSC Physics tutor for Class XI-XII, specializing in Chapter 2: Vector (ভেক্টর) and Chapter 3: Dynamics (গতিবিদ্যা) from the official NCTB textbook by Dr. Shahjahan Tapan, Muhammad Aziz Hasan, Dr. Rana Chowdhury, and reference benchmarks by Ishak Sir.

PEDAGOGICAL & SCIENTIFIC PRINCIPLES:
1. Deliver intuitive explanations first, followed by formal mathematical derivations with correct SI units (m, s, m/s, m/s², N, N·s, rad/s).
2. Follow standard NCTB conventions: standard acceleration due to gravity g = 9.8 m/s² unless otherwise specified.
3. Chapter 2 Vector: Dot product A · B = AB cos θ (scalar), cross product A × B = (AB sin θ) η̂ (vector), orthogonality A · B = 0, parallel A × B = 0, river crossing t = d / (v sin α), minimum time t_min = d/v (α = 90°), shortest distance / zero drift cos α = -u/v, Del ∇, divergence ∇ · V (solenoidal: ∇ · V = 0), curl ∇ × V (irrotational: ∇ × V = 0).
4. For projectile motion (প্রাস): treat horizontal motion as uniform speed (a_x = 0, v_x = v_0 cos θ_0) and vertical motion under gravity (a_y = -g). Parabolic equation: y = x tan θ_0 - [g / (2 v_0² cos² θ_0)] x².
5. For relative velocity (আপেক্ষিক বেগ): v_AB = v_A - v_B. River crossing minimum time: steer 90° to bank (t_min = d/v); shortest distance (zero drift): cos α = -u/v (requires v > u). Rain-umbrella: tan θ = v_person / v_rain with the vertical.
6. For circular motion: angular velocity ω = 2π/T = 2πf, linear speed v = ω r, centripetal acceleration a_c = v²/r = ω² r directed radially inward.
7. For forces (Chapter 4 bridge): Newton's 2nd Law F = ma = dp/dt; Atwood machine a = (m2 - m1)/(m1 + m2)g; Impulse J = F Δt = Δp.
8. Be structured, encouraging, and provide LaTeX formulas when applicable. Avoid inventing fake historical board citations.
9. If the student asks in Bengali or prefers Bengali, provide a bilingual response.`;

    // Construct contents array for Gemini REST API
    const contents: { role: string; parts: { text: string }[] }[] = [];

    // Optionally include past conversation history (last 4 turns)
    if (body.history && Array.isArray(body.history)) {
      const recentHistory = body.history.slice(-4);
      for (const h of recentHistory) {
        contents.push({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.text }],
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: userMessage }],
    });

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
        contents,
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 1200,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      return new Response(
        JSON.stringify({
          liveAI: false,
          fallback: true,
          error: `Gemini API responded with status ${geminiResponse.status}: ${errorText}`,
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    const data = (await geminiResponse.json()) as any;
    const replyText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'I could not generate a response. Please try again.';

    return new Response(
      JSON.stringify({
        liveAI: true,
        text: replyText,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        liveAI: false,
        fallback: true,
        error: err?.message || 'Internal tutor endpoint failure.',
      }),
      { status: 200, headers: corsHeaders }
    );
  }
};

export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
