import { useState, useRef, useEffect } from "react";

const FILES = {
  "src/app.tsx": `import React, { useState } from 'react';
import { UserService } from './services/userService';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const userData = await UserService.login(credentials);
      setUser(userData);
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {user ? <Dashboard user={user} /> : <LoginForm onSubmit={handleLogin} loading={loading} />}
    </div>
  );
}`,
  "src/services/userService.ts": `import { ApiClient } from '../lib/api';
import { User, LoginCredentials } from '../types';

export class UserService {
  private static client = new ApiClient(process.env.API_URL);

  static async login(credentials: LoginCredentials): Promise<User> {
    const response = await this.client.post('/auth/login', credentials);
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.user;
  }

  static async logout(): Promise<void> {
    localStorage.removeItem('token');
    await this.client.post('/auth/logout');
  }
}`,
  "src/components/Dashboard.tsx": `import React, { useEffect, useState } from 'react';

export function Dashboard({ user }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats({ totalUsers: 1284, activeToday: 342, revenue: 48920, growth: 12.4 });
  }, [user.id]);

  return (
    <div className="dashboard">
      <header><h1>Welcome back, {user.name}</h1></header>
      {stats && <div className="stats">{JSON.stringify(stats)}</div>}
    </div>
  );
}`,
  "src/lib/api.ts": `export class ApiClient {
  constructor(baseUrl = '') { this.baseUrl = baseUrl; }

  async get(path, options) {
    const res = await fetch(this.baseUrl + path, { method: 'GET', ...options });
    return res.json();
  }

  async post(path, body, options) {
    return fetch(this.baseUrl + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      ...options,
    });
  }
}`,
  "package.json": `{
  "name": "cursor-sim",
  "version": "1.0.0",
  "dependencies": { "react": "^18.2.0" },
  "devDependencies": { "vite": "^5.0.0" }
}`,
};

const FILE_TREE = [
  { name: "src", type: "folder", depth: 0, children: [
    { name: "components", type: "folder", depth: 1, children: [
      { name: "Dashboard.tsx", type: "file", depth: 2, path: "src/components/Dashboard.tsx" },
    ]},
    { name: "services", type: "folder", depth: 1, children: [
      { name: "userService.ts", type: "file", depth: 2, path: "src/services/userService.ts" },
    ]},
    { name: "lib", type: "folder", depth: 1, children: [
      { name: "api.ts", type: "file", depth: 2, path: "src/lib/api.ts" },
    ]},
    { name: "app.tsx", type: "file", depth: 1, path: "src/app.tsx" },
  ]},
  { name: "package.json", type: "file", depth: 0, path: "package.json" },
];

function getIcon(name, type) {
  if (type === "folder") return "📁";
  if (name.endsWith(".tsx")) return "⚛";
  if (name.endsWith(".ts")) return "🔷";
  if (name.endsWith(".json")) return "{}";
  return "📄";
}

export default function App() {
  const [activeFile, setActiveFile] = useState("src/app.tsx");
  const [openTabs, setOpenTabs] = useState(["src/app.tsx"]);
  const [expanded, setExpanded] = useState(new Set(["src", "components", "services", "lib"]));
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hallo! Ich kenne dein gesamtes Repo. Frag mich alles — Code erklären, refactoren, Bugs finden. Was brauchst du?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [termInput, setTermInput] = useState("");
  const [termHistory, setTermHistory] = useState([
    { type: "out", text: "  VITE v5.0.12  ready in 312 ms" },
    { type: "out", text: "  ➜  Local:   http://localhost:5173/" },
  ]);
  const chatEnd = useRef(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const openFile = (path) => {
    setActiveFile(path);
    if (!openTabs.includes(path)) setOpenTabs(t => [...t, path]);
  };

  const closeTab = (path, e) => {
    e.stopPropagation();
    const next = openTabs.filter(t => t !== path);
    setOpenTabs(next);
    if (activeFile === path) setActiveFile(next[next.length - 1] || "");
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    const repoCtx = Object.entries(FILES).map(([f, c]) => `// FILE: ${f}\n${c}`).join("\n\n---\n\n");

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Du bist ein AI-Coding-Assistant in einer IDE (wie Cursor). Du kennst das gesamte Repository:\n\n${repoCtx}\n\nAktive Datei: ${activeFile}\n\nSei präzise, code-fokussiert und antworte auf Deutsch.`,
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Fehler.";
      setMessages(m => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages(m => [...m, { role: "assistant", content: "⚠️ Fehler: " + e.message }]);
    }
    setLoading(false);
  };

  const runCmd = (e) => {
    e.preventDefault();
    if (!termInput.trim()) return;
    const cmd = termInput.trim();
    let out = "";
    if (cmd === "clear") { setTermHistory([]); setTermInput(""); return; }
    else if (cmd.startsWith("ls")) out = "src/  package.json  tsconfig.json  vite.config.ts";
    else if (cmd === "npm test") out = "✓ UserService login\n✓ Dashboard render\n2 tests passed";
    else if (cmd === "git status") out = "On branch main\nModified: src/app.tsx";
    else out = `${cmd}: command executed ✓`;
    setTermHistory(h => [...h, { type: "cmd", text: cmd }, { type: "out", text: out }]);
    setTermInput("");
  };

  const renderTree = (nodes) => nodes.map(node => {
    if (node.type === "folder") {
      const isOpen = expanded.has(node.name);
      return (
        <div key={node.name}>
          <div onClick={() => setExpanded(s => { const n = new Set(s); n.has(node.name) ? n.delete(node.name) : n.add(node.name); return n; })}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: `3px 8px 3px ${node.depth * 16 + 8}px`, cursor: "pointer", fontSize: 13, color: "#cdd6f4" }}>
            <span style={{ fontSize: 10, color: "#6c7086" }}>{isOpen ? "▾" : "▸"}</span>
            <span>{getIcon(node.name, "folder")}</span><span>{node.name}</span>
          </div>
          {isOpen && node.children && renderTree(node.children)}
        </div>
      );
    }
    const isAct = activeFile === node.path;
    return (
      <div key={node.path} onClick={() => openFile(node.path)}
        style={{ display: "flex", alignItems: "center", gap: 6, padding: `3px 8px 3px ${node.depth * 16 + 8}px`, cursor: "pointer", fontSize: 13, background: isAct ? "#313244" : "transparent", color: isAct ? "#cdd6f4" : "#a6adc8", borderLeft: isAct ? "2px solid #89b4fa" : "2px solid transparent" }}>
        <span>{getIcon(node.name, "file")}</span><span>{node.name}</span>
      </div>
    );
  });

  const code = FILES[activeFile] || "";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#1e1e2e", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", color: "#cdd6f4", overflow: "hidden" }}>
      <style>{`* { box-sizing: border-box; scrollbar-width: thin; scrollbar-color: #45475a #1e1e2e; } ::placeholder { color: #6c7086; }`}</style>

      {/* Titlebar */}
      <div style={{ background: "#181825", borderBottom: "1px solid #313244", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 40, minHeight: 40 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#ff5f57", "#ffbd2e", "#28c840"].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ fontSize: 12, color: "#6c7086", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#89b4fa" }}>◆</span> cursor-sim
          <span style={{ background: "#313244", padding: "1px 8px", borderRadius: 4, fontSize: 11 }}>main ⎇</span>
        </div>
        <div style={{ fontSize: 11, color: "#6c7086" }}>⌘K AI · ⌘P Files</div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Activity Bar */}
        <div style={{ width: 48, background: "#181825", borderRight: "1px solid #313244", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 8, gap: 4 }}>
          {["📁", "🔍", "⎇", "🐛", "✦"].map((ic, i) => (
            <div key={i} style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, cursor: "pointer", fontSize: 16, background: i === 0 ? "#313244" : "transparent", color: i === 0 ? "#89b4fa" : "#6c7086" }}>{ic}</div>
          ))}
        </div>

        {/* File Tree */}
        <div style={{ width: 220, background: "#181825", borderRight: "1px solid #313244", overflow: "auto", paddingTop: 4 }}>
          <div style={{ padding: "6px 8px", fontSize: 11, color: "#6c7086", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Explorer</div>
          {renderTree(FILE_TREE)}
        </div>

        {/* Editor */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Tabs */}
          <div style={{ background: "#181825", borderBottom: "1px solid #313244", display: "flex", minHeight: 36, overflow: "auto" }}>
            {openTabs.map(tab => {
              const name = tab.split("/").pop();
              const isAct = tab === activeFile;
              return (
                <div key={tab} onClick={() => setActiveFile(tab)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 14px", cursor: "pointer", fontSize: 13, whiteSpace: "nowrap", background: isAct ? "#1e1e2e" : "#181825", color: isAct ? "#cdd6f4" : "#6c7086", borderRight: "1px solid #313244", borderBottom: isAct ? "2px solid #89b4fa" : "2px solid transparent" }}>
                  <span>{getIcon(name, "file")}</span><span>{name}</span>
                  <span onClick={e => closeTab(tab, e)} style={{ opacity: 0.5, fontSize: 11 }}>✕</span>
                </div>
              );
            })}
          </div>

          {/* Breadcrumb */}
          <div style={{ background: "#1e1e2e", borderBottom: "1px solid #313244", padding: "4px 14px", fontSize: 12, color: "#6c7086" }}>
            {activeFile.split("/").map((p, i, arr) => (
              <span key={i}><span style={{ color: i === arr.length - 1 ? "#cdd6f4" : "#6c7086" }}>{p}</span>{i < arr.length - 1 && <span style={{ margin: "0 4px" }}>›</span>}</span>
            ))}
          </div>

          {/* Code */}
          <div style={{ flex: 1, overflow: "auto", display: "flex" }}>
            <div style={{ minWidth: 48, background: "#1e1e2e", padding: "12px 8px", textAlign: "right", userSelect: "none", borderRight: "1px solid #2a2a3e" }}>
              {code.split("\n").map((_, i) => <div key={i} style={{ fontSize: 13, lineHeight: "21px", color: "#45475a" }}>{i + 1}</div>)}
            </div>
            <pre style={{ flex: 1, margin: 0, padding: "12px 16px", fontSize: 13, lineHeight: "21px", overflow: "auto", background: "#1e1e2e", color: "#abb2bf", tabSize: 2 }}>
              <code>{code}</code>
            </pre>
          </div>

          {/* Terminal */}
          <div style={{ height: 180, background: "#181825", borderTop: "1px solid #313244", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", padding: "4px 12px", borderBottom: "1px solid #313244", background: "#1e1e2e" }}>
              <span style={{ color: "#89b4fa", fontSize: 12, borderBottom: "1px solid #89b4fa", paddingBottom: 2 }}>TERMINAL</span>
            </div>
            <div style={{ flex: 1, overflow: "auto", padding: "8px 12px", fontSize: 12, lineHeight: 1.7 }}>
              {termHistory.map((l, i) => (
                <div key={i} style={{ color: l.type === "cmd" ? "#a6e3a1" : "#cdd6f4", whiteSpace: "pre-wrap" }}>
                  {l.type === "cmd" && <span style={{ color: "#89b4fa" }}>~/cursor-sim $ </span>}{l.text}
                </div>
              ))}
              <form onSubmit={runCmd} style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "#89b4fa" }}>~/cursor-sim $ </span>
                <input value={termInput} onChange={e => setTermInput(e.target.value)}
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#a6e3a1", fontSize: 12, fontFamily: "inherit" }} />
              </form>
            </div>
          </div>
        </div>

        {/* AI Chat */}
        <div style={{ width: 340, borderLeft: "1px solid #313244", display: "flex", flexDirection: "column", background: "#181825" }}>
          <div style={{ padding: "10px 12px", borderBottom: "1px solid #313244", fontSize: 12, color: "#89b4fa", fontWeight: 600 }}>✦ AI Assistant — claude-sonnet-4</div>
          <div style={{ flex: 1, overflow: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "90%", padding: "8px 12px", borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", background: msg.role === "user" ? "#89b4fa" : "#313244", color: msg.role === "user" ? "#1e1e2e" : "#cdd6f4", fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 5, padding: "8px 12px", background: "#313244", borderRadius: 12, width: "fit-content" }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#89b4fa", animation: `pulse 1s ${i * 0.15}s infinite` }} />)}
              </div>
            )}
            <div ref={chatEnd} />
          </div>
          <div style={{ padding: 10, borderTop: "1px solid #313244" }}>
            <div style={{ display: "flex", gap: 8, background: "#313244", borderRadius: 10, padding: "8px 10px", border: "1px solid #45475a" }}>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder="Frag AI... (Enter senden)" rows={2}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", resize: "none", color: "#cdd6f4", fontSize: 13, fontFamily: "inherit", lineHeight: 1.5 }} />
              <button onClick={sendMessage} disabled={loading}
                style={{ background: loading ? "#45475a" : "#89b4fa", color: loading ? "#6c7086" : "#1e1e2e", border: "none", borderRadius: 6, padding: "4px 10px", cursor: loading ? "default" : "pointer", fontSize: 13, fontWeight: 600 }}>↑</button>
            </div>
            <div style={{ fontSize: 10, color: "#6c7086", marginTop: 4 }}>Repo-Kontext aktiv ✓ · Shift+Enter = neue Zeile</div>
          </div>
        </div>
      </div>

      {/* Statusbar */}
      <div style={{ background: "#89b4fa", color: "#1e1e2e", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 12px", height: 24, fontSize: 12, fontWeight: 500 }}>
        <div style={{ display: "flex", gap: 16 }}><span>⎇ main</span><span>✓ 0 errors</span></div>
        <div style={{ display: "flex", gap: 16 }}><span>TypeScript</span><span>UTF-8</span><span>✦ claude-sonnet-4</span></div>
      </div>
    </div>
  );
}
