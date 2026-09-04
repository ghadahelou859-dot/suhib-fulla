const cover=document.getElementById('cover');
const intro=document.getElementById('intro');
const pages=document.getElementById('pages');
const openBtn=document.getElementById('openBtn');
const introVideo=document.getElementById('introVideo');
const music=document.getElementById('music');
const musicBtn=document.getElementById('musicBtn');
const introFiles=['opening.mp4','opening2.mp4'];
let introIndex=0;

function show(screen){[cover,intro,pages].forEach(s=>s.classList.remove('active'));screen.classList.add('active');}
function playIntro(index){
  if(index>=introFiles.length){show(pages);pages.scrollTop=0;return;}
  introVideo.src=introFiles[index];
  introVideo.load();
  introVideo.play().catch(()=>{introIndex++;playIntro(introIndex)});
}
openBtn.addEventListener('click',async()=>{
  show(intro);musicBtn.style.display='block';music.volume=.42;
  try{await music.play()}catch(e){}
  introIndex=0;playIntro(introIndex);
});
introVideo.addEventListener('ended',()=>{introIndex++;playIntro(introIndex)});
introVideo.addEventListener('error',()=>{introIndex++;playIntro(introIndex)});
musicBtn.addEventListener('click',async()=>{
  if(music.paused){try{await music.play()}catch(e){}musicBtn.textContent='🔊';}
  else{music.pause();musicBtn.textContent='🔇';}
});

const weddingTime=new Date('2026-09-19T19:00:00+03:00').getTime();
function tick(){
  let d=Math.max(0,weddingTime-Date.now());
  document.getElementById('days').textContent=Math.floor(d/86400000);
  document.getElementById('hours').textContent=String(Math.floor((d%86400000)/3600000)).padStart(2,'0');
  document.getElementById('minutes').textContent=String(Math.floor((d%3600000)/60000)).padStart(2,'0');
  document.getElementById('seconds').textContent=String(Math.floor((d%60000)/1000)).padStart(2,'0');
}
tick();setInterval(tick,1000);

const modal=document.getElementById('rsvpModal');
document.getElementById('rsvpBtn').addEventListener('click',()=>{modal.classList.add('show');modal.setAttribute('aria-hidden','false')});
document.getElementById('closeRsvp').addEventListener('click',()=>{modal.classList.remove('show');modal.setAttribute('aria-hidden','true')});
modal.addEventListener('click',e=>{if(e.target===modal){modal.classList.remove('show');modal.setAttribute('aria-hidden','true')}});
document.getElementById('sendRsvp').addEventListener('click',()=>{
  const name=document.getElementById('guestName').value.trim();
  if(!name){alert('اكتب الاسم أولاً');return;}
  const count=document.getElementById('guestCount').value;
  const status=document.querySelector('input[name="attendance"]:checked').value;
  const message=`تأكيد حضور زفاف صهيب وفلة\nالاسم: ${name}\nعدد الحضور: ${count}\nالحالة: ${status}`;
  window.open('https://wa.me/970598494977?text='+encodeURIComponent(message),'_blank');
});
