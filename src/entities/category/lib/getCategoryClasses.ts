import { MainCategory } from '@/entities/category/model/categories'

export const getCategoryClasses = (
  item: MainCategory,
  active: boolean
) => {
  const colorMap: {
    [key: string]: { bg: string; border: string; text: string }
  } = {
    Авто: {
      bg: active ? 'bg-teal-400' : 'bg-teal-50',
      border: 'border-teal-400',
      text: 'text-teal-400'
    },
    Недвижимость: {
      bg: active ? 'bg-orange-400' : 'bg-orange-50',
      border: 'border-orange-400',
      text: 'text-orange-400'
    },
    Работа: {
      bg: active ? 'bg-blue-500' : 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-500'
    },
    'Одежда, обувь, аксессуары': {
      bg: active ? 'bg-purple-500' : 'bg-purple-50',
      border: 'border-purple-500',
      text: 'text-purple-500'
    },
    'Хобби и отдых': {
      bg: active ? 'bg-amber-500' : 'bg-amber-50',
      border: 'border-amber-500',
      text: 'text-amber-500'
    },
    Животные: {
      bg: active ? 'bg-emerald-500' : 'bg-emerald-50',
      border: 'border-emerald-500',
      text: 'text-emerald-500'
    },
    'Готовый бизнес и оборудование': {
      bg: active ? 'bg-indigo-500' : 'bg-indigo-50',
      border: 'border-indigo-500',
      text: 'text-indigo-500'
    },
    Услуги: {
      bg: active ? 'bg-red-500' : 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-500'
    },
    Электроника: {
      bg: active ? 'bg-cyan-500' : 'bg-cyan-50',
      border: 'border-cyan-500',
      text: 'text-cyan-500'
    },
    'Для дома и дачи': {
      bg: active ? 'bg-lime-500' : 'bg-lime-50',
      border: 'border-lime-500',
      text: 'text-lime-500'
    },
    Запчасти: {
      bg: active ? 'bg-slate-500' : 'bg-slate-50',
      border: 'border-slate-500',
      text: 'text-slate-500'
    },
    'Товары для детей': {
      bg: active ? 'bg-orange-600' : 'bg-orange-50',
      border: 'border-orange-600',
      text: 'text-orange-600'
    },
    'Жильё для путешествия': {
      bg: active ? 'bg-purple-600' : 'bg-purple-50',
      border: 'border-purple-600',
      text: 'text-purple-600'
    },
    'Красота и здоровье': {
      bg: active ? 'bg-pink-500' : 'bg-pink-50',
      border: 'border-pink-500',
      text: 'text-pink-500'
    }
  }

  return (
    colorMap[item.name] || {
      bg: active ? 'bg-gray-500' : 'bg-gray-50',
      border: 'border-gray-500',
      text: 'text-gray-500'
    }
  )
}
