// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

console.log("--- EXECUTANDO A VERSÃO FINAL DO SERVIDOR (COM API REAL) ---");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

// Rota atualizada para receber o idioma
app.post('/api/gerar-receita', async (req, res) => {
  try {
    // 1. Recebendo o 'language' do frontend
    const { contexto, inputs, language } = req.body; 
    
    // 2. Passando o 'language' para a função que constrói o prompt
    const promptMestre = construirPromptMestre(contexto, inputs, language);
    
    console.log(`Backend: Chamando a API da OpenAI em [${language}]...`);

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: "You are an expert in creating viral TikTok scripts. Your response MUST be a JSON object." },
            { role: "user", content: promptMestre }
        ],
        response_format: { type: "json_object" },
    });
    const respostaJson = JSON.parse(response.choices[0].message.content);
    
    respostaJson.origem = "API Real da OpenAI"; 

    res.json(respostaJson);
  } catch (error) {
      console.error("BACKEND ERROR:", error);
      res.status(500).json({ error: "Ocorreu um erro no servidor ao chamar a API da OpenAI." });
  }
});

// <<-- 3. FUNÇÃO ATUALIZADA PARA SER BILÍNGUE -->>
function construirPromptMestre(contexto, inputs, language = 'pt') {
  const isEnglish = language.toLowerCase().startsWith('en');

  // --- LÓGICA PARA O MODO VIRAL ---
  if (contexto === 'viral') {
    if (isEnglish) {
      return `
        Create a detailed "video recipe" for TikTok with the goal of going viral and being monetized.
        The topic is: "${inputs.viralTopic || inputs.modelUrl}".

        IMPORTANT RULES:
        1. The final script must be designed for a video with a **total duration of over 60 seconds**.
        2. To achieve this, the "narracao" must contain **at least 12 entries/points**.
        3. The "sugestoesCenas" must contain a corresponding number of scenes, as each scene lasts about 5 seconds.
        4. The timestamps ("t") in the narration should be granular (e.g., "0-5s", "6-10s", "11-15s", etc.).
        5. The script must keep the viewer engaged for the entire minute.

        The response MUST be a JSON object in ENGLISH with the following structure:
        {"ganchoVisual": "string", "narracao": [{ "t": "string", "txt": "string" }], "sugestoesCenas": ["string"]}
      `;
    }
    // Default para Português
    return `
      Crie uma "receita de vídeo" detalhada para o TikTok com o objetivo de viralizar e ser monetizado.
      O tópico é: "${inputs.viralTopic || inputs.modelUrl}".

      REGRAS IMPORTANTES:
      1. O roteiro final deve ser projetado para um vídeo com **duração total superior a 60 segundos**.
      2. Para atingir essa duração, a "narracao" deve conter **pelo menos 12 pontos/entradas**.
      3. As "sugestoesCenas" devem conter um número correspondente de cenas, pois cada cena dura em média 5 segundos.
      4. Os tempos ("t") na narração devem ser granulares (ex: "0-5s", "6-10s", "11-15s", etc.).
      5. O roteiro deve manter o espectador engajado durante todo o minuto.

      A resposta DEVE ser um objeto JSON em PORTUGUÊS com a seguinte estrutura:
      {"ganchoVisual": "string", "narracao": [{ "t": "string", "txt": "string" }], "sugestoesCenas": ["string"]}
    `;
  } 
  
  // --- LÓGICA PARA O MODO VENDAS ---
  else { // contexto 'vendas'
    if (isEnglish) {
      return `
        Create a "video recipe" for TikTok Shop to sell the product: "${inputs.produto}".
        The customer's pain point is: "${inputs.dor}".
        The benefits are: "${inputs.beneficios}".
        The response MUST be a JSON object in ENGLISH with the same structure as the viral example.
        Focus on a persuasive, fast, and direct-to-conversion script.
      `;
    }
    // Default para Português
    return `
      Crie uma "receita de vídeo" para o TikTok Shop para vender o produto: "${inputs.produto}".
      A dor do cliente é: "${inputs.dor}".
      Os benefícios são: "${inputs.beneficios}".
      A resposta DEVE ser um objeto JSON em PORTUGUÊS com a mesma estrutura do exemplo viral.
      Foque em um roteiro persuasivo, rápido e direto para conversão.
    `;
  }
}

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} e pronto para falar com a OpenAI.`);
});