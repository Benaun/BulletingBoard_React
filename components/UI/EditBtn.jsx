import { FaEdit } from "react-icons/fa";

export default function EditBtn({handleClick, size}) {
    return (
        <button>
            <FaEdit size={size} onClick={handleClick} fill={'rgb(235, 159, 73)'} />
        </button>
    )
}