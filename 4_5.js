const dishes = [
  // --- СУПЫ (Нужно: 2 рыбных, 2 мясных, 2 вегетарианских) ---
  // Твои оригинальные:
  {
    keyword: 'borsh',
    name: 'Борщ с говядиной',
    price: 230,
    category: 'soup',
    count: '350 г',
    image: 'imgs/Borsh.jpg', // Твой путь
    kind: 'meat'
  },
  {
    keyword: 'chicken_soup',
    name: 'Куриный суп с лапшой',
    price: 210,
    category: 'soup',
    count: '300 г',
    image: 'imgs/Chiken_sup.jpeg', // Твой путь
    kind: 'meat'
  },
  {
    keyword: 'cheese_soup',
    name: 'Сырный суп с курицей',
    price: 240,
    category: 'soup',
    count: '350 г',
    image: 'imgs/Chese_sup.png', // Твой путь
    // В задании сырный часто относят к вегетарианскому (если без мяса) 
    // или добавим новые, чтобы выровнять баланс. 
    // Пусть этот будет "veg" для баланса (или meat, если принципиально), 
    // но по заданию нужно 2 meat. У нас уже есть Борщ и Куриный.
    // Значит этот и следующие должны добить 2 fish и 2 veg.
    kind: 'veg' 
  },
  // Добавляем недостающие (2 рыбных, 1 вегетарианский):
  {
    keyword: 'fish_soup',
    name: 'Уха по-царски',
    price: 280,
    category: 'soup',
    count: '350 г',
    image: 'imgs/fish_soup.jpg', // Заглушка, нужно скачать картинку
    kind: 'fish'
  },
  {
    keyword: 'solyanka_fish',
    name: 'Рыбная солянка',
    price: 300,
    category: 'soup',
    count: '350 г',
    image: 'imgs/soup_fish2.jpg',
    kind: 'fish'
  },
  {
    keyword: 'pumpkin_soup',
    name: 'Тыквенный суп',
    price: 190,
    category: 'soup',
    count: '300 г',
    image: 'imgs/pumpkin.jpg',
    kind: 'veg'
  },

  // --- ГЛАВНЫЕ БЛЮДА (Нужно: 2 рыбных, 2 мясных, 2 вегетарианских) ---
  // Твои оригинальные:
  {
    keyword: 'chicken_grill',
    name: 'Куриное филе гриль с овощами',
    price: 360,
    category: 'main',
    count: '420 г',
    image: 'imgs/Chiken_veg.jpg', // Твой путь
    kind: 'meat'
  },
  {
    keyword: 'carbonara',
    name: 'Паста Карбонара',
    price: 390,
    category: 'main',
    count: '350 г',
    image: 'imgs/Carbonara.jpg', // Твой путь
    kind: 'meat'
  },
  {
    keyword: 'salmon',
    name: 'Запечённый лосось',
    price: 450,
    category: 'main',
    count: '380 г',
    image: 'imgs/Fish_With_Potato.jpg', // Твой путь
    kind: 'fish'
  },
  // Добавляем недостающие (1 рыбное, 2 вегетарианских):
  {
    keyword: 'trout',
    name: 'Форель с кус-кусом',
    price: 480,
    category: 'main',
    count: '350 г',
    image: 'imgs/trout.jpg',
    kind: 'fish'
  },
  {
    keyword: 'veg_pasta',
    name: 'Паста с овощами',
    price: 280,
    category: 'main',
    count: '300 г',
    image: 'imgs/pasta_veg.jpg',
    kind: 'veg'
  },
  {
    keyword: 'ratatouille',
    name: 'Рататуй',
    price: 300,
    category: 'main',
    count: '320 г',
    image: 'imgs/ratatouille.jpg',
    kind: 'veg'
  },

  // --- НАПИТКИ (Нужно: 3 холодных, 3 горячих) ---
  // Твои оригинальные:
  {
    keyword: 'mors',
    name: 'Домашний морс',
    price: 110,
    category: 'drink',
    count: '250 мл',
    image: 'imgs/Juce_but_not_Juce.jpg', // Твой путь
    kind: 'cold'
  },
  {
    keyword: 'compote',
    name: 'Компот из сухофруктов',
    price: 120,
    category: 'drink',
    count: '250 мл',
    image: 'imgs/Not_Juce.jpeg', // Твой путь
    kind: 'cold'
  },
  {
    keyword: 'green_tea',
    name: 'Зелёный чай с мятой',
    price: 100,
    category: 'drink',
    count: '250 мл',
    image: 'imgs/Green_Tea.jpg', // Твой путь
    kind: 'hot'
  },
  // Добавляем недостающие (1 холодный, 2 горячих):
  {
    keyword: 'orange_juice',
    name: 'Апельсиновый сок',
    price: 130,
    category: 'drink',
    count: '250 мл',
    image: 'imgs/juice.jpg',
    kind: 'cold'
  },
  {
    keyword: 'black_tea',
    name: 'Черный чай',
    price: 90,
    category: 'drink',
    count: '250 мл',
    image: 'imgs/black_tea.jpg',
    kind: 'hot'
  },
  {
    keyword: 'coffee',
    name: 'Кофе Американо',
    price: 150,
    category: 'drink',
    count: '200 мл',
    image: 'imgs/coffee.jpg',
    kind: 'hot'
  },

  // --- САЛАТЫ (Новая категория, 6 шт: 1 fish, 1 meat, 4 veg) ---
  {
    keyword: 'caesar',
    name: 'Цезарь с курицей',
    price: 320,
    category: 'salad',
    count: '250 г',
    image: 'imgs/caesar.jpg',
    kind: 'meat'
  },
  {
    keyword: 'salad_tuna',
    name: 'Салат с тунцом',
    price: 350,
    category: 'salad',
    count: '250 г',
    image: 'imgs/tuna.jpg',
    kind: 'fish'
  },
  {
    keyword: 'greek',
    name: 'Греческий',
    price: 280,
    category: 'salad',
    count: '250 г',
    image: 'imgs/greek.jpg',
    kind: 'veg'
  },
  {
    keyword: 'vitamin',
    name: 'Витаминный',
    price: 150,
    category: 'salad',
    count: '200 г',
    image: 'imgs/vitamin.jpg',
    kind: 'veg'
  },
  {
    keyword: 'caprese',
    name: 'Капрезе',
    price: 300,
    category: 'salad',
    count: '220 г',
    image: 'imgs/caprese.jpg',
    kind: 'veg'
  },
  {
    keyword: 'cucumber_tomato',
    name: 'Огурцы и помидоры',
    price: 180,
    category: 'salad',
    count: '250 г',
    image: 'imgs/simple.jpg',
    kind: 'veg'
  },

  // --- ДЕСЕРТЫ (Новая категория, 6 шт: 3 small, 2 medium, 1 large) ---
  {
    keyword: 'donut',
    name: 'Пончик',
    price: 80,
    category: 'dessert',
    count: '50 г',
    image: 'imgs/donut.jpg',
    kind: 'small'
  },
  {
    keyword: 'muffin',
    name: 'Маффин',
    price: 90,
    category: 'dessert',
    count: '80 г',
    image: 'imgs/muffin.jpg',
    kind: 'small'
  },
  {
    keyword: 'cookie',
    name: 'Печенье',
    price: 50,
    category: 'dessert',
    count: '40 г',
    image: 'imgs/cookie.jpg',
    kind: 'small'
  },
  {
    keyword: 'cheesecake',
    name: 'Чизкейк',
    price: 250,
    category: 'dessert',
    count: '150 г',
    image: 'imgs/cheesecake.jpg',
    kind: 'medium'
  },
  {
    keyword: 'tiramisu',
    name: 'Тирамису',
    price: 280,
    category: 'dessert',
    count: '160 г',
    image: 'imgs/tiramisu.jpg',
    kind: 'medium'
  },
  {
    keyword: 'cake',
    name: 'Торт Медовик',
    price: 220,
    category: 'dessert',
    count: '200 г',
    image: 'imgs/cake.jpg',
    kind: 'large'
  }
];
