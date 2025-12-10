let currentOrder = { soup: null, main: null, salad: null, drink: null, dessert: null };
let filters = { soup: null, main: null, salad: null, drink: null, dessert: null };

// 1. Создание карточки (используем классы из твоего CSS)
function createCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish'; // класс из твоего CSS
    card.setAttribute('data-dish', dish.keyword);

    const img = document.createElement('img');
    img.src = dish.image;
    img.onerror = () => { img.src = 'imgs/placeholder.png'; }; // Заглушка если нет картинки
    
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `${dish.price} руб.`;

    const name = document.createElement('p');
    name.className = 'name';
    name.textContent = dish.name;

    const weight = document.createElement('p');
    weight.className = 'weight';
    weight.textContent = dish.count;

    const btn = document.createElement('button');
    btn.textContent = 'Добавить';
    btn.onclick = () => addToOrder(dish);

    card.append(img, price, name, weight, btn);
    return card;
}

// 2. Рендер секции
function renderSection(category) {
    const section = document.querySelector(`section[data-category="${category}"]`);
    const container = section.querySelector('.dishes');
    container.innerHTML = '';

    // Фильтр по категории + фильтр по kind + сортировка
    let items = dishes.filter(d => d.category === category);
    
    if (filters[category]) {
        items = items.filter(d => d.kind === filters[category]);
    }

    items.sort((a, b) => a.name.localeCompare(b.name));

    items.forEach(dish => container.appendChild(createCard(dish)));
}

// 3. Обработчики кнопок фильтров
function initFilters() {
    document.querySelectorAll('.filters button').forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.closest('section');
            const category = section.dataset.category;
            const kind = this.dataset.kind;

            // Переключение
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                filters[category] = null;
            } else {
                section.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filters[category] = kind;
            }
            renderSection(category);
        });
    });
}

// 4. Добавление в заказ
function addToOrder(dish) {
    currentOrder[dish.category] = dish;
    updateOrderDisplay();
}

function updateOrderDisplay() {
    const nothing = document.getElementById('nothing-selected');
    const itemsBlock = document.getElementById('order-items');
    const totalBlock = document.getElementById('total-cost');
    const sumSpan = document.getElementById('total-sum');

    const isEmpty = Object.values(currentOrder).every(v => v === null);

    if (isEmpty) {
        nothing.style.display = 'block';
        itemsBlock.classList.add('hidden');
        totalBlock.classList.add('hidden');
    } else {
        nothing.style.display = 'none';
        itemsBlock.classList.remove('hidden'); // Убираем класс hidden
        itemsBlock.style.display = 'flex'; // Возвращаем flex
        totalBlock.classList.remove('hidden');

        let sum = 0;
        for (const [cat, dish] of Object.entries(currentOrder)) {
            const row = document.getElementById(`selected-${cat}`);
            const span = row.querySelector('span');
            if (dish) {
                span.textContent = `${dish.name} (${dish.price}₽)`;
                sum += dish.price;
            } else {
                span.textContent = 'Не выбрано';
            }
        }
        sumSpan.textContent = sum;
    }
}

// Старт
document.addEventListener('DOMContentLoaded', () => {
    ['soup', 'main', 'salad', 'drink', 'dessert'].forEach(cat => renderSection(cat));
    initFilters();
    updateOrderDisplay();
});
