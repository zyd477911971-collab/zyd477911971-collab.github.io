const selections=[];
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
  $('#date-label').textContent=new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'Asia/Shanghai'}).format(new Date()).replaceAll('/','.');
  $('#selection-grid').innerHTML=selections.slice(0,2).map((s,i)=>`<article class="selection-card"><div class="card-top"><span class="card-index">SELECTION 0${i+1}</span><span class="card-league">${s.league}</span></div><h3 class="card-match">${s.home}<em>VS</em>${s.away}</h3><div class="card-pick"><span>预测方向</span><strong>${s.pick}</strong><b>${s.odds?`@ ${s.odds}`:'赔率待补'}</b></div><div class="card-bottom"><span>比赛时间 <time>${s.time}</time></span><span>发布 ${s.published}</span></div></article>`).join('')||'<div class="empty-state">NO POSITION TODAY<br>今日无符合标准的机会</div>';
  $('#history-body').innerHTML=history.map(r=>`<tr><td>${r.date}<small>${r.league}${r.recordAt?` · ${r.recordAt}`:''}</small></td><td>${r.match}</td><td>${r.pick}</td><td>${Number.isFinite(r.odds)?`@ ${r.odds.toFixed(2)}`:'—'}</td><td><span class="result ${r.result.toLowerCase()}">${r.result}</span></td></tr>`).join('');
  const wins=history.filter(r=>r.result==='WIN').length, losses=history.filter(r=>r.result==='LOSS').length;
  const priced=history.filter(r=>Number.isFinite(r.odds));
  const profit=priced.reduce((a,r)=>a+(r.result==='WIN'?r.odds-1:-1),0);
  $('#roi-value').textContent=priced.length?`${profit>=0?'+':''}${(profit/priced.length*100).toFixed(1)}%`:'—';
  const roiNote=document.querySelector('.primary-stat p');if(roiNote)roiNote.textContent=priced.length===history.length?`全部 ${priced.length} 场按固定 1 单位投入计算`:`仅按 ${priced.length} 场有赔率记录、每场固定 1 单位计算`;
  $('#total-value').textContent=String(history.length).padStart(2,'0');
  $('#hit-value').textContent=(wins+losses)?`${(wins/(wins+losses)*100).toFixed(1)}%`:'—';
  const latestMonth=history[0]?.date.slice(0,7);
  const monthly=priced.filter(r=>r.date.startsWith(latestMonth));
  const monthlyProfit=monthly.reduce((a,r)=>a+(r.result==='WIN'?r.odds-1:-1),0);
  $('#monthly-value').textContent=monthly.length?`${monthlyProfit>=0?'+':''}${(monthlyProfit/monthly.length*100).toFixed(1)}%`:'—';
  $('#monthly-period').textContent=latestMonth?`${latestMonth.replace('-','.')} · ${monthly.length} 场已结算`:'—';
  const recent=history.slice(0,10);
  $('#recent-value').textContent=`${recent.filter(r=>r.result==='WIN').length} / ${recent.filter(r=>r.result==='LOSS').length}`;
  let running=0;const series=[0,...[...priced].reverse().map(r=>(running+=r.result==='WIN'?r.odds-1:-1))];if(series.length>1){const lo=Math.min(...series)-.5,hi=Math.max(...series)+.5;const points=series.map((v,i)=>`${i/(series.length-1)*100},${70-(v-lo)/(hi-lo)*56}`).join(' ');$('#sparkline').innerHTML=`<svg viewBox="0 0 100 83" preserveAspectRatio="none" aria-hidden="true"><polyline points="${points}" fill="none" stroke="#bba77d" stroke-width=".65" vector-effect="non-scaling-stroke"/></svg>`}else{$('#sparkline').innerHTML=''};
}
render();
const canvas=$('#ambient'),ctx=canvas.getContext('2d');let particles=[],w=0,h=0,mouse={x:0,y:0};function resize(){w=canvas.width=innerWidth*devicePixelRatio;h=canvas.height=innerHeight*devicePixelRatio;particles=Array.from({length:Math.min(65,Math.floor(innerWidth/22))},()=>({x:Math.random()*w,y:Math.random()*h,r:(.4+Math.random()*.7)*devicePixelRatio,v:.1+Math.random()*.25,a:.07+Math.random()*.13}))}resize();addEventListener('resize',resize);addEventListener('pointermove',e=>{mouse.x=(e.clientX/innerWidth-.5);mouse.y=(e.clientY/innerHeight-.5);document.documentElement.style.setProperty('--swan-x',`${mouse.x*-13}px`);document.documentElement.style.setProperty('--swan-y',`${mouse.y*-9}px`)});let frame=0;function draw(){ctx.clearRect(0,0,w,h);for(const p of particles){p.y-=p.v*devicePixelRatio;p.x+=Math.sin(frame*.004+p.y*.004)*.06*devicePixelRatio;if(p.y<0){p.y=h;p.x=Math.random()*w}ctx.beginPath();ctx.arc(p.x+mouse.x*12*devicePixelRatio,p.y+mouse.y*9*devicePixelRatio,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(204,186,143,${p.a})`;ctx.fill()}frame++;requestAnimationFrame(draw)}if(!matchMedia('(prefers-reduced-motion: reduce)').matches)draw();