import React, { useMemo, useState } from "react";
import { useTranslation } from 'react-i18next'; // <<-- AQUI ESTÁ A CORREÇÃO

// --- ESTRUTURA CORRIGIDA: TODOS OS COMPONENTES MENORES VÊM PRIMEIRO ---

function TelaInicio({ onSelect }) {
  const { t } = useTranslation();
  return (
    <div className="grid gap-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">{t('main_title')}</h1>
        <p className="text-neutral-600">{t('main_subtitle')}</p>
      </section>
      <div className="grid sm:grid-cols-2 gap-4">
        <button className="rounded-2xl border border-neutral-300 bg-white p-6 text-left hover:shadow-md transition" onClick={() => onSelect("viral")}>
          <div className="text-lg font-semibold mb-1">{t('card_viral_title')}</div>
          <p className="text-sm text-neutral-600">{t('card_viral_subtitle')}</p>
        </button>
        <button className="rounded-2xl border border-neutral-300 bg-white p-6 text-left hover:shadow-md transition" onClick={() => onSelect("vendas")}>
          <div className="text-lg font-semibold mb-1">{t('card_sales_title')}</div>
          <p className="text-sm text-neutral-600">{t('card_sales_subtitle')}</p>
        </button>
      </div>
    </div>
  );
}

function TelaViral({ viralTopic, setViralTopic, modelUrl, setModelUrl, onGerar, onBack }) {
  const { t } = useTranslation();
  return (
    <div className="max-w-2xl space-y-6">
      <button className="text-sm text-neutral-600 hover:underline" onClick={onBack}>
        ← {t('back_button')}
      </button>
      <h2 className="text-xl font-bold">{t('viral_title')}</h2>
      <div className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-medium">{t('viral_topic_label')}</span>
          <input className="rounded-xl border border-neutral-300 bg-white p-3 outline-none focus:ring-2 focus:ring-neutral-800" placeholder={t('viral_topic_placeholder')} value={viralTopic} onChange={(e) => setViralTopic(e.target.value)} />
        </label>
        <div className="text-center text-sm text-neutral-500">{t('or_divider')}</div>
        <label className="grid gap-2">
          <span className="text-sm font-medium">{t('viral_url_label')}</span>
          <input className="rounded-xl border border-neutral-300 bg-white p-3 outline-none focus:ring-2 focus:ring-neutral-800" placeholder="https://www.tiktok.com/@perfil/video/123..." value={modelUrl} onChange={(e) => setModelUrl(e.target.value)} />
        </label>
        <button onClick={onGerar} className="mt-2 rounded-xl bg-neutral-900 text-white px-4 py-3 font-medium hover:opacity-90">
          {t('generate_button')}
        </button>
      </div>
    </div>
  );
}

function TelaVendas({ produto, setProduto, dor, setDor, beneficios, setBeneficios, onGerar, onBack }) {
  const { t } = useTranslation();
  return (
    <div className="max-w-2xl space-y-6">
      <button className="text-sm text-neutral-600 hover:underline" onClick={onBack}>
        ← {t('back_button')}
      </button>
      <h2 className="text-xl font-bold">{t('sales_title')}</h2>
      <div className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-medium">{t('sales_product_label')}</span>
          <input className="rounded-xl border border-neutral-300 bg-white p-3 outline-none focus:ring-2 focus:ring-neutral-800" placeholder={t('sales_product_placeholder')} value={produto} onChange={(e) => setProduto(e.target.value)} />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium">{t('sales_pain_label')}</span>
          <input className="rounded-xl border border-neutral-300 bg-white p-3 outline-none focus:ring-2 focus:ring-neutral-800" placeholder={t('sales_pain_placeholder')} value={dor} onChange={(e) => setDor(e.target.value)} />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium">{t('sales_benefits_label')}</span>
          <textarea rows={3} className="rounded-xl border border-neutral-300 bg-white p-3 outline-none focus:ring-2 focus:ring-neutral-800" placeholder="..." value={beneficios} onChange={(e) => setBeneficios(e.target.value)} />
        </label>
        <button onClick={onGerar} className="mt-2 rounded-xl bg-neutral-900 text-white px-4 py-3 font-medium hover:opacity-90">
          {t('generate_button')}
        </button>
      </div>
    </div>
  );
}

function Secao({ title, icon, children }) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xl">{icon}</span>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed text-neutral-800 pl-9">{children}</div>
    </section>
  );
}

function TelaReceita({ receita, onCopy, onNovo, copiado }) {
  const { t } = useTranslation();
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">{t('recipe_title')}</h2>
        <div className="flex gap-2">
          <button onClick={onCopy} disabled={copiado} className={`rounded-xl px-4 py-2 text-sm font-medium transition ${copiado ? 'bg-green-600 text-white cursor-not-allowed' : 'border border-neutral-300 bg-white hover:shadow-md'}`}>
            {copiado ? t('copied_button') : t('copy_button')}
          </button>
          <button onClick={onNovo} className="rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm">
            {t('new_button')}
          </button>
        </div>
      </div>
      <Secao title={t('hook_section_title')} icon="👁️"><p>{receita.ganchoVisual}</p></Secao>
      <Secao title={t('script_section_title')} icon="🎤">
        <ul className="space-y-1">
          {receita.narracao.map((n, i) => (<li key={i} className="font-mono text-[13px]"><span className="text-neutral-500">({n.t})</span> {n.txt}</li>))}
        </ul>
      </Secao>
      <Secao title={t('scenes_section_title')} icon="🎬">
        <ol className="list-decimal ml-5 space-y-1">
          {receita.sugestoesCenas.map((s, i) => (<li key={i}>{s}</li>))}
        </ol>
      </Secao>
    </div>
  );
}

function TelaCarregando() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center text-center p-10">
      <div className="w-12 h-12 border-4 border-neutral-300 border-t-neutral-900 rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-bold mb-1">{t('loading_title')}</h2>
      <p className="text-neutral-600">{t('loading_subtitle')}</p>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL VEM POR ÚLTIMO ---

export default function App() {
  const [screen, setScreen] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [viralTopic, setViralTopic] = useState("");
  const [modelUrl, setModelUrl] = useState("");
  const [produto, setProduto] = useState("");
  const [dor, setDor] = useState("");
  const [beneficios, setBeneficios] = useState("");
  const [receita, setReceita] = useState(null);
  const { i18n } = useTranslation();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  function reset() {
    setViralTopic("");
    setModelUrl("");
    setProduto("");
    setDor("");
    setBeneficios("");
    setReceita(null);
    setScreen("home");
  }

  async function gerarReceita(contexto) {
    const inputs = contexto === 'viral' ? { viralTopic, modelUrl } : { produto, dor, beneficios };
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/gerar-receita`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contexto, inputs, language: i18n.language }),
      });
      if (!response.ok) { throw new Error('A requisição para o backend falhou'); }
      const data = await response.json();
      setReceita({ ...data });
      setScreen("receita");
    } catch (error) {
      console.error("Erro ao gerar receita:", error);
      alert("Não foi possível gerar a receita. Verifique o console do backend e do navegador.");
    } finally {
      setIsLoading(false);
    }
  }

  function copiarRoteiro() {
    if (!receita) return;
    const textoFormatado = `GANCHO VISUAL (0-3s):\n${receita.ganchoVisual}\n\nROTEIRO (NARRAÇÃO):\n${receita.narracao.map(n => `(${n.t}) ${n.txt}`).join('\n')}\n\nSUGESTÕES DE CENAS:\n- ${receita.sugestoesCenas.join('\n- ')}`.trim();
    navigator.clipboard.writeText(textoFormatado).then(() => {
      setCopiado(true);
      setTimeout(() => { setCopiado(false); }, 2000);
    }).catch(err => { console.error("Erro ao copiar o roteiro: ", err); });
  }

  return (
    <div className="min-h-screen w-full bg-neutral-100 text-neutral-900">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-neutral-900 text-white grid place-items-center font-bold">SS</div>
            <div className="font-semibold">ScrollStop</div>
          </div>
          <div className="text-sm text-neutral-500">MVP v0.1</div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        {isLoading ? (<TelaCarregando />) : (
          <>
            {screen === "home" && <TelaInicio onSelect={setScreen} />}
            {screen === "viral" && (<TelaViral viralTopic={viralTopic} setViralTopic={setViralTopic} modelUrl={modelUrl} setModelUrl={setModelUrl} onGerar={() => gerarReceita("viral")} onBack={() => reset()} />)}
            {screen === "vendas" && (<TelaVendas produto={produto} setProduto={setProduto} dor={dor} setDor={setDor} beneficios={beneficios} setBeneficios={setBeneficios} onGerar={() => gerarReceita("vendas")} onBack={() => reset()} />)}
            {screen === "receita" && receita && (<TelaReceita receita={receita} onCopy={copiarRoteiro} onNovo={reset} copiado={copiado} />)}
          </>
        )}
      </main>
      <footer className="mx-auto max-w-5xl px-4 pb-8 text-xs text-neutral-500">
      </footer>
    </div>
  );
}