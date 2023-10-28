import css from './ProductForm.module.css'

export default function Select ({list, formKey, register}) {
    return (
        <div>
            <select {...register(`${formKey}`)} className={css.select}>
                <option>
                    Выберите
                </option>
                {
                    list.map(item => (
                        <option key={item.name} value={item.name}>{item.name}</option>
                    ))
                }
            </select>
        </div>
    )
}