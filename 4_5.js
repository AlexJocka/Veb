const dishes = [

  {
    keyword: 'borsh',
    name: 'Борщ с говядиной',
    price: 230,
    category: 'soup',
    count: '350 г',
    image: 'imgs/Borsh.jpg', 
    kind: 'meat'
  },
  {
    keyword: 'chicken_soup',
    name: 'Куриный суп с лапшой',
    price: 210,
    category: 'soup',
    count: '300 г',
    image: 'imgs/Chiken_sup.jpeg',
    kind: 'meat'
  },
  {
    keyword: 'cheese_soup',
    name: 'Сырный суп с курицей',
    price: 240,
    category: 'soup',
    count: '350 г',
    image: 'imgs/Chese_sup.png',
    kind: 'veg' 
  },
  {
    keyword: 'fish_soup',
    name: 'Уха по-царски',
    price: 280,
    category: 'soup',
    count: '350 г',
    image: 'imgs/YXA.jpg',
    kind: 'fish'
  },
  {
    keyword: 'solyanka_fish',
    name: 'Рыбная солянка',
    price: 300,
    category: 'soup',
    count: '350 г',
    image: 'imgs/fish_sup.jpg',
    kind: 'fish'
  },
  {
    keyword: 'pumpkin_soup',
    name: 'Тыквенный суп',
    price: 190,
    category: 'soup',
    count: '300 г',
    image: 'imgs/pump_sup.jpg',
    kind: 'veg'
  },

  {
    keyword: 'chicken_grill',
    name: 'Куриное филе гриль с овощами',
    price: 360,
    category: 'main',
    count: '420 г',
    image: 'imgs/Chiken_veg.jpg', 
    kind: 'meat'
  },
  {
    keyword: 'carbonara',
    name: 'Паста Карбонара',
    price: 390,
    category: 'main',
    count: '350 г',
    image: 'imgs/Carbonara.jpg',
    kind: 'meat'
  },
  {
    keyword: 'salmon',
    name: 'Запечённый лосось',
    price: 450,
    category: 'main',
    count: '380 г',
    image: 'imgs/Fish_With_Potato.jpg',
    kind: 'fish'
  },

  {
    keyword: 'trout',
    name: 'Форель с кус-кусом',
    price: 480,
    category: 'main',
    count: '350 г',
    image: 'imgs/Fish_Kus_Kus.jpg',
    kind: 'fish'
  },
  {
    keyword: 'veg_pasta',
    name: 'Паста с овощами',
    price: 280,
    category: 'main',
    count: '300 г',
    image: 'imgs/Veg_pasta.jpg',
    kind: 'veg'
  },
  {
    keyword: 'ratatouille',
    name: 'Рататуй',
    price: 300,
    category: 'main',
    count: '320 г',
    image: 'imgs/ratatuille.jpg',
    kind: 'veg'
  },

  {
    keyword: 'mors',
    name: 'Домашний морс',
    price: 110,
    category: 'drink',
    count: '250 мл',
    image: 'imgs/Juce_but_not_Juce.jpg', 
    kind: 'cold'
  },
  {
    keyword: 'compote',
    name: 'Компот из сухофруктов',
    price: 120,
    category: 'drink',
    count: '250 мл',
    image: 'imgs/Not_Juce.jpeg', 
    kind: 'cold'
  },
  {
    keyword: 'green_tea',
    name: 'Зелёный чай с мятой',
    price: 100,
    category: 'drink',
    count: '250 мл',
    image: 'imgs/Green_Tea.jpg', 
    kind: 'hot'
  },
  {
    keyword: 'orange_juice',
    name: 'Апельсиновый сок',
    price: 130,
    category: 'drink',
    count: '250 мл',
    image: 'imgs/orange_juse.jpg',
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
    image: 'imgs/amerika.jpg',
    kind: 'hot'
  },

  {
    keyword: 'caesar',
    name: 'Цезарь с курицей',
    price: 320,
    category: 'salad',
    count: '250 г',
    image: 'imgs/imperator.jpg',
    kind: 'meat'
  },
  {
    keyword: 'salad_tuna',
    name: 'Салат с тунцом',
    price: 350,
    category: 'salad',
    count: '250 г',
    image: 'imgs/salat_fish.jpg',
    kind: 'fish'
  },
  {
    keyword: 'greek',
    name: 'Греческий',
    price: 280,
    category: 'salad',
    count: '250 г',
    image: 'imgs/Grek.jpg',
    kind: 'veg'
  },
  {
    keyword: 'vitamin',
    name: 'Витаминный',
    price: 150,
    category: 'salad',
    count: '200 г',
    image: 'imgs/Vitamin.jpg',
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
    image: 'imgs/cucumber.jpg',
    kind: 'veg'
  },

  {
    keyword: 'donut',
    name: 'Пончик',
    price: 80,
    category: 'dessert',
    count: '50 г',
    image: 'imgs/donat.jpg',
    kind: 'small'
  },
  {
    keyword: 'muffin',
    name: 'Маффин',
    price: 90,
    category: 'dessert',
    count: '80 г',
    image: 'imgs/mafin.jpeg',
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
    image: 'imgs/cheskey.jpg',
    kind: 'medium'
  },
  {
    keyword: 'tiramisu',
    name: 'Тирамису',
    price: 280,
    category: 'dessert',
    count: '160 г',
    image: 'imgs/tir.jpg',
    kind: 'medium'
  },
  {
    keyword: 'cake',
    name: 'Торт Медовик',
    price: 220,
    category: 'dessert',
    count: '200 г',
    image: 'imgs/med.jpg',
    kind: 'large'
  }
];


