import { NextRequest, NextResponse } from "next/server";
import { bookingRequestSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate with shared Zod schema
  const result = bookingRequestSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const booking = result.data;

  // ── CRM / Webhook Integration ─────────────────────────────────────────────
  // TODO: integrate CRM webhook (GoHighLevel / HubSpot / Zapier / Make)
  // Replace the block below with your webhook call. The crmPayload is already
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
    firstName:      booking.name.split(" ")[0] ?? booking.name,
    lastName:       booking.name.split(" ").slice(1).join(" ") || "",
    email:          booking.email,
    phone:          booking.phone,
    address:        booking.address,
    whatsappOptIn:  booking.whatsappOptIn ?? false,

    // Booking request
    serviceType:    booking.serviceType,
    frequency:      booking.frequency,
    estimatedPrice: booking.estimatedPrice,

    // Property details (residential-specific)
    ...("bedrooms"  in booking ? { bedrooms:  booking.bedrooms }  : {}),
    ...("bathrooms" in booking ? { bathrooms: booking.bathrooms } : {}),

    // Property details (commercial-specific)
    ...("sqft"         in booking ? { sqft:         booking.sqft }         : {}),
    ...("propertyType" in booking ? { propertyType: booking.propertyType } : {}),

    // Attribution
    source:    booking.utm_source   ?? "direct",
    medium:    booking.utm_medium   ?? "",
    campaign:  booking.utm_campaign ?? "",
    content:   booking.utm_content  ?? "",
    term:      booking.utm_term     ?? "",

    // Metadata
    submittedAt: booking.submittedAt ?? new Date().toISOString(),
    pageUrl:     booking.pageUrl ?? "",
  };

  // Log in development only
  if (process.env.NODE_ENV === "development") {
    console.log("[/api/lead] New booking request received:", JSON.stringify(crmPayload, null, 2));
  }

  return NextResponse.json(
    { success: true, message: "Request received. We'll be in touch within 24 hours." },
    { status: 200 },
  );
}
