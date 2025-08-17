/* =====================================================
   Travel Memories – Core (Capacitor-ready, IT/EN/ZH) v2.2.0
===================================================== */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* ---------- Platform helpers ---------- */
const isNative = !!(window.Capacitor && typeof window.Capacitor.getPlatform === 'function' && window.Capacitor.getPlatform() !== 'web');
const getPlugin = name => window.Capacitor?.Plugins?.[name];

/* ---------- I18N ---------- */
const i18n = {
  it: {
    app_title: 'Travel Memories',
    search_placeholder: 'Cerca ricordi…',
    tabs: { dashboard: 'Dashboard', memories: 'Ricordi', map: 'Mappa', timeline: 'Timeline', settings: 'Impostazioni' },
    stats: { memories: 'Ricordi', photos: 'Foto', places: 'Luoghi', km: 'Km' },
    recent_memories: 'Ricordi Recenti',
    empty: { title: 'Nessun ricordo', text: 'Inizia ad aggiungere i tuoi ricordi di viaggio!' },
    buttons: { add_memory: 'Aggiungi Ricordo', save_memory: 'Salva Ricordo', edit: 'Modifica', delete: 'Elimina', share: 'Condividi' },
    modal: { new_title: 'Nuovo Ricordo', edit_title: 'Modifica Ricordo', title: 'Titolo', location: 'Località', date: 'Data', description: 'Descrizione', photos: 'Foto' },
    settings: { gps: '📍 GPS', gps_desc: 'Localizzazione automatica', notifications: '🔔 Notifiche', notifications_desc: 'Promemoria viaggi', export: '💾 Esporta Dati', export_desc: 'Backup JSON', clear: '🗑️ Cancella Tutto', clear_desc: 'Elimina dati', language: '🌐 Lingua' },
    nav: { home: 'Home', memories: 'Ricordi', new: 'Nuovo', map: 'Mappa', settings: 'Impostazioni' },
    toasts: { saved: 'Ricordo salvato! ✨', deleted: 'Ricordo eliminato', exported: 'Dati esportati 💾', pos_found: 'Posizione trovata 📍', gps_unavailable: 'GPS non disponibile', pos_fail: 'Impossibile recuperare la posizione', all_cleared: 'Dati eliminati', geo_fail: 'Impossibile geocodificare la località' },
    confirms: { delete_memory: 'Eliminare questo ricordo?', clear_all: 'Eliminare TUTTI i dati?' },
    search_no_results: 'Nessun risultato',
    timeline_empty: 'Nessun evento',
    uploader: { hint: '📷 Clicca per aggiungere foto' },
    search: { filter_all: 'Tutti', filter_title: 'Titolo', filter_location: 'Luogo', filter_date: 'Data' }
  },
  en: {
    app_title: 'Travel Memories',
    search_placeholder: 'Search memories…',
    tabs: { dashboard: 'Dashboard', memories: 'Memories', map: 'Map', timeline: 'Timeline', settings: 'Settings' },
    stats: { memories: 'Memories', photos: 'Photos', places: 'Places', km: 'Km' },
    recent_memories: 'Recent Memories',
    empty: { title: 'No memories yet', text: 'Start adding your travel memories!' },
    buttons: { add_memory: 'Add Memory', save_memory: 'Save Memory', edit: 'Edit', delete: 'Delete', share: 'Share' },
    modal: { new_title: 'New Memory', edit_title: 'Edit Memory', title: 'Title', location: 'Location', date: 'Date', description: 'Description', photos: 'Photo' },
    settings: { gps: '📍 GPS', gps_desc: 'Auto geolocation', notifications: '🔔 Notifications', notifications_desc: 'Trip reminders', export: '💾 Export Data', export_desc: 'JSON Backup', clear: '🗑️ Delete All', clear_desc: 'Remove data', language: '🌐 Language' },
    nav: { home: 'Home', memories: 'Memories', new: 'New', map: 'Map', settings: 'Settings' },
    toasts: { saved: 'Memory saved! ✨', deleted: 'Memory deleted', exported: 'Data exported 💾', pos_found: 'Location found 📍', gps_unavailable: 'GPS unavailable', pos_fail: 'Unable to get location', all_cleared: 'All data removed', geo_fail: 'Unable to geocode location' },
    confirms: { delete_memory: 'Delete this memory?', clear_all: 'Delete ALL data?' },
    search_no_results: 'No results',
    timeline_empty: 'No events',
    uploader: { hint: '📷 Click to add photo' },
    search: { filter_all: 'All', filter_title: 'Title', filter_location: 'Location', filter_date: 'Date' }
  },
  zh: {
    app_title: '旅行回忆',
    search_placeholder: '搜索回忆…',
    tabs: { dashboard: '仪表板', memories: '回忆', map: '地图', timeline: '时间线', settings: '设置' },
    stats: { memories: '回忆', photos: '照片', places: '地点', km: '公里' },
    recent_memories: '最近回忆',
    empty: { title: '没有回忆', text: '开始添加您的旅行回忆！' },
    buttons: { add_memory: '添加回忆', save_memory: '保存回忆', edit: '编辑', delete: '删除', share: '分享' },
    modal: { new_title: '新回忆', edit_title: '编辑回忆', title: '标题', location: '地点', date: '日期', description: '描述', photos: '照片' },
    settings: { gps: '📍 GPS', gps_desc: '自动定位', notifications: '🔔 通知', notifications_desc: '旅行提醒', export: '💾 导出数据', export_desc: 'JSON备份', clear: '🗑️ 删除所有', clear_desc: '删除数据', language: '🌐 语言' },
    nav: { home: '首页', memories: '回忆', new: '新建', map: '地图', settings: '设置' },
    toasts: { saved: '回忆已保存！ ✨', deleted: '回忆已删除', exported: '数据已导出 💾', pos_found: '位置已找到 📍', gps_unavailable: 'GPS不可用', pos_fail: '无法获取位置', all_cleared: '所有数据已删除', geo_fail: '无法地理编码位置' },
    confirms: { delete_memory: '删除此回忆？', clear_all: '删除所有数据？' },
    search_no_results: '无结果',
    timeline_empty: '无事件',
    uploader: { hint: '📷 点击添加照片' },
    search: { filter_all: '全部', filter_title: '标题', filter_location: '地点', filter_date: '日期' }
  }
};
const locales = { it: 'it-IT', en: 'en-US', zh: 'zh-CN' };

const defaultSettings = { gps: true, notifications: false, language: 'it' };
let settings = { ...defaultSettings };
const t = (key) => key.split('.').reduce((o,k)=> (o||{})[k], i18n[settings.language||'it']) || key;
const applyI18n = () => {
  $$('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  const si = $('#searchInput'); if (si) si.placeholder = t('search_placeholder');
  $('#modalTitle').textContent = editingId ? t('modal.edit_title') : t('modal.new_title');
  const searchBtn = document.querySelector('[data-action="toggle-search"]');
  const locBtn = document.querySelector('[data-action="current-location"]');
  if (searchBtn) searchBtn.setAttribute('aria-label', t('buttons.search') || 'Search');
  if (locBtn) locBtn.setAttribute('aria-label', t('buttons.location') || 'Current location');
};

/* ---------- State ---------- */
let memories = [];
let editingId = null;
let map, markers = null;
let currentPosition = null;
let geoCache = JSON.parse(localStorage.getItem('geo') || '{}'); // Persistente con limite

/* ---------- Init ---------- */
window.addEventListener('load', async () => {
  setTimeout(() => $('#loader').classList.add('hide'), 600);

  memories = JSON.parse(localStorage.getItem('memories') || '[]');
  const loaded = JSON.parse(localStorage.getItem('settings') || '{}');
  const browserLang = navigator.language.startsWith('en') ? 'en' : navigator.language.startsWith('zh') ? 'zh' : 'it';
  settings = { ...defaultSettings, ...loaded, ...(loaded.language ? {} : { language: browserLang }) };

  if (!memories.length) {
    memories = [
      { id: Date.now()-2, title: 'Colosseo di Roma', location: 'Roma, Italia', date: '2024-06-15', description: 'Vista mozzafiato del Colosseo al tramonto', images: [], coords:[41.9028,12.4964] },
      { id: Date.now()-1, title: 'Torre Eiffel', location: 'Parigi, Francia', date: '2024-07-20', description: 'La città delle luci di notte', images: [], coords:[48.8566,2.3522] }
    ];
    persist();
  }

  renderSettingsUI();
  applyI18n();
  renderAll();

  // Map
  map = L.map('mapContainer').setView([41.9, 12.5], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OSM' }).addTo(map);
  markers = L.layerGroup().addTo(map);
  updateMapMarkers();

  // SW solo su web
  if (!isNative && 'serviceWorker' in navigator) {
    try { navigator.serviceWorker.register('sw.js'); } catch {}
  }

  // GPS auto se attivo
  if (settings.gps) getCurrentLocation();

  // Language select
  const langSelect = $('#langSelect');
  if (langSelect) langSelect.addEventListener('change', e => changeLanguage(e.target.value));

  // Notifiche setup
  if (settings.notifications) setupNotifications();

  // Lazy loading
  setupLazyLoading();
});

/* ---------- Event Delegation ---------- */
document.body.addEventListener('click', e => {
  const actionEl = e.target.closest('[data-action]');
  if (actionEl) { actions[actionEl.dataset.action](e); return; }
  const tabEl = e.target.closest('[data-tab]');
  if (tabEl) { switchTab(tabEl.dataset.tab); return; }
  const navEl = e.target.closest('[data-nav]');
  if (navEl) { switchNav(navEl.dataset.nav); return; }
  const settingEl = e.target.closest('.setting-item[data-setting]');
  if (settingEl) toggleSetting(settingEl.dataset.setting);
  const memoryCard = e.target.closest('.memory-card');
  if (memoryCard && !e.target.closest('.memory-actions')) openDetail(memoryCard.dataset.id);
  const editBtn = e.target.closest('[data-edit]');
  if (editBtn) editMemory(editBtn.dataset.edit);
  const deleteBtn = e.target.closest('[data-delete]');
  if (deleteBtn) deleteMemory(deleteBtn.dataset.delete);
});
$('#searchInput').addEventListener('input', e => searchMemories(e.target.value, $('#searchFilter').value));
$('#uploader').addEventListener('click', async () => {
  const usedNative = await capturePhotoNative();
  if (!usedNative) $('#imageInput').click();
});
$('#imageInput').addEventListener('change', handleImages);
$('#memoryForm').addEventListener('submit', saveMemory);
$('#modal').addEventListener('click', (e) => { if (e.target.id === 'modal') closeModal(); });
$('#detailModal').addEventListener('click', (e) => { if (e.target.id === 'detailModal') closeDetail(); });

/* ---------- Actions ---------- */
const actions = {
  'toggle-search'() {
    $('#searchContainer').classList.toggle('active');
    if ($('#searchContainer').classList.contains('active')) $('#searchInput').focus();
  },
  'current-location': getCurrentLocation,
  'open-modal': openModal,
  'close-modal': closeModal,
  'close-detail': closeDetail,
  'export-data': exportData,
  'clear-data': clearData,
  'share-memory'(e) {
    const id = e.target.dataset.memoryId; // Assumi set su openDetail
    shareMemory(id);
  }
};

/* ---------- Language ---------- */
function changeLanguage(lang){
  settings.language = lang;
  persist();
  applyI18n();
  renderAll();
}

/* ---------- Memory CRUD ---------- */
async function saveMemory(e){
  e.preventDefault();
  const mem = {
    id: editingId ?? Date.now(),
    title: $('#title').value.trim(),
    location: $('#location').value.trim(),
    date: $('#date').value,
    description: $('#description').value.trim(),
    images: Array.from($$('.preview-img')).map(img => img.src) || []
  };
  try {
    mem.coords = await geocode(mem.location);
  } catch {
    toast(t('toasts.geo_fail'));
    return;
  }
  if (editingId) {
    memories = memories.map(m => m.id === editingId ? { ...mem } : m);
    editingId = null;
  } else {
    memories.unshift(mem);
  }
  persist();
  closeModal();
  renderAll();
  toast(t('toasts.saved'));
}

function editMemory(id){
  const m = memories.find(x=>x.id===id);
  if (!m) return;
  editingId = id;
  $('#modalTitle').textContent = t('modal.edit_title');
  $('#title').value = m.title;
  $('#location').value = m.location;
  $('#date').value = m.date;
  $('#description').value = m.description || '';
  const previews = $('#previews');
  previews.innerHTML = m.images.map(src => `<img src="${src}" class="preview-img" alt="Preview">`).join('');
  openModal();
}

function deleteMemory(id){
  if (!confirm(t('confirms.delete_memory'))) return;
  memories = memories.filter(m => m.id !== id);
  persist();
  renderAll();
  toast(t('toasts.deleted'));
}

/* ---------- Render ---------- */
function renderAll(){
  renderMemories();
  renderTimeline();
  updateStats();
  updateMapMarkers();
  applyI18n(); // Per aggiornare filtri etc.
}

function renderMemories(filtered = memories){
  const grid = $('#memoriesGrid'), recent = $('#recentMemories');
  if (!filtered.length) { grid.innerHTML = `<p class="empty-text">${t('search_no_results')}</p>`; recent.innerHTML=''; $('#emptyState').style.display='block'; return; }
  $('#emptyState').style.display='none';

  grid.innerHTML = filtered.map(cardHTML).join('');
  recent.innerHTML = memories.slice(0,3).map(cardHTML).join('');
}

function cardHTML(m){
  const image = m.images?.[0] ? `<img data-lazy-src="${m.images[0]}" class="memory-image lazy" alt="${m.title}" loading="lazy">` : '<div class="memory-image"></div>';
  return `<div class="memory-card" data-id="${m.id}">
    <div class="memory-actions">
      <button class="action-btn" data-edit="${m.id}" aria-label="${t('buttons.edit')}">✏️</button>
      <button class="action-btn" data-delete="${m.id}" aria-label="${t('buttons.delete')}">🗑️</button>
    </div>
    ${image}
    <div class="memory-content">
      <div class="memory-title">${m.title}</div>
      <div class="memory-location">📍 ${m.location || t('unknown')}</div>
      <div class="memory-date">📅 ${formatDate(m.date)}</div>
    </div>
  </div>`;
}

function renderTimeline(){
  const el = $('#timelineContainer');
  const sorted = [...memories].sort((a,b)=> new Date(b.date) - new Date(a.date));
  if (!sorted.length) { el.innerHTML = ''; $('#timelineEmpty').style.display = 'block'; return; }
  $('#timelineEmpty').style.display = 'none';
  el.innerHTML = sorted.map(m => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-date">${formatDate(m.date)}</div>
        <div class="timeline-title">${m.title}</div>
        <div class="timeline-description">${m.location}</div>
      </div>
    </div>`).join('');
}

function updateStats(){
  $('#statMem').textContent = memories.length;
  $('#statPic').textContent = memories.reduce((acc, m) => acc + (m.images?.length || 0), 0);
  $('#statPla').textContent = new Set(memories.map(m=>m.location)).size;
  calcTotalKm().then(km => $('#statKm').textContent = km).catch(() => $('#statKm').textContent = '0');
}

/* ---------- Map ---------- */
async function updateMapMarkers(){
  if (!map) return;
  markers.clearLayers();
  let changed = false;
  for (const m of memories){
    let coord = m.coords;
    if (!coord) {
      try {
        coord = await geocode(m.location);
        if (coord) { m.coords = coord; changed = true; }
      } catch {}
    }
    if (coord) {
      L.marker(coord).addTo(markers)
        .bindPopup(`<b>${m.title}</b><br>${m.location}<br>${formatDate(m.date)}`);
    }
  }
  if (changed) persist();
}

/* ---------- Tab/Nav Switch ---------- */
function switchTab(id){
  $$('.nav-tab').forEach(b=> b.classList.toggle('active', b.dataset.tab===id));
  $$('.section').forEach(s=> s.classList.toggle('active', s.id===id));
  if (id==='map' && map) setTimeout(()=> map.invalidateSize(), 120);
  if (id==='memories') { $('#searchInput').value = ''; searchMemories(''); } // Reset search
}
function switchNav(id){
  $$('.nav-item').forEach(b=> b.classList.toggle('active', b.dataset.nav===id));
  switchTab(id);
}

/* ---------- Geolocation ---------- */
async function getCurrentLocation(){
  const Geo = getPlugin('Geolocation');
  if (isNative && Geo) {
    try{
      const pos = await Geo.getCurrentPosition();
      currentPosition = [pos.coords.latitude, pos.coords.longitude];
      if (map) { map.setView(currentPosition, 13); L.marker(currentPosition).addTo(map).bindPopup('📍').openPopup(); }
      toast(t('toasts.pos_found'));
      return;
    }catch{ toast(t('toasts.pos_fail')); return; }
  }
  if (!navigator.geolocation) { toast(t('toasts.gps_unavailable')); return; }
  navigator.geolocation.getCurrentPosition(pos=>{
    currentPosition = [pos.coords.latitude, pos.coords.longitude];
    if (map) { map.setView(currentPosition,13); L.marker(currentPosition).addTo(map).bindPopup('📍').openPopup(); }
    toast(t('toasts.pos_found'));
  }, ()=> toast(t('toasts.pos_fail')));
}

/* ---------- Camera (native) ---------- */
async function capturePhotoNative(){
  const Camera = getPlugin('Camera');
  if (!isNative || !Camera) return false;
  try{
    const photo = await Camera.getPhoto({
      resultType: 'dataUrl',
      source: 'CAMERA',
      quality: 80,
      allowEditing: false,
      direction: 'REAR'
    });
    if (photo?.dataUrl) {
      const compressed = await compressImage(photo.dataUrl);
      addPreview(compressed);
      return true;
    }
  }catch{}
  return false;
}

/* ---------- Geocoding + Distance ---------- */
const langHeader = () => settings.language;
async function geocode(q){
  if (!q) return null;
  if (geoCache[q]) return geoCache[q];
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`;
  try{
    const res = await fetch(url, { headers: { 'Accept-Language': langHeader() } });
    const data = await res.json();
    if (data && data[0]) {
      const coord = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      geoCache[q] = coord;
      if (Object.keys(geoCache).length > 50) delete geoCache[Object.keys(geoCache)[0]]; // Limite
      localStorage.setItem('geo', JSON.stringify(geoCache));
      return coord;
    }
    throw new Error('No result');
  }catch{ throw new Error('Geocode failed'); }
}
async function reverseGeocode([lat,lon]){
  try{
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`;
    const res = await fetch(url, { headers: { 'Accept-Language': langHeader() } });
    const data = await res.json();
    const a = data.address || {};
    const city = a.city || a.town || a.village || a.county;
    const country = a.country;
    return [city, country].filter(Boolean).join(', ') || data.display_name;
  }catch{ return null; }
}
async function calcTotalKm(){
  if (memories.length < 2) return 0;
  const sorted = [...memories].sort((a,b)=> new Date(a.date) - new Date(b.date));
  let km=0, prev=null;
  for (const m of sorted){
    const c = m.coords || await geocode(m.location).catch(() => null);
    if (c && prev) km += haversine(prev, c);
    if (c) prev = c;
  }
  return Math.round(km);
}
function haversine([lat1,lon1],[lat2,lon2]){
  const R=6371, dLat=toRad(lat2-lat1), dLon=toRad(lon2-lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  return R*2*Math.asin(Math.sqrt(a));
}
const toRad = d => d*Math.PI/180;

/* ---------- Search ---------- */
function searchMemories(q, filter = 'all'){
  q = (q||'').toLowerCase();
  const res = memories.filter(m => {
    if (filter === 'title') return m.title.toLowerCase().includes(q);
    if (filter === 'location') return m.location.toLowerCase().includes(q);
    if (filter === 'date') return formatDate(m.date).toLowerCase().includes(q);
    return m.title.toLowerCase().includes(q) || m.location.toLowerCase().includes(q) || formatDate(m.date).toLowerCase().includes(q);
  });
  renderMemories(res);
}

/* ---------- Image Handling (multi + compress) ---------- */
async function handleImages(e){
  const files = Array.from(e.target.files).slice(0, 3 - $$('.preview-img').length); // Max 3
  for (const file of files) {
    const reader = new FileReader();
    reader.onload = async ev => {
      const compressed = await compressImage(ev.target.result);
      addPreview(compressed);
    };
    reader.readAsDataURL(file);
  }
}
function addPreview(src){
  if ($$('.preview-img').length >= 3) return;
  const img = document.createElement('img');
  img.src = src;
  img.classList.add('preview-img');
  img.alt = 'Preview';
  $('#previews').appendChild(img);
}
async function compressImage(dataUrl){
  return new Promise(resolve => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const max = 1024;
      let w = img.width, h = img.height;
      if (w > h && w > max) { h *= max / w; w = max; }
      else if (h > max) { w *= max / h; h = max; }
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
  });
}

/* ---------- Detail Modal ---------- */
function openDetail(id){
  const m = memories.find(x => x.id == id);
  if (!m) return;
  $('#detailTitle').textContent = m.title;
  $('#detailLocation').querySelector('span').textContent = m.location || t('unknown');
  $('#detailDate').querySelector('span').textContent = formatDate(m.date);
  $('#detailDescription').textContent = m.description || '';
  const carousel = $('#detailImages');
  carousel.innerHTML = m.images.map(src => `<img src="${src}" alt="${m.title}" loading="lazy">`).join('');
  $('#share-memory').dataset.memoryId = id; // Per share
  $('#detailModal').classList.add('active');
}
function closeDetail(){
  $('#detailModal').classList.remove('active');
}

/* ---------- Share Memory ---------- */
async function shareMemory(id){
  const m = memories.find(x => x.id == id);
  if (!m) return;
  const Share = getPlugin('Share');
  if (isNative && Share) {
    try {
      await Share.share({
        title: m.title,
        text: `${m.description}\n${m.location} - ${formatDate(m.date)}`,
        url: m.images[0] || '', // Condividi prima immagine se presente
        dialogTitle: t('buttons.share')
      });
    } catch {}
  } else {
    // Fallback web (copia testo)
    navigator.clipboard.writeText(`${m.title}: ${m.description} (${m.location}, ${formatDate(m.date)})`);
    toast('Copied to clipboard!');
  }
}

/* ---------- Settings ---------- */
function toggleSetting(key){
  settings[key] = !settings[key];
  renderSettingsUI();
  persist();
  if (key === 'notifications') {
    if (settings.notifications) setupNotifications();
    else { /* Disabilita se necessario */ }
  }
}
function renderSettingsUI(){
  ['gps','notifications'].forEach(k => {
    const el = $('#toggle-'+k);
    if (el) el.classList.toggle('active', !!settings[k]);
  });
  const sel = $('#langSelect'); if (sel) sel.value = settings.language || 'it';
}

/* ---------- Notifications Setup (base) ---------- */
async function setupNotifications(){
  const Push = getPlugin('PushNotifications');
  if (isNative && Push) {
    try {
      await Push.requestPermissions();
      await Push.register();
      // Qui potresti ascoltare push e schedule locali, es. per date memories
    } catch {}
  } else if ('Notification' in window) {
    Notification.requestPermission();
  }
}

/* ---------- Persist ---------- */
function persist(){
  localStorage.setItem('memories', JSON.stringify(memories));
  localStorage.setItem('settings', JSON.stringify(settings));
  localStorage.setItem('geo', JSON.stringify(geoCache));
}

/* ---------- Export / Clear ---------- */
async function exportData(){
  const payload = JSON.stringify({ memories, settings }, null, 2);
  const Filesystem = getPlugin('Filesystem');
  const Share = getPlugin('Share');
  if (isNative && Filesystem) {
    try{
      const res = await Filesystem.writeFile({
        path: 'travel-memories.json',
        data: payload,
        directory: 'DOCUMENTS',
        encoding: 'utf8'
      });
      if (Share && res?.uri) {
        await Share.share({
          title: 'Travel Memories Backup',
          text: 'Backup JSON',
          url: res.uri,
          dialogTitle: 'Condividi backup'
        });
      }
      toast(t('toasts.exported'));
      return;
    }catch{}
  }
  const blob = new Blob([payload], { type:'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'travel-memories.json';
  a.click();
  toast(t('toasts.exported'));
}
function clearData(){
  if (!confirm(t('confirms.clear_all'))) return;
  localStorage.clear();
  geoCache = {};
  memories = [];
  renderAll();
  toast(t('toasts.all_cleared'));
}

/* ---------- UI helpers ---------- */
function openModal(){
  $('#modal').classList.add('active');
  $('#date').valueAsDate = new Date();
  $('#modalTitle').textContent = editingId ? t('modal.edit_title') : t('modal.new_title');
  if (settings.gps && currentPosition && !$('#location').value) {
    reverseGeocode(currentPosition).then(loc => { if (loc) $('#location').value = loc; });
  }
}
function closeModal(){
  $('#modal').classList.remove('active');
  $('#memoryForm').reset();
  $('#previews').innerHTML = '';
  editingId = null;
}
function toast(msg){
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(()=> el.classList.remove('show'), 2800);
}

/* ---------- Date format ---------- */
const formatDate = d => {
  try { return new Date(d).toLocaleDateString(locales[settings.language] || 'it-IT', { day:'numeric', month:'long', year:'numeric' }); }
  catch { return t('unknown'); }
};

/* ---------- Lazy Loading ---------- */
function setupLazyLoading(){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.lazySrc;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });
  $$('.lazy').forEach(img => observer.observe(img));
}