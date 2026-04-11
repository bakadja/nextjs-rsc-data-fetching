'use server'
import {
  deleteProduct as deleteProductDao,
  getProducts as getProductsDao,
  persistProduct as persistProductDao,
} from '@/db/sgbd'

import {revalidatePath} from 'next/cache'
import {Product} from '@/lib/type'
import {formSchema} from './schema'

type FormStateSimple = {error: boolean; message: string}
const formSchemaLight = formSchema.partial({
  id: true,
  createdAt: true,
})

export async function onSubmitAction(
  prevState: FormStateSimple,
  data: FormData
): Promise<FormStateSimple> {
  //simulate slow server
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('data', data)

  const formData = Object.fromEntries(data)
  const parsed = formSchemaLight.safeParse(formData)

  if (!parsed.success) {
    // handle error then return
    const zodErrorMesaage = logZodError(data)
    return {error: true, message: zodErrorMesaage ?? 'invalid Input'}
  }

  try {
    await persistProductDao(parsed.data as Product)
    return {error: false, message: 'Success'}
  } catch (err) {
    console.error('onSubmitAction(', err)
    return {error: true, message: 'Failed to save product.'}
  }
}

function logZodError(data: FormData) {
  const formData = Object.fromEntries(data)
  const parsed = formSchemaLight.safeParse(formData)
  const errorMessages = parsed?.error?.errors
    .map((err) => `${err.path} ${err.message}`)
    .join(', ')
  console.error('Zod errorMessages', errorMessages)
  return errorMessages
}

export const getProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const products = await getProductsDao()
  return products
}

export const persistProduct = async (product: Product) => {
  await persistProductDao(product)
  revalidatePath('/exercises/shop-admin')
}

export const deleteProduct = async (product: Product) => {
  await deleteProductDao(product.id)
  revalidatePath('/exercises/shop-admin')
}
