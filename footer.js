document.addEventListener('DOMContentLoaded', function () {
  const footerEl = document.querySelector('footer.footer');
  if (!footerEl) return;
  const year = new Date().getFullYear();
  footerEl.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="assets/logo.svg" alt="NutriVision AI">
          <p>ИИ-калькулятор калорий по фото еды и напитков.</p>
        </div>
        <div class="footer-col">
          <h4>Меню</h4>
          <a href="index.html">Калькулятор</a>
          <a href="features.html">Как работает</a>
          <a href="creator.html">О создателе</a>
        </div>
        <div class="footer-col">
          <h4>Документы</h4>
          <a class="doc-link" href="privacy-policy.docx">Политика конфиденциальности</a>
          <a class="doc-link" href="404.html">Отзывы</a>
        </div>
        <div class="footer-col">
          <h4>Контакты</h4>
          <a href="mailto:ntwhale155@gmail.com">ntwhale155@gmail.com</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© NutriVision AI, ${year}</span>
        <span>Сделано с ♥ для анализа питания</span>
      </div>
    </div>
  `;
});
