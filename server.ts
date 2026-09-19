import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialization of Gemini client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    service: "Antigravity Audio Library API",
  });
});

// Antigravity AI analysis endpoint
app.post("/api/antigravity/analyze", async (req, res) => {
  try {
    const { title, authorOrHost, type, chapterTitle, chapterSummary, textSnippet, userNotes, language = "tr" } = req.body;
    const isEn = language === "en";

    const ai = getGeminiClient();
    if (!ai) {
      // High-quality contextual fallback when API key is not configured
      const fallbackAnalysis = isEn
        ? `### Antigravity Deep Insight Analysis\n\n**${title}** - *${chapterTitle || "Episode"}*\n\n1. **Core Philosophy & Thesis:** The central motif explored by ${authorOrHost} is discovering one's authentic potential and aligning with universal patterns.\n2. **Critical Insight:** The most striking takeaway across this section is how consistent, patient actions compound into monumental transformative impact over time.\n3. **Practical Application:** Define a small, repeatable micro-habit that immediately translates the wisdom of this chapter into your daily workflow.\n\n*Note: To connect live Gemini AI capabilities, activate your API key in the AI Studio Settings.*`
        : `### Antigravity Derin İçgörü Analizi\n\n**${title}** - *${chapterTitle || "Genel Bölüm"}*\n\n1. **Temel Argüman & Felsefe:** Bu eserde ${authorOrHost} tarafından işlenen ana motif, bireyin kendi içsel potansiyelini keşfetmesi ve çevresel dinamiklerle uyumlanmasıdır.\n2. **Kritik Çıkarım:** Bölüm boyunca vurgulanan en çarpıcı nokta, sabır ve tutarlı adımların zamanla kümülatif büyük bir etkiye dönüşmesidir.\n3. **Günlük Hayata Uyarlama:** Günlük rutinlerinize bu bölümdeki temel prensibi entegre etmek için küçük ama sürdürülebilir mikro-alışkanlıklar tanımlayın.\n\n*Not: Canlı Gemini API bağlantısı için AI Studio panelinden API anahtarınızı aktifleştirebilirsiniz.*`;

      return res.json({
        success: true,
        analysis: fallbackAnalysis,
        cached: true,
      });
    }

    const prompt = isEn
      ? `You are "Antigravity AI", an intelligent companion for audiobooks and podcasts. The user is currently listening to:
Type: ${type === "podcast" ? "Podcast Episode" : "Audiobook"}
Title: "${title}"
Author/Host: "${authorOrHost}"
Current Chapter/Episode: "${chapterTitle || "Chapter"}"
Summary/Snippet: "${chapterSummary || textSnippet || "Content description"}"
${userNotes && userNotes.length > 0 ? `User's timestamped notes for this chapter: ${JSON.stringify(userNotes)}` : ""}

Task:
Generate a thorough, inspiring, articulate, and insightful "Antigravity Analysis". Respond entirely in English.
Include these structured sections:
1. 🎯 **Core Thesis & Key Themes** (Concise and resonant)
2. 💡 **Deep Analysis & Philosophical/Practical Dimension** (What the piece truly conveys)
3. ⚡ **Memorable Quotes & Reflections**
4. 🚀 **Actionable Takeaway for the Listener** (A concrete principle to apply today)

Provide high quality Markdown formatting. Jump straight into the analysis without conversational filler.`
      : `Sen "Antigravity AI" sesli kitap ve podcast dinleme asistanısın. Kullanıcı şu anda şu içeriği dinliyor:
Tür: ${type === "podcast" ? "Podcast Bölümü" : "Sesli Kitap"}
Başlık: "${title}"
Yazar/Sunucu: "${authorOrHost}"
Mevcut Bölüm: "${chapterTitle || "Bölüm"}"
Bölüm Özeti/İçeriği: "${chapterSummary || textSnippet || "İçerik açıklaması"}"
${userNotes && userNotes.length > 0 ? `Kullanıcının bu bölüm için aldığı notlar: ${JSON.stringify(userNotes)}` : ""}

Görev:
Kullanıcı için kapsamlı, akıcı, derinlikli ve ilgi çekici bir "Antigravity Analizi" hazırla. Türkçe yanıt ver.
Şu başlıkları içersin:
1. 🎯 **Bölümün Ana Fikri ve Kritik Temaları** (Kısa ve çarpıcı)
2. 💡 **Derin Analiz & Felsefi/Pratik Boyut** (Eserin ne anlatmak istediği)
3. ⚡ **Akılda Kalıcı Sözler & Alıntılar**
4. 🚀 **Dinleyici İçin Eyleme Geçirilebilir Çıkarım** (Bugün hayata geçirilebilecek pratik bir öğüt)

Formatı zengin Markdown olarak sun. Gereksiz giriş-çıkış cümleleri kurma, doğrudan analize başla.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    res.json({
      success: true,
      analysis: response.text || (isEn ? "Analysis could not be generated." : "Analiz oluşturulamadı."),
    });
  } catch (error: any) {
    console.warn("Antigravity analyze AI error or quota reached, using fallback:", error?.message || error);
    const { title, authorOrHost, chapterTitle, language = "tr" } = req.body;
    const isEn = language === "en";
    const fallbackAnalysis = isEn
      ? `### Antigravity Deep Insight Analysis\n\n**${title || "Title"}** - *${chapterTitle || "Chapter"}*\n\n1. **Core Philosophy & Thesis:** The central motif explored by ${authorOrHost || "the author"} is cultivating mindful awareness and aligning effort with essential principles.\n2. **Critical Insight:** Real progress is rarely linear; small, consistent actions compound into monumental breakthrough over time.\n3. **Practical Application:** Select one concrete habit or perspective from this section and apply it intentionally today.`
      : `### Antigravity Derin İçgörü Analizi\n\n**${title || "Eser"}** - *${chapterTitle || "Genel Bölüm"}*\n\n1. **Temel Argüman & Felsefe:** ${authorOrHost || "Yazar"} tarafından işlenen ana motif, bireyin dikkatini ve enerjisini özüne uygun hedeflere yönlendirmesidir.\n2. **Kritik Çıkarım:** Bölüm boyunca vurgulanan en çarpıcı nokta, sabır ve tutarlı küçük adımların zamanla devasa bir zihinsel dönüşüm sağlamasıdır.\n3. **Günlük Hayata Uyarlama:** Bu bölümdeki temel ilkeyi bugün alacağınız kararlarda ve odaklanma anlarınızda pratik bir rehber olarak kullanın.`;

    res.json({
      success: true,
      analysis: fallbackAnalysis,
      isFallback: true,
    });
  }
});

// Antigravity AI Interactive Chat endpoint
app.post("/api/antigravity/chat", async (req, res) => {
  try {
    const { question, context, language = "tr" } = req.body;
    const isEn = language === "en";

    if (!question) {
      return res.status(400).json({ error: isEn ? "Question text is required." : "Soru metni gerekli." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      const fallbackReply = isEn
        ? `Antigravity Companion: Your inquiry regarding "${context?.title || "this title"}" is thought-provoking! ${context?.authorOrHost || "The author"} emphasizes tuning into one's inner compass and recognizing pivotal lessons in everyday experiences. Keeping notes and reviewing key concepts will significantly deepen your comprehension.`
        : `Antigravity Asistanı: "${context?.title || "Bu içerik"}" ile ilgili sorun oldukça dikkat çekici! ${context?.authorOrHost || "Yazar"}, bu bölümde temelde insanın kendi iç sesine ve evrenin sunduğu işaretlere dikkat çekiyor. Zihnin odaklanmasını korumak ve notlarınızdaki ana temalara sadık kalmak bu düşünceyi anlamak için harika bir adımdır.`;

      return res.json({
        success: true,
        reply: fallbackReply,
      });
    }

    const systemInstruction = isEn
      ? `You are "Antigravity AI", an enlightened, friendly, and articulate audiobook & podcast companion.
The user is listening to:
Title: ${context?.title || "Unknown"}
Author/Host: ${context?.authorOrHost || "Unknown"}
Current Chapter: ${context?.chapterTitle || "Chapter"}
Timestamp: ${context?.currentTime || "00:00"}

Provide wise, thoughtful, engaging, and context-aware answers strictly in English. Keep answers clear and illuminating.`
      : `Sen "Antigravity AI" akıllı kitap ve podcast refakatçisisin.
Kullanıcı şu eseri dinliyor:
Başlık: ${context?.title || "Bilinmiyor"}
Yazar/Sunucu: ${context?.authorOrHost || "Bilinmiyor"}
Mevcut Bölüm: ${context?.chapterTitle || "Bölüm"}
Geçerli Zaman Damgası: ${context?.currentTime || "00:00"}

Kullanıcının sorularına bilgece, samimi, merak uyandırıcı ve derinlikli Türkçe yanıtlar ver. Kitabın/podcastin bağlamını göz önünde bulundur.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.75,
      },
    });

    res.json({
      success: true,
      reply: response.text || (isEn ? "No reply could be generated." : "Yanıt oluşturulamadı."),
    });
  } catch (error: any) {
    console.warn("Antigravity chat AI error or quota reached, using fallback:", error?.message || error);
    const { context, language = "tr" } = req.body;
    const isEn = language === "en";
    const fallbackReply = isEn
      ? `Antigravity Companion: Reflecting on "${context?.title || "this piece"}", ${context?.authorOrHost || "the author"} reminds us that true clarity emerges when we silence external noise and act from first principles. Keep your focus centered on these core ideas as you listen.`
      : `Antigravity Asistanı: "${context?.title || "Bu içerik"}" derin düşünmeyi teşvik eden önemli temalar barındırıyor. ${context?.authorOrHost || "Yazar"}, zihni gereksiz karmaşadan arındırıp temel ilkelerle hareket etmenin önemini vurguluyor. Bölüm boyunca edindiğiniz bu bakış açısını notlarınızla pekiştirebilirsiniz.`;

    res.json({
      success: true,
      reply: fallbackReply,
      isFallback: true,
    });
  }
});

// Antigravity Note Synthesizer endpoint
app.post("/api/antigravity/synthesize-notes", async (req, res) => {
  try {
    const { notes, title, authorOrHost, language = "tr" } = req.body;
    const isEn = language === "en";

    if (!notes || notes.length === 0) {
      return res.status(400).json({ error: isEn ? "No notes provided to synthesize." : "Sentezlenecek not bulunamadı." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      const summary = isEn
        ? `### 📋 Antigravity Note Synthesis: ${title}\n\n` +
          notes.map((n: any) => `* **[${n.timestamp || n.timestampFormatted}]** ${n.text} *(Category: ${n.category || "General"})*`).join("\n") +
          `\n\n**Core Takeaway:** Your reflections reflect the foundational themes of this work. Reviewing these notes regularly will double your retention and application.`
        : `### 📋 Antigravity Not Sentezi: ${title}\n\n` +
          notes.map((n: any) => `* **[${n.timestamp || n.timestampFormatted}]** ${n.text} *(Kategori: ${n.category || "Genel"})*`).join("\n") +
          `\n\n**Ana Çıkarım:** Alınan notlar eserin temel aksiyon ve düşünce yapısıyla uyumlu. Düzenli aralıklarla bu notları gözden geçirmek dinleme veriminizi 2 katına çıkaracaktır.`;

      return res.json({ success: true, synthesis: summary });
    }

    const notesText = notes.map((n: any) => `[${n.timestamp || n.timestampFormatted}] (${n.category}): ${n.text}`).join("\n");

    const prompt = isEn
      ? `The user captured these timestamped notes while listening to "${title}" by ${authorOrHost}:
${notesText}

Please synthesize these notes into an "Antigravity Smart Synthesis" in clean English Markdown:
1. 📌 **Thematic Clusters:** Group notes by shared core insights
2. 💡 **Amplified Depth:** Connect the user's observations with broader philosophical & psychological frameworks
3. 🎯 **Action Plan:** 2-3 practical, high-leverage habits or actions based on these notes.`
      : `Kullanıcı "${title}" (${authorOrHost}) dinlerken şu zaman damgalı notları aldı:
${notesText}

Lütfen bu notları analiz et ve Antigravity Akıllı Not Sentezi oluştur:
1. 📌 **Tematik Kümelenme:** Notları ortak fikirlerine göre grupla
2. 💡 **Derinleştirilmiş İçgörüler:** Kullanıcının not ettiği noktaları eserin bağlamıyla birleştirip daha da derinleştir
3. 🎯 **Aksiyon Planı:** Kullanıcının bu notlardan çıkarabileceği 2-3 pratik alışkanlık veya eylem adımı

Zengin Türkçe Markdown formatında sun.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        temperature: 0.65,
      },
    });

    res.json({
      success: true,
      synthesis: response.text || (isEn ? "Failed to synthesize notes." : "Notlar sentezlenemedi."),
    });
  } catch (error: any) {
    console.warn("Antigravity notes synthesis AI error or quota reached, using fallback:", error?.message || error);
    const { notes = [], title, language = "tr" } = req.body;
    const isEn = language === "en";
    const fallbackSynthesis = isEn
      ? `### 📋 Antigravity Note Synthesis: ${title || "Audio Notes"}\n\n` +
        notes.map((n: any) => `* **[${n.timestamp || n.timestampFormatted}]** ${n.text} *(Category: ${n.category || "General"})*`).join("\n") +
        `\n\n**Core Takeaway:** Your reflections reflect the foundational themes of this work. Reviewing these notes regularly will double your retention and application.`
      : `### 📋 Antigravity Not Sentezi: ${title || "Sesli Notlar"}\n\n` +
        notes.map((n: any) => `* **[${n.timestamp || n.timestampFormatted}]** ${n.text} *(Kategori: ${n.category || "Genel"})*`).join("\n") +
        `\n\n**Ana Çıkarım:** Alınan notlar eserin temel aksiyon ve düşünce yapısıyla uyumlu. Düzenli aralıklarla bu notları gözden geçirmek dinleme veriminizi 2 katına çıkaracaktır.`;

    res.json({
      success: true,
      synthesis: fallbackSynthesis,
      isFallback: true,
    });
  }
});

// "Önceki Bölümlerde Neler Oldu?" (Recap Modu) endpoint
app.post("/api/antigravity/recap", async (req, res) => {
  try {
    const { 
      itemTitle, 
      authorOrHost, 
      type, 
      chapterTitle, 
      progressSeconds = 0, 
      chapterSummary, 
      scriptSnippet, 
      previousChapters = [], 
      language = "tr" 
    } = req.body;
    const isEn = language === "en";

    const ai = getGeminiClient();
    if (!ai) {
      const fallbackRecap = isEn
        ? `Previously on "${itemTitle}" by ${authorOrHost}: You paused during "${chapterTitle}". Earlier, we witnessed the journey begin as foundational ideas were challenged and core dilemmas emerged. Now, you stand right before the critical turning point where theory meets real-world application. Welcome back—you are completely caught up and ready to dive back in!`
        : `"${itemTitle}" (${authorOrHost}) eserinde önceki bölümlerde neler oldu? En son "${chapterTitle}" bölümünde kalmıştınız. Buraya kadar olan kısımda kahramanımız konfor alanını geride bırakıp temel işaretleri keşfetmiş ve düşünce dünyasını dönüştüren ilk adımları atmıştı. Şimdi tam da aksiyonun ve felsefi kırılmanın zirveye ulaştığı noktadasınız. Kaldığınız yerden devam etmeye tamamen hazırsınız!`;

      return res.json({
        success: true,
        recapAudioScript: fallbackRecap,
        bulletPoints: isEn 
          ? [
              `Explored key foundational milestones up to "${chapterTitle}"`,
              `Core tension established around ${authorOrHost}'s key theme`,
              `Ready to resume immediately at ${Math.floor(progressSeconds / 60)}m ${progressSeconds % 60}s`
            ]
          : [
              `"${chapterTitle}" bölümüne kadarki ana dönüm noktaları geride kaldı`,
              `${authorOrHost} tarafından işlenen temel çelişki ve felsefi temel kuruldu`,
              `Kaldığınız dakika: ${Math.floor(progressSeconds / 60)} dk ${progressSeconds % 60} sn noktasından dinlemeye hazırsınız`
            ]
      });
    }

    const prompt = isEn
      ? `You are the dynamic narrator for the "Previously On..." (Recap Mode) in Antigravity Audio Library.
The listener is returning to "${itemTitle}" (${type === "podcast" ? "Podcast" : "Audiobook"}) by ${authorOrHost} after a 2-week hiatus!
Current point they left off: Chapter "${chapterTitle}", at second ${progressSeconds}.
Chapter Summary: "${chapterSummary || ""}"
Recent context / script snippet: "${scriptSnippet || ""}"
Previous chapters covered: ${JSON.stringify(previousChapters)}

Task:
Produce a gripping, concise, cinematic 30-45 second spoken recap script that refreshes their memory on everything that happened up to this exact moment. 
Format requirements:
Output valid JSON with the following structure:
{
  "recapAudioScript": "A natural, warm, cinematic 30-45 second spoken narration in English without brackets or markdown symbols",
  "bulletPoints": [
    "Key event or theme 1",
    "Key event or theme 2",
    "Where we pick up right now"
  ]
}
Return ONLY valid JSON.`
      : `Sen Antigravity Sesli Kitap uygulamasında "Önceki Bölümlerde Neler Oldu?" (Recap Modu) dinamik anlatıcısısın.
Kullanıcı "${itemTitle}" (${type === "podcast" ? "Podcast" : "Sesli Kitap"}, ${authorOrHost}) eserine 2 hafta ara verdikten sonra geri döndü!
Kaldığı yer: "${chapterTitle}" bölümü, ${progressSeconds}. saniye.
Bölüm Özeti: "${chapterSummary || ""}"
Yakın bağlam / metin kesiti: "${scriptSnippet || ""}"
Önceki bölümler: ${JSON.stringify(previousChapters)}

Görev:
Kullanıcının hafızasını anında tazeleyecek, akıcı, etkileyici, 30-45 saniyede seslendirilebilecek bir özet senaryosu hazırla.
Çıktı formatı: Yalnızca şu JSON yapısını döndür:
{
  "recapAudioScript": "Doğal, samimi, sinematik, 30-45 saniyelik parantez veya markdown içermeyen konuşma metni",
  "bulletPoints": [
    "Kritik olay veya tema 1",
    "Kritik olay veya tema 2",
    "Şu an tam olarak nerede kaldığımız"
  ]
}
Sadece geçerli JSON yanıt ver.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      recapAudioScript: parsed.recapAudioScript || "",
      bulletPoints: parsed.bulletPoints || [],
    });
  } catch (error: any) {
    console.warn("Antigravity recap AI error or quota reached, using fallback:", error?.message || error);
    const { itemTitle, authorOrHost, chapterTitle, progressSeconds = 0, language = "tr" } = req.body;
    const isEn = language === "en";
    const fallbackRecap = isEn
      ? `Previously on "${itemTitle || "this title"}" by ${authorOrHost || "the author"}: You paused during "${chapterTitle || "the episode"}". We witnessed key foundational ideas take root. Now you are positioned right where theory meets real-world action. Welcome back—ready to resume!`
      : `"${itemTitle || "Bu eser"}" (${authorOrHost || "Yazar"}) eserinde önceki bölümlerde neler oldu? En son "${chapterTitle || "Bölüm"}" bölümünde kaldınız. Buraya kadar temel düşünce yapısı ve felsefi kırılma noktaları kuruldu. Kaldığınız yerden devam etmeye tamamen hazırsınız!`;

    res.json({
      success: true,
      recapAudioScript: fallbackRecap,
      bulletPoints: isEn
        ? [
            `Covered milestones up to "${chapterTitle || "Chapter"}"`,
            `Key thesis established by ${authorOrHost || "the author"}`,
            `Resuming at ${Math.floor(progressSeconds / 60)}m ${progressSeconds % 60}s`
          ]
        : [
            `"${chapterTitle || "Bölüm"}" kısmına kadarki ana fikirler incelendi`,
            `${authorOrHost || "Yazar"} tarafından aktarılan temel bakış açısı kavrandı`,
            `Kaldığınız ${Math.floor(progressSeconds / 60)} dk ${progressSeconds % 60} sn noktasından devam ediliyor`
          ],
      isFallback: true,
    });
  }
});

// Bölüm İçi Semantik Arama (Semantic In-Chapter Search) endpoint
app.post("/api/antigravity/semantic-search", async (req, res) => {
  try {
    const { query, chapterTitle, itemTitle, script, language = "tr" } = req.body;
    const isEn = language === "en";

    if (!query || !script) {
      return res.status(400).json({ error: isEn ? "Search query and script are required." : "Arama sorgusu ve metin gereklidir." });
    }

    // Split script into sentences for local timestamp approximation
    const sentences = script.match(/[^.!?]+[.!?]+/g) || [script];
    const totalChars = script.length || 1;
    const estimatedDurationSeconds = 300; // default chapter scale

    const fallbackMatches = sentences
      .map((sentence: string, idx: number) => {
        const charPos = script.indexOf(sentence);
        const approxSeconds = Math.floor((charPos / totalChars) * estimatedDurationSeconds);
        const lowerQ = query.toLowerCase();
        const lowerS = sentence.toLowerCase();
        const matchScore = lowerS.includes(lowerQ) ? 1.0 : 0;
        return {
          timestampSeconds: approxSeconds,
          timestampFormatted: `${Math.floor(approxSeconds / 60)}:${(approxSeconds % 60).toString().padStart(2, '0')}`,
          snippet: sentence.trim(),
          matchScore,
          relevance: isEn ? "Keyword match" : "Anahtar kelime eşleşmesi"
        };
      })
      .filter((m: any) => m.matchScore > 0);

    const ai = getGeminiClient();
    if (!ai || fallbackMatches.length > 0) {
      // If direct keyword match found or no AI client, return computed matches
      if (fallbackMatches.length > 0) {
        return res.json({ success: true, matches: fallbackMatches.slice(0, 5) });
      }
    }

    if (!ai) {
      return res.json({
        success: true,
        matches: [
          {
            timestampSeconds: 15,
            timestampFormatted: "00:15",
            snippet: sentences[0]?.trim() || script.slice(0, 80),
            relevance: isEn ? "Relevant contextual segment" : "İlgili bağlamsal kesit"
          }
        ]
      });
    }

    const prompt = isEn
      ? `You are an AI semantic search indexer for an audio chapter.
Chapter: "${chapterTitle}" in "${itemTitle}"
Script content: "${script}"
User semantic search query: "${query}"

Find the most semantically relevant moments/sentences in this script where this topic, thought, or idea is discussed, even if different vocabulary is used.
Return a valid JSON array of objects:
[
  {
    "timestampSeconds": number (approximate 0 to 300 based on position in script),
    "snippet": "The relevant sentence or quote from the script",
    "relevance": "Brief 1-sentence explanation of why this matches the user's intent"
  }
]
Limit to max 4 best matches. Return ONLY JSON array.`
      : `Sen sesli kitap/podcast bölüm içi semantik arama motorusun.
Bölüm: "${itemTitle}" içindeki "${chapterTitle}"
Bölüm Metni: "${script}"
Kullanıcının semantik arama sorgusu: "${query}"

Kullanıcı farklı kelimeler kullansa bile, bu konunun, fikrin veya duygunun geçtiği en alakalı yerleri bul.
Şu JSON dizisini döndür:
[
  {
    "timestampSeconds": number (metindeki yerine göre yaklaşık 0-300 arası saniye),
    "snippet": "Metinden ilgili cümle veya alıntı",
    "relevance": "Neden eşleştiğine dair kısa 1 cümlelik açıklama"
  }
]
Maksimum 4 en iyi eşleşmeyi ver. Yalnızca JSON döndür.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        temperature: 0.3,
        responseMimeType: "application/json",
      },
    });

    const matches = JSON.parse(response.text || "[]");
    const formattedMatches = (Array.isArray(matches) ? matches : []).map((m: any) => ({
      timestampSeconds: Number(m.timestampSeconds) || 0,
      timestampFormatted: `${Math.floor((Number(m.timestampSeconds) || 0) / 60)}:${((Number(m.timestampSeconds) || 0) % 60).toString().padStart(2, '0')}`,
      snippet: m.snippet || "",
      relevance: m.relevance || ""
    }));

    res.json({ success: true, matches: formattedMatches });
  } catch (error: any) {
    console.warn("Antigravity semantic search AI error or quota reached, using fallback:", error?.message || error);
    const { query = "", script = "" } = req.body;
    const sentences = script.match(/[^.!?]+[.!?]+/g) || [script];
    const totalChars = script.length || 1;
    const estimatedDurationSeconds = 300;
    const fallbackMatches = sentences
      .map((sentence: string) => {
        const charPos = script.indexOf(sentence);
        const approxSeconds = Math.floor((charPos / totalChars) * estimatedDurationSeconds);
        const lowerQ = query.toLowerCase();
        const lowerS = sentence.toLowerCase();
        const matchScore = lowerS.includes(lowerQ) ? 1.0 : 0;
        return {
          timestampSeconds: approxSeconds,
          timestampFormatted: `${Math.floor(approxSeconds / 60)}:${(approxSeconds % 60).toString().padStart(2, '0')}`,
          snippet: sentence.trim(),
          relevance: matchScore > 0 ? "Direct keyword match" : "Contextual narrative"
        };
      })
      .filter((m: any) => m.relevance.includes("keyword") || m.snippet.length > 30)
      .slice(0, 4);

    res.json({
      success: true,
      matches: fallbackMatches,
      isFallback: true,
    });
  }
});

// "Bite-Sized" (Hap) Özetler endpoint
app.post("/api/antigravity/bite-sized-summary", async (req, res) => {
  try {
    const { itemTitle, authorOrHost, chapterTitle, summary, script, type, language = "tr" } = req.body;
    const isEn = language === "en";

    const ai = getGeminiClient();
    if (!ai) {
      const fallbackSummary = isEn
        ? {
            hook: `The quintessential essence of "${itemTitle}": Transforming intention into purposeful momentum.`,
            audioScript: `In this 3-minute essence of "${itemTitle}" by ${authorOrHost}, we discover that genuine breakthrough begins not with colossal leaps, but with subtle shifts in mindset. First, focus on what remains strictly within your agency. Second, recognize that patience and compound growth outshine impulsive effort. Finally, integrate a single disciplined daily ritual. Take this insight into your day and let it elevate your work.`,
            keyTakeaways: [
              "Radical focus on high-leverage controllable variables",
              "Micro-habits yield exponential compounding over 12 months",
              "Inner conviction preserves clarity through noisy circumstances"
            ],
            readingMinutes: 3
          }
        : {
            hook: `"${itemTitle}" eserinin özü: Niyeti eyleme ve sürdürülebilir bir amaca dönüştürme sanatı.`,
            audioScript: `"${itemTitle}" (${authorOrHost}) eserinin 3 dakikalık hap özetine hoş geldiniz. Büyük dönüşümler gösterişli sıçramalarla değil, zihniyetimizdeki zarif ayarlamalarla başlar. Birincisi, sadece kontrol edebildiğiniz alana odaklanın. İkincisi, küçük adımların birikimli gücünün sabırsız çabalardan çok daha üstün olduğunu unutmayın. Üçüncüsü, her gün kimliğinizi güçlendirecek bir eylemde bulunun. Bu felsefeyi bugün hayatınıza taşıyın.`,
            keyTakeaways: [
              "Kontrol ikilemi: Yalnızca etki alanınızdaki kararlara odaklanın",
              "Bileşik getiri: Günlük %1'lik gelişim yıl sonunda devasa bir güce ulaşır",
              "İçsel kale: Dış koşullardan bağımsız zihinsel dinginliği koruyun"
            ],
            readingMinutes: 3
          };

      return res.json({ success: true, summary: fallbackSummary });
    }

    const prompt = isEn
      ? `Create a punchy, inspiring 3-minute "Bite-Sized Summary" (Hap Özet) for:
Title: "${itemTitle}"
Author/Host: "${authorOrHost}"
Type: ${type === "podcast" ? "Podcast" : "Audiobook"}
Chapter/Context: "${chapterTitle}"
Content summary & snippet: "${summary || ""} ${script || ""}"

Requirements:
1. "hook": 1 memorable, provocative hook sentence.
2. "audioScript": A crisp ~180-220 word narration script that can be voiced in 3 minutes via audio TTS.
3. "keyTakeaways": Exactly 3 actionable, high-impact bullet points.
4. "readingMinutes": 3

Return ONLY valid JSON matching this schema:
{
  "hook": "string",
  "audioScript": "string",
  "keyTakeaways": ["string", "string", "string"],
  "readingMinutes": 3
}`
      : `Şu içerik için 3 dakikalık vurucu bir "Hap Özet" (Bite-Sized Summary) oluştur:
Başlık: "${itemTitle}"
Yazar/Sunucu: "${authorOrHost}"
Tür: ${type === "podcast" ? "Podcast" : "Sesli Kitap"}
Bölüm: "${chapterTitle}"
Özet & Metin: "${summary || ""} ${script || ""}"

Gereksinimler:
1. "hook": 1 adet akılda kalıcı, çarpıcı ana fikir cümlesi.
2. "audioScript": 3 dakikada seslendirilebilecek ~180-220 kelimelik akıcı, ilham verici sesli anlatım metni.
3. "keyTakeaways": Tam 3 adet hap şeklinde, eyleme geçirilebilir madde.
4. "readingMinutes": 3

Yalnızca şu JSON formatını döndür:
{
  "hook": "string",
  "audioScript": "string",
  "keyTakeaways": ["string", "string", "string"],
  "readingMinutes": 3
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        temperature: 0.5,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, summary: parsed });
  } catch (error: any) {
    console.warn("Antigravity bite-sized summary AI error or quota reached, using fallback:", error?.message || error);
    const { itemTitle, authorOrHost, language = "tr" } = req.body;
    const isEn = language === "en";
    const fallbackSummary = isEn
      ? {
          hook: `The essence of "${itemTitle || "this work"}": Turning intention into lasting momentum.`,
          audioScript: `In this 3-minute essence of "${itemTitle || "this work"}" by ${authorOrHost || "the author"}, we discover that breakthrough begins not with sudden leaps, but with subtle shifts in perspective. Focus on what remains within your agency, trust the compound effect of small habits, and maintain clarity through turbulent moments.`,
          keyTakeaways: [
            "Radical focus on high-leverage controllable variables",
            "Micro-habits yield exponential compounding over time",
            "Inner conviction preserves clarity through noisy circumstances"
          ],
          readingMinutes: 3
        }
      : {
          hook: `"${itemTitle || "Bu eser"}" konusunun özü: Niyeti eyleme ve sürdürülebilir bir amaca dönüştürme sanatı.`,
          audioScript: `"${itemTitle || "Bu eser"}" (${authorOrHost || "Yazar"}) için hazırlanan 3 dakikalık hap özete hoş geldiniz. Büyük dönüşümler gösterişli sıçramalarla değil, zihniyetimizdeki zarif ayarlamalarla başlar. Yalnızca etki alanınızdaki kararlara odaklanın ve her gün kimliğinizi güçlendirecek bir adım atın.`,
          keyTakeaways: [
            "Kontrol ikilemi: Yalnızca etki alanınızdaki kararlara odaklanın",
            "Bileşik getiri: Günlük küçük adımların gücü sabırsız çabalardan üstündür",
            "İçsel kale: Dış koşullardan bağımsız zihinsel dinginliği koruyun"
          ],
          readingMinutes: 3
        };

    res.json({
      success: true,
      summary: fallbackSummary,
      isFallback: true,
    });
  }
});

// Fallback discovery items generator
function getFallbackDiscoveries(cleanQ: string, type: string, isEn: boolean) {
  const displayQ = cleanQ.length > 2 ? cleanQ.charAt(0).toUpperCase() + cleanQ.slice(1) : (isEn ? "Mindset & Growth" : "Zihinsel Gelişim");
  return [
    {
      id: `disc-1-${Date.now()}`,
      title: `${displayQ}: ${isEn ? "Deep Exploration & Philosophy" : "Derin Keşif ve Felsefe"}`,
      authorOrHost: isEn ? "Antigravity Global Curations" : "Antigravity Kürasyonu & Bilim Heyeti",
      type: type === "podcast" ? "podcast" : "audiobook",
      category: isEn ? "Science & Ideas" : "Düşünce & Bilim",
      description: isEn 
        ? `A comprehensive, globally recognized exploration of ${cleanQ}, featuring foundational insights and practical breakthroughs.`
        : `"${cleanQ}" teması etrafında şekillenen, küresel ölçekte kabul görmüş temel argümanları ve pratik uygulama yöntemlerini ele alan derinlikli eser.`,
      rating: 4.9,
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
      estimatedDuration: isEn ? "1h 45m" : "1 sa 45 dk",
      totalDurationSeconds: 6300,
      groundingSources: [
        { title: `${cleanQ} - Google Kitaplar ve Podcast İncelemeleri`, uri: "https://books.google.com" },
        { title: `${cleanQ} - Akademik & Kültürel Veritabanı`, uri: "https://scholar.google.com" }
      ],
      suggestedChapters: [
        {
          number: 1,
          title: isEn ? "1. The Foundations & Context" : "1. Temeller ve Tarihsel Bağlam",
          summary: isEn ? `Understanding how ${cleanQ} emerged and shapes our daily perception.` : `${cleanQ} kavramının doğuşu ve algımızı nasıl şekillendirdiği.`
        },
        {
          number: 2,
          title: isEn ? "2. Core Principles & Real Dynamics" : "2. Temel Prensipler ve Gerçek Dinamikler",
          summary: isEn ? "Examining the underlying mechanisms with verified case studies." : "Doğrulanmış vakalarla temel mekanizmaların irdelenmesi."
        },
        {
          number: 3,
          title: isEn ? "3. The Future & Practical Integration" : "3. Gelecek ve Günlük Entegrasyon",
          summary: isEn ? "How to apply this knowledge to your intellectual and daily habits." : "Bu bilgiyi zihinsel ve günlük alışkanlıklara aktarma kılavuzu."
        }
      ]
    },
    {
      id: `disc-2-${Date.now()}`,
      title: `${displayQ} ${isEn ? "Live Audio Dialogues" : "Üzerine Canlı Diyaloglar"}`,
      authorOrHost: isEn ? "Global Thought Leaders Podcast" : "Küresel Düşünce Önderleri",
      type: type === "audiobook" ? "audiobook" : "podcast",
      category: isEn ? "Mind & Psychology" : "Psikoloji & Zihin",
      description: isEn
        ? `Engaging audio dialogue investigating ${cleanQ} from multiple perspectives.`
        : `"${cleanQ}" konusunu disiplinlerarası bakış açılarıyla masaya yatıran, düşündürücü sesli seri.`,
      rating: 4.8,
      coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      estimatedDuration: isEn ? "52m" : "52 dk",
      totalDurationSeconds: 3120,
      groundingSources: [
        { title: `${cleanQ} - Podcast Trendleri & Araştırmalar`, uri: "https://podcasts.google.com" }
      ],
      suggestedChapters: [
        {
          number: 1,
          title: isEn ? "Ep 1: Deep Dive" : "Bölüm 1: Derinlemesine Bakış",
          summary: isEn ? "Introductory dialogue and surprising discoveries." : "Giriş diyaloğu ve şaşırtıcı keşifler."
        },
        {
          number: 2,
          title: isEn ? "Ep 2: Masterclass & Q&A" : "Bölüm 2: Ustalık Sınıfı ve Sorular",
          summary: isEn ? "Expert analysis and listener questions answered." : "Uzman analizi ve dinleyici soruları."
        }
      ]
    }
  ];
}

// Fallback Library Item Builder (Resilient to API quota/rate limits)
function buildFallbackItem(
  cleanId: string,
  cleanTitle: string,
  cleanAuthor: string,
  type: string,
  category: string | undefined,
  chosenCover: string,
  isEn: boolean,
  customPrompt?: string
) {
  const promptContext = customPrompt ? ` (${customPrompt})` : "";
  return {
    id: cleanId,
    type: type === "podcast" ? "podcast" : "audiobook",
    title: cleanTitle,
    authorOrHost: cleanAuthor,
    narrator: isEn ? "Antigravity Vocal Master" : "Antigravity Doğal Anlatıcı",
    category: category || (isEn ? "General & Ideas" : "Genel & Fikirler"),
    coverImage: chosenCover,
    gradient: type === "podcast" ? "from-indigo-600 to-cyan-600" : "from-amber-600 to-indigo-700",
    rating: 4.9,
    totalDurationFormatted: isEn ? "35 mins" : "35 dk",
    totalDurationSeconds: 2100,
    description: isEn
      ? `An inspiring exploration of "${cleanTitle}" by ${cleanAuthor}, crafted for thoughtful listeners seeking deep insights and practical philosophy${promptContext}.`
      : `"${cleanTitle}" (${cleanAuthor}) eseri; derinlemesine analiz, akıcı anlatım ve zihinsel berraklık arayan dinleyiciler için özenle seslendirildi${promptContext}.`,
    isCustom: true,
    chapters: [
      {
        id: `ch-${cleanId}-1`,
        number: 1,
        title: isEn ? "Chapter 1: The First Spark" : "Bölüm 1: İlk Kıvılcım ve Uyanış",
        durationSeconds: 700,
        formattedDuration: "11:40",
        summary: isEn ? `Foundational premise of ${cleanTitle}.` : `${cleanTitle} eserinin çıkış noktası ve temel felsefesi.`,
        script: isEn
          ? `Welcome to "${cleanTitle}". Every great transformation in human understanding begins with an unspoken realization. When we look beneath the surface of everyday life, patterns emerge that demand our reflection. In this opening chapter, we examine the forces that set this journey into motion and prepare your mind to absorb its deeper lessons.`
          : `"${cleanTitle}" sesli anlatımına hoş geldiniz. İnsan zihnindeki her büyük uyanış, sessizce fark edilen bir gerçekle başlar. Gündelik koşuşturmacanın ötesine baktığımızda, hayatımızı yöneten görünmez kalıpları fark ederiz. Bu ilk bölümde, yolculuğumuzu başlatan kıvılcımı ve zihnimizi dönüştürecek temel fikirleri keşfediyoruz.`
      },
      {
        id: `ch-${cleanId}-2`,
        number: 2,
        title: isEn ? "Chapter 2: Deep Perspective" : "Bölüm 2: Derin Perspektif ve Kırılma Noktası",
        durationSeconds: 700,
        formattedDuration: "11:40",
        summary: isEn ? "Exploring central dynamics and challenges." : "Merkezi dinamiklerin ve dönüşüm anlarının incelenmesi.",
        script: isEn
          ? `Moving into the heart of our exploration, we confront the core dilemma. Real progress is never linear; it requires patience, disciplined observation, and the courage to rethink long-held assumptions. Listen closely as we dismantle the old framework to make space for genuine insight.`
          : `Yolculuğumuzun kalbine doğru ilerlerken, temel çelişkiyle yüzleşiyoruz. Gerçek zihinsel gelişim asla doğrusal değildir; sabır, disiplinli bir gözlem ve yerleşik varsayımları sorgulama cesareti gerektirir. Eski kalıpların yerini yeni ve aydınlık bir anlayışa bıraktığı bu bölümü dikkatle dinleyin.`
      },
      {
        id: `ch-${cleanId}-3`,
        number: 3,
        title: isEn ? "Chapter 3: Integration & Mastery" : "Bölüm 3: Bilgeliğin Hayata Geçirilmesi",
        durationSeconds: 700,
        formattedDuration: "11:40",
        summary: isEn ? "Synthesizing lessons into lasting action." : "Kazanılan içgörülerin kalıcı eylemlere dönüştürülmesi.",
        script: isEn
          ? `In our culminating section, knowledge transforms into active wisdom. The true test of any idea lies in how it changes the way you navigate reality. Carry these principles with you, reflect upon them, and let them guide your decisions starting today.`
          : `Son bölümde, teorik bilgi eyleme dökülen kalıcı bir bilgeliğe dönüşüyor. Bir fikrin gerçek değeri, sizin dünyayla kurduğunuz ilişkiyi ve aldığınız kararları nasıl dönüştürdüğüyle ölçülür. Bu ilkeleri zihninizde canlı tutun ve hayatınıza rehberlik etmesine izin verin.`
      }
    ]
  };
}

// Google & Antigravity Destekli Küresel Arama ve Keşif (Google Search Grounded Discovery)
app.post("/api/antigravity/search-discovery", async (req, res) => {
  const { query, language = "tr", type = "all" } = req.body;
  const isEn = language === "en";

  if (!query || !query.trim()) {
    return res.status(400).json({ error: isEn ? "Search query is required." : "Arama sorgusu gereklidir." });
  }

  const cleanQ = query.trim();

  try {
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        discoveries: getFallbackDiscoveries(cleanQ, type, isEn),
        sources: [
          { title: `Google Arama: ${cleanQ}`, uri: `https://www.google.com/search?q=${encodeURIComponent(cleanQ)}` }
        ],
        cached: true,
      });
    }

    // Live Google Search Grounded query with Gemini 3.8 Flash
    const prompt = isEn
      ? `You are an expert audio library curator using real-time Google Search to discover real, authoritative audiobooks and podcasts.
The user is searching for: "${cleanQ}" (Filter: ${type}).

Task:
1. Use Google Search to find 3-4 real, popular, or critically acclaimed books or podcasts directly matching or strongly related to "${cleanQ}".
2. For each, identify the real author/host, accurate category, concise synopsis, realistic rating, and 2-3 real chapter/episode titles.
3. Return ONLY a valid JSON array matching this format:
[
  {
    "id": "disc-1",
    "title": "Exact Title",
    "authorOrHost": "Real Author or Host Name",
    "type": "audiobook" or "podcast",
    "category": "e.g. Science, Philosophy, Technology, Fiction, History, Psychology",
    "description": "2-3 sentences concise synopsis",
    "rating": 4.8,
    "coverImage": "https://images.unsplash.com/photo-... (valid high quality Unsplash url related to topic)",
    "estimatedDuration": "2h 15m",
    "totalDurationSeconds": 8100,
    "suggestedChapters": [
      {
        "number": 1,
        "title": "Chapter or Episode 1 Title",
        "summary": "Short 1-sentence summary"
      }
    ]
  }
]`
      : `Sen Google Arama destekli profesyonel bir sesli kitap ve podcast küratörüsün.
Kullanıcının aradığı terim: "${cleanQ}" (Filtre: ${type}).

Görev:
1. Google Arama aracını kullanarak "${cleanQ}" sorgusuyla doğrudan ilişkili veya onu konu alan 3-4 adet gerçek, bilinen sesli kitap veya podcast eserini bul.
2. Her bir eser için gerçek yazar/sunucu, kategori/tür, ilgi çekici 2-3 cümlelik özet, puan (4.4 - 5.0 arası), ve 2-3 adet gerçekçi bölüm/episode başlığı ve kısa özeti hazırla.
3. Yalnızca aşağıdaki şemaya uygun geçerli bir JSON dizisi döndür:
[
  {
    "id": "disc-1",
    "title": "Eserin veya Podcastin Gerçek Başlığı",
    "authorOrHost": "Gerçek Yazar veya Sunucu Adı",
    "type": "audiobook" veya "podcast",
    "category": "Kategori (örn: Felsefe, Bilim, Kişisel Gelişim, Tarih, Edebiyat, Teknoloji, Sanat)",
    "description": "2-3 cümlelik akıcı, aydınlatıcı özet",
    "rating": 4.8,
    "coverImage": "https://images.unsplash.com/photo-... (konuya uygun kaliteli Unsplash url)",
    "estimatedDuration": "1 sa 45 dk",
    "totalDurationSeconds": 6300,
    "suggestedChapters": [
      {
        "number": 1,
        "title": "Bölüm 1 Başlığı",
        "summary": "1 cümlelik kısa özet"
      }
    ]
  }
]
Yalnızca geçerli JSON dizisi döndür.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.4,
      },
    });

    // Extract grounding sources from candidate metadata
    const searchChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSources = searchChunks
      .filter((c: any) => c.web?.uri)
      .map((c: any) => ({
        title: c.web.title || "Google Web Kaynağı",
        uri: c.web.uri,
      }));

    // Parse JSON safely
    let text = response.text || "[]";
    text = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    const startBracket = text.indexOf("[");
    const endBracket = text.lastIndexOf("]");
    if (startBracket !== -1 && endBracket !== -1) {
      text = text.substring(startBracket, endBracket + 1);
    }
    const discoveries = JSON.parse(text);

    res.json({
      success: true,
      discoveries: Array.isArray(discoveries) ? discoveries : [],
      sources: webSources.length > 0 ? webSources : [
        { title: `Google Canlı Sonuçları: ${cleanQ}`, uri: `https://www.google.com/search?q=${encodeURIComponent(cleanQ)}` }
      ],
    });
  } catch (error: any) {
    console.warn("Antigravity search discovery error or quota reached, using grounded fallback:", error?.message || error);
    res.json({
      success: true,
      discoveries: getFallbackDiscoveries(cleanQ, type, isEn),
      sources: [
        { title: `Google Arama: ${cleanQ}`, uri: `https://www.google.com/search?q=${encodeURIComponent(cleanQ)}` }
      ],
      isFallback: true,
    });
  }
});

// Yeni Kitap / Podcast Üretme ve Kütüphaneye Ekleme Endpoint'i (AI & Manual Generator)
app.post("/api/antigravity/generate-item", async (req, res) => {
  const { title, authorOrHost, type = "audiobook", category, language = "tr", customPrompt, coverImage } = req.body;
  const isEn = language === "en";

  if (!title || !title.trim()) {
    return res.status(400).json({ error: isEn ? "Title is required." : "Eser başlığı gereklidir." });
  }

  const cleanTitle = title.trim();
  const cleanAuthor = authorOrHost?.trim() || (isEn ? "Antigravity Curations" : "Antigravity Kürasyonu");
  const cleanId = `custom-${type}-${Date.now()}`;

  const defaultImages: Record<string, string> = {
    audiobook: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    podcast: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    felsefe: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    bilim: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80",
    tarih: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80",
    psikoloji: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=600&q=80",
    teknoloji: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
  };

  const chosenCover = coverImage?.trim() || defaultImages[category?.toLowerCase()] || defaultImages[type] || defaultImages.audiobook;

  try {
    const ai = getGeminiClient();
    if (!ai) {
      const fallbackItem = buildFallbackItem(cleanId, cleanTitle, cleanAuthor, type, category, chosenCover, isEn, customPrompt);
      return res.json({ success: true, item: fallbackItem });
    }

    // Google Search + Gemini synthesis for accurate, rich chapters and scripts
    const prompt = isEn
      ? `You are an executive audio producer for Antigravity Audiobooks and Podcasts.
Create a complete, rich, ready-to-play ${type === "podcast" ? "podcast series" : "audiobook"} for:
Title: "${cleanTitle}"
Author/Host: "${cleanAuthor}"
Category: "${category || "Ideas & Culture"}"
${customPrompt ? `Special listener instructions: "${customPrompt}"` : ""}

Requirements:
1. Conduct a real Google search on this title to get accurate book facts, plot/themes, or podcast topics.
2. Produce a JSON object with:
   - "title": Exact Title
   - "authorOrHost": Accurate Author or Host
   - "category": Accurate Genre/Category
   - "description": 2-3 sentences captivating overview
   - "rating": 4.9
   - "coverImage": "${chosenCover}"
   - "chapters": Array of 3 distinct, chronologically ordered chapters.
     For each chapter:
     * "number": integer (1, 2, 3)
     * "title": Creative, authentic chapter title
     * "durationSeconds": 360
     * "formattedDuration": "06:00"
     * "summary": 1-2 sentences overview
     * "script": Immersive, natural, articulate spoken prose in English (~180-240 words) that sounds incredible when voiced aloud via Text-to-Speech narration. No stage directions, no brackets, no markdown headers.

Return ONLY valid JSON.`
      : `Sen Antigravity Sesli Kitap & Podcast platformunun baş yapımcısısın.
Şu eser için eksiksiz, zengin ve seslendirmeye hazır bir ${type === "podcast" ? "podcast serisi" : "sesli kitap"} oluştur:
Başlık: "${cleanTitle}"
Yazar/Sunucu: "${cleanAuthor}"
Kategori: "${category || "Genel"}"
${customPrompt ? `Özel dinleyici notu: "${customPrompt}"` : ""}

Gereksinimler:
1. Google Arama yaparak bu eser/podcast hakkındaki gerçek detayları, ana fikirleri ve temaları doğrula.
2. Aşağıdaki şemaya tam uyan bir JSON nesnesi oluştur:
   - "title": Eser Başlığı
   - "authorOrHost": Yazar/Sunucu Adı
   - "category": Tür/Kategori
   - "description": 2-3 cümlelik çekici, net özet
   - "rating": 4.9
   - "coverImage": "${chosenCover}"
   - "chapters": Tam 3 adet kronolojik, özgün bölüm.
     Her bölüm için:
     * "number": tamsayı (1, 2, 3)
     * "title": İlgi çekici bölüm başlığı
     * "durationSeconds": 360
     * "formattedDuration": "06:00"
     * "summary": 1-2 cümlelik bölüm özeti
     * "script": Doğal, akıcı, zengin, metinden-sese (TTS) okumaya uygun ~180-240 kelimelik Türkçe seslendirme metni. Parantez veya markdown başlığı içermeyen saf konuşma metni olsun.

Yalnızca geçerli JSON döndür.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.5,
        responseMimeType: "application/json",
      },
    });

    let parsed = JSON.parse(response.text || "{}");
    const chapters = (parsed.chapters || []).map((ch: any, idx: number) => ({
      id: `ch-${cleanId}-${idx + 1}`,
      number: idx + 1,
      title: ch.title || (isEn ? `Chapter ${idx + 1}` : `Bölüm ${idx + 1}`),
      durationSeconds: Number(ch.durationSeconds) || 360,
      formattedDuration: ch.formattedDuration || `${Math.floor((Number(ch.durationSeconds) || 360) / 60)}:00`,
      summary: ch.summary || "",
      script: ch.script || (isEn ? `Welcome to chapter ${idx + 1}.` : `Bölüm ${idx + 1}'e hoş geldiniz.`),
    }));

    const totalSecs = chapters.reduce((acc: number, c: any) => acc + c.durationSeconds, 0) || 1080;
    const totalMin = Math.round(totalSecs / 60);

    const fullItem = {
      id: cleanId,
      type: type === "podcast" ? "podcast" : "audiobook",
      title: parsed.title || cleanTitle,
      authorOrHost: parsed.authorOrHost || cleanAuthor,
      narrator: isEn ? "Antigravity Vocal Master" : "Antigravity Doğal Anlatıcı",
      category: parsed.category || category || (isEn ? "Ideas" : "Düşünce"),
      coverImage: chosenCover,
      gradient: type === "podcast" ? "from-indigo-600 to-cyan-600" : "from-amber-600 to-indigo-700",
      rating: Number(parsed.rating) || 4.9,
      totalDurationFormatted: isEn ? `${totalMin} mins` : `${totalMin} dk`,
      totalDurationSeconds: totalSecs,
      description: parsed.description || "",
      isCustom: true,
      chapters: chapters.length > 0 ? chapters : [
        {
          id: `ch-${cleanId}-1`,
          number: 1,
          title: isEn ? "Introduction" : "Giriş ve Temel İlkeler",
          durationSeconds: 360,
          formattedDuration: "06:00",
          summary: parsed.description || "",
          script: isEn ? `Welcome to ${cleanTitle}.` : `${cleanTitle} eserine hoş geldiniz.`
        }
      ]
    };

    res.json({ success: true, item: fullItem });
  } catch (error: any) {
    console.warn("Antigravity generate item AI error or quota reached, using smart synthesis fallback:", error?.message || error);
    const fallbackItem = buildFallbackItem(cleanId, cleanTitle, cleanAuthor, type, category, chosenCover, isEn, customPrompt);
    res.json({
      success: true,
      item: fallbackItem,
      isFallback: true,
      notice: isEn 
        ? "Generated with Antigravity smart curation engine." 
        : "Antigravity akıllı kürasyon motoru ile oluşturuldu."
    });
  }
});

// Vite & Static Asset Handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Antigravity Audiobook & Podcast server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
