const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const record = payload.record;
    const source = payload.source || "funnel";

    if (!record) {
      return new Response(JSON.stringify({ error: "No record" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Skip disqualified funnel leads
    if (source === "funnel" && record.is_disqualified) {
      return new Response(JSON.stringify({ skipped: true }), { headers: corsHeaders });
    }

    const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL");
    const resendKey = Deno.env.get("RESEND_API_KEY");

    if (!notificationEmail || !resendKey) {
      console.error("Missing NOTIFICATION_EMAIL or RESEND_API_KEY");
      return new Response(JSON.stringify({ error: "Config missing" }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    let subject: string;
    let htmlBody: string;

    if (source === "website") {
      // Website quiz lead
      const biz = record.business_type || "N/A";
      const loc = record.location || "N/A";
      const years = record.years_in_business || "N/A";
      const reviews = record.review_count || "N/A";
      const challenge = record.biggest_challenge || "N/A";
      const ready = record.ready_to_start || "N/A";
      const website = record.website_status || "N/A";
      const callHandling = record.call_handling || "N/A";
      const objection = record.objection || "N/A";
      const utmSource = record.utm_source || "N/A";
      const utmCampaign = record.utm_campaign || "N/A";

      subject = `🌐 Website Lead: ${biz} — ${loc}`;

      htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 24px;">
          <h1 style="color: #1a1a1a; border-bottom: 3px solid #8b5cf6; padding-bottom: 12px;">🌐 New Website Quiz Lead</h1>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            ${row("Business Type", biz, true)}
            ${row("Location", loc, false)}
            ${row("Years in Business", years, true)}
            ${row("Website Status", website, false)}
            ${row("Google Reviews", reviews, true)}
            ${row("Call Handling", callHandling, false)}
            ${row("Biggest Challenge", challenge, true)}
            ${row("Ready to Start", ready, false)}
            ${row("Objection", objection, true)}
            ${row("UTM Source", utmSource, false)}
            ${row("UTM Campaign", utmCampaign, true)}
          </table>
          <p style="margin-top: 20px; color: #6b7280; font-size: 13px;">
            Received at ${new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" })} SAST
          </p>
        </div>
      `;
    } else {
      // Funnel lead
      const name = record.full_name || "Unknown";
      const business = record.business_name || "N/A";
      const email = record.email || "N/A";
      const whatsapp = record.whatsapp || "N/A";
      const industry = record.industry || "N/A";
      const revenue = record.monthly_revenue || "N/A";
      const investment = record.investment_ready || "N/A";
      const motivation = record.motivation || "N/A";
      const funnel = record.funnel_source || "N/A";
      const province = record.province || "N/A";
      const googleReviews = record.google_reviews_interest ? "Yes" : "No";
      const websiteUrl = record.website_url || "N/A";
      const billingAddress = record.billing_address || "N/A";
      const utmSource = record.utm_source || "N/A";
      const utmCampaign = record.utm_campaign || "N/A";

      subject = `🔥 New Lead: ${name} — ${business}`;

      htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 24px;">
          <h1 style="color: #1a1a1a; border-bottom: 3px solid #f97316; padding-bottom: 12px;">🔥 New Funnel Lead</h1>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            ${row("Name", name, true)}
            ${row("Business", business, false)}
            ${row("Email", `<a href="mailto:${email}">${email}</a>`, true)}
            ${row("WhatsApp", whatsapp, false)}
            ${row("Industry", industry, true)}
            ${row("Province", province, false)}
            ${row("Monthly Revenue", revenue, true)}
            ${row("Investment Ready", investment, false)}
            ${row("Motivation", motivation, true)}
            ${row("Google Reviews", googleReviews, false)}
            ${row("Website", websiteUrl, true)}
            ${row("Billing Address", billingAddress, false)}
            ${row("Funnel", funnel, true)}
            ${row("UTM Source", utmSource, false)}
            ${row("UTM Campaign", utmCampaign, true)}
          </table>
          <p style="margin-top: 20px; color: #6b7280; font-size: 13px;">
            Received at ${new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" })} SAST
          </p>
        </div>
      `;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Orah Leads <leads@getorah.co.za>",
        to: [notificationEmail],
        subject,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response(JSON.stringify({ error: "Email send failed", details: err }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});

function row(label: string, value: string, alt: boolean): string {
  return `
    <tr${alt ? ' style="background: #f9fafb;"' : ''}>
      <td style="padding: 10px 14px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb;">${label}</td>
      <td style="padding: 10px 14px; color: #1f2937; border: 1px solid #e5e7eb;">${value}</td>
    </tr>
  `;
}
