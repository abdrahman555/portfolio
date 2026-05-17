// GSAP-driven cinematic interactions (parallax, reveals, particles)
(function(){
  if(typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero intro
  gsap.from('.hero-content',{y:40,opacity:0,duration:1.2,ease:'power3.out'});
  gsap.from('.hero-badge',{y:20,opacity:0,duration:.9,delay:.15});

  // Parallax for hero background
  const heroBg = document.querySelector('.hero-bg');
  if(heroBg){
    // stronger cinematic zoom-out so the hero image opens up more visibly
    gsap.set(heroBg,{scale:1.2, transformOrigin:'50% 50%'});
    gsap.to(heroBg,{scale:0.9, duration:3.2, ease:'power2.out'});

    // parallax using ScrollTrigger so transform composes with scale
    gsap.to(heroBg,{
      y: 120,
      ease: 'none',
      scrollTrigger:{
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // Title intro animation
  const title = document.querySelector('.site-title');
  const subtitle = document.querySelector('.site-sub');
  const ctas = document.querySelectorAll('.hero-ctas .btn');
  if(title){
    gsap.from(title,{y:30,opacity:0,duration:1.1,delay:0.6,ease:'power3.out'});
    gsap.from(subtitle,{y:20,opacity:0,duration:1,delay:0.9});
    gsap.from(ctas,{y:18,opacity:0,duration:0.8,delay:1.1,stagger:0.12});
  }

  // Reveal sections with ScrollTrigger
  document.querySelectorAll('.reveal').forEach(el=>{
    gsap.fromTo(el,{y:24,opacity:0},{y:0,opacity:1,duration:1,scrollTrigger:{trigger:el,start:'top 85%'}});
  });

  // Floating subtle particles canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'particles';
  canvas.style.position='absolute';
  canvas.style.inset='0';
  canvas.style.pointerEvents='none';
  canvas.style.zIndex='1';
  document.querySelector('.hero')?.appendChild(canvas);
  const ctx = canvas.getContext?.('2d');
  let W,H, particles=[];
  function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}
  window.addEventListener('resize', resize); resize();
  function make(){particles=[];for(let i=0;i<60;i++){particles.push({x:Math.random()*W,y:Math.random()*H*0.6,r:Math.random()*1.8+0.3,dx:(Math.random()-.5)*0.25,dy:(Math.random()-.5)*0.25})}}
  if(ctx){make();function draw(){ctx.clearRect(0,0,W,H);particles.forEach(p=>{p.x+=p.dx;p.y+=p.dy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;p.y+=Math.sin(performance.now()/600+p.x)*0.001;ctx.beginPath();ctx.fillStyle='rgba(255,255,255,0.06)';ctx.shadowBlur=14;ctx.shadowColor='rgba(0,200,255,0.06)';ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();});requestAnimationFrame(draw)}draw();}
})();
