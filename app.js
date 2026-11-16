const $=id=>document.getElementById(id);let S={settings:{},players:[],matches:[]};
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const val=c=>c?(c.f??c.v??''):'';
async function tab(n){const r=await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(n)}&_=${Date.now()}`);
 const t=await r.text(),j=JSON.parse(t.slice(t.indexOf('{'),t.lastIndexOf('}')+1));let h=j.table.cols.map(c=>(c.label||'').trim()),rows=j.table.rows||[];
 if(h.every(x=>!x)&&rows.length){h=rows[0].c.map(c=>String(val(c)).trim());rows=rows.slice(1)}
 return rows.map(r=>Object.fromEntries(h.map((k,i)=>[k||'c'+i,val(r.c[i])]))).filter(o=>Object.values(o).some(v=>String(v).trim()))}
function standings(){const m={};S.players.forEach(p=>m[p.name]={n:p.name,p:0,w:0,l:0});
 S.matches.forEach(x=>{const a=m[x.player1],b=m[x.player2],r=String(x.result).trim().toLowerCase();if(!a||!b)return;
  if(r=='p1'){a.w++;b.l++}else if(r=='p2'){b.w++;a.l++}else return;a.p++;b.p++});
 return Object.values(m).sort((x,y)=>y.w-x.w||x.l-y.l||x.n.localeCompare(y.n))}
function render(){const s=S.settings;
 $('maps').href=MAPS_URL;
 if(s.format)$('format').textContent=s.format;$('when').textContent=[s.eventDate,s.time].filter(Boolean).join(' · ')||'Dates to be announced';
 $('champ').hidden=!s.winner;if(s.winner){$('cn').textContent=s.winner;$('rn').textContent=s.runnerUp?'Runner-up: '+s.runnerUp:''}
 $('pc').textContent=S.players.length?'('+S.players.length+')':'';
 const q=$('q').value.trim().toLowerCase(),ps=S.players.filter(p=>String(p.name).toLowerCase().includes(q));
 $('players').innerHTML=ps.length?ps.map(p=>`<div class="pl">${esc(p.name)}<small>${esc(p.status||'Registered')}</small></div>`).join(''):'<div class="empty">No players yet.</div>';
 const rs=[...new Set(S.matches.map(m=>m.round).filter(Boolean))],f=$('rf'),old=f.value;
 f.innerHTML='<option value="all">All rounds</option>'+rs.map(r=>`<option>${esc(r)}</option>`).join('');f.value=rs.includes(old)?old:'all';
 const ms=f.value=='all'?S.matches:S.matches.filter(m=>m.round==f.value);
 $('list').innerHTML=ms.length?ms.map(m=>{const r=String(m.result).trim().toLowerCase();
  return `<div class="m"><div class="rd">${esc(m.round||'Match')}</div><div class="${r=='p1'?'w':''}"><b>${esc(m.player1)}</b></div><div class="vs">VS</div><div class="${r=='p2'?'w':''}"><b>${esc(m.player2)}</b></div>
  <div class="mt">📅 ${esc(m.date||'TBA')} ⏰ ${esc(m.time||'TBA')}${m.court?'<br>Court '+esc(m.court):''}<span class="sc">${esc(m.score||m.result||'Pending')}</span></div></div>`}).join(''):'<div class="empty">No matches published yet.</div>';
 const st=standings();$('st').innerHTML=st.length?st.map((r,i)=>`<tr><td>${i+1}</td><td>${esc(r.n)}</td><td>${r.p}</td><td>${r.w}</td><td>${r.l}</td><td>${r.w}</td></tr>`).join(''):'<tr><td colspan="6">No standings yet.</td></tr>';
 $('up').textContent='Updated '+new Date().toLocaleString('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}
async function load(){if(!SHEET_ID){$('up').textContent='Connect a Google Sheet in config.js to show live data';return render()}
 try{const [a,p,m]=await Promise.all([tab(SHEET_TABS.settings),tab(SHEET_TABS.players),tab(SHEET_TABS.matches)]);
  const s={};a.forEach(r=>{const k=Object.keys(r);if(String(r[k[0]]).trim())s[String(r[k[0]]).trim()]=r[k[1]]});S={settings:s,players:p,matches:m};render()}
 catch(e){console.error(e);$('up').textContent='Could not load the sheet. Check it is shared as "Anyone with the link can view".'}}
$('q').oninput=render;$('rf').onchange=render;load();setInterval(load,window.REFRESH_MS||30000);
