import BulletItem from "./BulletItem";
import css from "./BulletList.module.css"


export default function BulletList({ items, children }) {
    return (
        <div className={css.items__list}>
            {items.map((item) => (
                <BulletItem key={item.id} item={item}>
                    {children}
                </BulletItem>
            ))}
        </div>
    )
}
