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
const PACKING_STORAGE_KEY = 'bali-2026-packing-v1';
let packingState = loadPackingState();

function escapeHTML(value='') {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function packingKey(item) {
  return String(item).normalize('NFKC').trim().toLocaleLowerCase('zh-Hant');
}
function loadPackingState() {
  try {
    const saved = JSON.parse(localStorage.getItem(PACKING_STORAGE_KEY) || '{}');
    return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
  } catch (_) {
    return {};
  }
}
function savePackingState() {
  try { localStorage.setItem(PACKING_STORAGE_KEY, JSON.stringify(packingState)); } catch (_) {}
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
function categoryTone(category) {
  return ({移動:'move',景點:'place',住宿:'stay',吃:'food'})[category] || 'default';
}
function mapUrl(event) {
  if (event.maps) return event.maps;
  if (event.category !== '景點') return '';
  const place = event.englishName || event.title;
  const region = event.regions?.join(' ') || '';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place} ${region}`.trim())}`;
}
function stayForDay(day) {
  return trip.stays.find(stay => day.date >= stay.startDate && day.date < stay.endDate);
}
function endOfDayStay(day) {
  const stay = stayForDay(day);
  if (!stay || !['全部','住宿'].includes(filters.today.category)) return '';
  const arrival = day.date === stay.startDate ? `今天 ${stay.checkIn} 入住` : '今晚續住';
  return `<section class="end-stay"><div class="end-stay__heading"><span class="eyebrow">一天最後一站</span><span>${escapeHTML(arrival)}</span></div><article class="today-stay-card"><img src="${escapeHTML(stay.image)}" alt="${escapeHTML(stay.name)}"><div class="today-stay-card__shade"></div><div class="today-stay-card__copy"><span>🏨 住宿</span><h3>${escapeHTML(stay.name)}</h3><p>${escapeHTML(stay.location)} · ${escapeHTML(stay.dates)}</p></div></article></section>`;
}
function actions(event) {
  const maps = mapUrl(event);
  return `${maps ? `<a class="action-link" href="${escapeHTML(maps)}" target="_blank" rel="noopener">Google Maps</a>` : ''}${event.website ? `<a class="action-link" href="${escapeHTML(event.website)}" target="_blank" rel="noopener">官方網站</a>` : ''}`;
}
function countdownCopy() {
  if (now < departure) return {label:'出發倒數', value:`${Math.ceil((departure-now)/86400000)} 天`, copy:'9 月 26 日 — 10 月 4 日<br>台北 → 峇里島 → 泗水 → 新加坡'};
  if (now <= ending) return {label:`第 ${trip.days.indexOf(activeDay)+1} 天`, value:activeDay.label, copy:escapeHTML(activeDay.city)};
  return {label:'旅程紀錄', value:'9 天', copy:'9 月 26 日 — 10 月 4 日<br>峇里島・泗水・新加坡'};
}
function matchesFilters(event, state) {
  return (!state.region || state.region === '全部' || event.regions.includes(state.region))
    && (state.category === '全部' || event.category === state.category)
    && (!state.status || state.status === '全部' || event.status === state.status);
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
  const categories = scope === 'today' ? trip.categories.filter(category => category.name !== '住宿') : trip.categories;
  return (scope === 'explore' ? filterGroup(scope, 'region', '行程地區', regions) : '')
    + filterGroup(scope, 'category', '分類', ['全部', ...categories.map(c => ({value:c.name,label:`${c.icon} ${c.name}`}))])
    + (scope === 'explore' ? filterGroup(scope, 'status', '安排狀態', ['全部','主行程','備案','未排日']) : '');
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
  const plan = event.plan === 'backup' ? '備案' : '主行程';
  const detail = [event.subtitle, event.duration].filter(Boolean).join(' · ') || event.description;
  const maps = mapUrl(event);
  return `<div class="timeline-event ${event.plan === 'backup' ? 'timeline-event--backup' : ''}"><div class="timeline-event__time">${escapeHTML(event.time)}${event.end?`<small>${escapeHTML(event.end)}</small>`:''}</div><div class="timeline-event__rail"><i class="timeline-event__dot"></i></div><div class="event-card-wrap"><button class="event-card event-card--${categoryTone(event.category)}" data-event="${index}"><div class="event-meta"><span class="category">${categoryLabel(event.category)}</span><span class="plan-chip plan-chip--${event.plan === 'backup' ? 'backup' : 'main'}">${plan}</span></div><h3>${displayName(event)}</h3><p>${escapeHTML(detail)}</p>${event.reservation?`<span class="reservation">${escapeHTML(event.reservation)}</span>`:''}${event.warning?`<span class="warning">${escapeHTML(event.warning)}</span>`:''}</button>${maps?`<a class="card-map-link" href="${escapeHTML(maps)}" target="_blank" rel="noopener"><span>在 Google Maps 開啟</span><span aria-hidden="true">↗</span></a>`:''}</div></div>`;
}
function renderToday(day = activeDay) {
  if (day !== activeDay) filters.today = {category:'全部'};
  activeDay = day;
  const status = countdownCopy();
  $('#trip-status').innerHTML = `<div><span class="eyebrow">${status.label}</span><strong>${status.value}</strong></div><p>${status.copy}</p>`;
  const alternatives = day.alternatives || [];
  const combined = [...day.events, ...alternatives];
  const shownMain = day.events.map((event,index)=>({event,index})).filter(({event})=>matchesFilters(event,filters.today));
  const shownBackups = alternatives.map((event,index)=>({event,index:index+day.events.length})).filter(({event})=>matchesFilters(event,filters.today));
  const backups = alternatives.length ? `<section class="backup-section"><div class="backup-heading"><div><span class="eyebrow">可替換方案</span><h3>當日備案</h3></div><span>${shownBackups.length} 項</span></div><div class="timeline timeline--backup">${shownBackups.length?shownBackups.map(({event,index})=>eventButton(event,index)).join(''):'<p class="empty">這個分類沒有備案。</p>'}</div></section>` : '';
  $('#today-content').innerHTML = `<header class="today-heading"><img class="today-heading__image" src="${escapeHTML(day.image)}" alt=""><span class="today-heading__shade" aria-hidden="true"></span><div class="today-heading__content"><div class="today-heading__meta"><span class="eyebrow">第 ${trip.days.indexOf(day)+1} 天 · ${day.label}</span><button class="text-button" data-go-trip>查看旅程</button></div><h2>${escapeHTML(day.city)}</h2><p>主行程、交通時間與預約提醒均依最新 Notion 行程整理。</p></div></header><div class="today-filters">${filterControls('today',combined)}</div><div class="timeline"><h3 class="timeline-title" aria-live="polite">推薦主行程 · ${shownMain.length} 項</h3>${shownMain.length?shownMain.map(({event,index})=>eventButton(event,index)).join(''):'<p class="empty">當日沒有這個分類的主行程。</p>'}</div>${endOfDayStay(day)}${backups}`;
  $$('[data-event]', $('#today-content')).forEach(button => button.addEventListener('click', () => openDetail(combined[Number(button.dataset.event)], day)));
  $('[data-go-trip]').addEventListener('click', () => switchView('trip'));
  bindFilters($('#today-content'));
}
function renderTrip() {
  $('#day-list').innerHTML = trip.days.map((day,index)=>`<button class="day-card" data-day="${index}" data-tone="${day.tone}"><img class="day-card__image" src="${escapeHTML(day.image)}" alt=""><span class="day-card__overlay" aria-hidden="true"></span><div class="day-card__top"><span class="eyebrow">第 ${index+1} 天 · ${day.label}</span><span class="day-card__count">主行程 ${day.events.length}${day.alternatives?.length?` · 備案 ${day.alternatives.length}`:''}</span></div><h2>${escapeHTML(day.city)}</h2><p>查看時間、移動與預約提醒</p></button>`).join('');
  $$('[data-day]').forEach(button => button.addEventListener('click',()=>{
    renderToday(trip.days[Number(button.dataset.day)]);
    switchView('today');
    $('#today-content').scrollIntoView({behavior:'auto'});
  }));
}
function allPlaces() {
  return [
    ...trip.days.flatMap(day=>[
      ...day.events.filter(event=>event.category!=='住宿').map(event=>({...event,city:day.city,date:day.label,status:'主行程'})),
      ...(day.alternatives || []).map(event=>({...event,city:day.city,date:day.label,status:'備案'}))
    ]),
    ...trip.stays.map(stay=>({category:'住宿',title:stay.name,description:`${stay.dates} · ${stay.location}`,regions:[stay.region],status:'主行程',image:stay.image})),
    ...trip.wishlist.map(place=>({...place,status:'未排日'}))
  ];
}
function renderPlaces() {
  const places = allPlaces();
  $('#place-filters').innerHTML = filterControls('explore',places);
  const shown = places.filter(place=>matchesFilters(place,filters.explore));
  $('#place-list').innerHTML = `<p class="result-count" aria-live="polite">${shown.length} 項符合條件</p>` + (shown.length?shown.map(place=>`<article class="place-card ${place.image?'place-card--with-image':''}">${place.image?`<img class="place-card__image" src="${escapeHTML(place.image)}" alt="${escapeHTML(place.title)}">`:`<div class="place-icon" aria-hidden="true">${categoryIcon(place.category)}</div>`}<div><div class="place-card__top"><span class="eyebrow">${escapeHTML(place.category)}</span><span class="status-chip">${place.status}</span></div><h2>${displayName(place)}</h2><p class="place-location">${escapeHTML(place.regions.join('・'))}${place.date?' · '+place.date:''}</p><p>${escapeHTML(place.description)}</p>${place.warning?`<span class="warning">${escapeHTML(place.warning)}</span>`:''}${mapUrl(place)||place.website?`<div class="link-row">${actions(place)}</div>`:''}</div></article>`).join(''):'<p class="empty">目前沒有符合地區與分類的項目。</p>');
  bindFilters($('#place-filters'));
}
function preparationMarkup() {
  const prep = trip.preparation;
  const completed = prep.completed.length;
  const remaining = prep.discussion.length + prep.personal.length;
  const total = completed + remaining;
  const percent = Math.round((completed / total) * 100);
  const simpleItems = items => items.map(item=>`<li><span aria-hidden="true">✓</span><span>${escapeHTML(item)}</span></li>`).join('');
  const detailedItems = items => items.map(item=>`<article class="prep-task"><h4>${escapeHTML(item.title)}</h4><ul>${item.details.map(detail=>`<li>${escapeHTML(detail)}</li>`).join('')}</ul></article>`).join('');
  const bookingItems = prep.bookings.map(item=>`<li><span class="booking-date">${escapeHTML(item.date)}</span><span>${escapeHTML(item.title)}</span></li>`).join('');
  const laterItems = prep.later.map(item=>`<li>${escapeHTML(item)}</li>`).join('');
  return `<section class="info-section prep-dashboard"><div class="info-section__heading"><div><span class="eyebrow">全團唯讀狀態</span><h2>行前準備進度</h2></div><span>同步 ${escapeHTML(prep.syncedAt)}</span></div><div class="prep-hero"><div class="prep-percent"><strong>${percent}%</strong><span>整體完成</span></div><div class="prep-progress" role="progressbar" aria-label="全團行前準備進度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><i style="width:${percent}%"></i></div><div class="prep-counts"><div><strong>${completed}</strong><span>已完成</span></div><div><strong>${prep.discussion.length}</strong><span>待討論</span></div><div><strong>${prep.bookings.length}</strong><span>需 Booking</span></div></div></div><div class="prep-now"><div><span>上一步完成</span><p>${escapeHTML(prep.lastCompleted)}</p></div><div><span>下一步優先</span><p>${escapeHTML(prep.nextPriority)}</p></div></div><div class="prep-groups"><details class="prep-group" open><summary><span>✅ 已完成</span><strong>${completed}</strong></summary><ul class="prep-done-list">${simpleItems(prep.completed)}</ul></details><details class="prep-group"><summary><span>💬 待討論</span><strong>${prep.discussion.length}</strong></summary><div class="prep-task-list">${detailedItems(prep.discussion)}</div></details><details class="prep-group prep-group--booking" open><summary><span>🎟 需要 Booking</span><strong>${prep.bookings.length}</strong></summary><ul class="booking-list">${bookingItems}</ul></details><details class="prep-group"><summary><span>👤 每個人各自處理</span><strong>${prep.personal.length}</strong></summary><div class="prep-task-list">${detailedItems(prep.personal)}</div></details><details class="prep-group"><summary><span>🟢 旅行中再決定</span><strong>${prep.later.length}</strong></summary><ul class="prep-later-list">${laterItems}</ul></details></div></section>`;
}
function packingMarkup() {
  const total = trip.packing.reduce((sum,group)=>sum+group.items.length,0);
  const completed = trip.packing.reduce((sum,group)=>sum+group.items.filter(item=>packingState[packingKey(item)]).length,0);
  const percent = Math.round((completed / total) * 100);
  const groups = trip.packing.map((group,index)=>{
    const groupCompleted = group.items.filter(item=>packingState[packingKey(item)]).length;
    const items = group.items.map((item,itemIndex)=>{
      const key = packingKey(item);
      const checked = Boolean(packingState[key]);
      return `<label class="packing-item ${checked?'is-checked':''}" for="packing-${index}-${itemIndex}"><input id="packing-${index}-${itemIndex}" type="checkbox" data-packing-key="${escapeHTML(key)}" ${checked?'checked':''}><span>${escapeHTML(item)}</span></label>`;
    }).join('');
    return `<details class="packing-check-group" ${index===0?'open':''}><summary><span>${escapeHTML(group.name)}</span><strong data-packing-group="${index}">${groupCompleted}/${group.items.length}</strong></summary><div class="packing-items">${items}</div></details>`;
  }).join('');
  return `<div class="packing-overview"><div><span class="eyebrow">我的整理進度</span><strong data-packing-overall>${completed}/${total}</strong></div><div class="packing-overview__percent"><strong data-packing-percent>${percent}%</strong><span>已完成</span></div><div class="packing-progress" role="progressbar" aria-label="打包完成進度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><i data-packing-bar style="width:${percent}%"></i></div><p class="packing-remaining" data-packing-remaining>尚有 ${total-completed} 項未整理</p></div>${groups}<button class="reset-packing" type="button" data-reset-packing>重設我的打包進度</button>`;
}
function updatePackingUI() {
  const allItems = trip.packing.flatMap(group=>group.items);
  const completed = allItems.filter(item=>packingState[packingKey(item)]).length;
  const percent = Math.round((completed / allItems.length) * 100);
  $('[data-packing-overall]').textContent = `${completed}/${allItems.length}`;
  $('[data-packing-percent]').textContent = `${percent}%`;
  $('[data-packing-remaining]').textContent = `尚有 ${allItems.length-completed} 項未整理`;
  $('[data-packing-bar]').style.width = `${percent}%`;
  $('.packing-progress').setAttribute('aria-valuenow',String(percent));
  trip.packing.forEach((group,index)=>{
    const count = group.items.filter(item=>packingState[packingKey(item)]).length;
    $(`[data-packing-group="${index}"]`).textContent = `${count}/${group.items.length}`;
  });
}
function renderPacking() {
  const root = $('#packing-content');
  root.innerHTML = packingMarkup();
  $$('[data-packing-key]',root).forEach(input=>input.addEventListener('change',()=>{
    if (input.checked) packingState[input.dataset.packingKey] = true;
    else delete packingState[input.dataset.packingKey];
    input.closest('.packing-item').classList.toggle('is-checked',input.checked);
    savePackingState();
    updatePackingUI();
  }));
  $('[data-reset-packing]',root).addEventListener('click',()=>{
    if (!window.confirm('確定要清除這台裝置上的全部打包進度嗎？')) return;
    packingState = {};
    try { localStorage.removeItem(PACKING_STORAGE_KEY); } catch (_) {}
    $$('[data-packing-key]',root).forEach(input=>{
      input.checked = false;
      input.closest('.packing-item').classList.remove('is-checked');
    });
    updatePackingUI();
  });
}
function renderPreparation() {
  $('#prepare-content').innerHTML=`${preparationMarkup()}<section class="info-section packing-section"><div class="info-section__heading"><div><span class="eyebrow">個人進度</span><h2>我的打包清單</h2></div><span>${trip.packing.length} 類</span></div><div id="packing-content"></div></section><section class="info-section"><p class="source-note">行前進度與打包資料來源：Notion；同步 ${escapeHTML(trip.preparation.syncedAt)}。</p></section>`;
  renderPacking();
}
function renderInfo() {
  const flights=trip.flights.map(f=>`<article class="flight-card"><div class="flight-card__top"><strong>${escapeHTML(f.route)}</strong><span>${f.date} · ${f.number}</span></div><div class="flight-times"><div><strong>${f.depart}</strong><span>${f.from}</span></div><i class="plane-line" aria-hidden="true"></i><div><strong>${f.arrive}</strong><span>${f.to}</span></div></div><div class="flight-note">航班資料 · ${f.aircraft}</div></article>`).join('');
  const stays=trip.stays.map(stay=>`<article class="stay-card"><img class="stay-card__image" src="${escapeHTML(stay.image)}" alt=""><div><h3>${escapeHTML(stay.name)}</h3><p>${escapeHTML(stay.dates)} · ${escapeHTML(stay.location)}</p></div></article>`).join('');
  $('#info-content').innerHTML=`<section class="info-section"><div class="shared-map-card"><div><span class="eyebrow">整趟旅程</span><h2>共用 Google Map</h2></div><a class="action-link" href="${escapeHTML(trip.sharedMap)}" target="_blank" rel="noopener">開啟地圖</a></div></section><section class="info-section"><div class="info-section__heading"><h2>航班</h2><span>${trip.flights.length} 段</span></div>${flights}</section><section class="info-section"><div class="info-section__heading"><h2>住宿</h2><span>${trip.stays.length} 間已安排</span></div>${stays}</section><section class="info-section" id="install-info"><div class="info-section__heading"><h2>離線 App</h2></div><div class="install-info-card"><h3>加入手機主畫面</h3><p>安裝後會像一般 App 一樣開啟，已儲存的旅遊內容沒有網路也能查看。</p><button class="action-link" type="button" data-open-install>查看安裝方式</button></div></section>`;
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
    : '離線也能查看旅程';
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
  const plan = event.plan === 'backup' ? '備案' : '主行程';
  $('#detail-content').innerHTML=`<span class="detail-icon" aria-hidden="true">${categoryIcon(event.category)}</span><div class="detail-labels"><span class="category detail-category">${escapeHTML(event.category)}</span><span class="plan-chip plan-chip--${event.plan === 'backup' ? 'backup' : 'main'}">${plan}</span></div><h2>${displayName(event)}</h2><p class="detail-subtitle">${escapeHTML(event.subtitle||day.city)}</p><div class="detail-grid"><div class="detail-stat"><span>日期</span><strong>${day.label}</strong></div><div class="detail-stat"><span>時間</span><strong>${escapeHTML(event.time)}${event.end?` — ${event.end}`:''}</strong></div></div>${event.duration?`<div class="travel-time"><span>移動時間</span><strong>${escapeHTML(event.duration)}</strong></div>`:''}<p class="detail-copy">${escapeHTML(event.description)}</p>${event.detail?`<p class="detail-copy">${escapeHTML(event.detail)}</p>`:''}${event.reservation?`<span class="reservation">${escapeHTML(event.reservation)}</span>`:''}${event.warning?`<span class="warning">${escapeHTML(event.warning)}</span>`:''}<div class="detail-actions">${actions(event)}</div>`;
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
renderToday();renderTrip();renderPlaces();renderPreparation();renderInfo();setupInstallExperience();
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
