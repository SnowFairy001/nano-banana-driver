import { useState } from 'react';

function App() {
  const [baseUrl, setBaseUrl] = useState('');
  const [token, setToken] = useState('');
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleGenerate = async () => {
    // TODO: 调用 nano banana 生图接口
    setStatus(`(mock) would call ${baseUrl} with given token and prompt: "${prompt}"`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
      <div className="w-full max-w-2xl p-6 bg-slate-800 rounded-xl shadow-lg space-y-4">
        <h1 className="text-2xl font-semibold">nano-banana driver (MVP)</h1>
        <p className="text-sm text-slate-300">
          本地小工具：先填 baseURL / token，再写 prompt。当前版本还未接真实 API，只做调用形态的演示。
        </p>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Base URL</label>
          <input
            className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="https://api.nanobanana.dev"
            value={baseUrl}
            onChange={e => setBaseUrl(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Token</label>
          <input
            className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="your-api-token"
            type="password"
            value={token}
            onChange={e => setToken(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Prompt</label>
          <textarea
            className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400 min-h-[100px]"
            placeholder="描述你想生成的图像..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
        </div>

        <button
          onClick={handleGenerate}
          className="px-4 py-2 rounded bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300 disabled:opacity-50"
          disabled={!baseUrl || !token || !prompt}
        >
          生成（mock）
        </button>

        {status && (
          <div className="mt-4 text-sm text-amber-200 whitespace-pre-wrap border border-amber-500/40 rounded p-3 bg-slate-900/50">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
