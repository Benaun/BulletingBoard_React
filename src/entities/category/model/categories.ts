export interface CategoryItem {
  id: number
  name: string
  icon: string
  subcategories?: string[]
}

export interface MainCategory extends CategoryItem {
  color: string
  bgColor: string
}

const categories: MainCategory[] = [
  {
    id: 1,
    name: 'Авто',
    icon: '🚗',
    color: '#00d4aa',
    bgColor: '#f0fffe',
    subcategories: [
      'Легковые',
      'Мотоциклы и мототехника',
      'Грузовики и спецтехника',
      'Водный транспорт',
      'Запчасти и аксессуары'
    ]
  },
  {
    id: 2,
    name: 'Недвижимость',
    icon: '🏠',
    color: '#ff6b35',
    bgColor: '#fff5f2',
    subcategories: [
      'Продажа квартир',
      'Аренда квартир',
      'Продажа домов',
      'Аренда домов',
      'Коммерческая недвижимость'
    ]
  },
  {
    id: 3,
    name: 'Работа',
    icon: '💼',
    color: '#3b82f6',
    bgColor: '#f0f4ff',
    subcategories: [
      'Вакансии',
      'Резюме',
      'Обучение',
      'Проекты',
      'Удаленная работа'
    ]
  },
  {
    id: 4,
    name: 'Одежда, обувь, аксессуары',
    icon: '👕',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    subcategories: [
      'Женская одежда',
      'Мужская одежда',
      'Детская одежда',
      'Обувь',
      'Аксессуары'
    ]
  },
  {
    id: 5,
    name: 'Хобби и отдых',
    icon: '🎯',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    subcategories: [
      'Спорт и отдых',
      'Коллекционирование',
      'Музыкальные инструменты',
      'Книги и журналы',
      'Игры и приставки'
    ]
  },
  {
    id: 6,
    name: 'Животные',
    icon: '🐕',
    color: '#10b981',
    bgColor: '#ecfdf5',
    subcategories: [
      'Собаки',
      'Кошки',
      'Птицы',
      'Аквариум',
      'Товары для животных'
    ]
  },
  {
    id: 7,
    name: 'Готовый бизнес и оборудование',
    icon: '🏭',
    color: '#6366f1',
    bgColor: '#f0f0ff',
    subcategories: [
      'Готовый бизнес',
      'Оборудование для бизнеса',
      'Сырье и материалы',
      'Складские помещения'
    ]
  },
  {
    id: 8,
    name: 'Услуги',
    icon: '🔧',
    color: '#ef4444',
    bgColor: '#fef2f2',
    subcategories: [
      'Красота и здоровье',
      'Ремонт и строительство',
      'Образование и курсы',
      'Бытовые услуги',
      'Бизнес услуги'
    ]
  },
  {
    id: 9,
    name: 'Электроника',
    icon: '📱',
    color: '#06b6d4',
    bgColor: '#ecfeff',
    subcategories: [
      'Телефоны',
      'Компьютеры',
      'ТВ, видео, аудио',
      'Фото и видео',
      'Игры и развлечения'
    ]
  },
  {
    id: 10,
    name: 'Для дома и дачи',
    icon: '🏡',
    color: '#84cc16',
    bgColor: '#f7fee7',
    subcategories: [
      'Мебель',
      'Бытовая техника',
      'Продукты питания',
      'Растения',
      'Инструменты'
    ]
  },
  {
    id: 11,
    name: 'Товары для детей',
    icon: '🧸',
    color: '#f97316',
    bgColor: '#fff7ed',
    subcategories: [
      'Детская одежда',
      'Игрушки',
      'Детская мебель',
      'Товары для новорожденных',
      'Коляски и автокресла'
    ]
  },
  {
    id: 12,
    name: 'Жильё для путешествия',
    icon: '🏨',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    subcategories: [
      'Отели',
      'Квартиры посуточно',
      'Дома отдыха',
      'Хостелы',
      'Глэмпинг'
    ]
  }
]

export default categories
