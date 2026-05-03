import { db } from "../lib/db.js";
import { createUser } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    console.log("🔥 Incoming request body:", req.body); // test
    const { id, firstName, lastName, imageUrl } = req.body;
    // 🔍 check if user exists
    const { data: existingUser, error: findError } = await db
      .from("users")
      .select("*")
      .eq("clerk_id", id)
      .single();

    // ⚠️ if error other than "not found"
    if (findError && findError.code !== "PGRST116") {
      throw findError;
    }

    // 👤 create user if not exists
    if (!existingUser) {
      const { error: insertError } = await db
        .from("users")
        .insert([
          {
            clerk_id: id,
            full_name: `${firstName || ""} ${lastName || ""}`.trim(),
            image_url: imageUrl,
          },
        ]);

      if (insertError) throw insertError;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in auth callback", error.message);
    next(error);
  }
};