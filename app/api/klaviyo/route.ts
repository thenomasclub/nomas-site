import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, listId } = await req.json();

    if (!email || !listId) {
      return NextResponse.json({ error: "Email and listId are required" }, { status: 400 });
    }

    const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
    if (!apiKey) {
      console.error("Missing KLAVIYO_API_KEY in environment");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Step 1: Create or update the profile
    const profileRes = await fetch("https://a.klaviyo.com/api/profiles/", {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${apiKey}`,
        "Content-Type": "application/json",
        Revision: "2025-07-15",
      },
      body: JSON.stringify({
        data: { type: "profile", attributes: { email } },
      }),
    });

    const profileData = await profileRes.json().catch(() => null);

    if (!profileRes.ok) {
    const klaviyoErrorCode = profileData?.errors?.[0]?.code;

    if (profileRes.status === 409 && klaviyoErrorCode === "duplicate_profile") {
      return NextResponse.json(
        { error: "This email is already subscribed to the Klaviyo list. Please use a different email." },
        { status: 409 }
      );
    }

  console.error("Profile creation error:", profileData);
  return NextResponse.json(
    { error: "Failed to create profile", details: profileData },
    { status: profileRes.status }
  );
}

    const profileId = profileData?.data?.id;
    if (!profileId) {
      console.warn("No profile ID returned, but request may have succeeded:", profileData);
      // proceed anyway — some API calls succeed without returning an ID
    }

    // Step 2: Add profile to the specified list
    const listRes = await fetch(
      `https://a.klaviyo.com/api/lists/${listId}/relationships/profiles/`,
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${apiKey}`,
          "Content-Type": "application/json",
          Revision: "2025-07-15",
        },
        body: JSON.stringify({ data: [{ type: "profile", id: profileId }] }),
      }
    );

    const listData = await listRes.json().catch(() => null);
    if (!listRes.ok) {
      console.error("List subscription error:", listData);
      return NextResponse.json({ error: "Failed to subscribe to list", details: listData }, { status: listRes.status });
    }

    return NextResponse.json({ success: true, profileId, listData });
  } catch (err) {
    console.error("Unhandled error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
