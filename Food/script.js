// ===== 彈窗 =====
function openModal(name, type, address, time, stars, mapLink, linkLink) {
  document.getElementById('modal-name').textContent = name;
  document.getElementById('modal-type').textContent = '類型：' + type;
  document.getElementById('modal-address').textContent = '📍：' + address;
  document.getElementById('modal-time').textContent = '⏰：' + time;
  document.getElementById('modal-stars').textContent = '⭐：' + stars;
  document.getElementById('modal-map').href = mapLink;
  document.getElementById('modal-link').href = linkLink; // ✅ 修正這裡（你原本拼錯）
  document.getElementById('modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// 點外面關閉
window.onclick = function(e) {
  const modal = document.getElementById('modal');
  if (e.target === modal) modal.style.display = 'none';
};


// ===== 黑暗模式 =====
const toggleBtn = document.getElementById('modeToggle');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  toggleBtn.textContent = document.body.classList.contains('dark-mode')
    ? '切換白天模式'
    : '切換夜晚模式';
});


// ===== 分類（多選 + 高亮）=====
let selectedCategories = [];

function toggleFilter(category) {
  const cards = document.querySelectorAll('.card');
  const buttons = document.querySelectorAll('.filter-buttons button');

  // 全部
  if (category === 'all') {
    selectedCategories = [];
    buttons.forEach(btn => btn.classList.remove('active'));
  } else {
    const btn = document.querySelector(`button[data-cat="${category}"]`);

    if (selectedCategories.includes(category)) {
      selectedCategories = selectedCategories.filter(c => c !== category);
      btn.classList.remove('active');
    } else {
      selectedCategories.push(category);
      btn.classList.add('active');
    }
  }

  // 篩選
  cards.forEach(card => {
    const categories = card.dataset.category.split(' ');

    if (selectedCategories.length === 0) {
      card.style.display = 'block';
    } else {
      const match = selectedCategories.every(c => categories.includes(c));
      card.style.display = match ? 'block' : 'none';
    }
  });
}

// 分類對應顯示文字
const categoryMap = {
American: '美式',
Italian: '義式',
Japanese: '日式',
Western: '西式',
Thai: '泰式',
Indian: '印式',
Chinese: '中式',
Taiwanese: '台式',

burger: '漢堡',
riceBowls: '丼飯／海鮮丼',
hotpot: '鍋物',
setmeal: '定食',
pasta: '義大利麵',
soba: '蕎麥麵',
ramen: '拉麵',
congee: '粥品',
oden: '關東煮',
riceNoodles: '米干',

curry: '咖哩',
soup: '湯品',
seafood: '海鮮',
dinerBar: '餐酒館',
ice: '冰品',
fried: '炸物',
};

// 自動產生 tag
function generateTags() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const categories = card.dataset.category.split(' ');
    const info = card.querySelector('.card-info');

    // 建立 tag 容器
    const tagContainer = document.createElement('div');
    tagContainer.classList.add('tags');

    categories.forEach(cat => {
      const tag = document.createElement('span');
      tag.textContent = categoryMap[cat] || cat;
      tagContainer.appendChild(tag);
    });

    info.appendChild(tagContainer);
  });
}

// 頁面載入後執行
window.addEventListener('DOMContentLoaded', generateTags);