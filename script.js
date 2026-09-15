const selections=[];
const history=[
  {date:'2026-09-15',league:'英超',match:'利兹联 4-1 纽卡斯尔',pick:'利兹联 胜',odds:2.32,result:'WIN'}
];
const $=s=>document.querySelector(s);
function render(){
  $('#date-label').textContent=new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'Asia/Shanghai'}).format(new Date()).replaceAll('/','.');
  $('#selection-grid').innerHTML=selections.slice(0,2).map((s,i)=>`<article class="selection-card"><div class="card-top"><span class="card-index">SELECTION 0${i+1}</span><span class="card-league">${s.league}</span></div><h3 class="card-match">${s.home}<em>VS</em>${s.away}</h3><div class="card-pick"><span>预测方向</span><strong>${s.pick}</strong><b>${s.odds?`@ ${s.odds}`:'赔率待补'}</b></div><div class="card-bottom"><span>比赛时间 <time>${s.time}</time></span><span>发布 ${s.published}</span></div></article>`).join('')||'<div class="empty-state">NO POSITION TODAY<br>今日无符合标准的机会</div>';
  $('#history-body').innerHTML=history.map(r=>`<tr><td>${r.date}<small>${r.league}</small></td><td>${r.match}</td><td>${r.pick}</td><td>@ ${r.odds.toFixed(2)}</td><td><span class="result ${r.result.toLowerCase()}">${r.result}</span></td></tr>`).join('');
  const wins=history.filter(r=>r.result==='WIN').length, losses=history.filter(r=>r.result==='LOSS').length;
  const profit=history.reduce((a,r)=>a+(r.result==='WIN'?r.odds-1:-1),0);
  $('#roi-value').textContent=`${profit>=0?'+':''}${(profit/history.length*100).toFixed(1)}%`;
  $('#total-value').textContent=String(history.length).padStart(2,'0');
  $('#hit-value').textContent=`${(wins/(wins+losses)*100).toFixed(1)}%`;
  const latestMonth=history[0]?.date.slice(0,7);
  const monthly=history.filter(r=>r.date.startsWith(latestMonth));
  const monthlyProfit=monthly.reduce((a,r)=>a+(r.result==='WIN'?r.odds-1:-1),0);
  const monthlyReturn=monthlyProfit/monthly.length*100;
  $('#monthly-value').textContent=`${monthlyReturn>=0?'+':''}${monthlyReturn.toFixed(1)}%`;
  $('#monthly-period').textContent=`${latestMonth.replace('-','.')} · 已结算`;
  const recent=history.slice(0,10);
  $('#recent-value').textContent=`${recent.filter(r=>r.result==='WIN').length} / ${recent.filter(r=>r.result==='LOSS').length}`;
  let running=0;const series=[0,...[...history].reverse().map(r=>(running+=r.result==='WIN'?r.odds-1:-1))];const lo=Math.min(...series)-.5,hi=Math.max(...series)+.5;const points=series.map((v,i)=>`${i/(series.length-1)*100},${70-(v-lo)/(hi-lo)*56}`).join(' ');$('#sparkline').innerHTML=`<svg viewBox="0 0 100 83" preserveAspectRatio="none" aria-hidden="true"><polyline points="${points}" fill="none" stroke="#bba77d" stroke-width=".65" vector-effect="non-scaling-stroke"/></svg>`;
}
render();
const canvas=$('#ambient'),ctx=canvas.getContext('2d');let particles=[],w=0,h=0,mouse={x:0,y:0};function resize(){w=canvas.width=innerWidth*devicePixelRatio;h=canvas.height=innerHeight*devicePixelRatio;particles=Array.from({length:Math.min(65,Math.floor(innerWidth/22))},()=>({x:Math.random()*w,y:Math.random()*h,r:(.4+Math.random()*.7)*devicePixelRatio,v:.1+Math.random()*.25,a:.07+Math.random()*.13}))}resize();addEventListener('resize',resize);addEventListener('pointermove',e=>{mouse.x=(e.clientX/innerWidth-.5);mouse.y=(e.clientY/innerHeight-.5);document.documentElement.style.setProperty('--swan-x',`${mouse.x*-13}px`);document.documentElement.style.setProperty('--swan-y',`${mouse.y*-9}px`)});let frame=0;function draw(){ctx.clearRect(0,0,w,h);for(const p of particles){p.y-=p.v*devicePixelRatio;p.x+=Math.sin(frame*.004+p.y*.004)*.06*devicePixelRatio;if(p.y<0){p.y=h;p.x=Math.random()*w}ctx.beginPath();ctx.arc(p.x+mouse.x*12*devicePixelRatio,p.y+mouse.y*9*devicePixelRatio,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(204,186,143,${p.a})`;ctx.fill()}frame++;requestAnimationFrame(draw)}if(!matchMedia('(prefers-reduced-motion: reduce)').matches)draw();