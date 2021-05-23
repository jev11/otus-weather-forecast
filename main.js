(()=>{"use strict";function t(t,n){t.innerHTML=`<ul>${n.map((t=>`<li class="city">${t}</li>`)).join("")}</ul>`}function n(t,n){t.innerHTML=`<div>\n    <span>\n    ${n.name}\n    </span>\n    <span>\n    <img src=http://openweathermap.org/img/wn/${n.weather[0].icon}.png>\n    </span>\n    <span>\n    Temperature: ${Math.round(n.main.temp)}C\n    </span>\n    </div>`}async function e(t,n){try{const e=`https://api.openweathermap.org/\ndata/2.5/weather?units=metric&q=${t}&appid=${n}`,o=await fetch(e);return await o.json()}catch(t){return null}}function o(t,n,e,o){const a=`https://maps.googleapis.com/maps/api/staticmap?center=\n${n},${e}&zoom=12&size=400x400&key=${o}`;t.innerHTML=`<img src="${a}">`}const a=void 0,c=void 0,i=document.querySelector(".history"),r=document.querySelector("input"),s=document.querySelector("button"),l=document.querySelector(".forecast"),u=document.querySelector(".map");let p,d;!async function(){const r=await function(t="https://get.geojs.io/v1/ip/geo.json"){return fetch(t).then((t=>t.json())).then((t=>t))}();d=await e(r.city,a),d&&(n(l,d),o(u,d.coord.lat,d.coord.lon,c)),p=await(JSON.parse(localStorage.getItem("cities"))||[]),t(i,p),i.querySelectorAll(".city").forEach((t=>{t.addEventListener("click",(async()=>{d=await e(t.innerHTML,a),d&&(n(l,d),o(u,d.coord.lat,d.coord.lon,c))}))}))}(),s.addEventListener("click",(async s=>{var m,y;s.preventDefault(),m=r.value,(y=p).unshift(m),y.length>10&&y.pop(),d=await e(r.value,a),r.value="",n(l,d),o(u,d.coord.lat,d.coord.lon,c),t(i,p),i.querySelectorAll(".city").forEach((t=>{t.addEventListener("click",(async()=>{d=await e(t.innerHTML,a),d&&(n(l,d),o(u,d.coord.lat,d.coord.lon,c))}))})),function(t){const n=JSON.stringify(t);localStorage.setItem("cities",n)}(p)}))})();