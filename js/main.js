(function(){
"use strict";
var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var coarse = window.matchMedia('(pointer: coarse)').matches;

/* ---------- data ---------- */
var values = [
  ['01','Creativity with purpose','Every idea serves the client\u2019s goal, not just looks good.'],
  ['02','Flawless execution','Details, timing and safety are never left to luck.'],
  ['03','Full ownership','One accountable team from first brief to final guest.'],
  ['04','Partnership','An extension of your team, with honest advice and clear communication.'],
  ['05','Guest excellence','Every guest is treated as important, from the VIP lounge to the entrance queue.'],
  ['06','Innovation','We adopt new technology, formats and ideas before they become standard.']
];
var services = {
  events:[
    ['Concept & planning','Theme, run of show, budgets, permits and approvals.'],
    ['Production & setup','Stages, structures, scenic build and site installation.'],
    ['Lighting, sound & visuals','Lighting design, sound systems, LED screens, projection and effects.'],
    ['Decoration & design','Venue styling, florals and branded spaces.'],
    ['Logistics','Transport, equipment, suppliers, load-in and load-out.'],
    ['Crowd & security','Entry flow, safety planning, trained staff and emergency procedures.'],
    ['Ticketing','Design, sales, registration, access control and attendee data.'],
    ['VIP & guest relations','Invitations, hospitality, lounges, protocol and personal service.'],
    ['Client relations','A dedicated manager, clear reporting and a post-event review.'],
    ['Talent & entertainment','Artists, hosts, speakers, performers and show programming.']
  ],
  marketing:[
    ['Brand strategy & identity','Positioning, naming, logo, visual identity and guidelines.'],
    ['Social media marketing','Strategy, content, community management and influencers.'],
    ['Advertising management','Paid campaigns on social, search and display, with reporting.'],
    ['Digital marketing','Websites, SEO, email campaigns and analytics.'],
    ['Media production','Photo, video, motion graphics, event films and live streaming.'],
    ['PR & communications','Press, media relations, launch campaigns and reputation.'],
    ['Offline marketing','Outdoor, print, activations and promotional teams.'],
    ['Experiential marketing','Pop-ups, roadshows, brand activations and sampling.'],
    ['Sponsorship & partnerships','Sponsor packages, partnerships and activation.']
  ]
};
var svcDetails = {
  events:[
    'We shape the idea into a full plan: theme, run of show, budgets, permits and approvals, all settled before anything gets built.',
    'Stages, structures, scenic build and site installation, engineered and tested by our own crews.',
    'Lighting design, sound systems, LED screens, projection and effects, programmed to the second.',
    'Venue styling, florals and branded spaces that carry the concept into every corner.',
    'Transport, equipment, suppliers, load-in and load-out, scheduled so nothing waits on anything.',
    'Entry flow, safety planning, trained staff and emergency procedures that keep every guest safe.',
    'Design, sales, registration, access control and attendee data, from first ticket to final scan.',
    'Invitations, hospitality, lounges, protocol and personal service for the guests who matter most.',
    'A dedicated manager, clear reporting and a post-event review. You always know where things stand.',
    'Artists, hosts, speakers, performers and show programming, booked and briefed by us.'
  ],
  marketing:[
    'Positioning, naming, logo, visual identity and guidelines that make the brand unmistakable.',
    'Strategy, content, community management and influencers, run as one calendar.',
    'Paid campaigns on social, search and display, with reporting that shows what every pound did.',
    'Websites, SEO, email campaigns and analytics that keep working between events.',
    'Photo, video, motion graphics, event films and live streaming from our in-house team.',
    'Press, media relations, launch campaigns and reputation management.',
    'Outdoor, print, activations and promotional teams that take the brand to the street.',
    'Pop-ups, roadshows, brand activations and sampling people actually stop for.',
    'Sponsor packages, partnerships and activation that help pay for the moment.'
  ]
};
var steps = [
  ['Discover','We listen to the brief, the audience, the budget and the goal.'],
  ['Design','Concept, plan, visuals and budget, presented for approval.'],
  ['Prepare','Suppliers, permits, talent booked and every material produced.'],
  ['Build','Our crews set up, test and rehearse on site.'],
  ['Deliver','A command team runs the event live, on the ground.'],
  ['Review','A results report and lessons for the next project.']
];
var why = [
  ['One team, A to Z','Events and marketing together, so the campaign and the event tell one story.'],
  ['A single point of contact','One manager, one plan, one invoice.'],
  ['In-house capability','Production, creative and media under our control, for faster decisions and tighter quality.'],
  ['Guest-first thinking','We design for the experience of the attendee, not only the stage.'],
  ['Measurable results','Every project ends with clear numbers on reach, attendance and return.']
];
var lines = ['Nothing left to chance.','From first idea to final applause.','Where every moment is a winning hand.','Premium events. Powerful brands.','For those who expect more.'];

/* ---------- preloader ---------- */
var loader = document.getElementById('loader');
startHero();

/* ---------- nav ---------- */
var nav = document.getElementById('nav');

/* ---------- cursor ---------- */
if(!coarse && !reduced){
  var dot = document.querySelector('.cursor-dot'), ring = document.querySelector('.cursor-ring');
  var mx=-100,my=-100,rx=-100,ry=-100;
  window.addEventListener('mousemove', function(e){ mx=e.clientX; my=e.clientY; dot.style.transform='translate('+(mx-4)+'px,'+(my-4)+'px)'; });
  (function loop(){ rx+=(mx-rx)*.14; ry+=(my-ry)*.14; ring.style.transform='translate('+(rx-18)+'px,'+(ry-18)+'px)'; requestAnimationFrame(loop); })();
  document.querySelectorAll('a,button,.chip,.svc,.v-card,.why-row').forEach(function(el){
    el.addEventListener('mouseenter', function(){ ring.classList.add('hovering'); });
    el.addEventListener('mouseleave', function(){ ring.classList.remove('hovering'); });
  });
}

/* ---------- hero: pendulum lamp + flashlight ---------- */
var pend = document.getElementById('pendulum'), secret = document.getElementById('secret');
var ang = reduced ? 0 : .28, vel = 0, heroEl = document.getElementById('top'), secretX=-500, secretY=-500, autoT=0, heroMx=0.5, heroMy=0.5;
var heroLive = true;
new IntersectionObserver(function(es){ heroLive = es[0].isIntersecting; }, {root: pagesEl}).observe(heroEl);
function pendLoop(){
  if(!heroLive){ requestAnimationFrame(pendLoop); return; }
  if(!reduced){
    var force = -ang*.0022 + (heroMx-.5)*.00035;
    vel += force; vel *= .9985; ang += vel;
    pend.style.transform = 'rotate('+(ang*57.3)+'deg)';
  }
  if(coarse){ autoT+=0.008; secretX = heroEl.clientWidth*(.5+.34*Math.sin(autoT*1.7)); secretY = heroEl.clientHeight*(.55+.2*Math.sin(autoT*2.3)); }
  secret.style.setProperty('--mx', secretX+'px'); secret.style.setProperty('--my', secretY+'px');
  requestAnimationFrame(pendLoop);
}
heroEl.addEventListener('mousemove', function(e){
  var r = heroEl.getBoundingClientRect();
  heroMx = (e.clientX-r.left)/r.width; heroMy = (e.clientY-r.top)/r.height;
  secretX = e.clientX-r.left; secretY = e.clientY-r.top;
});
heroEl.addEventListener('click', function(){ vel += (Math.random()>.5?1:-1)*.02; flash(); });
function startHero(){ if(!reduced){ ang=.34; vel=0; } }

/* lamp flash on hero click */
function flash(){
  pend.classList.remove('flash'); void pend.offsetWidth; pend.classList.add('flash');
  setTimeout(function(){ pend.classList.remove('flash'); }, 450);
}

/* ---------- reveal on scroll ---------- */
var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {threshold:.06});
document.querySelectorAll('.reveal,.drop,.slide-l,.slide-r').forEach(function(el){ io.observe(el); });

/* ---------- build values ---------- */
var vg = document.getElementById('valuesGrid');
values.forEach(function(v){
  var d = document.createElement('div'); d.className='v-card reveal';
  d.innerHTML = '<div class="v-num">'+v[0]+'</div><h3>'+v[1]+'</h3><p>'+v[2]+'</p>';
  d.addEventListener('click', function(){ d.classList.remove('pulse'); void d.offsetWidth; d.classList.add('pulse'); });
  vg.appendChild(d); io.observe(d);
});
if(!coarse && !reduced){
  vg.addEventListener('mousemove', function(e){
    var c = e.target.closest('.v-card'); if(!c) return;
    var r = c.getBoundingClientRect(), x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
    c.style.setProperty('--gx', x*100+'%'); c.style.setProperty('--gy', y*100+'%');
    c.style.transform = 'perspective(700px) rotateY('+((x-.5)*8)+'deg) rotateX('+((.5-y)*8)+'deg)';
  });
  vg.addEventListener('mouseleave', function(){ vg.querySelectorAll('.v-card').forEach(function(c){ c.style.transform=''; }); });
}

/* ---------- build services toggle ---------- */
var svcGrid = document.getElementById('svcGrid'), toggle = document.getElementById('toggle');
var whatImg = document.getElementById('whatImg'), whatImgCard = document.getElementById('whatImgCard');
var whatImgs = {
  events: ['assets/images/stock-events.jpg', 'A roaring crowd under stage smoke and lights'],
  marketing: ['assets/images/stock-marketing.jpg', 'The team shaping a campaign around the table']
};
function renderServices(tab){
  svcGrid.innerHTML='';
  services[tab].forEach(function(s,i){
    var d=document.createElement('div'); d.className='svc';
    d.innerHTML='<div class="n">'+String(i+1).padStart(2,'0')+'</div><div><h3>'+s[0]+'</h3><p>'+s[1]+'</p></div>';
    d.addEventListener('click', function(){ openSvc(tab, i); });
    svcGrid.appendChild(d);
    setTimeout(function(){ d.classList.add('shown'); }, reduced ? 0 : i*55);
  });
}
toggle.querySelectorAll('button').forEach(function(b){
  b.addEventListener('click', function(){
    if(b.classList.contains('on')) return;
    toggle.querySelectorAll('button').forEach(function(x){ x.classList.remove('on'); });
    b.classList.add('on');
    toggle.classList.toggle('marketing', b.dataset.tab==='marketing');
    renderServices(b.dataset.tab);
    if(whatImg){
      whatImg.src = whatImgs[b.dataset.tab][0]; whatImg.alt = whatImgs[b.dataset.tab][1];
      whatImgCard.classList.remove('swap'); void whatImgCard.offsetWidth; whatImgCard.classList.add('swap');
    }
  });
});
renderServices('events');

/* ---------- moments accordion ---------- */
document.querySelectorAll('.acc-panel').forEach(function(p){
  function activate(){ document.querySelectorAll('.acc-panel').forEach(function(x){ x.classList.remove('on'); }); p.classList.add('on'); }
  p.addEventListener('mouseenter', function(){ if(!coarse) activate(); });
  p.addEventListener('click', function(){
    var im = p.querySelector('img');
    if(coarse || window.innerWidth<=700){ activate(); openLight(im.getAttribute('src'), im.alt); return; }
    if(p.classList.contains('on')){
      openLight(im.getAttribute('src'), im.alt);
    } else activate();
  });
});

/* ---------- scroller: nav state, watermark drift, parallax ---------- */
var pagesEl = document.getElementById('pages');
var wm = document.getElementById('watermark');
var pxEls = [].slice.call(document.querySelectorAll('.parallax'));
var scrollTick = false, doParallax = !reduced && !coarse;
function onScroll(){
  nav.classList.toggle('scrolled', pagesEl.scrollTop > 40);
  if(scrollTick) return;
  scrollTick = true;
  requestAnimationFrame(function(){
    scrollTick = false;
    var pr = pagesEl.getBoundingClientRect(), mid = pr.top + pagesEl.clientHeight/2;
    if(!reduced && wm){
      var r = wm.parentElement.getBoundingClientRect();
      var p = (r.top + r.height/2 - mid) / pagesEl.clientHeight;
      wm.style.transform = 'translateX('+(p*22 - 26)+'%)';
    }
    if(doParallax){
      pxEls.forEach(function(el){
        var r = el.getBoundingClientRect();
        var off = (r.top + r.height/2 - mid) / pagesEl.clientHeight;
        if(r.bottom > pr.top && r.top < pr.bottom) el.style.transform = 'translateY('+(off*-22)+'px)';
      });
    }
  });
}
pagesEl.addEventListener('scroll', onScroll, {passive:true});
function fitPages(){
  var h = Math.min(window.innerHeight || 800, window.screen && screen.availHeight ? screen.availHeight : 800) - 24;
  pagesEl.style.height = Math.max(460, h) + 'px';
}
fitPages();
window.addEventListener('resize', fitPages);
onScroll();

/* ---------- side toolbar ---------- */
var sideMenu = document.getElementById('sideMenu'), sideScrim = document.getElementById('sideScrim'), sideHandle = document.getElementById('sideHandle');
function openSide(o){ sideMenu.classList.toggle('open', o); sideScrim.classList.toggle('open', o); sideHandle.classList.toggle('hidden', o); }
sideHandle.addEventListener('click', function(){ openSide(true); });
document.getElementById('sideClose').addEventListener('click', function(){ openSide(false); });
sideScrim.addEventListener('click', function(){ openSide(false); });
function scrollToEl(el){
  if(!el) return;
  var pr = pagesEl.getBoundingClientRect(), r = el.getBoundingClientRect();
  pagesEl.scrollTo({top: pagesEl.scrollTop + r.top - pr.top - 64, behavior:'smooth'});
}
document.querySelectorAll('.sm-link, .sm-cta, .nav-logo, .nav-cta, footer a[href^="#"]').forEach(function(a){
  a.addEventListener('click', function(e){
    var href = a.getAttribute('href');
    if(!href || href.charAt(0) !== '#') return;
    e.preventDefault(); openSide(false);
    if(href === '#top'){ pagesEl.scrollTo({top: 0, behavior: 'smooth'}); return; }
    scrollToEl(document.querySelector(href));
  });
});
var smMap = {};
document.querySelectorAll('.sm-link').forEach(function(a){ smMap[a.getAttribute('href').slice(1)] = a; });
var secIO = new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(e.isIntersecting){
      document.querySelectorAll('.sm-link').forEach(function(x){ x.classList.remove('on'); });
      var a = smMap[e.target.id]; if(a) a.classList.add('on');
    }
  });
}, {root: pagesEl, rootMargin: '-42% 0px -42% 0px'});
['top','who','values','what','moments','how','why','contact'].forEach(function(id){
  var el = document.getElementById(id); if(el) secIO.observe(el);
});

/* ---------- section lamps: lights switch on as you arrive ---------- */
var lampSVG = '<svg class="sect-lamp" viewBox="0 0 110 120" fill="none" aria-hidden="true"><line x1="55" y1="0" x2="55" y2="26" stroke="rgba(255,255,255,.7)" stroke-width="2"/><circle class="bulb-c" cx="55" cy="30" r="4.5" fill="#333"/><path d="M55 36 L79 78 L31 78 Z" fill="rgba(255,255,255,.12)"/><path class="cone-g" d="M38 82 L72 82 L96 120 L14 120 Z" fill="rgba(255,255,255,.28)"/></svg>';
document.querySelectorAll('section').forEach(function(sec){
  var d = document.createElement('div'); d.innerHTML = lampSVG;
  sec.insertBefore(d.firstChild, sec.firstChild);
});
var lampIO = new IntersectionObserver(function(es){
  es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('lit'); lampIO.unobserve(e.target); } });
}, {root: pagesEl, threshold: .05});
document.querySelectorAll('section').forEach(function(sec){ lampIO.observe(sec); });

/* ---------- inquiry form ---------- */
var inq = document.getElementById('inqForm'), inqNote = document.getElementById('inqNote');
function inqMsg(){
  var f = new FormData(inq);
  return 'New inquiry - Full House website\n\nName: ' + (f.get('name')||'') + '\nPhone: ' + (f.get('phone')||'') + '\nEmail: ' + (f.get('email')||'') + '\nService: ' + (f.get('service')||'') + '\n\nMessage:\n' + (f.get('message')||'');
}
function inqValid(){
  var ok = true;
  ['inqName','inqMsg'].forEach(function(id){
    var el = document.getElementById(id);
    var bad = !el.value.trim();
    el.style.borderColor = bad ? '#ff5b5b' : '';
    if(bad) ok = false;
  });
  if(!ok) inqNote.textContent = 'Please add your name and a short message first.';
  return ok;
}
document.getElementById('inqWa').addEventListener('click', function(){
  if(!inqValid()) return;
  window.open('https://wa.me/201055553989?text=' + encodeURIComponent(inqMsg()), '_blank');
  inqNote.textContent = 'WhatsApp opened with your inquiry prefilled - just press send there.';
});
document.getElementById('inqMail').addEventListener('click', function(){
  if(!inqValid()) return;
  var f = new FormData(inq);
  location.href = 'mailto:full.info.house@gmail.com?subject=' + encodeURIComponent('Website inquiry - ' + (f.get('name') || 'New client')) + '&body=' + encodeURIComponent(inqMsg());
  inqNote.textContent = 'Your mail app opened with the inquiry prefilled - press send there.';
});

/* ---------- steps ---------- */
var stepsWrap = document.getElementById('steps'), stepNum = document.getElementById('stepNum'), stepBody = document.getElementById('stepBody'),
    stepTitle = document.getElementById('stepTitle'), stepText = document.getElementById('stepText');
steps.forEach(function(s,i){
  var b=document.createElement('button'); b.type='button'; b.className='step-btn'+(i===0?' on':''); b.textContent='0'+(i+1)+' '+s[0].toUpperCase();
  b.addEventListener('click', function(){
    stepsWrap.querySelectorAll('.step-btn').forEach(function(x){ x.classList.remove('on'); });
    b.classList.add('on');
    stepNum.textContent='0'+(i+1);
    stepBody.classList.remove('ph'); void stepBody.offsetWidth; stepBody.classList.add('ph');
    stepTitle.textContent=s[0]; stepText.textContent=s[1];
  });
  stepsWrap.appendChild(b);
});

/* ---------- why rows ---------- */
var whyWrap = document.getElementById('whyRows');
why.forEach(function(w){
  var d=document.createElement('div'); d.className='why-row reveal';
  d.innerHTML='<div class="t">'+w[0]+'</div><div class="d">'+w[1]+'</div><div class="arr"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
  whyWrap.appendChild(d); io.observe(d);
});

/* ---------- signature shuffle ---------- */
var sh = document.getElementById('shuffle'), li=0, chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ\u2726\u2736 ';
setInterval(function(){
  li=(li+1)%lines.length; var target=lines[li], frame=0, total=Math.max(18, target.length);
  if(reduced){ sh.textContent=target; return; }
  var iv=setInterval(function(){
    frame++;
    var out='';
    for(var i=0;i<target.length;i++){
      out += (i < frame*(target.length/total)) ? target[i] : chars[Math.floor(Math.random()*chars.length)];
    }
    sh.textContent=out;
    if(frame>=total){ sh.textContent=target; clearInterval(iv); }
  }, 34);
}, 3400);

/* ---------- magnetic buttons ---------- */
if(!coarse && !reduced){
  document.querySelectorAll('.magnetic').forEach(function(btn){
    btn.addEventListener('mousemove', function(e){
      var r=btn.getBoundingClientRect();
      btn.style.transform='translate('+((e.clientX-r.left-r.width/2)*.25)+'px,'+((e.clientY-r.top-r.height/2)*.35)+'px)';
    });
    btn.addEventListener('mouseleave', function(){ btn.style.transform=''; });
  });
}

/* ---------- heading word entrances ---------- */
document.querySelectorAll('h2.reveal').forEach(function(hh){
  var nodes=[].slice.call(hh.childNodes), wi=0;
  hh.innerHTML='';
  nodes.forEach(function(n){
    if(n.nodeType===3){
      n.textContent.split(' ').forEach(function(word){
        if(word){
          var s=document.createElement('span'); s.className='w';
          var inner=document.createElement('i'); inner.textContent=word;
          inner.style.transitionDelay=(wi++*60)+'ms';
          s.appendChild(inner); hh.appendChild(s);
        }
        hh.appendChild(document.createTextNode(' '));
      });
    } else hh.appendChild(n);
  });
});

/* ---------- service modal ---------- */
var svcModal=document.getElementById('svcModal'), svcNum=document.getElementById('svcNum'),
    svcTitle=document.getElementById('svcTitle'), svcText=document.getElementById('svcText'), svcCta=document.getElementById('svcCta');
function openSvc(tab, i){
  var s=services[tab][i];
  svcNum.textContent=(tab==='events'?'EVENTS':'MARKETING')+' / '+String(i+1).padStart(2,'0');
  svcTitle.textContent=s[0];
  svcText.textContent=svcDetails[tab][i];
  svcCta.href='https://wa.me/201055553989?text='+encodeURIComponent('Hi Full House, I would like to ask about '+s[0]+'.');
  svcModal.classList.add('open'); pagesEl.style.overflow='hidden';
}
document.getElementById('svcClose').addEventListener('click', function(){ svcModal.classList.remove('open'); pagesEl.style.overflow=''; });

/* ---------- photo band + lightbox ---------- */
var pbandImgs = [['assets/images/moment-concert.jpg','A packed concert under spotlight beams'],['assets/images/stock-conference.jpg','A conference hall listening to the keynote'],['assets/images/moment-gala.jpg','A gala stage glowing under hanging lamps'],['assets/images/stock-ticketing.jpg','Tickets scanned at the entrance'],['assets/images/stock-concert.jpg','A crowd facing a glowing stage at night'],['assets/images/moment-booth.jpg','A glowing brand activation booth in a dark hall'],['assets/images/stock-crowd.jpg','Warm stage lights over the crowd'],['assets/images/stock-giveaway.jpg','An activation booth stocked with giveaways'],['assets/images/stock-media.jpg','A videographer filming the event live'],['assets/images/stock-coverage.jpg','A camera covering the show from the pit']];
var lightbox=document.getElementById('lightbox'), lightImg=document.getElementById('lightImg');
function openLight(src, alt){ lightImg.src=src; lightImg.alt=alt; lightbox.classList.add('open'); pagesEl.style.overflow='hidden'; }
function closeLight(){ lightbox.classList.remove('open'); pagesEl.style.overflow=''; }
document.getElementById('lightClose').addEventListener('click', closeLight);
var track=document.getElementById('pbandTrack');
if(track){
  pbandImgs.concat(pbandImgs).forEach(function(im){
    var img=document.createElement('img'); img.src=im[0]; img.alt=im[1]; img.loading='lazy'; img.decoding='async';
    img.addEventListener('click', function(){ openLight(im[0], im[1]); });
    track.appendChild(img);
  });
}
svcModal.addEventListener('click', function(e){ if(e.target===svcModal){ svcModal.classList.remove('open'); pagesEl.style.overflow=''; } });
lightbox.addEventListener('click', function(e){ if(e.target===lightbox) closeLight(); });

/* ---------- sector chips: show each crowd's world ---------- */
var sectorImgs = {
  corporations: ['assets/images/stock-marketing.jpg', 'Corporations - launches, conferences and brand worlds built end to end'],
  governments: ['assets/images/stock-government.jpg', 'Governments - official ceremonies and public moments, run with protocol'],
  startups: ['assets/images/stock-startup.jpg', 'Startups - the energy of a first big night, produced like a headliner'],
  artists: ['assets/images/stock-stage.jpg', 'Artists - stages, lights and crowds built around the performance'],
  families: ['assets/images/stock-crowd.jpg', 'Families - celebrations and private gatherings, hosted beautifully']
};
var whoImg = document.getElementById('whoImg'), whoCap = document.getElementById('whoCap');
document.querySelectorAll('.chip').forEach(function(c){
  c.addEventListener('click', function(){
    c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop');
    var s2 = sectorImgs[c.getAttribute('data-sector')];
    if(!s2) return;
    document.querySelectorAll('.chip').forEach(function(x){ x.classList.remove('on'); });
    c.classList.add('on');
    var card = whoImg.closest('.img-card');
    card.classList.remove('swap'); void card.offsetWidth; card.classList.add('swap');
    whoImg.src = s2[0]; whoImg.alt = s2[1]; whoCap.textContent = s2[1];
  });
});

/* ---------- why row lights on ---------- */
document.getElementById('whyRows').addEventListener('click', function(e){
  var row=e.target.closest('.why-row'); if(!row) return;
  document.querySelectorAll('.why-row').forEach(function(r){ if(r!==row) r.classList.remove('lit'); });
  row.classList.toggle('lit');
});

/* ---------- init ---------- */
pendLoop();
})();
