// !!! ВСТАВЬ СЮДА СВОЙ КЛЮЧ ИЗ ЛИЧНОГО КАБИНЕТА !!!
const API_KEY = 'a56d59d0-f795-4b8b-be83-984767ccf041';  
const API_URL = `https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${API_KEY}`;
const API_DISHES = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';

let orders = [];
let allDishes = [];
let orderToDeleteId = null;
let orderToEditId = null;

// 1. ЗАГРУЗКА ДАННЫХ
async function init() {
    try {
        // Грузим блюда (чтобы знать их названия по ID)
        const dishesResp = await fetch(API_DISHES);
        allDishes = await dishesResp.json();

        // Грузим заказы
        const ordersResp = await fetch(API_URL);
        orders = await ordersResp.json();
        
        // Сортировка: новые сверху
        orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        renderOrders();
    } catch (err) {
        alert('Ошибка загрузки: ' + err.message);
    }
}

// 2. ОТРИСОВКА ТАБЛИЦЫ
function renderOrders() {
    const tbody = document.getElementById('orders-tbody');
    tbody.innerHTML = '';

    orders.forEach((order, index) => {
        const tr = document.createElement('tr');
        
        // Собираем названия блюд
        const dishNames = [
            order.soup_id, order.main_course_id, order.salad_id, order.drink_id, order.dessert_id
        ]
        .map(id => allDishes.find(d => d.id === id)?.name)
        .filter(Boolean) // Убираем undefined
        .join(', ');

        // Цена
        const cost = calculateCost(order);

        // Время
        const time = order.delivery_type === 'now' ? 'Как можно скорее' : order.delivery_time;

        // Дата создания
        const date = new Date(order.created_at).toLocaleString('ru-RU');

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${date}</td>
            <td>${dishNames}</td>
            <td>${cost}₽</td>
            <td>${time}</td>
            <td>
                <button class="action-btn" onclick="openView(${order.id})" title="Подробнее">👁️</button>
                <button class="action-btn" onclick="openEdit(${order.id})" title="Редактировать">✏️</button>
                <button class="action-btn" onclick="openDelete(${order.id})" title="Удалить">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function calculateCost(order) {
    const ids = [order.soup_id, order.main_course_id, order.salad_id, order.drink_id, order.dessert_id];
    return ids.reduce((sum, id) => {
        const dish = allDishes.find(d => d.id === id);
        return sum + (dish ? dish.price : 0);
    }, 0);
}

// 3. ДЕЙСТВИЯ (МОДАЛКИ)

// --- ПРОСМОТР ---
function openView(id) {
    const order = orders.find(o => o.id === id);
    const content = document.getElementById('view-content');
    
    // Формируем красивый список
    const getDish = (id) => allDishes.find(d => d.id === id)?.name || '-';
    
    content.innerHTML = `
        <p><b>Имя:</b> ${order.full_name}</p>
        <p><b>Адрес:</b> ${order.delivery_address}</p>
        <p><b>Телефон:</b> ${order.phone}</p>
        <p><b>Состав:</b></p>
        <ul>
            ${order.soup_id ? `<li>Суп: ${getDish(order.soup_id)}</li>` : ''}
            ${order.main_course_id ? `<li>Второе: ${getDish(order.main_course_id)}</li>` : ''}
            ${order.salad_id ? `<li>Салат: ${getDish(order.salad_id)}</li>` : ''}
            ${order.drink_id ? `<li>Напиток: ${getDish(order.drink_id)}</li>` : ''}
        </ul>
        <p><b>Комментарий:</b> ${order.comment || 'Нет'}</p>
    `;
    openModal('modal-view');
}

// --- УДАЛЕНИЕ ---
function openDelete(id) {
    orderToDeleteId = id;
    openModal('modal-delete');
}

document.getElementById('confirm-delete-btn').addEventListener('click', async () => {
    if (!orderToDeleteId) return;
    try {
        await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${orderToDeleteId}?api_key=${API_KEY}`, {
            method: 'DELETE'
        });
        closeModal('modal-delete');
        init(); // Перезагружаем список
    } catch (err) {
        alert('Ошибка удаления');
    }
});

// --- РЕДАКТИРОВАНИЕ ---
function openEdit(id) {
    orderToEditId = id;
    const order = orders.find(o => o.id === id);
    const form = document.getElementById('edit-form');
    
    // Заполняем форму текущими данными
    form.full_name.value = order.full_name;
    form.email.value = order.email;
    form.phone.value = order.phone;
    form.delivery_address.value = order.delivery_address;
    form.comment.value = order.comment || '';
    
    openModal('modal-edit');
}

document.getElementById('edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${orderToEditId}?api_key=${API_KEY}`, {
            method: 'PUT',
            body: formData
        });
        closeModal('modal-edit');
        init(); // Перезагружаем список
        alert('Заказ обновлен!');
    } catch (err) {
        alert('Ошибка обновления');
    }
});

// УТИЛИТЫ
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

// ЗАПУСК
document.addEventListener('DOMContentLoaded', init);
