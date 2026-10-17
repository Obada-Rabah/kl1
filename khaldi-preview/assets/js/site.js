(()=>{'use strict';
 const root=document.documentElement;
 const year=document.querySelector('[data-current-year]');if(year)year.textContent=new Date().getFullYear();
 const themeButtons=document.querySelectorAll('[data-theme-toggle]');
 function reflect(){const dark=root.dataset.theme==='dark';themeButtons.forEach(b=>{b.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');b.setAttribute('title',dark?'Switch to light mode':'Switch to dark mode');b.setAttribute('aria-pressed',String(dark));});}
 themeButtons.forEach(button=>button.addEventListener('click',()=>{const dark=root.dataset.theme==='dark';if(dark)delete root.dataset.theme;else root.dataset.theme='dark';try{localStorage.setItem('khaldi-theme',dark?'light':'dark');}catch(_){}reflect();}));reflect();
 const btn=document.getElementById('menuToggle'),nav=document.getElementById('mobileNav');
 if(btn&&nav){let previous=null;
  const close=()=>{if(nav.hidden)return;nav.hidden=true;btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label','Open navigation');document.body.classList.remove('nav-open');};
  const open=()=>{previous=document.activeElement;nav.hidden=false;btn.setAttribute('aria-expanded','true');btn.setAttribute('aria-label','Close navigation');document.body.classList.add('nav-open');nav.querySelector('a')?.focus();};
  btn.addEventListener('click',()=>nav.hidden?open():close());
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!nav.hidden){close();btn.focus();}if(e.key==='Tab'&&!nav.hidden){const focusables=[btn,...nav.querySelectorAll('a')].filter(n=>n.offsetParent!==null);const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
  nav.addEventListener('click',e=>{if(e.target.closest('a'))close();});
  document.addEventListener('click',e=>{if(!nav.hidden&&!e.target.closest('.site-header'))close();});
  window.matchMedia('(min-width: 921px)').addEventListener('change',e=>{if(e.matches)close();});
 }
})();
