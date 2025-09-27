import { FaHeart, FaRegHeart } from 'react-icons/fa'

interface Props {
  inFav?: boolean
  handleClick: () => void
}

export default function HeartBtn({ inFav, handleClick }: Props) {
  return (
    <button
      onClick={handleClick}
      aria-label='Избранное'
      tabIndex={0}
    >
      {!inFav ? (
        <FaRegHeart size={20} />
      ) : (
        <FaHeart size={20} fill={'#ee3d3d'} />
      )}
    </button>
  )
}
