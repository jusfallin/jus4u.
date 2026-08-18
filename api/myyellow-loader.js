export default async function handler(request) {
  const origin = new URL(request.url).origin;
  const pageResponse = await fetch(`${origin}/index.html`, { cache: 'no-store' });

  if (!pageResponse.ok) {
    return new Response('Unable to load the page.', { status: 502 });
  }

  let html = await pageResponse.text();

  const style = `
<style id="myyellow-loader-style">
html.my-yellow-loading,body.my-yellow-loading{overflow:hidden!important}
body.my-yellow-loading>*:not(#myyellow-loader){visibility:hidden!important}
#myyellow-loader{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;overflow:hidden;background:linear-gradient(145deg,#fff7f5 0%,#f8e9ef 46%,#eee5f7 100%);color:#4a2732;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;opacity:1;visibility:visible;transition:opacity .9s cubic-bezier(.22,1,.36,1),visibility .9s}
#myyellow-loader:before,#myyellow-loader:after{content:"";position:absolute;border-radius:50%;pointer-events:none;filter:blur(42px);opacity:.34;animation:myyellowDrift 7s ease-in-out infinite alternate}
#myyellow-loader:before{width:280px;height:280px;background:#e6a4b8;top:-90px;left:-80px}
#myyellow-loader:after{width:300px;height:300px;background:#c9aee0;right:-110px;bottom:-110px;animation-delay:-3s}
#myyellow-loader.myyellow-done{opacity:0;visibility:hidden;pointer-events:none}
.myyellow-loader-inner{position:relative;width:min(88vw,390px);display:flex;flex-direction:column;align-items:center;text-align:center;padding:30px 20px}
.myyellow-loader-photo-wrap{position:relative;width:154px;height:154px;margin-bottom:26px}
.myyellow-loader-photo-ring{position:absolute;inset:-11px;border:1px solid rgba(150,80,95,.25);border-radius:50%;animation:myyellowSpin 10s linear infinite}
.myyellow-loader-photo-ring:before,.myyellow-loader-photo-ring:after{content:"✦";position:absolute;color:#d39a54;font-size:14px;background:#fff7f5;padding:3px 6px;border-radius:50%}
.myyellow-loader-photo-ring:before{top:4px;left:15px}.myyellow-loader-photo-ring:after{right:10px;bottom:8px}
.myyellow-loader-photo{width:100%;height:100%;object-fit:cover;border-radius:50%;border:5px solid rgba(255,249,246,.95);box-shadow:0 20px 55px rgba(90,45,70,.22),0 0 0 1px rgba(150,80,95,.12);animation:myyellowPhotoFloat 3.4s ease-in-out infinite}
.myyellow-loader-thinking{position:absolute;right:-18px;top:-5px;width:47px;height:47px;border-radius:50%;display:grid;place-items:center;background:#fffaf7;border:1px solid rgba(150,80,95,.16);box-shadow:0 8px 20px rgba(90,45,70,.12);font-size:24px;animation:myyellowThinking 2.2s ease-in-out infinite}
.myyellow-loader-thinking:before,.myyellow-loader-thinking:after{content:"";position:absolute;border-radius:50%;background:#fffaf7;border:1px solid rgba(150,80,95,.13)}
.myyellow-loader-thinking:before{width:11px;height:11px;left:-9px;bottom:4px}.myyellow-loader-thinking:after{width:6px;height:6px;left:-15px;bottom:-4px}
.myyellow-loader-kicker{font-family:Georgia,"Times New Roman",serif;font-style:italic;font-size:18px;color:#96505f;margin-bottom:7px;animation:myyellowTextIn .9s .15s both}
.myyellow-loader-title{font-family:Georgia,"Times New Roman",serif;font-size:clamp(25px,7vw,34px);font-weight:500;line-height:1.15;margin:0;color:#4a2732;animation:myyellowTextIn .9s .28s both}
.myyellow-loader-sub{margin:10px 0 24px;font-size:13px;letter-spacing:.03em;color:#8c6d76;min-height:20px;animation:myyellowTextIn .9s .42s both}
.myyellow-loader-dots span{display:inline-block;animation:myyellowDot 1.25s ease-in-out infinite;opacity:.25}.myyellow-loader-dots span:nth-child(2){animation-delay:.16s}.myyellow-loader-dots span:nth-child(3){animation-delay:.32s}
.myyellow-loader-progress{width:min(78vw,310px);height:7px;border-radius:999px;background:rgba(255,255,255,.7);box-shadow:inset 0 0 0 1px rgba(150,80,95,.1),0 5px 18px rgba(90,45,70,.08);overflow:hidden}
.myyellow-loader-bar{height:100%;width:0;border-radius:inherit;background:linear-gradient(90deg,#d78da2,#e5bf6c,#b987a8);box-shadow:0 0 16px rgba(215,141,162,.35);transition:width .1s linear}
.myyellow-loader-percent{margin-top:11px;font-size:11px;letter-spacing:.16em;color:#9b7c84;min-height:16px}
.myyellow-loader-note{margin-top:19px;font-family:Georgia,"Times New Roman",serif;font-style:italic;font-size:13px;color:#a06978;opacity:.8}
@keyframes myyellowPhotoFloat{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-8px) rotate(1deg)}}
@keyframes myyellowSpin{to{transform:rotate(360deg)}}
@keyframes myyellowThinking{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-7px) rotate(5deg)}}
@keyframes myyellowDot{0%,100%{opacity:.2;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}
@keyframes myyellowTextIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes myyellowDrift{from{transform:translate3d(0,0,0) scale(1)}to{transform:translate3d(22px,-18px,0) scale(1.08)}}
@media(prefers-reduced-motion:reduce){#myyellow-loader *{animation-duration:.01ms!important;animation-iteration-count:1!important}.myyellow-loader-bar{transition:none}}
</style>`;

  const markup = `
<div id="myyellow-loader" aria-label="Loading your surprise">
  <div class="myyellow-loader-inner">
    <div class="myyellow-loader-photo-wrap">
      <div class="myyellow-loader-photo-ring" aria-hidden="true"></div>
      <img class="myyellow-loader-photo" src="/assets/bhavanika.jpg" alt="">
      <div class="myyellow-loader-thinking" aria-hidden="true">🤔</div>
    </div>
    <div class="myyellow-loader-kicker">Ennava irukum...</div>
    <h1 class="myyellow-loader-title">Konjam iru, my yellow 🤔</h1>
    <div class="myyellow-loader-sub"><span class="myyellow-loader-dots"><span>•</span><span>•</span><span>•</span></span></div>
    <div class="myyellow-loader-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="myyellow-loader-bar"></div></div>
    <div class="myyellow-loader-percent">0%</div>
    <div class="myyellow-loader-note">something lovely is getting ready for you 💛</div>
  </div>
</div>`;

  const script = `
<script id="myyellow-loader-script">
(function(){
  var loader=document.getElementById('myyellow-loader');if(!loader)return;
  var bar=loader.querySelector('.myyellow-loader-bar'),pct=loader.querySelector('.myyellow-loader-percent'),progress=loader.querySelector('.myyellow-loader-progress');
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('my-yellow-loading');document.body.classList.add('my-yellow-loading');
  var start=performance.now(),duration=reduce?900:4200;
  function finish(){bar.style.width='100%';pct.textContent='100%';progress.setAttribute('aria-valuenow','100');setTimeout(function(){document.documentElement.classList.remove('my-yellow-loading');document.body.classList.remove('my-yellow-loading');loader.classList.add('myyellow-done');setTimeout(function(){loader.remove()},1000)},reduce?120:520)}
  function tick(now){var p=Math.min(1,(now-start)/duration),eased=1-Math.pow(1-p,3),value=Math.floor(eased*100);bar.style.width=value+'%';pct.textContent=value+'%';progress.setAttribute('aria-valuenow',String(value));if(p<1)requestAnimationFrame(tick);else finish()}
  requestAnimationFrame(tick);
})();
</script>`;

  html=html.replace('<head>','<head>'+style);
  html=html.replace('<body>','<body class="my-yellow-loading">'+markup);
  html=html.replace('</body>',script+'</body>');

  return new Response(html,{status:200,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store, max-age=0'}});
}
