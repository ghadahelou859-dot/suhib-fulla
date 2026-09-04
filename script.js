const cover=document.getElementById('cover');
const intro=document.getElementById('intro');
const invitation=document.getElementById('invitation');
const openBtn=document.getElementById('openBtn');
const introVideo=document.getElementById('introVideo');
const music=document.getElementById('music');
const musicBtn=document.getElementById('musicBtn');
const loader=document.getElementById('videoLoader');
const sequence=['opening.mp4','opening2.mp4'];
let seqIndex=0;
let started=false;

function show(el){[cover,intro,invitation].forEach(x=>x.classList.remove('active'));el.classList.add('active')}
function startMusic(){music.volume=.42;music.play().then(()=>{musicBtn.classList.add('visible');musicBtn.classList.remove('off')}).catch(()=>{musicBtn.classList.add('visible','off')})}
function playCurrentVideo(){loader.style.display='block';introVideo.src=sequence[seqIndex];introVideo.load();introVideo.play().then(()=>loader.style.display='none').catch(()=>loader.style.display='none')}
openBtn.addEventListener('click',()=>{
 if(started)return;started=true;show(intro);startMusic();playCurrentVideo();
});
introVideo.addEventListener('canplay',()=>loader.style.display='none');
introVideo.addEventListener('ended',()=>{
 seqIndex++;
 if(seqIndex<sequence.length){playCurrentVideo();return;}
 introVideo.pause();introVideo.removeAttribute('src');show(invitation);invitation.setAttribute('aria-hidden','false');invitation.scrollTop=0;
});
introVideo.addEventListener('error',()=>{
 seqIndex++;
 if(seqIndex<sequence.length){playCurrentVideo();}else{show(invitation);invitation.setAttribute('aria-hidden','false');}
});
musicBtn.addEventListener('click',()=>{
 if(music.paused){music.play().then(()=>musicBtn.classList.remove('off')).catch(()=>{});}else{music.pause();musicBtn.classList.add('off')}
});

const target=new Date('2026-09-19T19:00:00+03:00').getTime();
function updateCountdown(){
 let d=Math.max(0,target-Date.now());
 const days=Math.floor(d/86400000);d%=86400000;
 const hours=Math.floor(d/3600000);d%=3600000;
 const mins=Math.floor(d/60000);const secs=Math.floor((d%60000)/1000);
 document.getElementById('days').textContent=days;
 document.getElementById('hours').textContent=String(hours).padStart(2,'0');
 document.getElementById('minutes').textContent=String(mins).padStart(2,'0');
 document.getElementById('seconds').textContent=String(secs).padStart(2,'0');
}
updateCountdown();setInterval(updateCountdown,1000);

const modal=document.getElementById('rsvpModal');
document.getElementById('rsvpBtn').addEventListener('click',()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false')});
document.getElementById('closeModal').addEventListener('click',()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')});
modal.addEventListener('click',e=>{if(e.target===modal)document.getElementById('closeModal').click()});
document.getElementById('sendRsvp').addEventListener('click',()=>{
 const name=document.getElementById('guestName').value.trim()||'ضيف/ة';
 const count=document.getElementById('guestCount').value;
 const att=document.querySelector('input[name="att"]:checked').value;
 const msg=`تأكيد حضور زفاف صهيب وفلة%0Aالاسم: ${encodeURIComponent(name)}%0Aعدد الحضور: ${count}%0Aالحالة: ${encodeURIComponent(att)}`;
 window.open(`https://wa.me/970598494977?text=${msg}`,'_blank','noopener');
});
