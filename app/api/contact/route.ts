import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name:    z.string().min(2).max(80),
  email:   z.string().email(),
  phone:   z.string().optional(),
  message: z.string().min(10).max(1000),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // TODO: forward to CRM / email notification (same webhook pattern as /api/lead)
  if (process.env.NODE_ENV === "development") {
    console.log("[/api/contact] Message received:", JSON.stringify(result.data, null, 2));
  }

  return NextResponse.json(
    { success: true, message: "Message received. We'll be in touch within 1 business day." },
    { status: 200 },
  );
}
