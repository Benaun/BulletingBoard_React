import { Col } from 'react-bootstrap'

interface CategoryItem {
  id: number
  img: string
  name: string
}

interface Props {
  item: CategoryItem
  active: boolean
  onClick: () => void
}

export default function CategoriesListItem({
  item,
  active,
  onClick
}: Props) {
  const { id, img, name } = item
  return (
    <Col key={id} xs={8} md={6} lg={4} xl={1} onClick={onClick}>
      <button
        className={
          !active
            ? 'w-[50px] h-[50px] rounded-full bg-[#9b6666] flex justify-center items-center overflow-hidden mx-auto border-0 cursor-pointer hover:bg-[#ff5a00] hover:text-white transition'
            : 'w-[50px] h-[50px] rounded-full bg-[#ff5a00] flex justify-center items-center overflow-hidden mx-auto border-0 cursor-pointer'
        }
        data-action={name}
      >
        <img src={img} alt={name} className='h-[30px] w-auto' />
      </button>
      <p className='mt-[15px] text-[14px] text-[#222] text-center w-[96px] min-w-[64px] list-none cursor-pointer'>
        {name}
      </p>
    </Col>
  )
}
