const wallpapers = [
  { title: 'Afterglow', author: 'Pipper Studio Workshop', category: 'abstract', mood: 'calm', image: 'image-1', liked: false },
  { title: 'Soft Horizons', author: 'Pipper Studio Workshop', category: 'nature', mood: 'calm', image: 'image-2', liked: true },
  { title: 'Wild Fern', author: 'Pipper Studio Workshop', category: 'nature', mood: 'bold', image: 'image-3', liked: false },
  { title: 'Quiet Forms', author: 'Pipper Studio Workshop', category: 'minimal', mood: 'minimal', image: 'image-4', liked: false },
  { title: 'Sundown FM', author: 'Pipper Studio Workshop', category: 'photography', mood: 'bold', image: 'image-5', liked: false },
  { title: 'Still Life', author: 'Pipper Studio Workshop', category: 'minimal', mood: 'minimal', image: 'image-6', liked: false }
];

const generatedPalettes = [
  ['#17233d', '#4e6f91', '#b8d5d8'],
  ['#321c40', '#8e4f78', '#f0b47b'],
  ['#193b38', '#4e8c75', '#d2d887'],
  ['#392b20', '#a56f4c', '#f4d39b'],
  ['#20263c', '#6f638f', '#dca9c7'],
  ['#27302f', '#718b78', '#d7e4c1']
];
const generatedCategories = ['abstract', 'nature', 'minimal', 'photography'];
const generatedMoods = ['calm', 'bold', 'minimal'];

for (let index = 1; index <= 1000; index += 1) {
  const palette = generatedPalettes[(index - 1) % generatedPalettes.length];
  const category = generatedCategories[(index - 1) % generatedCategories.length];
  const mood = generatedMoods[(index - 1) % generatedMoods.length];
  const angle = (index * 17) % 360;
  wallpapers.push({
    title: `Drift ${String(index).padStart(4, '0')}`,
    author: 'Drift Open Collection',
    category,
    mood,
    image: 'generated',
    style: `background: linear-gradient(${angle}deg, ${palette[0]}, ${palette[1]} 52%, ${palette[2]});`,
    liked: false
  });
}

const grid = document.querySelector('#wallpaper-grid');
const emptyState = document.querySelector('#empty-state');
const wallpaperCount = document.querySelector('#wallpaper-count');
const searchInput = document.querySelector('#search-input');
const previewScreen = document.querySelector('#preview-screen');
const previewTitle = document.querySelector('#preview-title');
const previewAuthor = document.querySelector('#preview-author');
const previewHeart = document.querySelector('#preview-heart');
const filterButton = document.querySelector('#filter-button');
const filterMenu = document.querySelector('#filter-menu');
let selectedIndex = 0;
let activeCategory = 'all';
let activeMood = 'all';

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = wallpapers.map((wallpaper, index) => ({ wallpaper, index })).filter(({ wallpaper }) => {
    const matchesQuery = `${wallpaper.title} ${wallpaper.author}`.toLowerCase().includes(query);
    return matchesQuery && (activeCategory === 'all' || wallpaper.category === activeCategory) && (activeMood === 'all' || wallpaper.mood === activeMood);
  });
  wallpaperCount.textContent = `${wallpapers.length.toLocaleString()} wallpapers`;
  grid.innerHTML = visible.map(({ wallpaper, index }) => `
    <article class="wallpaper-card ${index === selectedIndex ? 'selected' : ''}" data-index="${index}">
      <div class="wallpaper-image ${wallpaper.image}"${wallpaper.style ? ` style="${wallpaper.style}"` : ''}>
        <button class="heart ${wallpaper.liked ? 'liked' : ''}" data-heart="${index}" aria-label="${wallpaper.liked ? 'Remove from favorites' : 'Add to favorites'}">${wallpaper.liked ? '♥' : '♡'}</button>
      </div>
      <div class="card-info"><div><strong>${wallpaper.title}</strong><small>${wallpaper.author} · ${wallpaper.category}</small></div></div>
    </article>`).join('');
  emptyState.style.display = visible.length ? 'none' : 'block';
  grid.querySelectorAll('.wallpaper-card').forEach(card => card.addEventListener('click', event => {
    if (event.target.closest('[data-heart]')) return;
    selectWallpaper(Number(card.dataset.index));
  }));
  grid.querySelectorAll('[data-heart]').forEach(button => button.addEventListener('click', event => {
    event.stopPropagation();
    const index = Number(button.dataset.heart);
    wallpapers[index].liked = !wallpapers[index].liked;
    render();
    if (selectedIndex === index) updatePreview();
  }));
}

function selectWallpaper(index) {
  selectedIndex = index;
  updatePreview();
  render();
}

function updatePreview() {
  const wallpaper = wallpapers[selectedIndex];
  previewScreen.className = `screen ${wallpaper.image}`;
  previewTitle.textContent = wallpaper.title;
  previewAuthor.innerHTML = `${wallpaper.author} <span>·</span> ${wallpaper.category}`;
  previewHeart.textContent = wallpaper.liked ? '♥' : '♡';
}

searchInput.addEventListener('input', render);
document.querySelectorAll('[data-category]').forEach(chip => chip.addEventListener('click', () => {
  activeCategory = chip.dataset.category;
  document.querySelectorAll('.chip').forEach(item => item.classList.toggle('active', item === chip));
  render();
}));
filterButton.addEventListener('click', () => filterMenu.classList.toggle('open'));
filterMenu.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
  activeMood = button.dataset.filter;
  filterButton.firstChild.textContent = `${button.textContent} `;
  filterMenu.classList.remove('open');
  render();
}));
document.addEventListener('click', event => {
  if (!event.target.closest('.filter-wrap')) filterMenu.classList.remove('open');
});
previewHeart.addEventListener('click', () => {
  wallpapers[selectedIndex].liked = !wallpapers[selectedIndex].liked;
  updatePreview();
  render();
});
document.querySelector('#apply-button').addEventListener('click', () => {
  const toast = document.querySelector('#toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
});
document.querySelector('#theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});
render();
updatePreview();
