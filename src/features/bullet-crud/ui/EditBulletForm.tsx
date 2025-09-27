import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'

import { getCurrentBullet } from '@/shared/lib/getCurrentBullet'
import FormInput from '@/shared/ui/form/FormInput'

import {
  useFetchAllBulletsQuery,
  useUpdateBulletMutation
} from '@/entities/bullet/api/service'
import type { Bullet } from '@/entities/bullet/model/schema'

interface EditTableBullet extends Bullet {
  phone?: string
  region?: string
  street?: string
  description?: string
}

interface Props {
  item?: EditTableBullet | null
}

export default function EditBulletForm({ item }: Props) {
  const router = useRouter()
  const { data: bullets } = useFetchAllBulletsQuery()
  const currentBullet = getCurrentBullet(bullets, item?.id) as
    | EditTableBullet
    | undefined
  const [bullet, setBullet] = useState<
    EditTableBullet | undefined
  >(currentBullet)
  const [updateBullet] = useUpdateBulletMutation()

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setBullet(prev =>
      prev ? ({ ...prev, [name]: value } as Bullet) : prev
    )
  }

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    if (!bullet) return
    await updateBullet(bullet)
      .unwrap()
      .then(() => toast.success('Данные обновлены!'))
      .catch(() => {
        toast.error('Возникла проблема с вашим запросом')
      })
    router.back()
  }

  return (
    <main className='pt-10 flex text-center min-h-[85.2vh]'>
      <form onSubmit={handleFormSubmit}>
        <div className=' flex'>
          <div className='h-full'>
            <FormInput
              text={'Название'}
              name={'title'}
              value={bullet?.title ?? ''}
              handleInputChange={handleInputChange}
            />
            <FormInput
              text={'Изображение'}
              name={'image'}
              value={bullet?.image ?? ''}
              handleInputChange={handleInputChange}
            />
            <FormInput
              text={'Цена'}
              name={'price'}
              value={(bullet?.price as unknown as string) ?? ''}
              handleInputChange={handleInputChange}
            />
          </div>

          <div className='h-full'>
            <FormInput
              text={'Телефон'}
              name={'phone'}
              value={bullet?.phone ?? ''}
              handleInputChange={handleInputChange}
            />
            <FormInput
              text={'Регион'}
              name={'region'}
              value={bullet?.region ?? ''}
              handleInputChange={handleInputChange}
            />
            <FormInput
              text={'Город'}
              name={'city'}
              value={bullet?.city ?? ''}
              handleInputChange={handleInputChange}
            />
            <FormInput
              text={'Улица'}
              name={'street'}
              value={bullet?.street ?? ''}
              handleInputChange={handleInputChange}
            />
          </div>

          <div className='flex gap-[20px] flex-col items-center'>
            <Form.Control
              className='h-[280px]'
              placeholder='Краткое описание товара'
              name='description'
              value={bullet?.description ?? ''}
              onChange={handleInputChange}
              aria-describedby='inputGroup-sizing-default'
              as='textarea'
            />
            <div>
              <Button
                className='w-[250px] py-[10px] mr-[20px]'
                variant='success'
                type='submit'
              >
                Подтвердить
              </Button>
              <Button
                className='w-[250px] py-[10px] mr-[20px]'
                variant='warning'
                onClick={() => router.back()}
              >
                Отменить
              </Button>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}
