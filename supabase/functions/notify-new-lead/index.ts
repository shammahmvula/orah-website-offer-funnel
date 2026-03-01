import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

    if (!record) {
      return new Response(JSON.stringify({ error: "No record" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Skip disqualified leads
    if (record.is_disqualified) {
      return new Response(JSON.stringify({ skipped: true }), {
        headers: corsHeaders,
      });
    }

    const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL");
    if (!notificationEmail) {
      console.error("NOTIFICATION_EMAIL secret not set");
      return new Response(JSON.stringify({ error: "No notification email configured" }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Build email content
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

    const subject = `🔥 New Lead: ${name} — ${business}`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 24px;">
        <h1 style="color: #1a1a1a; border-bottom: 3px solid #f97316; padding-bottom: 12px;">🔥 New Lead Received!</h1>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr style="background: #f9fafb;">
            <td style="padding: 10px 14px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb;">Name</td>
            <td style="padding: 10px 14px; color: #1f2937; border: 1px solid #e5e7eb;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb;">Business</td>
            <td style="padding: 10px 14px; color: #1f2937; border: 1px solid #e5e7eb;">${business}</td>
          </tr>
          <tr style="background: #f9fafb;">
            <td style="padding: 10px 14px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb;">Email</td>
            <td style="padding: 10px 14px; color: #1f2937; border: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb;">WhatsApp</td>
            <td style="padding: 10px 14px; color: #1f2937; border: 1px solid #e5e7eb;">${whatsapp}</td>
          </tr>
          <tr style="background: #f9fafb;">
            <td style="padding: 10px 14px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb;">Industry</td>
            <td style="padding: 10px 14px; color: #1f2937; border: 1px solid #e5e7eb;">${industry}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb;">Province</td>
            <td style="padding: 10px 14px; color: #1f2937; border: 1px solid #e5e7eb;">${province}</td>
          </tr>
          <tr style="background: #f9fafb;">
            <td style="padding: 10px 14px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb;">Monthly Revenue</td>
            <td style="padding: 10px 14px; color: #1f2937; border: 1px solid #e5e7eb;">${revenue}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb;">Investment Ready</td>
            <td style="padding: 10px 14px; color: #1f2937; border: 1px solid #e5e7eb;">${investment}</td>
          </tr>
          <tr style="background: #f9fafb;">
            <td style="padding: 10px 14px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb;">Motivation</td>
            <td style="padding: 10px 14px; color: #1f2937; border: 1px solid #e5e7eb;">${motivation}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb;">Google Reviews</td>
            <td style="padding: 10px 14px; color: #1f2937; border: 1px solid #e5e7eb;">${googleReviews}</td>
          </tr>
          <tr style="background: #f9fafb;">
            <td style="padding: 10px 14px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb;">Website</td>
            <td style="padding: 10px 14px; color: #1f2937; border: 1px solid #e5e7eb;">${websiteUrl}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb;">Billing Address</td>
            <td style="padding: 10px 14px; color: #1f2937; border: 1px solid #e5e7eb;">${billingAddress}</td>
          </tr>
          <tr style="background: #f9fafb;">
            <td style="padding: 10px 14px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb;">Funnel</td>
            <td style="padding: 10px 14px; color: #1f2937; border: 1px solid #e5e7eb;">${funnel}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb;">UTM Source</td>
            <td style="padding: 10px 14px; color: #1f2937; border: 1px solid #e5e7eb;">${utmSource}</td>
          </tr>
          <tr style="background: #f9fafb;">
            <td style="padding: 10px 14px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb;">UTM Campaign</td>
            <td style="padding: 10px 14px; color: #1f2937; border: 1px solid #e5e7eb;">${utmCampaign}</td>
          </tr>
        </table>

        <p style="margin-top: 20px; color: #6b7280; font-size: 13px;">
          Received at ${new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" })} SAST
        </p>
      </div>
    `;

    // Send email using Supabase's built-in email (via auth admin)
    // We'll use a simple fetch to Resend or a similar approach
    // Since we don't have Resend, we'll use the Supabase edge function to send via SMTP
    // Actually, let's use the free tier approach: call an external email API

    // Use Supabase's built-in SMTP to send notification
    // We'll leverage the Lovable AI gateway or a simple webhook approach
    // Best approach: use fetch to send via a simple email service

    // Send via Supabase's auth.admin to trigger a custom email - not ideal
    // Instead, let's use a simple approach with the built-in Deno mail capabilities

    // Most reliable: Use Resend's free tier (100 emails/day free)
    // But we need RESEND_API_KEY for that. Let's check if available.
    
    const resendKey = Deno.env.get("RESEND_API_KEY");
    
    if (resendKey) {
      // Send via Resend
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
        return new Response(JSON.stringify({ error: "Email send failed" }), {
          status: 500,
          headers: corsHeaders,
        });
      }
    } else {
      // Fallback: log the lead details
      console.log("=== NEW LEAD ===");
      console.log(`Name: ${name}, Business: ${business}, Email: ${email}, WhatsApp: ${whatsapp}`);
      console.log("No RESEND_API_KEY configured - email not sent");
      
      return new Response(JSON.stringify({ 
        warning: "RESEND_API_KEY not configured. Lead logged but email not sent.",
        lead: { name, business, email, whatsapp }
      }), {
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
