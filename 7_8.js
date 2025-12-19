/* ====================================================
   НАСТРОЙКИ
   ==================================================== */
// !!! ВСТАВЬ СЮДА СВОЙ КЛЮЧ ИЗ ЛИЧНОГО КАБИНЕТА !!!
const API_KEY = 'a56d59d0-f795-4b8b-be83-984767ccf041'; 
const API_URL_DISHES = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';
const API_URL_ORDERS = `https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${API_KEY}`;

// Глобальное хранилище блюд (загружается с сервера)
let dishes = [];

// Хранилище выбора пользователя (объекты блюд)
let selection = {
    soup: null,
    'main-course': null, // На сервере категория называется main-course
    salad: null,
    drink: null,
    dessert: null
};

/* ====================================================
   ЛАБОРАТОРНАЯ 7: ЗАГРУЗКА ДАННЫХ
   ==================================================== */
async function loadDishes() {
    try {
        const response = await fetch(API_URL_DISHES);
        if (!response.ok) throw new Error('Ошибка сети');
        
        dishes = await response.json();
        
        // Сортировка по имени
        dishes.sort((a, b) => a.name.localeCompare(b.name));
        
        console.log('Блюда загружены:', dishes);
        
        // После загрузки инициализируем интерфейс
        initSelects();
        restoreFromLocalStorage(); // ЛАБ 8: Восстановление выбора
        initComboClickers();
        initFormLogic();
        
    } catch (error) {
        console.error('Ошибка:', error);
        showNotification('Не удалось загрузить меню 😢');
    }
}

/* ====================================================
   УПРАВЛЕНИЕ ИНТЕРФЕЙСОМ (СЕЛЕКТЫ)
   ==================================================== */
function initSelects() {
    // Категории соответствуют полям в dishes (main-course вместо main)
    const categories = ['soup', 'main-course', 'salad', 'drink', 'dessert'];

    categories.forEach(cat => {
        const select = document.getElementById(`select-${cat}`);
        if(!select) return;

        // Фильтруем блюда
        const items = dishes.filter(d => d.category === cat);

        items.forEach(dish => {
            const option = document.createElement('option');
            option.value = dish.id; // ВАЖНО: Используем ID для value
            option.textContent = `${dish.name} (${dish.price}₽)`;
            select.appendChild(option);
        });

        // Слушаем изменения
        select.addEventListener('change', (e) => {
            const id = parseInt(e.target.value);
            const dish = dishes.find(d => d.id === id);
            selection[cat] = dish || null;
            
            updateTotal();
            saveToLocalStorage(); // ЛАБ 8: Сохраняем
        });
    });
}

function updateTotal() {
    let total = 0;
    Object.values(selection).forEach(dish => {
        if (dish) total += dish.price;
    });
    document.getElementById('total-sum').textContent = total;
}

/* ====================================================
   ЛАБОРАТОРНАЯ 8: LOCAL STORAGE
   ==================================================== */
function saveToLocalStorage() {
    // Сохраняем только ID выбранных блюд
    const savedData = {};
    for (const [cat, dish] of Object.entries(selection)) {
        savedData[cat] = dish ? dish.id : null;
    }
    localStorage.setItem('my_lunch_order', JSON.stringify(savedData));
}

function restoreFromLocalStorage() {
    const raw = localStorage.getItem('my_lunch_order');
    if (!raw) return;

    const savedData = JSON.parse(raw);
    
    // Проходим по сохраненным ID и восстанавливаем выбор
    for (const [cat, id] of Object.entries(savedData)) {
        if (id) {
            const dish = dishes.find(d => d.id === id);
            if (dish) {
                selection[cat] = dish;
                // Обновляем визуально селект
                const select = document.getElementById(`select-${cat}`);
                if (select) select.value = id;
            }
        }
    }
    updateTotal();
}

/* ====================================================
   КОМБО (КЛИКИ)
   ==================================================== */
const combosConfig = [
    ['soup', 'main-course', 'salad', 'drink'], 
    ['soup', 'main-course', 'drink'],          
    ['soup', 'salad', 'drink'],         
    ['main-course', 'salad', 'drink'],         
    ['main-course', 'drink']                   
];

function initComboClickers() {
    const comboCards = document.querySelectorAll('.combo-card');
    comboCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            // Сброс
            Object.keys(selection).forEach(k => selection[k] = null);
            document.querySelectorAll('select').forEach(s => s.value = "");
            
            // Заполнение
            const requiredCats = combosConfig[index];
            requiredCats.forEach(cat => {
                const select = document.getElementById(`select-${cat}`);
                // Выбираем второй элемент (первый после --Не выбрано--)
                if (select.options.length > 1) {
                    select.selectedIndex = 1; 
                    const id = parseInt(select.value);
                    selection[cat] = dishes.find(d => d.id === id);
                }
            });
            
            updateTotal();
            saveToLocalStorage();
            showNotification('Комбо выбрано! ✅');
        });
    });
}

/* ====================================================
   ЛАБОРАТОРНАЯ 8: ОТПРАВКА НА СЕРВЕР
   ==================================================== */
function initFormLogic() {
    // Логика отображения поля времени
    const radios = document.getElementsByName('delivery_type');
    const timeBlock = document.getElementById('time-select-block');
    
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'by_time') {
                timeBlock.classList.remove('hidden');
                document.querySelector('[name="delivery_time"]').required = true;
            } else {
                timeBlock.classList.add('hidden');
                document.querySelector('[name="delivery_time"]').required = false;
            }
        });
    });

    // Обработка отправки
    const form = document.getElementById('order-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 1. Валидация состава (из Лаб 6)
        if (!validateOrder()) return;

        // 2. Сбор данных
        const formData = new FormData(form);
        
        // Добавляем ID блюд вручную, так как селекты могут иметь другие имена
        // API ждет поля: soup_id, main_course_id, salad_id, drink_id, dessert_id
        if (selection.soup) formData.append('soup_id', selection.soup.id);
        if (selection['main-course']) formData.append('main_course_id', selection['main-course'].id);
        if (selection.salad) formData.append('salad_id', selection.salad.id);
        if (selection.drink) formData.append('drink_id', selection.drink.id);
        if (selection.dessert) formData.append('dessert_id', selection.dessert.id);

        // 3. Отправка
        try {
            const response = await fetch(API_URL_ORDERS, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.error) {
                showNotification(`Ошибка сервера: ${result.error}`);
            } else {
                showNotification('Заказ успешно оформлен! 🎉');
                // Очистка
                localStorage.removeItem('my_lunch_order');
                form.reset();
                Object.keys(selection).forEach(k => selection[k] = null);
                document.querySelectorAll('select').forEach(s => s.value = "");
                updateTotal();
            }
        } catch (err) {
            showNotification('Ошибка сети при отправке 😢');
            console.error(err);
        }
    });
}

// Простая валидация (как ты просил ранее)
function validateOrder() {
    const s = selection.soup;
    const m = selection['main-course'];
    const sl = selection.salad;
    const d = selection.drink;
    
    if (!s && !m && !sl && !d && !selection.dessert) {
        showNotification('Ничего не выбрано!'); return false;
    }
    if ((s || m || sl) && !d) {
        showNotification('Выберите напиток!'); return false;
    }
    if (s && !m && !sl) {
        showNotification('Выберите главное блюдо или салат!'); return false;
    }
    if (sl && !s && !m) {
        showNotification('Выберите суп или главное блюдо!'); return false;
    }
    if ((d || selection.dessert) && !s && !m && !sl) {
        showNotification('Выберите еду!'); return false;
    }
    return true;
}

/* ====================================================
   УТИЛИТЫ
   ==================================================== */
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

// ЗАПУСК
document.addEventListener('DOMContentLoaded', loadDishes);
