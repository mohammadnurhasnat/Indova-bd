import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Ensure the Gemini API key is secure and available
const geminiKey = process.env.GEMINI_API_KEY;
if (!geminiKey) {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Chatbot queries will fail until a secret key is provided.");
}

const ai = new GoogleGenAI({
  apiKey: geminiKey || "",
  httpOptions: {
    headers: {
      'User-Agent': 'meditrip-server',
    }
  }
});

interface QAPair {
  q: string;
  a: string;
}

let cachedDatabase: QAPair[] | null = null;

function loadOfflineDatabase(): QAPair[] {
  if (cachedDatabase) return cachedDatabase;

  const db: QAPair[] = [];
  try {
    const content = fs.readFileSync(path.join(process.cwd(), "AI Branin.txt"), "utf8");
    const lines = content.split('\n');
    let currentQ = "";

    for (let line of lines) {
      const trimmed = line.trim();
      if (trimmed.match(/^Q\d+:/i)) {
        currentQ = trimmed.replace(/^Q\d+:\s*/i, "").trim();
      } else if (trimmed.match(/^A:\s*/i) && currentQ) {
        const ans = trimmed.replace(/^A:\s*/i, "").trim();
        db.push({ q: currentQ, a: ans });
        currentQ = "";
      }
    }
    console.log(`Successfully parsed ${db.length} entries from the offline database.`);
    cachedDatabase = db;
  } catch (err) {
    console.error("Failed to parse offline Q&A database from AI Branin.txt:", err);
    cachedDatabase = [];
  }
  return cachedDatabase;
}

function findBestOfflineMatch(userMessage: string, database: QAPair[]): QAPair | null {
  const cleanStr = (s: string) => s.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "").trim();
  const queryStr = cleanStr(userMessage);
  const queryWords = queryStr.split(/\s+/).filter(Boolean);
  
  if (queryWords.length === 0) return null;

  let bestMatch: QAPair | null = null;
  let highestScore = 0;

  for (const item of database) {
    const qStr = cleanStr(item.q);
    const qWords = qStr.split(/\s+/).filter(Boolean);
    
    if (qStr.includes(queryStr) || queryStr.includes(qStr)) {
      return item;
    }

    let matchCount = 0;
    for (const qw of queryWords) {
      if (qWords.includes(qw)) {
        matchCount++;
      }
    }

    const score = matchCount / Math.max(qWords.length, 1);
    if (matchCount > 0 && score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  return highestScore > 0.1 ? bestMatch : null;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ limit: "25mb", extended: true }));

  // Dedicated customer support chatbot endpoint configured by MOHAMMAD NUR HASNAT
  app.post("/api/chat", async (req: express.Request, res: express.Response) => {
    let hasSentAnyData = false;
    const { message, history } = req.body;
    const cleanMessage = (message || "").trim();

    try {
      if (!geminiKey) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');
        const warningText = "আমার Gemini API Key সেট করা নেই। দয়া করে Settings > Secrets প্যানেল থেকে আপনার GEMINI_API_KEY অ্যাড করুন যাতে আমি চালু হতে পারি!";
        res.write(`data: ${JSON.stringify({ text: warningText })}\n\n`);
        return res.end();
      }

      let SYSTEM_INSTRUCTION = "";
      try {
        SYSTEM_INSTRUCTION = fs.readFileSync(path.join(process.cwd(), "AI Branin.txt"), "utf8");
        // Append strict plain-text instruction constraints to prevent any double-asterisk markdown outputs or cartoon emojis
        SYSTEM_INSTRUCTION += "\n\nCRITICAL CONSTRAINTS / RULES:\n1. NEVER use any markdown bold notation (like **text**) or double asterisks (**) in your responses. Any raw '**' characters make the output look bad.\n2. NEVER use quirky cartoon emojis like 📍, 📞, 📧, 🌐, 👥 or other heavy colored symbols. Instead, use clean plain text with space-separated simple bullet points or raw hyphens (-). The frontend automatically renders premium simple grey/brown medical vector icons for text sections, so you only need to output plain text.\n3. Keep your format highly organized, clean, and professional.\n4. COGNITIVE INTEGRATION: You must fully internalize, adopt, and integrate all 300+ pre-parsed Q&As from this database file ('AI Branin.txt') into your active cognitive neural net. Use this extensive list to provide 100% accurate, tailored, and premium support. Furthermore, constantly listen to the user's input, collect critical data points (such as user name, contact details, current visa status), and dynamically construct updated intelligence and personalized answers from them.";
      } catch (err) {
        console.error("Failed to load AI brain from file:", err);
        SYSTEM_INSTRUCTION = `Your name is 'MOHAMMAD' (মোহাম্মদ). If anyone asks about your name, who you are, or your identity, you must state that your name is 'MOHAMMAD' (মোহাম্মদ), and you are representing 'Meditrip Assistant' (মেডিট্রিপ অ্যাসিস্ট্যান্ট). You are the advanced chatbot customer support bot for Meditrip (fast, premium, and trusted Indian Visa processing from Bangladesh).
You talk to users in Bengali (বাংলা), English, and Banglish (Bengali written in English letters, e.g., 'Ami help korte pari') based on how the user initiates or prefers. Keep your tone highly polite, warm, human-like, and professional.

OUR KNOWLEDGE BASE:

1. COMPANY NAME: Meditrip (fast, premium, and trusted Indian Visa processing from Bangladesh).
2. SPECIALIZATION & FOCUS: Full support for Indian visa application processing, doctor appointment letter procurement, IVAC slot booking, and error-free document preparation from Bangladesh. We do NOT process visas for other countries.
3. SERVICES PROVIDED:
   - Medical Visa Support: Complete processing for patients & up to 3 medical attendants. We coordinate doctor appointments, embassy documents, and IVAC slot booking.
   - Business Visa Support: Cover letters, Forwarding Letters, trade license translation, company invitation letters, trade license.
   - Double Entry Visa: Documentation support including work permit, notary/affidavits, and hotel/ticket reservation.
   - Entry Visa: Family visit sponsor coordination, marriage and birth certificates.
   - Tourist Visa: CURRENTLY SUSPENDED TEMPORARILY. Tell users that we will resume tourist visa services immediately when the Indian Embassy restarts accepting standard tourism applications.
   - Additional Conveniences: Air ticketing, Travel Cards preparation, Bank Statement solvency assistance, Service Cards, NOC template preparation, Salary Certificate, and online visa application entry.

4. CHECKLIST VERIFICATION & PRICING PACKAGES (DOCUMENT CHECK):
   - Free Basic Check: One-time document verification checklist check via WhatsApp, free.
   - Missing Documents Service (2000 BDT): Pro active check, identified missing documents, priority support over WhatsApp, feedback report.
   - Full Documentation Package (5500 BDT): Prepare all documents fully for the applicant. Covers statement assistance, NOC, salary certificates draft, and full application. Completely done-for-you.

5. IVAC SLOT BOOKING SERVICES & TIMELINES:
   - Medical Slot: 5 to 7 days delivery. Price varies.
   - Business Slot: 7 to 10 days delivery. Price varies.
   - Double Entry: 20 to 30 days delivery. Price varies.
   - Entry Slot: 20 to 30 days delivery. Price varies.
   - NOTE: Slot Booking fee (once booked) is non-refundable!

6. CONTACT DETAILS & OFFICES:
   - Office 1: Jamuna Future Park, Dhaka 1229.
   - Office 2: Mohammadpur, Dhaka.
   - Support Phone / WhatsApp: +880 1332-601510 (or 01332-601510). We can receive customer documents and queries there.

7. KEY MEDICAL VISA REQUIREMENTS & DOCUMENTS:
   - Passport valid for at least 7-8 months minimum.
   - If passport was ever lost, GD Copy (Police General Diary report) is required.
   - NID (National ID card), Utility Bill copy.
   - 2x2 photo with white background.
   - Minimum 6 months bank statement with sufficient balance.
   - Solvency certificate (optional but recommended).
   - NOC / Trade License depending on profession (e.g. employee needs NOC and salary certificate, business owner needs trade license).
   - Doctor Appointment / Invite from an Indian hospital.

8. BEHAVIOR RULES:
   - Respond like an expert human consultant. Avoid machine-like prefixes or robotic phrasing.
   - Keep answers detailed, clear, and easy to understand. Tell users step-by-step how we can help.
   - IMPORTANT IDENTITY CONSTRAINTS: The user's chat window already pre-renders your welcome greeting where you introduce yourself as "Mohammad from Meditrip". Therefore, do NOT start your follow-up answers with "This is Mohammad" or "Hi, I am Mohammad" or introduce yourself again. Doing so is highly repetitive. Answer the user's questions or comments directly without any personal introductions.
   - However, if the user explicitly asks about your name, who you are, or your identity (e.g., "what is your name?", "who are you?", "তোমার নাম কি?", "কে তুমি?", " পরিচয় দাও", "apni ke?", "tumi ke?"), then you must identify yourself as Mohammad, the Meditrip Assistant, politely and helpfully.
   - Encourage users to leave a message or book directly via Meditrip's dashboard.
   - NEVER make up pricing that is not listed here. For slot bookings, inform them that prices depend on embassy queue density and they can ask via the chatbot or directly check with support.
   - If a customer mentions anything outside of India or asks general questions beyond Meditrip, politely steer them back to Meditrip's Indian visa assistance services.
   - Be extremely helpful, clear, and welcoming. Handle Bengali and English text with absolute ease.`;
      }

      // Set up the message contents array for multi-turn chat persistence
      // Convert history + current message to raw sequential turns, filtering empty text parts
      const rawTurns = [];
      if (Array.isArray(history)) {
        for (const item of history) {
          if (item && item.role && item.parts && Array.isArray(item.parts)) {
            const role = item.role === "user" ? "user" : "model";
            const pieces = item.parts
              .map((p: any) => (p.text || "").trim())
              .filter(Boolean);
            if (pieces.length > 0) {
              rawTurns.push({
                role,
                text: pieces.join("\n")
              });
            }
          }
        }
      }

      // Add the user's new message at the end
      if (cleanMessage) {
        rawTurns.push({
          role: "user",
          text: cleanMessage
        });
      } else {
        rawTurns.push({
          role: "user",
          text: "হ্যালো"
        });
      }

      // Merge consecutive turns of the same role to strictly alternate roles
      const mergedTurns = [];
      for (const turn of rawTurns) {
        if (mergedTurns.length > 0 && mergedTurns[mergedTurns.length - 1].role === turn.role) {
          mergedTurns[mergedTurns.length - 1].text += "\n" + turn.text;
        } else {
          mergedTurns.push({ ...turn });
        }
      }

      // Ensure the sequence starts with a "user" turn (Gemini requirement)
      let startIndex = 0;
      while (startIndex < mergedTurns.length && mergedTurns[startIndex].role !== "user") {
        startIndex++;
      }
      const finalTurns = mergedTurns.slice(startIndex);

      // Construct the formal contents array
      const contents = finalTurns.map(turn => ({
        role: turn.role,
        parts: [{ text: turn.text }]
      }));

      let responseStream;
      try {
        responseStream = await ai.models.generateContentStream({
          model: "gemini-3.5-flash",
          contents: contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.65,
          }
        });
      } catch (primaryErr: any) {
        console.warn("Primary gemini-3.5-flash model failed. Attempting fallback gemini-3.1-flash-lite...", primaryErr);
        try {
          responseStream = await ai.models.generateContentStream({
            model: "gemini-3.1-flash-lite",
            contents: contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.65,
            }
          });
        } catch (fallbackErr: any) {
          console.error("Both primary gemini-3.5-flash and fallback gemini-3.1-flash-lite models failed:", fallbackErr);
          throw fallbackErr;
        }
      }

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');

      for await (const chunk of responseStream) {
        const text = chunk.text;
        if (text) {
          hasSentAnyData = true;
          res.write(`data: ${JSON.stringify({ text })}\n\n`);
        }
      }
      res.end();
    } catch (err: any) {
      console.error("Gemini chatbot API server-side error:", err);
      // If we managed to stream part of the answer, do not write the confusing fallback block mid-sentence
      if (typeof hasSentAnyData !== 'undefined' && hasSentAnyData) {
        res.end();
      } else {
        if (!res.headersSent) {
          res.setHeader('Content-Type', 'text/event-stream');
          res.setHeader('Cache-Control', 'no-cache');
          res.setHeader('Connection', 'keep-alive');
          res.setHeader('X-Accel-Buffering', 'no');
        }
        
        // Match against pre-built Q&A database first on API / Quota failure
        const database = loadOfflineDatabase();
        const bestMatch = findBestOfflineMatch(cleanMessage, database);
        let fallbackText = "";
        
        if (bestMatch) {
          fallbackText = bestMatch.a;
        } else {
          fallbackText = "প্রিয় গ্রাহক, আমাদের কাস্টমার কেয়ার সিস্টেমে এই মুহূর্তে সাময়িক রক্ষণাবেক্ষণ চলছে। বর্তমানে লাইভ চ্যাটে কোনো প্রতিনিধি বা এজেন্ট উপলব্ধ নেই। তবে কোনো প্রতিনিধি ফ্রি হওয়া মাত্রই আপনার সাথে যোগাযোগ করবেন। অথবা দয়া করে সরাসরি আমাদের অফিসিয়াল হোয়াটসঅ্যাপ নাম্বারে যোগাযোগ করুন: +8801332601510। সাময়িক এই যান্ত্রিক সমস্যার জন্য আমরা আন্তরিকভাবে দুঃখিত।";
        }

        const chunkSize = 4;
        for (let i = 0; i < fallbackText.length; i += chunkSize) {
          const chunk = fallbackText.substring(i, i + chunkSize);
          res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
          await new Promise(resolve => setTimeout(resolve, 8));
        }
        res.end();
      }
    }
  });

  // Setup Express static file serving & Vite development compiler server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Development Mode: Vite middlewares mounted successfully.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Production Mode: Static distribution path configured.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server successfully running on host 0.0.0.0, port ${PORT}`);
  });
}

startServer();
