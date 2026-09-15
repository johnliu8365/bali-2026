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
let installTipTimer = null;

const dayTeases = [
  '第一天就少一個人一起迷路的話，我們會很不習慣。涵威，登機口等你。',
  '烏布的風景負責漂亮，涵威只要負責出現，分工很合理吧？',
  '公路旅行最需要會接話的朋友，涵威不來，後座笑聲真的會少一角。',
  '夕陽席已經想幫涵威留好了，約會可以改天，這群朋友很難複製。',
  '航班還待補，涵威的答案也待補；我們私心希望兩個都快點確認。',
  '世界遺產會一直在，但我們一起站在前面的那張照片只有這次。',
  '一起追日出、看瀑布、逛市場，這種累法可是朋友限定的好玩。',
  '新加坡快閃都排進去了，涵威真的要只看我們限動乾瞪眼嗎？',
  '旅程會結束，笑話會講很久；涵威最好親自來拿第一手版本。'
];

const eventTeases = {
  '酷航 TR873': '凌晨起飛都有人陪，涵威現在加入還來得及一起睏到新加坡。',
  '酷航 TR280': '第二段都飛了，涵威真的捨得讓我們少一個人一起抵達嗎？',
  '烏布皇宮': '這麼漂亮的地方，合照少了涵威，大家嘴上不說但一定看得出來。',
  '薩拉斯瓦蒂寺': '水宮殿倒影很美；涵威若沒來，我們只好拿照片回去誘惑他。',
  '坎普漢山脊步道': '一起走才有一路聊天的樂趣，涵威別把這段笑聲讓給別人啦。',
  '德哥拉朗梯田': '景色這麼綠，正適合讓涵威忘記「沒錢」這句台詞幾天。',
  '聖泉寺': '願望先替涵威留一個：希望他最後會說好。',
  '烏布市場': '晚上亂逛才是朋友旅行精華，涵威的吐槽席還空著。',
  '克隆孔古法院': '路上的故事通常最好笑，涵威不來就只能聽我們誇張轉述。',
  '烏魯瓦圖廟': '夕陽會很漂亮；涵威若選約會，我們只能合理懷疑對方真的太可愛。',
  '峇里島 → 泗水': '班機還待補，涵威的位置也待確認——兩個都很想快點定下來。',
  '婆羅浮屠': '世界遺產一直都在，但大家一起站在前面的照片只有這次。',
  '泗水唐人街': '一起邊走邊吃最有趣，少了涵威就少一位可靠的分食隊友。',
  '布羅莫火山': '看日出要早起，但朋友一起冷到發抖，會變成講很多年的故事。',
  '賽武瀑布': '瀑布很壯觀，涵威沒看到的話，我們大概會拿照片煩他一整年。',
  '帕比安傳統市場': '香料市場很精彩，涵威不來就少一個人一起猜「這到底是什麼」。',
  '泗水紅橋商場': '行程有點硬，正需要涵威加入一起吐槽才完整。',
  '酷航 TR297': '飛去新加坡繼續玩；涵威看到這裡，是不是已經有一點心動？',
  '酷航 TR872': '回家後故事會重播很多次，涵威最好親自來拿第一手版本。'
};

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
function friendTease(event) {
  return eventTeases[event.title] || '跟我們出去一定很好玩，這句不是廣告，是朋友保證。';
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
  return `<div class="timeline-event"><div class="timeline-event__time">${escapeHTML(event.time)}</div><div class="timeline-event__rail"><i class="timeline-event__dot"></i></div><button class="event-card" data-event="${index}"><div class="event-meta"><span class="category">${categoryLabel(event.category)}</span><span aria-hidden="true">→</span></div><h3>${displayName(event)}</h3><p>${escapeHTML(event.subtitle || event.description)}</p><p class="friend-nudge">${escapeHTML(friendTease(event))}</p>${event.warning?`<span class="warning">${escapeHTML(event.warning)}</span>`:''}</button></div>`;
}
function renderToday(day = activeDay) {
  if (day !== activeDay) filters.today = {category:'全部'};
  activeDay = day;
  const status = countdownCopy();
  $('#trip-status').innerHTML = `<div><span class="eyebrow">${status.label}</span><strong>${status.value}</strong></div><p>${status.copy}</p>`;
  const shown = day.events.map((event,index)=>({event,index})).filter(({event})=>matchesFilters(event,filters.today));
  const dayIndex = trip.days.indexOf(day);
  $('#today-content').innerHTML = `<header class="today-heading"><div class="today-heading__meta"><span class="eyebrow">第 ${dayIndex+1} 天 · ${day.label}</span><button class="text-button" data-go-trip>查看旅程</button></div><h2>${escapeHTML(day.city)}</h2><p>預計停留地區 · 詳細安排待定</p><p class="friend-nudge friend-nudge--heading">${escapeHTML(dayTeases[dayIndex])}</p></header><div class="today-filters">${filterControls('today',day.events)}</div><div class="timeline"><h3 class="timeline-title" aria-live="polite">當日安排 · ${shown.length} 項</h3>${shown.length?shown.map(({event,index})=>eventButton(event,index)).join(''):'<p class="empty">這個分類今天空空的，像合照裡預留給涵威的位置。</p>'}</div>`;
  $$('[data-event]', $('#today-content')).forEach(button => button.addEventListener('click', () => openDetail(day.events[Number(button.dataset.event)], day)));
  $('[data-go-trip]').addEventListener('click', () => switchView('trip'));
  bindFilters($('#today-content'));
}
function renderTrip() {
  $('#day-list').innerHTML = trip.days.map((day,index)=>`<button class="day-card" data-day="${index}" data-tone="${day.tone}"><div class="day-card__top"><span class="eyebrow">第 ${index+1} 天 · ${day.label}</span><span class="day-card__count">預計停留地區</span></div><h2>${escapeHTML(day.city)}</h2><p>${escapeHTML(dayTeases[index])}</p></button>`).join('');
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
  $('#place-list').innerHTML = `<p class="result-count" aria-live="polite">${shown.length} 項符合條件 · 夠不夠讓涵威心動？</p>` + (shown.length?shown.map(place=>`<article class="place-card"><div class="place-icon" aria-hidden="true">${categoryIcon(place.category)}</div><div><div class="place-card__top"><span class="eyebrow">${escapeHTML(place.category)}</span><span class="status-chip">${place.status}</span></div><h2>${displayName(place)}</h2><p class="place-location">${escapeHTML(place.regions.join('・'))}${place.date?' · '+place.date:''}</p><p>${escapeHTML(place.description)}</p>${place.status==='已排入'?`<p class="friend-nudge">${escapeHTML(friendTease(place))}</p>`:''}${place.warning?`<span class="warning">${escapeHTML(place.warning)}</span>`:''}${place.maps||place.website?`<div class="link-row">${actions(place)}</div>`:''}</div></article>`).join(''):'<p class="empty">沒找到符合條件的項目；先清掉篩選，別跟涵威一樣差點錯過好玩的。</p>');
  bindFilters($('#place-filters'));
}
function renderInfo() {
  const flights=trip.flights.map(f=>`<article class="flight-card"><div class="flight-card__top"><strong>${escapeHTML(f.route)}</strong><span>${f.date} · ${f.number}</span></div><div class="flight-times"><div><strong>${f.depart}</strong><span>${f.from}</span></div><i class="plane-line" aria-hidden="true"></i><div><strong>${f.arrive}</strong><span>${f.to}</span></div></div><div class="flight-note">酷航 · 經濟艙 · ${f.aircraft}</div></article>`).join('');
  const hotels = trip.wishlist.filter(p=>p.category==='住宿');
  const candidates=hotels.map(p=>`<article class="candidate-card"><h3>${categoryIcon(p.category)} ${displayName(p)}</h3><p>${escapeHTML(p.description)}</p><span class="warning">候選住宿</span>${p.website?`<div class="link-row"><a class="action-link" href="${escapeHTML(p.website)}" target="_blank" rel="noopener">查看住宿介紹</a></div>`:''}</article>`).join('');
  const packing=Object.entries(trip.packing).map(([group,items])=>`<details class="packing-group"><summary>${group} · ${items.length}</summary><ul class="check-list">${items.map(i=>`<li>${escapeHTML(i)}</li>`).join('')}</ul></details>`).join('');
  $('#info-content').innerHTML=`<section class="info-section"><div class="info-section__heading"><h2>航班</h2><span>涵威的同行答案還在等</span></div>${flights}</section><section class="info-section"><div class="info-section__heading"><h2>住宿</h2><span>${hotels.length} 間候選</span></div>${candidates}<p class="friend-nudge friend-nudge--panel">房間可以慢慢挑，但少了涵威，半夜聊天的陣容就不完整了。</p></section><section class="info-section"><div class="info-section__heading"><h2>行前準備</h2><span>打包清單</span></div>${packing}<p class="friend-nudge friend-nudge--panel">最重要的一項：把涵威本人也一起帶上。約會很甜，朋友旅行也很難得嘛。</p></section><section class="info-section"><p class="source-note">行程資料來源：Notion「2026 峇里島 泗水」。涵威相關內容為朋友間玩笑；外部地圖與參考連結需要網路。</p></section><section class="info-section" id="install-info"><div class="info-section__heading"><h2>離線 App</h2></div><div class="install-info-card"><h3>加入手機主畫面</h3><p>安裝後會像一般 App 一樣開啟；沒有網路，也能繼續研究怎麼讓涵威心動。</p><button class="action-link" type="button" data-open-install>查看安裝方式</button></div></section>`;
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
      ? 'Safari：分享 → 加入主畫面 → 以 Web App 打開 → 新增'
      : '請改用 Safari 開啟，再選擇：分享 → 加入主畫面';
  }
  return '瀏覽器選單 → 安裝應用程式或加到主畫面';
}
function markInstallTipSeen() {
  try { localStorage.setItem('install-tip-seen-v2','yes'); } catch (_) {}
}
function hideInstallTip(markSeen = true) {
  clearTimeout(installTipTimer);
  $('#install-card').hidden = true;
  if (markSeen) markInstallTipSeen();
}
function openInstallHelp() {
  if ($('#install-card').dataset.mode === 'help') {
    hideInstallTip();
    return;
  }
  clearTimeout(installTipTimer);
  if (deferredInstallPrompt) {
    const prompt = deferredInstallPrompt;
    deferredInstallPrompt = null;
    prompt.prompt();
    prompt.userChoice.then(({outcome}) => {
      if (outcome === 'accepted') hideInstallTip();
    });
    return;
  }
  $('#install-card-title').textContent = '加入主畫面';
  $('#install-card-copy').textContent = installHelp();
  $('#install-button').textContent = '知道了';
  $('#install-card').dataset.mode = 'help';
  $('#install-card').hidden = false;
}
function showInstallCard(mode, force = false) {
  let dismissed = false;
  try { dismissed = localStorage.getItem('install-tip-seen-v2') === 'yes'; } catch (_) {}
  if (isInstalledApp() || (!force && dismissed)) return;
  clearTimeout(installTipTimer);
  $('#install-card').dataset.mode = 'prompt';
  $('#install-card-title').textContent = '可加入主畫面';
  $('#install-card-copy').textContent = mode === 'ios'
    ? 'iPhone 可加入 Safari 主畫面'
    : '離線也能繼續勸涵威出發';
  $('#install-button').textContent = mode === 'native' ? '安裝' : '查看';
  $('#install-card').hidden = false;
  if (!force) installTipTimer = setTimeout(()=>hideInstallTip(),8000);
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
    hideInstallTip();
    $('#install-info')?.remove();
  });
  $('#install-button').addEventListener('click', openInstallHelp);
  $('#install-dismiss').addEventListener('click', () => hideInstallTip());
  $('#offline-state').addEventListener('click', () => showInstallCard(deferredInstallPrompt ? 'native' : (isIosDevice() ? 'ios' : 'manual'),true));
  document.addEventListener('click', event => {
    if (event.target.closest('[data-open-install]')) showInstallCard(deferredInstallPrompt ? 'native' : (isIosDevice() ? 'ios' : 'manual'),true);
  });
}
function openDetail(event, day) {
  $('#detail-content').innerHTML=`<span class="detail-icon" aria-hidden="true">${categoryIcon(event.category)}</span><p class="category detail-category">${escapeHTML(event.category)}</p><h2>${displayName(event)}</h2><p class="detail-subtitle">${escapeHTML(event.subtitle||day.city)}</p><div class="detail-grid"><div class="detail-stat"><span>日期</span><strong>${day.label}</strong></div><div class="detail-stat"><span>時間</span><strong>${escapeHTML(event.time)}${event.end?` — ${event.end}`:''}</strong></div></div><p class="detail-copy">${escapeHTML(event.description)}</p>${event.detail?`<p class="detail-copy">${escapeHTML(event.detail)}</p>`:''}<p class="friend-nudge friend-nudge--detail">${escapeHTML(friendTease(event))}</p>${event.warning?`<span class="warning">${escapeHTML(event.warning)}</span>`:''}<div class="detail-actions">${actions(event)}</div>`;
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
