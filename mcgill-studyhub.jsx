import { useState, useEffect, useRef } from "react";

// ============================================================
//  ⚙️  DEINE PAYPAL KONFIGURATION — hier eintragen!
// ============================================================
const PAYPAL_CONFIG = {
  clientId: "AeH-3Z4VSQqu3lAmk_VF8lw2IYFok69960sKgOagj62M5MuWrTvugeUo0obCZ21NylHOrUP1A5nnAZXX",   // 👈 Deine PayPal Client-ID (sandbox oder live)
  currency: "CAD",                      // Kanadischer Dollar
  paypalEmail: "jensschindler34@gmail.com",       // 👈 Dein PayPal-Empfängerkonto
  platformFee: 0.10,                    // 10% Platform-Gebühr
};
// ============================================================

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  :root {
    --red:#C8102E; --red-dark:#8B0000; --gold:#D4AF37;
    --paypal:#003087; --paypal-light:#009cde; --paypal-yellow:#FFD140;
    --cream:#FDF8F0; --ink:#1A0A00; --gray:#6B6B6B; --light:#F5F0EB;
    --green:#0A8A4B; --green-light:#E8F7EF;
  }
  body { font-family:'DM Sans',sans-serif; background:var(--cream); color:var(--ink); overflow-x:hidden; }

  nav {
    position:fixed; top:0; width:100%; z-index:200;
    background:rgba(253,248,240,0.94); backdrop-filter:blur(14px);
    border-bottom:1px solid rgba(200,16,46,0.12);
    padding:0 48px; display:flex; align-items:center; justify-content:space-between; height:68px;
  }
  .logo { font-family:'Playfair Display',serif; font-weight:900; font-size:1.35rem; color:var(--red); display:flex; align-items:center; gap:8px; }
  .logo span { color:var(--ink); }
  .logo-badge { background:var(--red); color:white; font-family:'DM Sans',sans-serif; font-size:0.58rem; font-weight:700; letter-spacing:.1em; padding:2px 9px; border-radius:20px; text-transform:uppercase; }
  nav ul { list-style:none; display:flex; gap:28px; align-items:center; }
  nav ul a { text-decoration:none; color:var(--ink); font-size:0.88rem; font-weight:500; transition:color .2s; }
  nav ul a:hover { color:var(--red); }
  .paypal-nav-badge { background:var(--paypal); color:white; font-size:0.7rem; font-weight:700; padding:4px 12px; border-radius:20px; display:flex; align-items:center; gap:6px; }
  .btn-nav { background:var(--red); color:white; padding:8px 20px; border-radius:7px; font-weight:600; font-size:0.88rem; border:none; cursor:pointer; transition:all .2s; }
  .btn-nav:hover { background:var(--red-dark); }

  .hero { padding-top:68px; min-height:100vh; display:grid; grid-template-columns:1fr 1fr; align-items:center; position:relative; overflow:hidden; }
  .hero-bg { position:absolute; right:0; top:0; width:50%; height:100%; background:linear-gradient(140deg,var(--red) 0%,var(--red-dark) 100%); clip-path:polygon(9% 0,100% 0,100% 100%,0 100%); }
  .hero-pattern { position:absolute; right:0; top:0; width:50%; height:100%; opacity:.07; background-image:repeating-linear-gradient(45deg,white 0px,white 1px,transparent 1px,transparent 22px); clip-path:polygon(9% 0,100% 0,100% 100%,0 100%); }
  .hero-left { padding:60px 60px 60px 80px; position:relative; z-index:2; }
  .tag { display:inline-flex; align-items:center; gap:7px; background:rgba(200,16,46,.08); border:1px solid rgba(200,16,46,.2); color:var(--red); font-size:.78rem; font-weight:700; padding:5px 14px; border-radius:20px; text-transform:uppercase; letter-spacing:.08em; margin-bottom:22px; }
  .hero h1 { font-family:'Playfair Display',serif; font-size:clamp(2.2rem,3.8vw,3.4rem); font-weight:900; line-height:1.1; margin-bottom:18px; }
  .hero h1 em { font-style:normal; color:var(--red); }
  .hero-sub { font-size:1rem; color:var(--gray); line-height:1.75; max-width:480px; margin-bottom:32px; }
  .hero-actions { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:32px; }

  .paypal-trust { display:flex; align-items:center; gap:14px; background:white; border:1.5px solid rgba(0,48,135,.15); border-radius:12px; padding:14px 20px; max-width:440px; }
  .paypal-logo-box { background:var(--paypal); border-radius:8px; padding:6px 12px; display:flex; align-items:center; }
  .paypal-logo-box span { color:white; font-weight:900; font-size:1rem; letter-spacing:-.5px; }
  .paypal-logo-box span b { color:var(--paypal-yellow); }
  .trust-text { flex:1; }
  .trust-text strong { font-size:.85rem; color:var(--ink); display:block; margin-bottom:2px; }
  .trust-text small { font-size:.75rem; color:var(--gray); }

  .hero-right { position:relative; z-index:2; padding:80px 50px; display:flex; justify-content:center; }
  .checkout-card { background:white; border-radius:20px; padding:28px; box-shadow:0 40px 80px rgba(0,0,0,.22); width:310px; transform:rotate(1.5deg); }
  .checkout-card h4 { font-family:'Playfair Display',serif; font-size:.95rem; color:var(--ink); margin-bottom:16px; }
  .checkout-item { display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-radius:9px; background:var(--light); margin-bottom:8px; }
  .checkout-item-l { display:flex; align-items:center; gap:9px; }
  .ci-title { font-size:.82rem; font-weight:600; }
  .ci-sub { font-size:.7rem; color:var(--gray); }
  .ci-price { font-weight:700; color:var(--red); font-size:.88rem; }
  .checkout-total { border-top:2px solid var(--light); margin:12px 0; padding-top:12px; display:flex; justify-content:space-between; align-items:center; }
  .checkout-total span { font-size:.82rem; color:var(--gray); }
  .checkout-total strong { font-family:'Playfair Display',serif; font-size:1.3rem; }
  .paypal-btn-demo { width:100%; padding:13px; border-radius:10px; background:var(--paypal-yellow); border:none; cursor:pointer; font-weight:800; font-size:.95rem; display:flex; align-items:center; justify-content:center; gap:8px; }
  .pp-logo { background:var(--paypal); color:white; padding:2px 7px; border-radius:5px; font-size:.75rem; font-weight:900; }
  .pp-logo b { color:var(--paypal-yellow); }
  .secure-note { text-align:center; font-size:.7rem; color:var(--gray); margin-top:8px; display:flex; align-items:center; justify-content:center; gap:4px; }

  section { padding:90px 80px; }
  section.dark { background:var(--ink); }
  .s-tag { font-size:.73rem; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:var(--red); margin-bottom:10px; display:inline-block; }
  .s-tag.gold { color:var(--gold); }
  h2 { font-family:'Playfair Display',serif; font-size:clamp(1.9rem,3vw,2.8rem); font-weight:900; line-height:1.15; margin-bottom:14px; }
  .s-sub { font-size:.97rem; color:var(--gray); line-height:1.72; max-width:540px; margin-bottom:56px; }
  .s-sub.light { color:rgba(255,255,255,.55); }

  .paypal-flow { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:start; }
  .flow-visual { background:linear-gradient(135deg,#f8f9ff,#eef2ff); border-radius:20px; padding:32px; border:2px solid rgba(0,48,135,.1); }
  .flow-step { display:flex; gap:16px; align-items:flex-start; margin-bottom:18px; }
  .flow-num { width:40px; height:40px; min-width:40px; background:var(--paypal); color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:.95rem; }
  .flow-num.gold { background:var(--gold); color:var(--ink); }
  .flow-num.green { background:var(--green); }
  .flow-content strong { font-size:.9rem; display:block; margin-bottom:3px; }
  .flow-content p { font-size:.8rem; color:var(--gray); line-height:1.6; }
  .flow-arrow { text-align:center; color:var(--paypal); font-size:1.4rem; margin:4px 0 4px 20px; }
  .flow-right h3 { font-family:'Playfair Display',serif; font-size:1.7rem; font-weight:900; margin-bottom:12px; }
  .paypal-feature { display:flex; align-items:flex-start; gap:12px; margin-bottom:14px; padding:14px; background:white; border-radius:12px; border:1px solid rgba(0,48,135,.1); }
  .pp-feat-title { font-size:.88rem; font-weight:700; color:var(--ink); margin-bottom:3px; }
  .pp-feat-sub { font-size:.78rem; color:var(--gray); line-height:1.55; }

  .products-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
  .product-card { background:white; border-radius:16px; padding:24px; border:1.5px solid rgba(200,16,46,.08); transition:all .3s; cursor:pointer; }
  .product-card:hover { transform:translateY(-5px); box-shadow:0 18px 50px rgba(200,16,46,.13); border-color:var(--red); }
  .product-emoji { font-size:2rem; margin-bottom:14px; display:block; }
  .product-card h3 { font-family:'Playfair Display',serif; font-size:1.1rem; margin-bottom:7px; }
  .product-card p { font-size:.84rem; color:var(--gray); line-height:1.6; margin-bottom:16px; }
  .product-footer { display:flex; align-items:center; justify-content:space-between; }
  .product-price { font-weight:800; color:var(--red); font-size:1rem; }
  .buy-btn { background:var(--paypal-yellow); border:none; border-radius:8px; padding:8px 14px; font-size:.78rem; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:5px; transition:all .2s; }
  .buy-btn:hover { transform:scale(1.05); box-shadow:0 4px 14px rgba(255,209,64,.5); }
  .buy-btn-pp { background:var(--paypal); color:white; padding:2px 6px; border-radius:4px; font-size:.65rem; font-weight:900; }
  .buy-btn-pp b { color:var(--paypal-yellow); }

  .streams-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
  .stream-card { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12); border-radius:16px; padding:26px; transition:all .3s; }
  .stream-card:hover { background:rgba(255,255,255,.1); border-color:var(--gold); transform:translateY(-4px); }
  .stream-icon { font-size:1.9rem; margin-bottom:13px; display:block; }
  .stream-card h3 { font-size:.95rem; font-weight:700; color:white; margin-bottom:7px; }
  .stream-card p { font-size:.8rem; color:rgba(255,255,255,.5); line-height:1.6; }
  .stream-rate { font-family:'Playfair Display',serif; font-size:1.35rem; font-weight:900; color:var(--gold); margin-top:12px; }
  .stream-rate-label { font-size:.7rem; color:rgba(255,255,255,.4); }

  .payout-section { background:linear-gradient(135deg,#001c5c 0%,var(--paypal) 60%,var(--paypal-light) 100%); padding:90px 80px; }
  .payout-inner { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
  .payout-left h2 { color:white; }
  .payout-left p { color:rgba(255,255,255,.7); font-size:.97rem; line-height:1.72; margin-top:14px; max-width:460px; }
  .payout-card { background:white; border-radius:20px; padding:32px; box-shadow:0 30px 70px rgba(0,0,0,.3); }
  .payout-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
  .payout-header h4 { font-family:'Playfair Display',serif; font-size:1.1rem; }
  .payout-status { background:var(--green-light); color:var(--green); font-size:.72rem; font-weight:700; padding:4px 12px; border-radius:20px; }
  .payout-amount { font-family:'Playfair Display',serif; font-size:2.6rem; font-weight:900; color:var(--ink); margin-bottom:4px; }
  .payout-period { font-size:.8rem; color:var(--gray); margin-bottom:20px; }
  .pb-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--light); font-size:.84rem; }
  .pb-row:last-child { border-bottom:none; }
  .pb-label { color:var(--gray); }
  .pb-val { font-weight:700; color:var(--ink); }
  .pb-val.green { color:var(--green); }
  .pb-val.red { color:var(--red); }
  .payout-btn { width:100%; padding:14px; border-radius:10px; background:var(--paypal-yellow); border:none; cursor:pointer; font-weight:800; font-size:.95rem; display:flex; align-items:center; justify-content:center; gap:9px; transition:all .2s; margin-top:18px; }
  .payout-btn:hover { transform:scale(1.01); box-shadow:0 8px 28px rgba(255,209,64,.4); }
  .payout-note { text-align:center; font-size:.72rem; color:var(--gray); margin-top:8px; }

  .setup-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
  .setup-card { background:white; border-radius:16px; padding:28px; border:1.5px solid rgba(200,16,46,.1); }
  .setup-num { font-family:'Playfair Display',serif; font-size:3rem; font-weight:900; color:rgba(200,16,46,.15); line-height:1; margin-bottom:12px; }
  .setup-card h3 { font-size:1rem; font-weight:700; margin-bottom:8px; color:var(--ink); }
  .setup-card p { font-size:.84rem; color:var(--gray); line-height:1.65; margin-bottom:14px; }
  .setup-link { color:var(--paypal); font-size:.82rem; font-weight:600; text-decoration:none; display:flex; align-items:center; gap:5px; }

  .btn-primary { background:var(--red); color:white; padding:13px 28px; border-radius:8px; font-size:.92rem; font-weight:600; border:none; cursor:pointer; transition:all .25s; display:inline-flex; align-items:center; gap:7px; }
  .btn-primary:hover { background:var(--red-dark); transform:translateY(-2px); box-shadow:0 8px 24px rgba(200,16,46,.3); }
  .btn-outline { background:transparent; color:var(--ink); padding:13px 28px; border-radius:8px; font-size:.92rem; font-weight:600; border:2px solid rgba(26,10,0,.2); cursor:pointer; transition:all .25s; display:inline-flex; align-items:center; gap:7px; }
  .btn-outline:hover { border-color:var(--red); color:var(--red); }

  .overlay { position:fixed; inset:0; background:rgba(0,0,0,.55); z-index:1000; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(5px); }
  .modal { background:white; border-radius:22px; padding:36px; max-width:500px; width:90%; max-height:90vh; overflow-y:auto; position:relative; }
  .modal-close { position:absolute; top:14px; right:16px; background:none; border:none; font-size:1.3rem; cursor:pointer; color:var(--gray); }
  .modal h3 { font-family:'Playfair Display',serif; font-size:1.5rem; margin-bottom:6px; }
  .modal-sub { font-size:.87rem; color:var(--gray); margin-bottom:22px; }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .form-group { margin-bottom:14px; }
  .form-group label { font-size:.8rem; font-weight:700; color:var(--ink); display:block; margin-bottom:5px; text-transform:uppercase; letter-spacing:.05em; }
  .form-group input,.form-group select { width:100%; padding:11px 14px; border:2px solid var(--light); border-radius:9px; font-family:'DM Sans',sans-serif; font-size:.88rem; outline:none; transition:border-color .2s; }
  .form-group input:focus,.form-group select:focus { border-color:var(--red); }
  .modal-divider { text-align:center; color:var(--gray); font-size:.78rem; margin:18px 0; position:relative; }
  .modal-divider::before,.modal-divider::after { content:''; position:absolute; top:50%; width:42%; height:1px; background:var(--light); }
  .modal-divider::before { left:0; }
  .modal-divider::after { right:0; }
  .paypal-checkout-area { margin-top:20px; }
  .pp-config-warning { background:#fff8e1; border:2px solid #FFD140; border-radius:10px; padding:14px 16px; margin-bottom:14px; }
  .pp-config-warning h4 { font-size:.85rem; font-weight:700; margin-bottom:4px; }
  .pp-config-warning p { font-size:.78rem; color:#555; line-height:1.6; }
  .pp-config-warning a { color:var(--paypal); font-weight:600; }
  .paypal-checkout-btn { width:100%; padding:14px; border-radius:10px; background:var(--paypal-yellow); border:3px solid rgba(0,0,0,.05); cursor:pointer; font-weight:800; font-size:1rem; display:flex; align-items:center; justify-content:center; gap:10px; transition:all .2s; }
  .paypal-checkout-btn:hover { transform:scale(1.015); box-shadow:0 6px 22px rgba(255,209,64,.5); }
  .success-box { text-align:center; padding:24px 0; }
  .success-icon { font-size:4rem; margin-bottom:12px; animation:pop .4s ease; }
  @keyframes pop { 0%{transform:scale(.5)} 70%{transform:scale(1.15)} 100%{transform:scale(1)} }

  footer { background:var(--ink); color:rgba(255,255,255,.45); padding:36px 80px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
  footer .logo { color:white; }
  footer p { font-size:.8rem; }

  @media(max-width:900px){
    nav ul{display:none;}
    .hero{grid-template-columns:1fr;}
    .hero-bg,.hero-pattern,.hero-right{display:none;}
    .hero-left{padding:40px 24px;}
    .paypal-flow,.payout-inner{grid-template-columns:1fr;}
    .products-grid,.streams-grid,.setup-grid{grid-template-columns:1fr 1fr;}
    section,.payout-section{padding:60px 24px;}
    footer{padding:30px 24px;flex-direction:column;text-align:center;}
  }
  @media(max-width:540px){
    .products-grid,.streams-grid,.setup-grid,.form-row{grid-template-columns:1fr;}
  }
`;

const PRODUCTS = [
  { emoji:"📘", title:"MGCM 301 Notizen", sub:"Weeks 1–8 komplette Summary", price:12 },
  { emoji:"🧮", title:"MATH 133 Midterm Paket", sub:"Lösungen + Formelblatt", price:18 },
  { emoji:"🧬", title:"BIOL 200 Vorlesungsfolien", sub:"12 Vorlesungen, annotiert", price:9 },
  { emoji:"⚖️", title:"POLI 211 Essay-Template", sub:"Mit Bewertungsrubrik McGill", price:14 },
  { emoji:"💻", title:"COMP 202 Assignment-Hilfe", sub:"Kommentierter Code + Erklärung", price:22 },
  { emoji:"🎓", title:"ECON 208 1:1 Tutoring", sub:"60 Min via Zoom, Prüfungsvorbereitung", price:45 },
];

// ── PayPal Button Component ──────────────────────────────
function PayPalButton({ amount, description, onSuccess }) {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const isDemo = PAYPAL_CONFIG.clientId === "YOUR_PAYPAL_CLIENT_ID";

  useEffect(() => {
    if (isDemo) return;
    if (window.paypal) { setLoaded(true); return; }
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CONFIG.clientId}&currency=${PAYPAL_CONFIG.currency}`;
    script.onload = () => setLoaded(true);
    script.onerror = () => setError(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!loaded || !containerRef.current || !window.paypal) return;
    containerRef.current.innerHTML = "";
    window.paypal.Buttons({
      style: { layout:"vertical", color:"gold", shape:"rect", label:"pay", height:48 },
      createOrder: (data, actions) =>
        actions.order.create({
          purchase_units: [{
            amount: { value: amount.toFixed(2), currency_code: PAYPAL_CONFIG.currency },
            description,
            payee: { email_address: PAYPAL_CONFIG.paypalEmail },
          }],
        }),
      onApprove: (data, actions) => actions.order.capture().then(onSuccess),
      onError: () => setError(true),
    }).render(containerRef.current);
  }, [loaded, amount]);

  if (isDemo) return (
    <div>
      <div className="pp-config-warning">
        <h4>⚙️ PayPal noch nicht konfiguriert</h4>
        <p>
          Trage deine Client-ID in <code>PAYPAL_CONFIG.clientId</code> ein.<br/>
          <a href="https://developer.paypal.com/dashboard/" target="_blank">→ developer.paypal.com/dashboard</a>
        </p>
      </div>
      <button className="paypal-checkout-btn" onClick={() => onSuccess({ demo: true })}>
        <span className="pp-logo">Pay<b>Pal</b></span>
        Demo: Zahlung simulieren ✓
      </button>
    </div>
  );
  if (error) return <p style={{color:"var(--red)",fontSize:".85rem",textAlign:"center"}}>PayPal-Fehler. Bitte Client-ID prüfen.</p>;
  if (!loaded) return <p style={{textAlign:"center",color:"var(--gray)",fontSize:".85rem",padding:16}}>⏳ PayPal wird geladen…</p>;
  return <div ref={containerRef} />;
}

// ── Main App ─────────────────────────────────────────────
export default function McGillStudyHub() {
  const [modal, setModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paySuccess, setPaySuccess] = useState(false);

  const openBuy = (p) => { setSelectedProduct(p); setPaySuccess(false); setModal("checkout"); };
  const fee = selectedProduct ? +(selectedProduct.price * PAYPAL_CONFIG.platformFee).toFixed(2) : 0;
  const total = selectedProduct ? +(selectedProduct.price + fee).toFixed(2) : 0;

  return (
    <>
      <style>{css}</style>
      <div>

        {/* NAV */}
        <nav>
          <div className="logo">Study<span>Hub</span><span className="logo-badge">McGill</span></div>
          <ul>
            <li><a href="#">Marktplatz</a></li>
            <li><a href="#">Tutoring</a></li>
            <li><a href="#">Preise</a></li>
            <li>
              <span className="paypal-nav-badge">
                <span style={{background:"var(--paypal-yellow)",color:"var(--paypal)",padding:"1px 7px",borderRadius:4,fontWeight:900,fontSize:".7rem"}}>Pay<b>Pal</b></span>
                Gesicherte Zahlung
              </span>
            </li>
            <li><button className="btn-nav" onClick={() => setModal("signup")}>Jetzt starten</button></li>
          </ul>
        </nav>

        {/* HERO */}
        <div className="hero">
          <div className="hero-bg"/><div className="hero-pattern"/>
          <div className="hero-left">
            <div className="tag">🍁 McGill University · Montreal, QC</div>
            <h1>Verdiene Geld mit<br/>deinem <em>Wissen</em> —<br/>direkt per PayPal</h1>
            <p className="hero-sub">
              Verkaufe Notizen, biete Tutoring an und erhalte deine Einnahmen sofort auf dein PayPal-Konto — sicher, schnell und einfach.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => setModal("signup")}>Kostenlos registrieren →</button>
              <button className="btn-outline" onClick={() => setModal("seller")}>💰 Als Seller verdienen</button>
            </div>
            <div className="paypal-trust">
              <div className="paypal-logo-box"><span>Pay<b>Pal</b></span></div>
              <div className="trust-text">
                <strong>Zahlungen laufen über PayPal</strong>
                <small>Käuferschutz · Sofortauszahlung · Interac & alle Karten</small>
              </div>
              <span style={{color:"var(--green)",fontSize:"1.3rem"}}>✓</span>
            </div>
          </div>
          <div className="hero-right">
            <div className="checkout-card">
              <h4>🛒 Checkout Preview</h4>
              {[
                {icon:"📘",title:"MGCM 301 Notizen",sub:"Weeks 1–8",price:"CA$12.00"},
                {icon:"🧮",title:"MATH 133 Lösungen",sub:"Midterm Paket",price:"CA$18.00"},
              ].map((i,k)=>(
                <div className="checkout-item" key={k}>
                  <div className="checkout-item-l">
                    <span style={{fontSize:"1.3rem"}}>{i.icon}</span>
                    <div><div className="ci-title">{i.title}</div><div className="ci-sub">{i.sub}</div></div>
                  </div>
                  <div className="ci-price">{i.price}</div>
                </div>
              ))}
              <div className="checkout-total">
                <span>Gesamt (inkl. Fee)</span>
                <strong>CA$33.00</strong>
              </div>
              <button className="paypal-btn-demo">
                <span className="pp-logo">Pay<b>Pal</b></span>
                Jetzt mit PayPal zahlen
              </button>
              <div className="secure-note">🔒 256-bit SSL · PayPal Käuferschutz</div>
            </div>
          </div>
        </div>

        {/* PAYPAL INTEGRATION ERKLÄRUNG */}
        <section>
          <span className="s-tag">PayPal Integration</span>
          <div className="paypal-flow">
            <div className="flow-visual">
              <div className="flow-step">
                <div className="flow-num">1</div>
                <div className="flow-content">
                  <strong>Käufer klickt "Per PayPal kaufen"</strong>
                  <p>PayPal-Fenster öffnet sich — Zahlung per PayPal-Guthaben, Interac oder Kreditkarte.</p>
                </div>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">
                <div className="flow-num" style={{background:"var(--gold)",color:"var(--ink)"}}>2</div>
                <div className="flow-content">
                  <strong>Zahlung geht auf dein PayPal ein</strong>
                  <p>10% Plattform-Gebühr abgezogen — Restbetrag sofort auf deinem PayPal: <strong>{PAYPAL_CONFIG.paypalEmail}</strong></p>
                </div>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">
                <div className="flow-num" style={{background:"var(--green)"}}>3</div>
                <div className="flow-content">
                  <strong>Download / Termin sofort freigeschaltet</strong>
                  <p>Käufer erhält direkten Zugang zum Dokument oder Buchungsbestätigung per E-Mail.</p>
                </div>
              </div>
            </div>
            <div className="flow-right">
              <h3>Warum PayPal?</h3>
              <p style={{fontSize:".92rem",color:"var(--gray)",marginBottom:22,lineHeight:1.72}}>
                PayPal ist die meistgenutzte Zahlungsmethode in Kanada — und du kannst dein bestehendes Konto sofort verbinden.
              </p>
              {[
                {icon:"🏦", title:"Interac & alle Karten", sub:"Käufer zahlen per Interac, Visa, Mastercard oder PayPal-Guthaben."},
                {icon:"⚡", title:"Sofort-Auszahlung", sub:"Einnahmen sofort auf deinem PayPal — Banküberweisung in 1–3 Werktagen."},
                {icon:"🔒", title:"Käufer- & Verkäuferschutz", sub:"Beide Seiten geschützt durch PayPal-Richtlinien — schafft Vertrauen."},
                {icon:"🌍", title:"Internationale Nutzung", sub:"Auch internationale Studenten können teilnehmen — PayPal in 200 Ländern."},
              ].map((f,i)=>(
                <div className="paypal-feature" key={i}>
                  <span style={{fontSize:"1.5rem",minWidth:32}}>{f.icon}</span>
                  <div><div className="pp-feat-title">{f.title}</div><div className="pp-feat-sub">{f.sub}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section style={{background:"var(--light)"}}>
          <span className="s-tag">Marktplatz</span>
          <h2>Studienunterlagen kaufen & verkaufen</h2>
          <p className="s-sub">Jeder Kauf läuft sicher über PayPal. Als Verkäufer erhältst du 90% direkt auf dein Konto.</p>
          <div className="products-grid">
            {PRODUCTS.map((p,i)=>(
              <div className="product-card" key={i}>
                <span className="product-emoji">{p.emoji}</span>
                <h3>{p.title}</h3>
                <p>{p.sub}</p>
                <div className="product-footer">
                  <div className="product-price">CA${p.price}.00</div>
                  <button className="buy-btn" onClick={() => openBuy(p)}>
                    <span className="buy-btn-pp">Pay<b>Pal</b></span>Kaufen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PAYOUT */}
        <div className="payout-section">
          <div className="payout-inner">
            <div className="payout-left">
              <span className="s-tag gold">Deine Einnahmen</span>
              <h2>Verdienst direkt auf dein PayPal</h2>
              <p>Alle Verkäufe werden automatisch auf dein PayPal-Konto überwiesen. Auszahlung aufs Bankkonto jederzeit möglich.</p>
            </div>
            <div className="payout-card">
              <div className="payout-header">
                <h4>📊 März 2026 — Earnings</h4>
                <span className="payout-status">✓ Auszahlbar</span>
              </div>
              <div className="payout-amount">CA$234.50</div>
              <div className="payout-period">Einnahmen diesen Monat</div>
              <div>
                {[
                  ["Notizen-Verkäufe (14×)", "+CA$168.00", "green"],
                  ["Tutoring-Buchungen (2×)", "+CA$90.00", "green"],
                  ["Platform-Gebühr (10%)", "−CA$25.80", "red"],
                  ["PayPal Transfer-Fee", "−CA$1.70", "red"],
                  ["Netto-Auszahlung", "CA$230.50", null],
                ].map(([l,v,c],i)=>(
                  <div className="pb-row" key={i}>
                    <span className="pb-label">{l}</span>
                    <span className={`pb-val${c ? " "+c : ""}`}>{v}</span>
                  </div>
                ))}
              </div>
              <button className="payout-btn">
                <span className="pp-logo">Pay<b>Pal</b></span>
                CA$230.50 jetzt auszahlen
              </button>
              <div className="payout-note">→ {PAYPAL_CONFIG.paypalEmail}</div>
            </div>
          </div>
        </div>

        {/* EINNAHMEQUELLEN */}
        <section className="dark">
          <span className="s-tag gold">Geschäftsmodell</span>
          <h2 style={{color:"white"}}>4 Einnahmequellen — alle per PayPal</h2>
          <p className="s-sub light">Skalierbar, diversifiziert, sofort einsatzbereit.</p>
          <div className="streams-grid">
            {[
              {icon:"💸",title:"Marktplatz-Fee",desc:"10% auf jeden Verkauf — PayPal überweist automatisch",rate:"10%",label:"per Transaktion"},
              {icon:"🔁",title:"Pro Abo",desc:"Monatliche Mitgliedschaft per PayPal Abo-Zahlung",rate:"CA$9.99",label:"/ Monat"},
              {icon:"📣",title:"Sponsored Posts",desc:"Unternehmen zahlen per PayPal Invoice für Werbeplätze",rate:"CA$99+",label:"pro Post"},
              {icon:"🏷️",title:"Featured Boost",desc:"Anbieter promoten ihre Listings per PayPal One-Click",rate:"CA$4.99",label:"/ Woche"},
            ].map((m,i)=>(
              <div className="stream-card" key={i}>
                <span className="stream-icon">{m.icon}</span>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <div className="stream-rate">{m.rate}</div>
                <div className="stream-rate-label">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SETUP */}
        <section>
          <span className="s-tag">Schnellstart</span>
          <h2>In 3 Schritten live mit PayPal</h2>
          <p className="s-sub">Nur ein PayPal Business Account nötig — alles andere ist bereits fertig.</p>
          <div className="setup-grid">
            {[
              {n:"01",title:"PayPal Business Account",desc:"Erstelle einen kostenlosen PayPal Business Account und hol dir deine Client-ID aus dem Developer Dashboard.",link:"developer.paypal.com",href:"https://developer.paypal.com/dashboard/"},
              {n:"02",title:"Client-ID eintragen",desc:"Trage deine Client-ID und deine PayPal E-Mail in PAYPAL_CONFIG am Anfang der Datei ein — fertig.",link:"Code am Anfang der Datei",href:"#"},
              {n:"03",title:"Deployen & verdienen",desc:"App auf Vercel hosten (kostenlos), Link mit McGill-Studenten teilen und ab Tag 1 Einnahmen auf PayPal erhalten.",link:"vercel.com",href:"https://vercel.com"},
            ].map((s,i)=>(
              <div className="setup-card" key={i}>
                <div className="setup-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <a className="setup-link" href={s.href} target="_blank">→ {s.link}</a>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="logo" style={{color:"white"}}>Study<span style={{color:"rgba(255,255,255,.55)"}}>Hub</span><span className="logo-badge">McGill</span></div>
          <p>Zahlungen gesichert durch <strong style={{color:"var(--paypal-yellow)"}}>PayPal</strong> · Montreal, QC</p>
          <p>{PAYPAL_CONFIG.paypalEmail}</p>
        </footer>

        {/* ═══ MODALS ═══ */}
        {modal && (
          <div className="overlay" onClick={() => setModal(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>

              {/* CHECKOUT */}
              {modal === "checkout" && selectedProduct && (
                paySuccess ? (
                  <div className="success-box">
                    <div className="success-icon">🎉</div>
                    <h3>Zahlung erfolgreich!</h3>
                    <p style={{color:"var(--gray)",marginTop:8,marginBottom:20}}>
                      <strong>{selectedProduct.title}</strong> wurde via PayPal bezahlt.<br/>
                      Der Download-Link wurde per E-Mail gesendet.
                    </p>
                    <button className="btn-primary" style={{margin:"0 auto"}} onClick={() => setModal(null)}>Schließen</button>
                  </div>
                ) : (
                  <>
                    <h3>🛒 Checkout</h3>
                    <p className="modal-sub">Bezahle sicher mit PayPal — Käuferschutz inklusive.</p>
                    <div className="checkout-item" style={{marginBottom:16}}>
                      <div className="checkout-item-l">
                        <span style={{fontSize:"1.4rem"}}>{selectedProduct.emoji}</span>
                        <div><div className="ci-title">{selectedProduct.title}</div><div className="ci-sub">{selectedProduct.sub}</div></div>
                      </div>
                      <div className="ci-price">CA${selectedProduct.price}.00</div>
                    </div>
                    {[
                      ["Preis",`CA$${selectedProduct.price}.00`],
                      ["Platform-Gebühr (10%)",`CA$${fee.toFixed(2)}`],
                      ["Gesamt",`CA$${total.toFixed(2)}`],
                    ].map(([l,v],i)=>(
                      <div style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid var(--light)",fontSize:".86rem"}} key={i}>
                        <span style={{color:"var(--gray)"}}>{l}</span><strong>{v}</strong>
                      </div>
                    ))}
                    <div className="paypal-checkout-area">
                      <PayPalButton
                        amount={total}
                        description={selectedProduct.title}
                        onSuccess={() => setPaySuccess(true)}
                      />
                    </div>
                    <div className="secure-note" style={{marginTop:12}}>🔒 256-bit SSL · PayPal Käuferschutz</div>
                  </>
                )
              )}

              {/* SIGNUP */}
              {modal === "signup" && (
                <>
                  <h3>Konto erstellen</h3>
                  <p className="modal-sub">McGill-E-Mail für verifizierten Zugang verwenden.</p>
                  <div className="form-row">
                    <div className="form-group"><label>Vorname</label><input type="text" placeholder="Max"/></div>
                    <div className="form-group"><label>Nachname</label><input type="text" placeholder="Mustermann"/></div>
                  </div>
                  <div className="form-group"><label>McGill E-Mail</label><input type="email" placeholder="max@mail.mcgill.ca"/></div>
                  <div className="form-group"><label>Passwort</label><input type="password" placeholder="••••••••"/></div>
                  <div className="form-group">
                    <label>Ich möchte…</label>
                    <select>
                      <option>Notizen & Services kaufen</option>
                      <option>Notizen verkaufen (Seller)</option>
                      <option>Tutoring anbieten</option>
                      <option>Beides (Käufer & Verkäufer)</option>
                    </select>
                  </div>
                  <div className="modal-divider">dann PayPal verknüpfen</div>
                  <div style={{background:"#f0f4ff",border:"1.5px solid rgba(0,48,135,.15)",borderRadius:12,padding:"14px 16px",marginBottom:14,display:"flex",gap:12,alignItems:"center"}}>
                    <div style={{background:"var(--paypal)",borderRadius:7,padding:"6px 11px"}}><span style={{color:"white",fontWeight:900,fontSize:".9rem"}}>Pay<b style={{color:"var(--paypal-yellow)"}}>Pal</b></span></div>
                    <div>
                      <div style={{fontSize:".84rem",fontWeight:700}}>PayPal-Account verknüpfen</div>
                      <div style={{fontSize:".74rem",color:"var(--gray)"}}>Für automatische Auszahlungen deiner Einnahmen</div>
                    </div>
                  </div>
                  <div className="form-group"><label>Deine PayPal E-Mail</label><input type="email" placeholder="dein@paypal.com"/></div>
                  <button className="btn-primary" style={{width:"100%",justifyContent:"center"}}>Konto erstellen & PayPal verknüpfen →</button>
                </>
              )}

              {/* SELLER */}
              {modal === "seller" && (
                <>
                  <h3>Als Seller Geld verdienen</h3>
                  <p className="modal-sub">90% jedes Verkaufs direkt auf dein PayPal-Konto.</p>
                  {[
                    ["📚","Notizen & Zusammenfassungen","CA$5–25 pro Dokument"],
                    ["🎓","Tutoring & Nachhilfe","CA$25–60 / Stunde"],
                    ["📝","Essay-Korrektur","CA$15–40 pro Essay"],
                    ["💻","Coding-Hilfe","CA$30–80 pro Session"],
                  ].map(([icon,title,rate],i)=>(
                    <div key={i} onClick={() => setModal("signup")}
                      style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:"var(--light)",borderRadius:10,marginBottom:10,cursor:"pointer"}}
                      onMouseEnter={e=>e.currentTarget.style.background="#ffe8ec"}
                      onMouseLeave={e=>e.currentTarget.style.background="var(--light)"}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <span style={{fontSize:"1.5rem"}}>{icon}</span>
                        <div>
                          <div style={{fontSize:".86rem",fontWeight:600}}>{title}</div>
                          <div style={{fontSize:".74rem",color:"var(--gray)"}}>{rate} · <span style={{color:"var(--green)",fontWeight:700}}>90% für dich via PayPal</span></div>
                        </div>
                      </div>
                      <span style={{color:"var(--red)"}}>→</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
