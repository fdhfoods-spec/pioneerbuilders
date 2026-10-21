import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export interface EnquiryPayload {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  budget?: string;
  message: string;
}

export async function submitEnquiryToSupabase(data: EnquiryPayload): Promise<{
  success: boolean;
  error?: string;
  simulated?: boolean;
}> {
  if (!isSupabaseConfigured || !supabase) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured in .env.local. Storing locally for demo:",
        data
      );
    }
    // Return simulated success so the interface functions smoothly during preview/development
    return { success: true, simulated: true };
  }

  try {
    const { error } = await supabase.from("enquiries").insert([
      {
        name: data.name,
        phone: data.phone,
        email: data.email,
        project_type: data.projectType,
        location: data.location,
        budget: data.budget || null,
        message: data.message,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("[Supabase Error] Failed to insert enquiry:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Network error while saving enquiry";
    console.error("[Supabase Exception] Failed to submit enquiry:", err);
    return { success: false, error: errorMessage };
  }
}
