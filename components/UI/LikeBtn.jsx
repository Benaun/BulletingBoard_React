import css from "./Btn.module.css"

export default function LikeBtn({ width, height, fill, id }) {
    return (
        <button className={css.btn} data-action="like" id={id}>
            <svg xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill={fill}
                class="bi bi-heart-fill"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
            </svg>
        </button>
    )
}