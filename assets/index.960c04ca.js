(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}})();function v(l){const r=new IntersectionObserver((i,o)=>{i.forEach(t=>{if(t.isIntersecting){const n=t.target;n.classList.add("anim-active"),o.unobserve(n)}})});l.forEach(i=>{r.observe(i)})}function p(l){const r="ontouchend"in document?"orientationchange":"resize";let i=document.documentElement.clientWidth;l.forEach(o=>{const t=h(o,"data-distance"),n=Array.prototype.slice.call(o.querySelectorAll(".fix-anim")),s=n.length?n[0].clientHeight:0;i>768&&(o.style.height=t+s+"px",o.setAttribute("animation-active","y"),m(o,n,t)),window.addEventListener(r,function(){setTimeout(function(){i=document.documentElement.clientWidth;const u=o.getAttribute("animation-active")==="y";u&&i>768||!u&&i<768||(i>768?(o.setAttribute("animation-active","y"),o.style.height=t+s+"px",m(o,n,t)):(o.removeAttribute("animation-active"),o.style.height="",m(o,n,t)))},500)})})}function m(l,r,i){const o="ontouchend"in document?"orientationchange":"resize",t=l.getAttribute("animation-active")==="y",n=h(l,"data-top-offset");let s=l.getBoundingClientRect().top+window.scrollY;s+=n;let u=s+i;const g=window.innerHeight;let c=r[0]?r[0].clientWidth:0;const d=()=>{r.forEach((e,f)=>{if(window.scrollY>=s&&window.scrollY<u){if(getComputedStyle(e).position!=="fixed"){const w=getComputedStyle(e).transform;e.style.transform="";const a=e.getBoundingClientRect();e.style.transform=w,e.style.position="fixed",e.style.left=a.left+"px",e.style.top=a.top+"px",e.style.width=a.width+"px"}window.scrollY-s<c?(f===1||f===2)&&(e.style.transform=`translateX(${window.scrollY-s}px)`):window.scrollY-s<c*2?(f===1&&(e.style.transform=`translateX(${c}px)`),f===2&&(e.style.transform=`translateX(${window.scrollY-s}px)`)):window.scrollY-s<c*3&&f===2&&(e.style.transform=`translateX(${c*2}px)`)}else window.scrollY+g>=u?(getComputedStyle(e).position==="fixed"&&(e.style.position="",e.style.left="",e.style.width=""),f===1&&(e.style.transform=`translateX(${c}px)`),f===2&&(e.style.transform=`translateX(${c*2}px)`),e.style.top=i+"px"):(e.style.position="",e.style.left="",e.style.top="",e.style.width="",e.style.transform="")})},y=()=>{setTimeout(function(){if(document.documentElement.clientWidth<768){window.removeEventListener("scroll",d);return}c=r[0]?r[0].clientWidth:0,s=l.getBoundingClientRect().top+window.scrollY,s+=n,u=s+i},500)};if(!t){window.removeEventListener("scroll",d);return}d(),window.removeEventListener("scroll",d),window.addEventListener("scroll",d),window.removeEventListener(o,y),window.addEventListener(o,y)}function h(l,r){const i=l?l.getAttribute(r):"";return i?parseInt(i,10):0}A(()=>{v(Array.prototype.slice.call(document.querySelectorAll(".anim"))),p(Array.prototype.slice.call(document.querySelectorAll(".fix-anim-wrapper")))});function A(l){document.readyState==="complete"?l():window.addEventListener("load",function(){l()})}
