// BLACK SWAN · brand introduction only.
// The previous published selections, match results and performance calculations
// are intentionally absent from the current website source.
(() => {
  const dateLabel = document.getElementById('date-label');
  if (dateLabel) {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Shanghai'
    }).formatToParts(now).filter(part => part.type !== 'literal').map(part => part.value);
    dateLabel.textContent = parts.join('.');
  }
  const navigation = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
  navigation.forEach(link => link.addEventListener('click', () => {
    navigation.forEach(item => item.classList.toggle('active', item === link));
  }));
})();