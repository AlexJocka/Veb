// Хранилище выбора
let selection = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

// Храним ТРЕБОВАНИЯ текущего выбранного комбо
// Если null — значит пользователь собирает ланч вручную (без клика по комбо)
let currentComboRequirements = null; 

// Конфигурация комбо (обязательные категории)
const combosConfig = [
    ['soup', 'main', 'salad', 'drink'], // 0: Полный обед
    ['soup', 'main', 'drink'],          // 1: Суп + Второе
    ['soup', 'salad', 'drink'],         // 2: Суп + Салат
    ['main', 'salad', 'drink'],         // 3: Второе + Салат
    ['main', 'drink']                   // 4: Второе + Напиток
];

// 1. ИНИЦИАЛИЗАЦИЯ
function initSelects() {
    const categories = ['soup', 'main', 'salad', 'drink', 'dessert'];

    categories.forEach(cat => {
        const select = document.getElementById(`select-${cat}`);
        const items = dishes.filter(d => d.category === cat).sort((a, b) => a.name.localeCompare(b.name));

        items.forEach(dish => {
            const option = document.createElement('option');
            option.value = dish.keyword;
            option.textContent = `${dish.name} (${dish.price}₽)`;
            select.appendChild(option);
        });

        select.addEventListener('change', (e) => {
            const keyword = e.target.value;
            selection[cat] = dishes.find(d => d.keyword === keyword) || null;
            updateTotal();
        });
    });
}

// 2. КЛИКИ ПО КОМБО
function initComboClickers() {
    const comboCards = document.querySelectorAll('.combo-card');
    
    comboCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', () => {
            // Выделение
            comboCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            // ЗАПОМИНАЕМ ТРЕБОВАНИЯ ЭТОГО КОМБО
            currentComboRequirements = combosConfig[index]; 

            // Сброс и автозаполнение
            resetSelection();
            
            currentComboRequirements.forEach(cat => {
                const select = document.getElementById(`select-${cat}`);
                if (select.options.length > 1) {
                    select.selectedIndex = 1;
                    const keyword = select.value;
                    selection[cat] = dishes.find(d => d.keyword === keyword);
                }
            });
            updateTotal();
        });
    });
}

function resetSelection() {
    const categories = ['soup', 'main', 'salad', 'drink', 'dessert'];
    categories.forEach(cat => {
        const select = document.getElementById(`select-${cat}`);
        select.value = "";
        selection[cat] = null;
    });
}

function updateTotal() {
    let total = 0;
    Object.values(selection).forEach(dish => {
        if (dish) total += dish.price;
    });
    document.getElementById('total-sum').textContent = total;
}

function showNotification(text) {
    const container = document.createElement('div');
    container.className = 'notification-container';
    container.innerHTML = `
        <div class="notification-box">
            <p class="notification-message">${text}</p>
            <button class="notification-btn">Окей 👌</button>
        </div>
    `;
    document.body.append(container);
    container.querySelector('button').addEventListener('click', () => container.remove());
}

// 3. ВАЛИДАЦИЯ ПРИ ОТПРАВКЕ
document.querySelector('.order-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // ПРОВЕРКА №1: Если выбрано КОНКРЕТНОЕ комбо (кликом), проверяем его состав
    if (currentComboRequirements) {
        // Проходим по всем обязательным категориям этого комбо
        for (const requiredCat of currentComboRequirements) {
            // Если в этой категории ничего не выбрано
            if (!selection[requiredCat]) {
                // Генерируем текст ошибки
                let catName = '';
                if (requiredCat === 'soup') catName = 'суп';
                else if (requiredCat === 'main') catName = 'главное блюдо';
                else if (requiredCat === 'salad') catName = 'салат';
                else if (requiredCat === 'drink') catName = 'напиток';
                
                showNotification(`Вы выбрали комбо, но не выбрали ${catName}!`);
                return; // Прерываем отправку
            }
        }
    }

    // ПРОВЕРКА №2: Общая логика (на случай, если пользователь не кликал по комбо, а собирал сам)
    // Твои стандартные правила из задания:
    const s = selection.soup;
    const m = selection.main;
    const sl = selection.salad;
    const d = selection.drink;
    
    if (!s && !m && !sl && !d && !selection.dessert) {
        showNotification('Ничего не выбрано. Выберите блюда для заказа');
        return;
    }
    if ((s || m || sl) && !d) {
        showNotification('Выберите напиток');
        return;
    }
    if (s && !m && !sl) {
        showNotification('Выберите главное блюдо/салат/стартер');
        return;
    }
    if (sl && !s && !m) {
        showNotification('Выберите суп или главное блюдо');
        return;
    }
    if ((d || selection.dessert) && !s && !m && !sl) {
        showNotification('Выберите главное блюдо');
        return;
    }

    // Успех
    alert('Заказ принят!');
});

document.addEventListener('DOMContentLoaded', () => {
    initSelects();
    initComboClickers();
});
