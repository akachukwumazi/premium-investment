import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "7cjc2l5c",
  dataset: "productions",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_SECRET_TOKEN,
  useCdn: false,
});
