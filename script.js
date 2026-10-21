const selections=[
];
const history=[
  {date:'2026-10-21',league:'NBA',match:'费城76人 106–100 纽约尼克斯',pick:'全场小 232.5',odds:1.91,result:'WIN',recordAt:'发布 10-20 16:04'},
  {date:'2026-10-17',league:'英冠',match:'德比郡 0–1 斯托克城',pick:'斯托克城 客胜',odds:2.40,result:'WIN',recordAt:'发布 10-17 20:21'},
  {date:'2026-10-16',league:'NBA季前赛',match:'猛龙 120–122 尼克斯',pick:'大 225.5',odds:1.91,result:'WIN',recordAt:'发布 10-15 23:34'},
  {date:'2026-10-16',league:'欧罗巴',match:'里昂 3–2 水晶宫',pick:'里昂 平手盘（0）',odds:1.95,result:'WIN',recordAt:'发布 10-15 23:34'},
  {date:'2026-09-28',league:'WNBA',match:'亚特兰大梦想 92–77 华盛顿神秘人',pick:'大 164.5',odds:1.95,result:'WIN',recordAt:'发布 09-28 00:12'},
  {date:'2026-09-25',league:'WNBA',match:'菲尼克斯水星 82–100 拉斯维加斯王牌',pick:'小 174.5',odds:1.87,result:'LOSS',recordAt:'发布 09-24 16:21'},
  {date:'2026-09-24',league:'WNBA',match:'达拉斯飞翼 103–91 西雅图风暴',pick:'大 171.5',odds:1.87,result:'WIN',recordAt:'发布 09-23 16:07'},
  {date:'2026-09-23',league:'WNBA',match:'康涅狄格太阳 69–79 华盛顿神秘人',pick:'大 157.5',odds:1.77,result:'LOSS',recordAt:'发布 09-22 17:13'},
  {date:'2026-09-22',league:'WNBA',match:'亚特兰大梦想 95–84 纽约自由人',pick:'小 178.5',odds:1.84,result:'LOSS',recordAt:'发布 09-21 11:48'},
  {date:'2026-09-21',league:'WNBA',match:'西雅图风暴 77–98 拉斯维加斯王牌',pick:'小 176.5',odds:1.88,result:'WIN',recordAt:'发布 09-20 19:49'},
  {date:'2026-09-20',league:'WNBA',match:'菲尼克斯水星 82–87 达拉斯飞翼',pick:'小 172.5',odds:1.92,result:'WIN',recordAt:'发布 09-20 00:32'},
  {date:'2026-09-18',league:'西甲',match:'皇家贝蒂斯 1–0 赫塔费',pick:'主胜',odds:1.60,result:'WIN',recordAt:'发布 09-17 17:38'},
  {date:'2026-09-16',league:'亚冠精英',match:'全北现代 2–1 柏太阳神',pick:'客胜',odds:1.85,result:'LOSS',recordAt:'发布 09-16 11:07'},
  {date:'2026-09-16',league:'西甲',match:'巴列卡诺 2–1 西班牙人',pick:'西班牙人 不败',odds:1.70,result:'LOSS',recordAt:'发布 09-15 11:23'},
  {date:'2026-09-15',league:'英超',match:'利兹联 4–1 纽卡斯尔',pick:'利兹联 胜',odds:2.32,result:'WIN',recordAt:'发布 09-14 19:43'},
  {date:'2026-09-13',league:'英超',match:'曼联 0–1 曼城',pick:'负',odds:2.19,result:'WIN',recordAt:'记录 约20:00'},
  {date:'2026-09-13',league:'意甲',match:'那不勒斯 1–0 博洛尼亚',pick:'胜',odds:1.89,result:'WIN',recordAt:'记录 约20:00'},
  {date:'2026-09-13',league:'日职',match:'东京绿茵 1–1 千叶市原',pick:'负',odds:3.16,result:'LOSS',recordAt:'记录 约09:10'},
  {date:'2026-09-12',league:'西甲',match:'奥萨苏纳 0–2 西班牙人',pick:'平',odds:3.18,result:'LOSS',recordAt:'记录 约22:02'},
  {date:'2026-09-12',league:'英超',match:'阿斯顿维拉 1–2 诺丁汉森林',pick:'平',odds:3.41,result:'LOSS',recordAt:'记录 约21:58'},
  {date:'2026-09-12',league:'日职',match:'大阪钢巴 0–2 东京FC',pick:'负',odds:1.91,result:'WIN',recordAt:'记录 约10:50'},
  {date:'2026-09-12',league:'韩K联',match:'全北现代 1–2 首尔FC',pick:'负',odds:2.36,result:'WIN',recordAt:'记录 约10:47'}
];
const $=s=>document.querySelector(s);
const HISTORY_PAGE_SIZE=10;
let historyPage=1;
function historyRow(r){return `<tr><td>${r.date}<small>${r.league}${r.recordAt?` · ${r.recordAt}`:''}</small></td><td>${r.match}</td><td>${r.pick}</td><td>${Number.isFinite(r.odds)?`@ ${r.odds.toFixed(2)}`:'—'}</td><td><span class="result ${r.result.toLowerCase()}">${r.result}</span></td></tr>`;}
function ensureHistoryPager(){let pager=$('#history-pagination');if(pager)return pager;pager=document.createElement('nav');pager.id='history-pagination';pager.className='history-pagination';pager.setAttribute('aria-label','历史记录分页');document.querySelector('.history-table-wrap')?.insertAdjacentElement('afterend',pager);const style=document.createElement('style');style.textContent=`.history-pagination{display:flex;align-items:center;justify-content:center;gap:7px;margin-top:22px}.history-pagination button{min-width:38px;height:38px;padding:0 11px;border:1px solid var(--line);background:rgba(17,21,21,.78);color:var(--muted);font-size:12px;letter-spacing:.04em;cursor:pointer;transition:border-color .18s,color .18s,background .18s}.history-pagination button:hover:not(:disabled),.history-pagination button.active{border-color:rgba(187,167,125,.62);color:var(--gold);background:rgba(187,167,125,.08)}.history-pagination button:disabled{opacity:.3;cursor:default}.history-pagination .page-status{margin:0 5px;color:var(--muted);font-size:11px;letter-spacing:.08em}@media(max-width:720px){.history-pagination{margin-top:18px;gap:5px}.history-pagination button{min-width:36px;height:36px;padding:0 9px}}@media(prefers-reduced-motion:reduce){.history-pagination button{transition:none}}`;document.head.appendChild(style);return pager;}
function renderHistory(){const totalPages=Math.max(1,Math.ceil(history.length/HISTORY_PAGE_SIZE));historyPage=Math.min(Math.max(historyPage,1),totalPages);const start=(historyPage-1)*HISTORY_PAGE_SIZE;$('#history-body').innerHTML=history.slice(start,start+HISTORY_PAGE_SIZE).map(historyRow).join('');const pager=ensureHistoryPager();if(!pager)return;if(totalPages<=1){pager.hidden=true;pager.innerHTML='';return;}pager.hidden=false;const pageButtons=Array.from({length:totalPages},(_,i)=>i+1).map(page=>`<button type="button" data-page="${page}" class="${page===historyPage?'active':''}" ${page===historyPage?'aria-current="page"':''}>${page}</button>`).join('');pager.innerHTML=`<button type="button" data-page="${historyPage-1}" ${historyPage===1?'disabled':''} aria-label="上一页">‹</button>${pageButtons}<span class="page-status">${historyPage} / ${totalPages}</span><button type="button" data-page="${historyPage+1}" ${historyPage===totalPages?'disabled':''} aria-label="下一页">›</button>`;pager.querySelectorAll('button[data-page]').forEach(button=>button.addEventListener('click',()=>{const next=Number(button.dataset.page);if(!Number.isInteger(next)||next<1||next>totalPages||next===historyPage)return;historyPage=next;renderHistory();document.querySelector('#history')?.scrollIntoView({behavior:reduceMotion.matches?'auto':'smooth',block:'start'});}));}
function render(){const now=new Date();$('#date-label').textContent=new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'Asia/Shanghai'}).formatToParts(now).filter(p=>p.type!=='literal').map(p=>p.value).join('.');$('#selection-grid').innerHTML=selections.slice(0,2).map((s,i)=>`<article class="selection-card"><div class="card-top"><span class="card-index">SELECTION 0${i+1}</span><span class="card-league">${s.league}</span></div><h3 class="card-match">${s.home}<em>VS</em>${s.away}</h3><div class="card-pick"><span>预测方向</span><strong>${s.pick}</strong><b>${s.odds?`@ ${s.odds}`:'赔率待补'}</b></div><div class="card-bottom"><span>比赛时间 <time>${s.time}</time></span><span>发布 ${s.published}</span></div></article>`).join('')||'<div class="empty-state">NO POSITION TODAY<br>今日无符合标准的机会</div>';renderHistory();const wins=history.filter(r=>r.result==='WIN').length,losses=history.filter(r=>r.result==='LOSS').length;const priced=history.filter(r=>Number.isFinite(r.odds)&&['WIN','LOSS'].includes(r.result));
const profitOf=rows=>rows.reduce((sum,r)=>sum+(r.result==='WIN'?r.odds-1:-1),0);
const pct=rows=>rows.length?profitOf(rows)/rows.length*100:null;
const formatPct=v=>v===null?'—':`${v>=0?'+':''}${v.toFixed(1)}%`;
const profit=profitOf(priced);
const predictionHitRate=(wins+losses)?(wins/(wins+losses)*100).toFixed(1)+'%':'—';
$('#roi-value').textContent=formatPct(pct(priced));
const roiNote=document.querySelector('.primary-stat p');
if(roiNote)roiNote.textContent=priced.length?`累计 ${profit>=0?'+':''}${profit.toFixed(2)}U · ${priced.length} 场 · 固定 1U / 场`:'暂无已结算记录';
const byMonth=new Map();
for(const r of priced){const month=r.date.slice(0,7);if(!byMonth.has(month))byMonth.set(month,[]);byMonth.get(month).push(r);}
const monthParts=new Intl.DateTimeFormat('en-US',{year:'numeric',month:'2-digit',timeZone:'Asia/Shanghai'}).formatToParts(now);
const year=monthParts.find(p=>p.type==='year').value,month=monthParts.find(p=>p.type==='month').value;
const currentMonth=`${year}-${month}`;
if(!byMonth.has(currentMonth))byMonth.set(currentMonth,[]);
const months=[...byMonth.keys()].sort();
const grid=document.querySelector('.stats-grid');
if(grid){
  grid.innerHTML=`<div class="monthly-return-card"><span>预测命中率</span><strong>${predictionHitRate}</strong><small>已结算胜负记录 · ${wins}胜 ${losses}负</small></div>`+months.map(m=>{const rows=byMonth.get(m),p=profitOf(rows);return `<div class="monthly-return-card"><span>${m.replace('-','年')}月收益率</span><strong>${formatPct(pct(rows))}</strong><small>${rows.length} 场 · ${p>=0?'+':''}${p.toFixed(2)}U · 固定 1U / 场</small></div>`;}).join('');
  grid.classList.add('performance-metrics');
}
let running=0;const series=[0,...[...priced].reverse().map(r=>(running+=r.result==='WIN'?r.odds-1:-1))];if(series.length>1){const lo=Math.min(...series)-.5,hi=Math.max(...series)+.5;const points=series.map((v,i)=>`${i/(series.length-1)*100},${70-(v-lo)/(hi-lo)*56}`).join(' ');$('#sparkline').innerHTML=`<svg viewBox="0 0 100 83" preserveAspectRatio="none" aria-hidden="true"><polyline points="${points}" fill="none" stroke="#bba77d" stroke-width=".65" vector-effect="non-scaling-stroke"/></svg>`}else{$('#sparkline').innerHTML=''};}
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');render();const navLinks=[...document.querySelectorAll('.site-header nav a[href^="#"]')];const trackedSections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);function setActiveNav(id){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${id}`));}navLinks.forEach(a=>a.addEventListener('click',e=>{const target=document.querySelector(a.getAttribute('href'));if(!target)return;e.preventDefault();setActiveNav(target.id);target.scrollIntoView({behavior:reduceMotion.matches?'auto':'smooth',block:'start'});window.history.replaceState(null,'',`#${target.id}`);}));if('IntersectionObserver' in window){const sectionObserver=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);if(visible[0])setActiveNav(visible[0].target.id);},{root:null,rootMargin:'-18% 0px -62% 0px',threshold:[0,.01]});trackedSections.forEach(section=>sectionObserver.observe(section));}