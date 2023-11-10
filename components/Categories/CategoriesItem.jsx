/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import css from './CategoriesItem.module.css'

export default function CategoriesItem({ item, active, onClick }) {
    const { id, img, name } = item;

    return (
        <li key={id} className={css.item__card} onClick={onClick}>
            <button
                className={!active ? css.item__img : [css.item__img, css.item__active].join(' ')}
                data-action={name}
            >
                <img src={img} alt={name} />
            </button>
            <p className={css.item__title}>{name}</p>
        </li>
    )
}