import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ircbpfdqpokqruasrfqh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyY2JwZmRxcG9rcXJ1YXNyZnFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMTEwMzYsImV4cCI6MjA4ODc4NzAzNn0.ebQvKSXFjvyXl_NV_KGKcbZaK0BQx2_AL9Kf0LNsMSM"
);