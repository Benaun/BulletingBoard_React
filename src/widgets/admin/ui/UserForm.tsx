interface Column {
  title: string
  setVal?: (v: string) => unknown
}

interface Props {
  columns: Column[]
  values: string[]
  setValues: (updater: (old: string[]) => string[]) => void
}

export default function UserForm({
  columns,
  values,
  setValues
}: Props) {
  return (
    <tr>
      {columns.map(({ title, setVal }, index) => (
        <td key={title}>
          {setVal ? (
            <input
              value={values[index]}
              onInput={event =>
                setValues(old => {
                  const copy = [...old]
                  copy[index] = (
                    event.target as HTMLInputElement
                  ).value
                  return copy
                })
              }
            />
          ) : (
            ' '
          )}
        </td>
      ))}
      <td>
        <button
          className='px-[5px] py-[2px] rounded-[8px] bg-[rgb(230,215,215)] mr-[5px]'
          data-id={''}
          data-action='ok'
        >
          &#9989;
        </button>
        <button
          className='px-[5px] py-[2px] rounded-[8px] bg-[rgb(230,215,215)]'
          data-id={''}
          data-action='cancel'
        >
          &#10060;
        </button>
      </td>
    </tr>
  )
}
