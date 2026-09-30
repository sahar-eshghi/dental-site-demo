
const header=document.querySelector('.site-header');
const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
if(menuBtn){menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));}
window.addEventListener('scroll',()=>{header?.classList.toggle('scrolled',scrollY>20);});

document.querySelectorAll('.mega-toggle').forEach(item=>item.addEventListener('click',e=>{if(innerWidth<=760){e.preventDefault();item.parentElement.classList.toggle('open')}}));

const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');observer.unobserve(entry.target)}}),{threshold:.12});
reveals.forEach(el=>observer.observe(el));

document.querySelectorAll('[data-parallax]').forEach(box=>{
  const img=box.querySelector('img');
  const update=()=>{
    if(!img) return;
    const r=box.getBoundingClientRect();
    const progress=(innerHeight-r.top)/(innerHeight+r.height);
    const move=(progress-.5)*6;
    const scale=1.012+Math.abs(progress-.5)*.02;
    img.style.transform=`translateY(${move}px) scale(${scale})`;
  };
  window.addEventListener('scroll',update,{passive:true});
  update();
});

document.querySelectorAll('[data-count]').forEach(el=>{
 const target=Number(el.dataset.count||0);let done=false;
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!done){done=true;let n=0;const step=Math.max(1,Math.ceil(target/45));const tick=()=>{n+=step;if(n>=target){n=target}el.textContent=n.toLocaleString('fa-IR');if(n<target)requestAnimationFrame(tick)};tick();io.disconnect();}}));io.observe(el);
});

document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const heroCircle = document.querySelector(".hero-circle");

window.addEventListener("scroll", () => {
  if (!heroCircle) return;

  const scroll = window.scrollY;

  const y = Math.min(scroll * 0.08, 35);
  const scale = 1 + Math.min(scroll * 0.00015, 0.08);

  heroCircle.style.setProperty("--hero-y", `${y}px`);
  heroCircle.style.setProperty("--hero-scale", scale);
});// Section-level fade-up animation for the whole site.
document.querySelectorAll('main > section, main > .stat-row').forEach(section => {
  section.classList.add('fade-up-section');
});
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-up-section').forEach(section => sectionObserver.observe(section));


// Insurance carousel: discrete movement with automatic advance every 10 seconds.
document.addEventListener('DOMContentLoaded',()=>{
  const slider=document.querySelector('.insurance-slider');
  const viewport=slider?.querySelector('.insurance-viewport');
  const track=slider?.querySelector('.insurance-track');
  const items=track?Array.from(track.querySelectorAll('.insurance-circle')):[];
  const prev=slider?.querySelector('.insurance-prev');
  const next=slider?.querySelector('.insurance-next');
  if(!slider||!viewport||!track||!items.length) return;
  let index=0;
  const visibleCount=()=>window.innerWidth<=560?2:(window.innerWidth<=900?3:4);
  const update=()=>{
    const gap=parseFloat(getComputedStyle(track).gap)||16;
    const step=items[0].getBoundingClientRect().width+gap;
    const max=Math.max(0,items.length-visibleCount());
    index=Math.min(index,max);
    track.style.transform=`translateX(${-index*step}px)`;
  };
  const goNext=()=>{const max=Math.max(0,items.length-visibleCount());index=index>=max?0:index+1;update();};
  const goPrev=()=>{const max=Math.max(0,items.length-visibleCount());index=index<=0?max:index-1;update();};
  next?.addEventListener('click',goNext);
  prev?.addEventListener('click',goPrev);
  let timer=setInterval(goNext,10000);
  slider.addEventListener('mouseenter',()=>clearInterval(timer));
  slider.addEventListener('mouseleave',()=>{clearInterval(timer);timer=setInterval(goNext,10000);});
  window.addEventListener('resize',update,{passive:true});
  update();
});
