import { FaRegHeart, FaHeart} from "react-icons/fa";

export default function HeartBtn({inFav, handleClick}) {
    return (
        <button>
            {!inFav
                ? <FaRegHeart size={20} onClick={handleClick} />
                : <FaHeart size={20} onClick={handleClick} fill={"#ee3d3d"}/>
            }
        </button>
    )
}