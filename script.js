const selections=[
  {league:'西甲 · LALIGA',home:'巴列卡诺',away:'西班牙人',pick:'西班牙人 不败',odds:1.70,time:'2026-09-16 01:00',published:'2026-09-15 11:23'}
];
const history=[
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
function render(){
  const now=new Date();
  $('#date-label').textContent=new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'Asia/Shanghai'}).format(now).replaceAll('/','.');
  $('#selection-grid').innerHTML=selections.slice(0,2).map((s,i)=>`<article class="selection-card"><div class="card-top"><span class="card-index">SELECTION 0${i+1}</span><span class="card-league">${s.league}</span></div><h3 class="card-match">${s.home}<em>VS</em>${s.away}</h3><div class="card-pick"><span>预测方向</span><strong>${s.pick}</strong><b>${s.odds?`@ ${s.odds}`:'赔率待补'}</b></div><div class="card-bottom"><span>比赛时间 <time>${s.time}</time></span><span>发布 ${s.published}</span></div></article>`).join('')||'<div class="empty-state">NO POSITION TODAY<br>今日无符合标准的机会</div>';
  $('#history-body').innerHTML=history.map(r=>`<tr><td>${r.date}<small>${r.league}${r.recordAt?` · ${r.recordAt}`:''}</small></td><td>${r.match}</td><td>${r.pick}</td><td>${Number.isFinite(r.odds)?`@ ${r.odds.toFixed(2)}`:'—'}</td><td><span class="result ${r.result.toLowerCase()}">${r.result}</span></td></tr>`).join('');

  const wins=history.filter(r=>r.result==='WIN').length,losses=history.filter(r=>r.result==='LOSS').length;
  const priced=history.filter(r=>Number.isFinite(r.odds));
  const profit=priced.reduce((a,r)=>a+(r.result==='WIN'?r.odds-1:-1),0);
  const roi=priced.length?profit/priced.length*100:null;
  $('#roi-value').textContent=roi===null?'—':`${profit>=0?'+':''}${roi.toFixed(1)}%`;
  const roiNote=document.querySelector('.primary-stat p');
  if(roiNote)roiNote.textContent=priced.length?`累计 ${profit>=0?'+':''}${profit.toFixed(2)}U · ${priced.length} 场 · 固定 1U / 场`:'暂无可计算赔率记录';

  const monthParts=new Intl.DateTimeFormat('en-US',{year:'numeric',month:'2-digit',timeZone:'Asia/Shanghai'}).formatToParts(now);
  const year=monthParts.find(p=>p.type==='year').value,month=monthParts.find(p=>p.type==='month').value;
  const currentMonth=`${year}-${month}`;
  const monthlyAll=history.filter(r=>r.date.startsWith(currentMonth));
  const monthly=monthlyAll.filter(r=>Number.isFinite(r.odds));
  const monthlyProfit=monthly.reduce((a,r)=>a+(r.result==='WIN'?r.odds-1:-1),0);
  const monthlyRoi=monthly.length?monthlyProfit/monthly.length*100:null;

  const statCells=[...document.querySelectorAll('.stats-grid>div')];
  if(statCells.length>=4){
    statCells[0].querySelector('span').textContent='总场次';
    statCells[0].querySelector('strong').textContent=String(history.length).padStart(2,'0');
    statCells[0].querySelector('small').textContent='全部已结算';

    statCells[1].querySelector('span').textContent='本月场次';
    statCells[1].querySelector('strong').textContent=String(monthlyAll.length).padStart(2,'0');
    statCells[1].querySelector('small').textContent=`${currentMonth.replace('-','.')} · 已结算`;

    statCells[2].querySelector('span').textContent='总命中率';
    statCells[2].querySelector('strong').textContent=(wins+losses)?`${(wins/(wins+losses)*100).toFixed(1)}%`:'—';
    statCells[2].querySelector('small').textContent=(wins+losses)?`${wins} 胜 / ${losses} 负`:'暂无记录';

    statCells[3].querySelector('span').textContent='本月收益';
    statCells[3].querySelector('strong').textContent=monthlyRoi===null?'—':`${monthlyProfit>=0?'+':''}${monthlyRoi.toFixed(1)}%`;
    statCells[3].querySelector('small').textContent=monthly.length?`${monthlyProfit>=0?'+':''}${monthlyProfit.toFixed(2)}U · 固定 1U / 场`:'暂无可计算记录';
  }

  let running=0;const series=[0,...[...priced].reverse().map(r=>(running+=r.result==='WIN'?r.odds-1:-1))];
  if(series.length>1){const lo=Math.min(...series)-.5,hi=Math.max(...series)+.5;const points=series.map((v,i)=>`${i/(series.length-1)*100},${70-(v-lo)/(hi-lo)*56}`).join(' ');$('#sparkline').innerHTML=`<svg viewBox="0 0 100 83" preserveAspectRatio="none" aria-hidden="true"><polyline points="${points}" fill="none" stroke="#bba77d" stroke-width=".65" vector-effect="non-scaling-stroke"/></svg>`}else{$('#sparkline').innerHTML=''};
}
render();

// Navigation: smooth section jumps + active section tracking.
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
const navLinks=[...document.querySelectorAll('.site-header nav a[href^="#"]')];
const trackedSections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
function setActiveNav(id){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${id}`));}
navLinks.forEach(a=>a.addEventListener('click',e=>{
  const target=document.querySelector(a.getAttribute('href'));if(!target)return;
  e.preventDefault();setActiveNav(target.id);
  target.scrollIntoView({behavior:reduceMotion.matches?'auto':'smooth',block:'start'});
  history.replaceState(null,'',`#${target.id}`);
}));
if('IntersectionObserver' in window){
  const sectionObserver=new IntersectionObserver(entries=>{
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
    if(visible[0])setActiveNav(visible[0].target.id);
  },{root:null,rootMargin:'-18% 0px -62% 0px',threshold:[0,.01]});
  trackedSections.forEach(section=>sectionObserver.observe(section));
}

const canvas=$('#ambient'),ctx=canvas.getContext('2d');
let particles=[],w=0,h=0,mouse={x:0,y:0},frame=0;
const mobileParticles=()=>innerWidth<=720;
function makeParticle(){
  const mobile=mobileParticles(),depth=.45+Math.random()*.75;
  return {x:Math.random()*w,y:Math.random()*h,r:((mobile ? .55 : .4)+Math.random()*(mobile ? 1.15 : .7))*depth,v:((mobile ? .11 : .1)+Math.random()*(mobile ? .22 : .25))*depth,a:((mobile ? .10 : .07)+Math.random()*(mobile ? .19 : .13))*depth,phase:Math.random()*Math.PI*2,drift:(Math.random()-.5)*(mobile ? .075 : .045)};
}
function resize(){
  const dpr=Math.min(devicePixelRatio||1,2);
  w=canvas.width=Math.round(innerWidth*dpr);h=canvas.height=Math.round(innerHeight*dpr);
  const count=mobileParticles()?Math.min(48,Math.max(34,Math.floor(innerWidth/9))):Math.min(65,Math.floor(innerWidth/22));
  particles=Array.from({length:count},makeParticle);
}
resize();addEventListener('resize',resize);
addEventListener('pointermove',e=>{if(e.pointerType==='mouse'){mouse.x=(e.clientX/innerWidth-.5);mouse.y=(e.clientY/innerHeight-.5);document.documentElement.style.setProperty('--swan-x',`${mouse.x*-13}px`);document.documentElement.style.setProperty('--swan-y',`${mouse.y*-9}px`)}});
function draw(){
  ctx.clearRect(0,0,w,h);const mobile=mobileParticles(),dpr=Math.min(devicePixelRatio||1,2);
  for(const p of particles){
    p.y-=p.v*dpr;p.x+=(Math.sin(frame*.006+p.phase)*.045+p.drift)*dpr;
    if(p.y<-4*dpr){p.y=h+2*dpr;p.x=Math.random()*w}if(p.x<-5*dpr)p.x=w+4*dpr;if(p.x>w+5*dpr)p.x=-4*dpr;
    const twinkle=mobile ? .72+.28*Math.sin(frame*.018+p.phase) : 1;
    ctx.beginPath();ctx.arc(p.x+mouse.x*10*dpr,p.y+mouse.y*7*dpr,p.r*dpr,0,Math.PI*2);ctx.fillStyle=`rgba(204,186,143,${Math.max(.025,p.a*twinkle)})`;ctx.fill();
  }
  frame++;requestAnimationFrame(draw);
}
if(!reduceMotion.matches)draw();