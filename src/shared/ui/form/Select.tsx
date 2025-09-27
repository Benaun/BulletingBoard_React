import type {
  FieldValues,
  Path,
  UseFormRegister
} from 'react-hook-form'

interface CategoryOption {
  name: string
}

type Props<TFields extends FieldValues> = {
  list: CategoryOption[]
  formKey: Path<TFields>
  register: UseFormRegister<TFields>
}

export default function Select<TFields extends FieldValues>({
  list,
  formKey,
  register
}: Props<TFields>) {
  return (
    <div>
      <select
        {...register(formKey)}
        className='w-full px-1.5 py-[6px] border border-gray-300 rounded'
      >
        <option value=''>Категория</option>
        {list.map(item => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}
