import css from './ProductForm.module.css';
import categories from "../../assets/categories";
import Select from './Select';
import { useForm } from 'react-hook-form';

export default function ProductForm() {
    const { handleSubmit, register, reset } = useForm();

    const addPostHandler = (data) => {
        fetch('http://localhost:8000/bullets', {
            method: POST,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(async res => {
                if (!res.ok) {
                    throw (new Error(res.status + ' ' + res.statusText));
                }
                alert('All good')
                reset()
            });
    }

    return (
        <div className={css.container}>
            <form onSubmit={handleSubmit(addPostHandler)} className={css.form__add} action="">
                <h2>Разместить объявление</h2>
                <p>Название товара</p>
                <p>Загрузите фото</p>
                <input {...register('images')} placeholder="Добаветь фото" className={[css.form__input, css.form__file].join(' ')} type="file" />
                <p>Укажите цену</p>
                <input {...register('price')} placeholder="Укажите цену" className={css.form__input} type="text" />
                <p>Укажите почту</p>
                <input {...register('email')} placeholder="Укажите почту" className={css.form__input} type="email" />
                <p>Укажите телефон</p>
                <input {...register('email')} placeholder="Укажите телефон" className={css.form__input} type="tel" />
                <p>Выберите категрию</p>
                <Select register={register} list={categories} formKey={'category'} />
                <p>Описание</p>
                <textarea {...register('description')} placeholder="Описание товара" className={css.form__textarea} type="text" />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}
