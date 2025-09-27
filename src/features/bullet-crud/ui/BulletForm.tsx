'use client'

import { useSession } from 'next-auth/react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import categories from '@/shared/constants/categories'
import Select from '@/shared/ui/form/Select'

import { useCreateBulletMutation } from '@/entities/bullet/api/service'

interface FormValues {
  title: string
  image?: string
  price: string
  category: string
  phone: string
  region: string
  city: string
  street: string
  description: string
}

export default function BulletForm() {
  const { handleSubmit, register, reset } = useForm<FormValues>()
  const { data: session } = useSession()
  type CreatePayload = FormValues & {
    id: number
    ownerId: string | number
    email: string
  }
  const [createBullet] = useCreateBulletMutation()

  const addPostHandler = async (data: FormValues) => {
    const payload: CreatePayload = {
      id: Math.round(Math.random() * 100),
      ownerId: (
        session?.user as { id?: string | number } | undefined
      )?.id as string | number,
      email: (session?.user as { email?: string } | undefined)
        ?.email as string,
      ...data
    }
    await createBullet(payload)
      .unwrap()
      .then(() => toast.success('Объявление создано!'))
      .catch(() => toast.error('Что-то пошло не так...'))
    reset()
  }

  return (
    <main className='pt-10 flex text-center min-h-[85.2vh]'>
      <div className='container'>
        <form onSubmit={handleSubmit(addPostHandler)}>
          <h2>Разместить объявление</h2>
          <div className='pt-5 grid grid-cols-2 gap-[30px] items-center'>
            <div className='h-full'>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='inputGroup-sizing-default'>
                  Название<span className='text-red-500'>*</span>
                </InputGroup.Text>
                <Form.Control
                  className='w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 border border-[var(--color-border)] bg-white'
                  required
                  {...register('title')}
                  aria-describedby='inputGroup-sizing-default'
                />
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='inputGroup-sizing-default'>
                  Изображение
                </InputGroup.Text>
                <Form.Control
                  className='w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 border border-[var(--color-border)] bg-white'
                  {...register('image')}
                  aria-describedby='inputGroup-sizing-default'
                />
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='inputGroup-sizing-default'>
                  Цена<span className='text-red-500'>*</span>
                </InputGroup.Text>
                <Form.Control
                  className='w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 border border-[var(--color-border)] bg-white'
                  required
                  {...register('price')}
                  aria-describedby='inputGroup-sizing-default'
                />
              </InputGroup>
              <Select<FormValues>
                register={register}
                list={categories as { name: string }[]}
                formKey={'category'}
              />
            </div>
            <div className='h-full'>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='inputGroup-sizing-default'>
                  Телефон<span className='text-red-500'>*</span>
                </InputGroup.Text>
                <Form.Control
                  className='w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 border border-[var(--color-border)] bg-white'
                  required
                  {...register('phone')}
                  aria-describedby='inputGroup-sizing-default'
                />
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='inputGroup-sizing-default'>
                  Регион<span className='text-red-500'>*</span>
                </InputGroup.Text>
                <Form.Control
                  className='w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 border border-[var(--color-border)] bg-white'
                  required
                  {...register('region')}
                  aria-describedby='inputGroup-sizing-default'
                />
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='inputGroup-sizing-default'>
                  Город<span className='text-red-500'>*</span>
                </InputGroup.Text>
                <Form.Control
                  className='w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 border border-[var(--color-border)] bg-white'
                  required
                  {...register('city')}
                  aria-describedby='inputGroup-sizing-default'
                />
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='inputGroup-sizing-default'>
                  Улица<span className='text-red-500'>*</span>
                </InputGroup.Text>
                <Form.Control
                  className='input'
                  required
                  {...register('street')}
                  aria-describedby='inputGroup-sizing-default'
                />
              </InputGroup>
            </div>
            <div className='flex gap-[20px] flex-col items-center col-span-2'>
              <Form.Control
                className='w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 border border-[var(--color-border)] bg-white h-[280px]'
                placeholder='Краткое описание товара'
                required
                {...register('description')}
                aria-describedby='inputGroup-sizing-default'
                as='textarea'
              />
              <Button
                className='inline-flex items-center justify-center rounded-md px-4 py-[10px] text-sm font-medium transition-colors text-white focus:outline-none focus:ring-2'
                style={{ background: 'var(--color-primary)' }}
                type='submit'
              >
                Разместить объявление
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
