'use strict';
const config = window.FORGE_CONFIG || {};
const safeUrl = url => typeof url === 'string' && !/^\s*(?:javascript|data|vbscript):/i.test(url);
if (config.paperUrl && safeUrl(config.paperUrl)) document.querySelectorAll('a[href="assets/papers/forge.pdf"]').forEach(a => a.href = config.paperUrl);
if (config.codeUrl && safeUrl(config.codeUrl)) { const a = document.querySelector('#code-link'); a.href = config.codeUrl; a.hidden = false; }
if (config.bibtex) document.querySelector('#citation').textContent = config.bibtex;
const examples = {
  face: {image:'assets/images/face.png',alt:'Face-manipulated example of a woman in gray',type:'FACE-MANIPULATED',question:"Do the person's eyebrows look real or fake?",answer:"The person's eyebrows look fake. The eyebrows look asymmetric, broken, and drawn on the face through computer editing.",cue:'Eyebrows · asymmetry and broken contours',region:[43,22,19,15]},
  synthetic: {image:'assets/images/qualitative.png',alt:'Fully AI-generated example of a cyclist wearing a blue and brown hoodie',type:'FULLY SYNTHETIC',question:'Does the image look real or fake?',answer:"The image looks fake, with unrealistic texture. The person's hoodie looks mismatched with exaggerated colors.",cue:'Clothing · unrealistic texture and exaggerated colors (condensed response)',region:[51,4,42,58]},
  real: {image:'assets/images/real.png',alt:'Authentic image of a woman in a NASA studio',type:'AUTHENTIC',question:'Does the image look real or fake?',answer:"The image looks real. The person exhibits natural skin textures.",cue:'Skin · natural texture',region:[48,24,14,31]}
};
let currentExample = 'face';
function setExample(key) {
 currentExample=key; const ex=examples[key]; const img=document.querySelector('#sample-image'); img.src=ex.image;img.alt=ex.alt;
 document.querySelector('#example-image').classList.toggle('synthetic',key==='synthetic');
 document.querySelector('#sample-question').textContent=ex.question;document.querySelector('#sample-answer').textContent=ex.answer;document.querySelector('#sample-cue').textContent=ex.cue;document.querySelector('#sample-type').textContent=ex.type;
 const box=document.querySelector('#sample-region'); ['left','top','width','height'].forEach((k,i)=>box.style[k]=ex.region[i]+'%');
 document.querySelectorAll('[data-example]').forEach(b=>{const active=b.dataset.example===key;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
}
document.querySelectorAll('[data-example]').forEach(b=>b.addEventListener('click',()=>setExample(b.dataset.example)));
document.querySelector('#show-regions').addEventListener('change',e=>document.querySelector('#sample-region').hidden=!e.target.checked);
const datasets = {
 dd:{name:'DD-VQA · Face-manipulated images',accuracy:'94.12',rhr:'12.7',fp:'84.6',baseline:'28.9',bars:[['Pretrained PaliGemma2',64.3],['ForgerySleuth',39.7],['FakeShield',36.4],['BLIP-TI',41.2],['No-VOM ablation',28.9],['FORGE',12.7]],human:[['Faithfulness',3.58,4.31],['Specificity',3.41,4.18],['Forensic helpfulness',3.47,4.12]]},
 dvf:{name:'DVF · Fully synthetic images',accuracy:'94.47',rhr:'15.4',fp:'81.3',baseline:'30.1',bars:[['Pretrained PaliGemma2',58.7],['FakeShield',38.6],['MM-Det',35.2],['No-VOM ablation',30.1],['FORGE',15.4]],human:[['Faithfulness',3.42,4.24],['Specificity',3.18,4.06],['Forensic helpfulness',3.31,4.09]]}
};
function setDataset(key) {
 const d=datasets[key];document.querySelector('#dataset-description').textContent=d.name;
 for(const [id,value] of [['accuracy',d.accuracy],['hallucination',d.rhr],['precision',d.fp]]) document.getElementById(id).innerHTML=value+'<span>%</span>';
 document.querySelector('#hallucination-baseline').textContent='vs. '+d.baseline+'% without the VOM · Table 4';
 document.querySelector('#hallucination-chart').innerHTML=d.bars.map(([label,value])=>`<div class="bar-row ${label==='FORGE'?'ours':''}"><div class="bar-label"><span>${label}</span><b>${value.toFixed(1)}%</b></div><div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:${value}%"></div></div></div>`).join('');
 document.querySelector('#human-chart').innerHTML=d.human.map(([name,baseline,forge])=>`<div class="human-row"><div class="human-name">${name}</div><div class="human-pair" aria-label="No-VOM ablation: ${baseline}"><div class="human-track" aria-hidden="true"><div class="human-fill" style="width:${baseline/5*100}%"></div></div><span>${baseline.toFixed(2)}</span></div><div class="human-pair ours" aria-label="FORGE: ${forge}"><div class="human-track" aria-hidden="true"><div class="human-fill" style="width:${forge/5*100}%"></div></div><span>${forge.toFixed(2)}</span></div></div>`).join('');
 document.querySelectorAll('[data-dataset]').forEach(b=>{const active=b.dataset.dataset===key;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
}
document.querySelectorAll('[data-dataset]').forEach(b=>b.addEventListener('click',()=>setDataset(b.dataset.dataset)));setDataset('dd');
const dialog=document.querySelector('#lightbox');let previousFocus;
document.querySelectorAll('[data-lightbox]').forEach(b=>b.addEventListener('click',()=>{previousFocus=b;const image=document.querySelector('#lightbox-image');image.src=b.dataset.lightbox;image.alt=b.querySelector('img').alt;dialog.showModal();}));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dialog.close();}});dialog.addEventListener('close',()=>previousFocus?.focus());
document.querySelector('#copy-citation').addEventListener('click',async()=>{const text=document.querySelector('#citation').textContent;const status=document.querySelector('#copy-status');try{if(!navigator.clipboard)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(text);status.textContent='BibTeX copied.';}catch{const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(document.querySelector('#citation'));selection.removeAllRanges();selection.addRange(range);status.textContent='Citation selected. Press Ctrl+C (or Command+C) to copy.';}});
