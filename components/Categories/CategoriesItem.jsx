import { Col } from 'react-bootstrap';
import css from './CategoriesItem.module.css'

export default function CategoriesItem({ item, active, onClick }) {
    const { id, img, name } = item;

    return (
        <Col
            key={id}
            xs={8} md={6} lg={4} xl={1}
            onClick={onClick}
        >
            <button
                className={!active ? css.item__img : [css.item__img, css.item__active].join(' ')}
                data-action={name}
            >
                <img src={img} alt={name} />
            </button>
            <p className={css.item__title}>{name}</p>
        </Col>
    )
}