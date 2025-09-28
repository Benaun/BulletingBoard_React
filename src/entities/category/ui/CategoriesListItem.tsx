import { getCategoryClasses } from '@/entities/category/lib/getCategoryClasses'
import { MainCategory } from '@/entities/category/model/categories'

interface Props {
  item: MainCategory
  active: boolean
  onClick: () => void
}

export default function CategoriesListItem({
  item,
  active,
  onClick
}: Props) {
  const { icon, name } = item
  const classes = getCategoryClasses(item, active)

  return (
    <div
      className='flex-shrink-0 flex flex-col items-center cursor-pointer group w-full'
      onClick={onClick}
    >
      <div
        className={`
          w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-2xl flex items-center justify-center transition-all duration-200
          ${classes.bg}
          ${active ? `${classes.border} border-2 shadow-xl scale-110` : 'border-2 border-transparent hover:shadow-lg hover:scale-105'}
        `}
      >
        <span
          className={`text-sm sm:text-xl md:text-2xl ${active ? 'grayscale-0' : 'grayscale-[0.2]'}`}
        >
          {icon}
        </span>
      </div>
      <p
        className={`
          mt-1 sm:mt-3 text-[9px] sm:text-xs text-center font-medium sm:font-semibold transition-colors duration-200 leading-tight px-1
          ${active ? `${classes.text}` : 'text-gray-700 group-hover:text-gray-900'}
        `}
      >
        {name.length > 6 ? `${name.substring(0, 6)}...` : name}
      </p>
    </div>
  )
}
