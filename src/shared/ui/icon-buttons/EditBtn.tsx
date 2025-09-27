import { FaEdit } from 'react-icons/fa'

interface Props {
  handleClick: () => void
  size?: number
}

export default function EditBtn({
  handleClick,
  size = 20
}: Props) {
  return (
    <button
      onClick={handleClick}
      aria-label='Редактировать'
      tabIndex={0}
    >
      <FaEdit size={size} fill={'rgb(235, 159, 73)'} />
    </button>
  )
}
