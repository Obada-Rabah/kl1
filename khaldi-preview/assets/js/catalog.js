(()=>{'use strict';
/* Product families transcribed from the supplied website. No product availability or technical specifications are implied. */
const CATALOG = [
  {id:'enzymes',cat:'food',title:'Enzymes for Cheese & Yogurt',desc:'Coagulation, ripening and yield improvement.',image:'enzymes-cheese-yogurt.webp',detail:'Enzyme categories for cheese and yogurt manufacturing, including coagulation, ripening and yield-related applications.',applications:['Cheese production','Yogurt production','Dairy processes']},
  {id:'cocoa',cat:'food',title:'Cocoa Products',desc:'Natural and alkalized cocoa powders, butter and liquor.',image:'cocoa-products.webp',detail:'Cocoa-related ingredient families including natural and alkalized powders, cocoa butter and cocoa liquor.',applications:['Food manufacturing','Chocolate and confectionery','Bakery applications']},
  {id:'fats',cat:'food',title:'Fats & Oils',desc:'Specialty fats and shortenings.',image:'fats-oils.webp',detail:'Specialty fats, oils and shortening categories for food formulations.',applications:['Food manufacturing','Industrial baking']},
  {id:'gelling',cat:'food',title:'Gelling Agents / Thickeners',desc:'Pectin, carrageenan, gelatin and xanthan.',image:'gelling-thickening.webp',detail:'Functional gelling and thickening ingredients, including pectin, carrageenan, gelatin and xanthan.',applications:['Texture development','Gelling and thickening']},
  {id:'malt',cat:'food',title:'Malt',desc:'Extracts and powders for color and flavor.',image:'malt.webp',detail:'Malt extracts and powders used where color and flavor characteristics are important.',applications:['Color development','Flavor applications']},
  {id:'dairy',cat:'food',title:'Dairy',desc:'Milk powders, proteins and bases.',image:'dairy.webp',detail:'Ingredient categories that include milk powders, proteins and dairy bases.',applications:['Dairy manufacturing','Food formulations']},
  {id:'non-dairy',cat:'food',title:'Non-Dairy',desc:'Bases and alternatives.',image:'non-dairy.webp',detail:'Non-dairy ingredient bases and alternatives for food formulation.',applications:['Alternative formulations','Food manufacturing']},
  {id:'preservatives',cat:'food',title:'Preservatives',desc:'Ingredients used for shelf-life and quality protection.',image:'preservatives.webp',detail:'Preservative ingredient categories used in product quality and shelf-life applications.',applications:['Shelf-life applications','Food preservation']},
  {id:'stabilizers',cat:'food',title:'Stabilizers & Emulsifiers',desc:'Texture, smoothness and phase stability.',image:'stabilizers-emulsifiers.webp',detail:'Stabilizer and emulsifier categories for texture, smoothness and phase stability.',applications:['Texture control','Emulsification','Phase stability']},
  {id:'sweeteners',cat:'food',title:'Sweeteners',desc:'Sucrose, glucose syrups and alternatives.',image:'sweeteners.webp',detail:'Sweetener categories such as sucrose, glucose syrups and alternative sweetening materials.',applications:['Sweetening','Food and beverage formulations']},
  {id:'vanilla',cat:'food',title:'Vanilla & Vanillin',desc:'Natural and nature-identical options.',image:'vanilla-vanillin.webp',detail:'Vanilla and vanillin ingredient options, including natural and nature-identical types.',applications:['Flavor applications','Food manufacturing']},
  {id:'lactose',cat:'pharma',title:'Lactose',desc:'Monohydrate and anhydrous; pharma and dairy grades.',image:'lactose.webp',detail:'Lactose categories including monohydrate and anhydrous types. The supplied listing mentions pharmaceutical and dairy grades; exact grades must be confirmed with the team.',applications:['Pharmaceutical excipients','Dairy formulations']},
  {id:'cellulose',cat:'pharma',title:'Cellulose Derivatives',desc:'MCC 101, 102 and 105.',image:'cellulose.webp',detail:'Cellulose-related pharmaceutical excipients. The supplied catalog references MCC grades 101, 102 and 105.',applications:['Pharmaceutical formulations','Tablet excipients']},
  {id:'capsules',cat:'pharma',title:'Capsules, Syrups & Tablet Additives',desc:'Capsule and syrup applications; tablet functional additives.',image:'capsules.webp',detail:'A combined category from the original website covering capsules, syrups and functional additives for tablets. Contact our team to clarify individual requirements.',applications:['Capsule applications','Syrup applications','Tablet formulations']}
];
const categoryNames={food:'FOOD INGREDIENTS',pharma:'PHARMACEUTICAL EXCIPIENTS'};
const rootImage='assets/img/icons/';
function esc(value) {return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function catalogCard(product){
 return `<article class="catalog-card" id="${esc(product.id)}"><a class="catalog-card-link" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="Learn more about ${esc(product.title)}"><div class="catalog-image"><img src="${rootImage+encodeURIComponent(product.image)}" alt="" loading="lazy" width="620" height="620"></div><div class="catalog-card-content"><span class="card-eyebrow">${categoryNames[product.cat]}</span><h2>${esc(product.title)}</h2><p>${esc(product.desc)}</p><span class="catalog-learn">View details <span aria-hidden="true">↗</span></span></div></a><a class="catalog-quote" href="quote.html?product=${encodeURIComponent(product.title)}&category=${encodeURIComponent(product.cat)}" aria-label="Request a quote for ${esc(product.title)}">Request a quote ↗</a></article>`;
}
function initCatalog(){
 const grid=document.getElementById('catalogGrid'); if(!grid)return;
 const input=document.getElementById('productSearch');const buttons=[...document.querySelectorAll('[data-category]')];
 const count=document.getElementById('catalogCount');const panel=document.getElementById('cosmeticsPanel');const empty=document.getElementById('catalogEmpty');
 const params=new URLSearchParams(window.location.search);let selected=['food','pharma','cosmetics'].includes(params.get('category'))?params.get('category'):'all';
 function render(){
  const term=input.value.trim().toLowerCase();
  const matches=CATALOG.filter(p=>(selected==='all'||p.cat===selected) && `${p.title} ${p.desc}`.toLowerCase().includes(term));
  grid.innerHTML=matches.map(catalogCard).join('');
  grid.hidden=selected==='cosmetics'; panel.hidden=selected!=='cosmetics';empty.hidden=matches.length!==0||selected==='cosmetics';
  count.textContent=selected==='cosmetics'?'Cosmetic raw materials — inquire for details':`${matches.length} ingredient ${matches.length===1?'category':'categories'}`;
  buttons.forEach(button=>{const on=button.dataset.category===selected;button.classList.toggle('active',on);button.setAttribute('aria-pressed',String(on));});
 }
 buttons.forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.category;const p=new URLSearchParams(location.search); if(selected==='all')p.delete('category');else p.set('category',selected);try{history.replaceState(null,'',location.pathname+(p.toString()?'?'+p.toString():''));}catch(_){/* Embeddable/local preview may disallow history changes. */}render();}));
 input.addEventListener('input',render);render();
 if(location.hash){const el=document.getElementById(location.hash.slice(1));if(el)setTimeout(()=>el.scrollIntoView({block:'center'}),80);}
}
function initDetails(){const el=document.getElementById('productDetail');if(!el)return;
 const params=new URLSearchParams(location.search);const item=CATALOG.find(p=>p.id===params.get('id'));const crumb=document.getElementById('productCrumb');
 if(!item){el.innerHTML='<div class="detail-error"><span class="eyebrow">PRODUCT CATEGORY</span><h1>Ingredient not found</h1><p>We couldn\'t find that ingredient category. Browse the catalog or contact us for assistance.</p><a href="products.html" class="button button-solid">Browse products ↗</a></div>';return;}
 document.title=`${item.title} — Khaldi Group`;crumb.textContent=item.title;
 const options=item.applications.map(t=>`<li>${esc(t)}</li>`).join('');
 el.innerHTML=`<div class="detail-picture"><img src="${rootImage+encodeURIComponent(item.image)}" alt="Illustration of ${esc(item.title)}" width="680" height="680"></div><div class="detail-info"><span class="eyebrow">${categoryNames[item.cat]}</span><h1>${esc(item.title)}</h1><p class="detail-summary">${esc(item.detail)}</p><div class="detail-list"><h2>Typical application areas</h2><ul>${options}</ul></div><p class="detail-disclaimer">Product grades, specifications, documentation, availability and packaging should be confirmed directly with our team.</p><a class="button button-solid" href="quote.html?product=${encodeURIComponent(item.title)}&category=${encodeURIComponent(item.cat)}">Request product details & quote ↗</a><a class="detail-back" href="products.html?category=${encodeURIComponent(item.cat)}">← Browse ${item.cat==='food'?'food ingredients':'pharmaceutical excipients'}</a></div>`;
}
function initQuote(){const form=document.getElementById('quoteForm');if(!form)return;
 const params=new URLSearchParams(location.search),selected=CATALOG.find(p=>p.title===params.get('product'));const productField=document.getElementById('qProduct'),industry=document.getElementById('qIndustry');
 if(params.get('product'))productField.value=params.get('product').slice(0,170);
 const cat=selected?.cat||params.get('category');if(cat==='food')industry.value='Food ingredients';if(cat==='pharma')industry.value='Pharmaceutical excipients';if(cat==='cosmetics')industry.value='Cosmetic raw materials';
 const status=document.getElementById('quoteStatus');
 function draft(){const data=new FormData(form);const values=Object.fromEntries(data.entries());const labels={name:'Name',company:'Company',email:'Email',phone:'Phone',industry:'Industry',product:'Product / material',quantity:'Estimated quantity',country:'Destination / market',message:'Application / grade / requirements'};
 return Object.entries(labels).filter(([k])=>values[k]&&String(values[k]).trim()).map(([k,label])=>`${label}: ${String(values[k]).trim()}`).join('\n')+'\n\nSent from the Khaldi Group website inquiry page.';}
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const subject='Ingredient inquiry: '+productField.value.trim().slice(0,100);const href='mailto:info@khaldi-group.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(draft());status.textContent='Your email application should open now. Review your draft and press Send to deliver it.';window.location.href=href;});
 document.getElementById('copyInquiry').addEventListener('click',async()=>{if(!form.reportValidity())return;const text='To: info@khaldi-group.com\nSubject: Ingredient inquiry: '+productField.value.trim()+'\n\n'+draft();try{await navigator.clipboard.writeText(text);status.textContent='Inquiry copied. You can paste it into an email to info@khaldi-group.com.';}catch(_){const area=document.createElement('textarea');area.value=text;document.body.appendChild(area);area.select();const ok=document.execCommand('copy');area.remove();status.textContent=ok?'Inquiry copied. Paste it into your email.':'Copy was blocked by the browser. Use the email button instead.';}});
}
document.addEventListener('DOMContentLoaded',()=>{initCatalog();initDetails();initQuote();});

})();
