import BulletItem from "../bulletItem/BulletItem";
import css from "./BulletList.module.css"


export default function BulletList({items}) {
    return (
        <div className={css.items__list}>
            {items.map((item) => (
                <BulletItem key={item.id} item={item} />
            ))}
        </div>
    )
}
