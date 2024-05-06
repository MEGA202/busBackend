import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import morgan from "morgan";
import bodyParser from "body-parser";

app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize the JS client
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("busInfo")
    .select("current")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  res.send(data ?? error);
});

app.listen(3000, () => console.log("Server ready on port 3000."));
