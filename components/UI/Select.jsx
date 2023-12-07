export default function Select({ list, formKey, register }) {
    return (
        <div>
            <select
                {...register(`${formKey}`)}
                style={{
                    width: "100%",
                    padding: "6px 4px"
                }}
            >
                <option value="">Категория</option>
                {
                    list.map(item => (
                        <option key={item.name} value={item.name}>{item.name}</option>
                    ))
                }
            </select>
        </div>
    )
}