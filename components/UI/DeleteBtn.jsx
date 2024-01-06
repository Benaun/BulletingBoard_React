import { MdDelete } from "react-icons/md";

export default function DeleteBtn({handleClick}) {
    return (
        <button>
            <MdDelete size={20} onClick={handleClick} fill={"#ee3d3d"} />
        </button>
    )
}