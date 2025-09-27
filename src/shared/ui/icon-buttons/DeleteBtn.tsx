import { MdDelete } from 'react-icons/md'

interface Props {
  handleClick: () => void
}

export default function DeleteBtn({ handleClick }: Props) {
  return (
    <button
      onClick={handleClick}
      aria-label='Удалить'
      tabIndex={0}
    >
      <MdDelete size={20} fill={'#ee3d3d'} />
    </button>
  )
}
