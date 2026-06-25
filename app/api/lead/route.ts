import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate with shared Zod schema
  const result = leadSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const lead = result.data;

  // ── CRM / Webhook Integration ─────────────────────────────────────────────
  // TODO: integrate CRM webhook (GoHighLevel / HubSpot / Zapier / Make)
  // Replace the block below with your webhook call. The payload is already
  // shaped as clean JSON ready for any platform.
  //
  // Example (GoHighLevel):
  // await fetch(process.env.GHL_WEBHOOK_URL!, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(crmPayload),
  // });
  //
  // Example (Zapier / Make):
  // await fetch(process.env.ZAPIER_WEBHOOK_URL!, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(crmPayload),
  // });
  // ─────────────────────────────────────────────────────────────────────────

  const crmPayload = {
    // Contact
    firstName:     lead.name.split(" ")[0] ?? lead.name,
    lastName:      lead.name.split(" ").slice(1).join(" ") || "",
    email:         lead.email,
    phone:         lead.phone,
    whatsappOptIn: lead.whatsappOptIn ?? false,

    // Lead details
    serviceType:  lead.serviceType,
    serviceArea:  lead.serviceArea,
    leadVolume:   lead.leadVolume,

    // Attribution
    source:       lead.utm_source  ?? "direct",
    medium:       lead.utm_medium  ?? "",
    campaign:     lead.utm_campaign ?? "",
    content:      lead.utm_content  ?? "",
    term:         lead.utm_term     ?? "",

    // Metadata
    submittedAt:  lead.submittedAt ?? new Date().toISOString(),
    pageUrl:      lead.pageUrl ?? "",
  };

  // Log in development only
  if (process.env.NODE_ENV === "development") {
    console.log("[/api/lead] New lead received:", JSON.stringify(crmPayload, null, 2));
  }

  return NextResponse.json(
    { success: true, message: "Lead received. We'll be in touch within 24 hours." },
    { status: 200 },
  );
}
