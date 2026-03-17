import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { course, professor, weeks } = await req.json();

  const prompt = `
You are a university study assistant AI.

Student input:
- Course: ${course}
- Professor: ${professor}
- Exam in: ${weeks} weeks

Available summaries:
1. "Top Scorer Notes" (very concise, exam-focused)
2. "Deep Dive Notes" (detailed, conceptual)
3. "Last Minute Crash Notes" (ultra short, fast revision)

Your task:
Recommend the BEST 1–2 summaries and explain WHY.

Answer format:
Recommendation:
- ...
Reason:
- ...
`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-5-mini",
      input: prompt
    })
  });

  const data = await response.json();

  return NextResponse.json({
    result: data.output[0].content[0].text
  });
}
