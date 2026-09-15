const trip = window.TRIP;
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const departure = new Date(`${trip.startDate}T01:35:00+08:00`);
const ending = new Date(`${trip.endDate}T23:59:59+08:00`);
const now = new Date();
const localDate = new Intl.DateTimeFormat('sv-SE', {timeZone:'Asia/Taipei'}).format(now);
let activeDay = trip.days.find(d => d.date === localDate) || (now < departure ? trip.days[0] : trip.days.at(-1));
const filters = {
  today: {category:'全部'},
  explore: {region:'全部', category:'全部', status:'全部'}
};
let deferredInstallPrompt = null;

function escapeHTML(value='') {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function categoryIcon(category) {
  return trip.categories.find(item => item.name === category)?.icon || '';
}
function displayName(event) {
  return escapeHTML(event.title) + (event.englishName ? `（${escapeHTML(event.englishName)}）` : '');
}
function categoryLabel(category) {
  return `${categoryIcon(category)} ${escapeHTML(category)}`;
}
function actions(event) {
  return `${event.maps ? `<a class="action-link" href="${escapeHTML(event.maps)}" target="_blank" rel="noopener">開啟地圖</a>` : ''}${event.website ? `<a class="action-link" href="${escapeHTML(event.website)}" target="_blank" rel="noopener">參考連結</a>` : ''}`;
}
function countdownCopy() {
  if (now < departure) return {label:'出發倒數', value:`${Math.ceil((departure-now)/86400000)} 天`, copy:'9 月 26 日 — 10 月 4 日<br>台北 → 峇里島 → 泗水 → 新加坡'};
  if (now <= ending) return {label:`第 ${trip.days.indexOf(activeDay)+1} 天`, value:activeDay.label, copy:escapeHTML(activeDay.city)};
  return {label:'旅程紀錄', value:'9 天', copy:'9 月 26 日 — 10 月 4 日<br>峇里島・泗水・新加坡'};
}
function matchesFilters(event, state) {
  return (!state.region || state.region === '全部' || event.regions.includes(state.region))
    && (state.category === '全部' || event.category === state.category)
    && (!state.status || state.status === '全部' || (state.status === '想去／候選' ? event.status !== '已排入' : event.status === state.status));
}
function filterGroup(scope, key, label, options) {
  return `<div class="filter-group"><span class="filter-label">${label}</span><div class="filter-row" role="group" aria-label="${label}">${options.map(option => {
    const value = typeof option === 'string' ? option : option.value;
    const text = typeof option === 'string' ? option : option.label;
    const selected = filters[scope][key] === value;
    return `<button type="button" data-scope="${scope}" data-key="${key}" data-value="${escapeHTML(value)}" class="${selected?'is-active':''}" aria-pressed="${selected}">${text}</button>`;
  }).join('')}</div></div>`;
}
function filterControls(scope, events) {
  const regions = ['全部', ...new Set(events.flatMap(event => event.regions))];
  return (scope === 'explore' ? filterGroup(scope, 'region', '行程地區', regions) : '')
    + filterGroup(scope, 'category', '分類', ['全部', ...trip.categories.map(c => ({value:c.name,label:`${c.icon} ${c.name}`}))])
    + (scope === 'explore' ? filterGroup(scope, 'status', '安排狀態', ['全部','已排入','想去／候選']) : '');
}
function bindFilters(root) {
  $$('[data-scope]', root).forEach(button => button.addEventListener('click', () => {
    const {scope,key,value} = button.dataset;
    filters[scope][key] = value;
    if (scope === 'today') renderToday(); else renderPlaces();
    const replacement = $$('[data-scope]', root).find(b => b.dataset.scope === scope && b.dataset.key === key && b.dataset.value === value);
    replacement?.focus({preventScroll:true});
  }));
}
function eventButton(event, index) {
  return `<div class="timeline-event"><div class="timeline-event__time">${escapeHTML(event.time)}</div><div class="timeline-event__rail"><i class="timeline-event__dot"></i></div><button class="event-card" data-event="${index}"><div class="event-meta"><span class="category">${categoryLabel(event.category)}</span><span aria-hidden="true">→</span></div><h3>${displayName(event)}</h3><p>${escapeHTML(event.subtitle || event.description)}</p>${event.warning?`<span class="warning">${escapeHTML(event.warning)}</span>`:''}</button></div>`;
}
function renderToday(day = activeDay) {
  if (day !== activeDay) filters.today = {category:'全部'};
  activeDay = day;
  const status = countdownCopy();
  $('#trip-status').innerHTML = `<div><span class="eyebrow">${status.label}</span><strong>${status.value}</strong></div><p>${status.copy}</p>`;
  const shown = day.events.map((event,index)=>({event,index})).filter(({event})=>matchesFilters(event,filters.today));
  $('#today-content').innerHTML = `<header class="today-heading"><div class="today-heading__meta"><span class="eyebrow">第 ${trip.days.indexOf(day)+1} 天 · ${day.label}</span><button class="text-button" data-go-trip>查看旅程</button></div><h2>${escapeHTML(day.city)}</h2><p>預計停留地區 · 詳細安排待定</p></header><div class="today-filters">${filterControls('today',day.events)}</div><div class="timeline"><h3 class="timeline-title" aria-live="polite">當日安排 · ${shown.length} 項</h3>${shown.length?shown.map(({event,index})=>eventButton(event,index)).join(''):'<p class="empty">當日沒有這個分類的安排。</p>'}</div>`;
  $$('[data-event]', $('#today-content')).forEach(button => button.addEventListener('click', () => openDetail(day.events[Number(button.dataset.event)], day)));
  $('[data-go-trip]').addEventListener('click', () => switchView('trip'));
  bindFilters($('#today-content'));
}
function renderTrip() {
  $('#day-list').innerHTML = trip.days.map((day,index)=>`<button class="day-card" data-day="${index}" data-tone="${day.tone}"><div class="day-card__top"><span class="eyebrow">第 ${index+1} 天 · ${day.label}</span><span class="day-card__count">預計停留地區</span></div><h2>${escapeHTML(day.city)}</h2></button>`).join('');
  $$('[data-day]').forEach(button => button.addEventListener('click',()=>{
    renderToday(trip.days[Number(button.dataset.day)]);
    switchView('today');
    $('#today-content').scrollIntoView({behavior:'auto'});
  }));
}
function allPlaces() {
  return [
    ...trip.days.flatMap(day=>day.events.map(event=>({...event,city:day.city,date:day.label,status:'已排入'}))),
    ...trip.wishlist.map(place=>({...place,status:place.status || '想去'}))
  ];
}
function renderPlaces() {
  const places = allPlaces();
  $('#place-filters').innerHTML = filterControls('explore',places);
  const shown = places.filter(place=>matchesFilters(place,filters.explore));
  $('#place-list').innerHTML = `<p class="result-count" aria-live="polite">${shown.length} 項符合條件</p>` + (shown.length?shown.map(place=>`<article class="place-card"><div class="place-icon" aria-hidden="true">${categoryIcon(place.category)}</div><div><div class="place-card__top"><span class="eyebrow">${escapeHTML(place.category)}</span><span class="status-chip">${place.status}</span></div><h2>${displayName(place)}</h2><p class="place-location">${escapeHTML(place.regions.join('・'))}${place.date?' · '+place.date:''}</p><p>${escapeHTML(place.description)}</p>${place.warning?`<span class="warning">${escapeHTML(place.warning)}</span>`:''}${place.maps||place.website?`<div class="link-row">${actions(place)}</div>`:''}</div></article>`).join(''):'<p class="empty">目前沒有符合地區與分類的項目。</p>');
  bindFilters($('#place-filters'));
}
function renderInfo() {
  const flights=trip.flights.map(f=>`<article class="flight-card"><div class="flight-card__top"><strong>${escapeHTML(f.route)}</strong><span>${f.date} · ${f.number}</span></div><div class="flight-times"><div><strong>${f.depart}</strong><span>${f.from}</span></div><i class="plane-line" aria-hidden="true"></i><div><strong>${f.arrive}</strong><span>${f.to}</span></div></div><div class="flight-note">酷航 · 經濟艙 · ${f.aircraft}</div></article>`).join('');
  const hotels = trip.wishlist.filter(p=>p.category==='住宿');
  const candidates=hotels.map(p=>`<article class="candidate-card"><h3>${categoryIcon(p.category)} ${displayName(p)}</h3><p>${escapeHTML(p.description)}</p><span class="warning">候選住宿</span>${p.website?`<div class="link-row"><a class="action-link" href="${escapeHTML(p.website)}" target="_blank" rel="noopener">查看住宿介紹</a></div>`:''}</article>`).join('');
  const packing=Object.entries(trip.packing).map(([group,items])=>`<details class="packing-group"><summary>${group} · ${items.length}</summary><ul class="check-list">${items.map(i=>`<li>${escapeHTML(i)}</li>`).join('')}</ul></details>`).join('');
  $('#info-content').innerHTML=`<section class="info-section" id="install-info"><div class="info-section__heading"><h2>離線 App</h2></div><div class="install-info-card"><h3>加入手機主畫面</h3><p>安裝後會像一般 App 一樣開啟，已儲存的旅遊內容沒有網路也能查看。</p><button class="action-link" type="button" data-open-install>查看安裝方式</button></div></section><section class="info-section"><div class="info-section__heading"><h2>航班</h2></div>${flights}</section><section class="info-section"><div class="info-section__heading"><h2>住宿</h2><span>${hotels.length} 間候選</span></div>${candidates}</section><section class="info-section"><div class="info-section__heading"><h2>行前準備</h2><span>打包清單</span></div>${packing}</section><section class="info-section"><p class="source-note">資料來源：Notion「2026 峇里島 涵威活該沒玩到」。外部地圖與參考連結需要網路。</p></section>`;
}

function isInstalledApp() {
  return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
}
function isIosDevice() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}
function isSafariBrowser() {
  return /safari/i.test(navigator.userAgent) && !/(crios|fxios|edgios|opios)/i.test(navigator.userAgent);
}
function installHelp() {
  if (isIosDevice()) {
    return isSafariBrowser()
      ? {copy:'iPhone 不會自動跳出安裝視窗，請從 Safari 的分享選單加入。',steps:['點 Safari 工具列的「分享」按鈕。','往下滑並選擇「加入主畫面」。','開啟「以 Web App 打開」，再點右上角「新增」。']}
      : {copy:'iPhone 需要使用 Safari 才能安裝這個離線 App。',steps:['複製目前網址並改用 Safari 開啟。','點 Safari 的「分享」按鈕。','選擇「加入主畫面」，再點「新增」。']};
  }
  return {copy:'如果瀏覽器沒有顯示安裝視窗，也可以從瀏覽器選單加入。',steps:['開啟瀏覽器選單。','選擇「安裝應用程式」或「加到主畫面」。','確認安裝，之後從手機主畫面開啟。']};
}
function openInstallHelp() {
  if (deferredInstallPrompt) {
    const prompt = deferredInstallPrompt;
    deferredInstallPrompt = null;
    prompt.prompt();
    prompt.userChoice.then(({outcome}) => {
      if (outcome === 'accepted') $('#install-card').hidden = true;
    });
    return;
  }
  const help = installHelp();
  $('#install-dialog-copy').textContent = help.copy;
  $('#install-steps').innerHTML = help.steps.map(step=>`<li>${escapeHTML(step)}</li>`).join('');
  $('#install-dialog').showModal();
}
function showInstallCard(mode) {
  let dismissed = false;
  try { dismissed = sessionStorage.getItem('install-card-dismissed') === 'yes'; } catch (_) {}
  if (isInstalledApp() || dismissed) return;
  $('#install-card-copy').textContent = mode === 'ios'
    ? 'iPhone 請用 Safari 加入主畫面，之後可離線開啟。'
    : '加入手機主畫面，旅途中沒有網路也能查看。';
  $('#install-button').textContent = mode === 'native' ? '安裝 App' : '查看加入方式';
  $('#install-card').hidden = false;
}
function setupInstallExperience() {
  if (isInstalledApp()) {
    $('#install-card').hidden = true;
    $('#install-info')?.remove();
    return;
  }
  if (isIosDevice()) showInstallCard('ios');
  else if (/android/i.test(navigator.userAgent)) setTimeout(()=>showInstallCard(deferredInstallPrompt ? 'native' : 'manual'),1200);
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    showInstallCard('native');
  });
  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    $('#install-card').hidden = true;
    $('#install-info')?.remove();
  });
  $('#install-button').addEventListener('click', openInstallHelp);
  $('#install-dismiss').addEventListener('click', () => {
    $('#install-card').hidden = true;
    try { sessionStorage.setItem('install-card-dismissed','yes'); } catch (_) {}
  });
  document.addEventListener('click', event => {
    if (event.target.closest('[data-open-install]')) openInstallHelp();
  });
  $('#install-dialog-close').addEventListener('click',()=>$('#install-dialog').close());
  $('#install-dialog').addEventListener('click',event=>{if(event.target===$('#install-dialog')) $('#install-dialog').close();});
}
function openDetail(event, day) {
  $('#detail-content').innerHTML=`<span class="detail-icon" aria-hidden="true">${categoryIcon(event.category)}</span><p class="category detail-category">${escapeHTML(event.category)}</p><h2>${displayName(event)}</h2><p class="detail-subtitle">${escapeHTML(event.subtitle||day.city)}</p><div class="detail-grid"><div class="detail-stat"><span>日期</span><strong>${day.label}</strong></div><div class="detail-stat"><span>時間</span><strong>${escapeHTML(event.time)}${event.end?` — ${event.end}`:''}</strong></div></div><p class="detail-copy">${escapeHTML(event.description)}</p>${event.detail?`<p class="detail-copy">${escapeHTML(event.detail)}</p>`:''}${event.warning?`<span class="warning">${escapeHTML(event.warning)}</span>`:''}<div class="detail-actions">${actions(event)}</div>`;
  $('#detail-dialog').showModal();
}
function switchView(target){
  $$('.view').forEach(v=>v.classList.toggle('is-active',v.dataset.view===target));
  $$('.bottom-nav button').forEach(b=>b.classList.toggle('is-active',b.dataset.target===target));
  window.scrollTo({top:0,behavior:'instant'});
}
$$('.bottom-nav button').forEach(button=>button.addEventListener('click',()=>switchView(button.dataset.target)));
$('.sheet-close').addEventListener('click',()=>$('#detail-dialog').close());
$('#detail-dialog').addEventListener('click',e=>{if(e.target===$('#detail-dialog')) $('#detail-dialog').close();});
window.addEventListener('online',()=>$('#offline-state').textContent='已連線');
window.addEventListener('offline',()=>$('#offline-state').textContent='目前離線');
renderToday();renderTrip();renderPlaces();renderInfo();setupInstallExperience();
if('serviceWorker' in navigator) window.addEventListener('load',()=>{
  const hadController = Boolean(navigator.serviceWorker.controller);
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{
    if (hadController && !reloading) {
      reloading = true;
      window.location.reload();
    }
  });
  navigator.serviceWorker.register('service-worker.js')
    .then(()=>navigator.serviceWorker.ready)
    .then(()=>$('#offline-state').textContent=navigator.onLine?'已備妥離線內容':'目前離線')
    .catch(()=>$('#offline-state').textContent='離線內容未備妥');
});
