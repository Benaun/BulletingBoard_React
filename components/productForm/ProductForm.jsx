import css from './ProductForm.module.css';
import categories from "@/assets/categories";
import Select from './Select';
import { useForm } from 'react-hook-form';

export default function ProductForm() {
    const { handleSubmit, register, reset } = useForm();

    const addPostHandler = (data) => {
        fetch('http://localhost:8000/bullets/', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(async res => {
                if (!res.ok) {
                    throw (new Error(res.status + ' ' + res.statusText));
                }
                reset();
            });
    }

    return (
        <div className={css.container}>
            <form onSubmit={handleSubmit(addPostHandler)} className={css.form__add} action="">
                <h2>Разместить объявление</h2>
                <p>Название товара</p>
                <input required {...register('title')} placeholder="Название" className={css.form__input} type="text" />
                <p>Загрузите фото(ссылкой)</p>
                <input {...register('images')} placeholder="Добаветь фото" className={css.form__input} type="text" />  
                {/* https://codepen.io/Serg-Mt/pen/MWBYqgP?editors=1010 */}
                <p>Укажите цену</p>
                <input required {...register('price')} placeholder="Укажите цену" className={css.form__input} type="text" />
                <p>Укажите почту</p>
                <input required {...register('email')} placeholder="Укажите почту" className={css.form__input} type="email" />
                <p>Укажите телефон</p>
                <input required {...register('phone')} placeholder="Укажите телефон" className={css.form__input} type="tel" />
                <p>Выберите категрию</p>
                <Select required register={register} list={categories} formKey={'category'} />
                <p>Описание</p>
                <textarea required {...register('description')} placeholder="Описание товара" className={css.form__textarea} type="text" />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}
