(function () {
  const photoInput    = document.getElementById('photoInput');
  const previewBox    = document.getElementById('preview');
  const analyzeBtn    = document.getElementById('analyzeBtn');
  const clearBtn      = document.getElementById('clearBtn');
  const clearHistBtn  = document.getElementById('clearHistoryBtn');
  const historyList   = document.getElementById('historyList');
  const kcalVal       = document.getElementById('kcalVal');
  const protVal       = document.getElementById('prot');
  const fatVal        = document.getElementById('fat');
  const carbVal       = document.getElementById('carb');

  const heroPreview   = document.getElementById('heroPreview');
  const heroResult    = document.getElementById('heroResult');

  let currentImgSrc = null;

  const demoData = [
    { name: 'Пицца Маргарита',  kcal: 267, p: 11, f: 10, c: 33 },
    { name: 'Куриный салат',    kcal: 185, p: 22, f:  8, c:  6 },
    { name: 'Паста карбонара',  kcal: 420, p: 16, f: 19, c: 48 },
    { name: 'Стейк говяжий',    kcal: 310, p: 31, f: 18, c:  0 },
    { name: 'Овсяная каша',     kcal: 150, p:  5, f:  3, c: 27 },
    { name: 'Смузи ягодный',    kcal:  95, p:  2, f:  1, c: 21 },
    { name: 'Суши-сет',         kcal: 340, p: 18, f:  8, c: 52 },
    { name: 'Бургер классик',   kcal: 520, p: 24, f: 26, c: 45 },
  ];

  if (photoInput) {
    photoInput.addEventListener('change', function () {
      const file = this.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        currentImgSrc = e.target.result;
        showPreview(currentImgSrc);
        showHeroPreview(currentImgSrc);
      };
      reader.readAsDataURL(file);
    });
  }

  function showPreview(src) {
    if (!previewBox) return;
    previewBox.innerHTML = `<img src="${src}" alt="Загруженное фото еды">`;
  }

  function showHeroPreview(src) {
    if (!heroPreview) return;
    heroPreview.innerHTML = `<img src="${src}" alt="Фото еды">`;
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      currentImgSrc = null;
      if (photoInput) photoInput.value = '';
      if (previewBox) previewBox.innerHTML = '<p>Здесь появится фото еды или напитка</p>';
      if (heroPreview) { heroPreview.innerHTML = '<img src="assets/logo.svg" alt="NutriVision AI">'; }
      resetResult();
    });
  }

  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', function () {
      if (!currentImgSrc) {
        alert('Сначала загрузите фото блюда.');
        return;
      }
      const item = demoData[Math.floor(Math.random() * demoData.length)];
      setResult(item);
      addHistory(currentImgSrc, item);
      if (heroResult) heroResult.textContent = `${item.name}: ${item.kcal} ккал`;
    });
  }

  function setResult(item) {
    if (!kcalVal) return;
    kcalVal.textContent = `${item.kcal} ккал`;
    if (protVal) protVal.textContent = `${item.p} г`;
    if (fatVal)  fatVal.textContent  = `${item.f} г`;
    if (carbVal) carbVal.textContent = `${item.c} г`;
  }

  function resetResult() {
    if (kcalVal) kcalVal.textContent = '0 ккал';
    if (protVal) protVal.textContent = '0 г';
    if (fatVal)  fatVal.textContent  = '0 г';
    if (carbVal) carbVal.textContent = '0 г';
  }

  const HISTORY_KEY = 'nutrivision_history';

  function getHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
    catch { return []; }
  }

  function saveHistory(arr) {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(arr.slice(0, 20))); }
    catch {}
  }

  function addHistory(src, item) {
    const arr = getHistory();
    arr.unshift({ src, item, ts: Date.now() });
    saveHistory(arr);
    renderHistory();
  }

  function renderHistory() {
    if (!historyList) return;
    const arr = getHistory();
    if (!arr.length) {
      historyList.innerHTML = '<p class="empty-history">История пока пустая.</p>';
      return;
    }
    historyList.innerHTML = arr.map(function (entry) {
      return `
        <div class="history-item">
          <img src="${entry.src}" alt="Фото блюда">
          <div>
            <h3>${entry.item.name}</h3>
            <p>${new Date(entry.ts).toLocaleDateString('ru-RU', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })}</p>
            <b>${entry.item.kcal} ккал</b>
            <span>Б ${entry.item.p}г · Ж ${entry.item.f}г · У ${entry.item.c}г</span>
          </div>
        </div>
      `;
    }).join('');
  }

  if (clearHistBtn) {
    clearHistBtn.addEventListener('click', function () {
      saveHistory([]);
      renderHistory();
    });
  }

  renderHistory();

})();
