// 🐶 Ajoute la directive `use server` pour spécifier que nous faisons des server actions
'use server'
import {revalidatePath, updateTag} from 'next/cache'
import {addTodo as addTodoDao, updateTodo as updateTodoDao} from '@/db/sgbd'
import {AddTodo, Todo} from '@/lib/type'
import {ValidationError} from '@/lib/errors'

type AddTodoResult = {ok: true} | {ok: false; message: string}

export const addTodo = async (
  todo: AddTodo,
  pattern: string
): Promise<AddTodoResult> => {
  console.log('add todo action', todo)
  const regex = new RegExp(pattern)
  try {
    if (!regex.test(todo?.title)) {
      throw new ValidationError(
        'Title must start with a capital letter and be 3 to 50 characters long.'
      )
    }
    await addTodoDao(todo)
    updateTag('todos')
    return {ok: true}
  } catch (err) {
    // debug serveur
    console.error('[addTodo]', err)
    //erreur métier connue → ValidationError
    if (err instanceof ValidationError) return {ok: false, message: err.message}
    //erreur technique / inattendue → message générique propre
    throw new Error('Failed to save todo. Please try again.')
  }
}

export const updateTodo = async (
  todo: Todo,
  pattern: string
): Promise<AddTodoResult> => {
  console.log('update todo action', todo)

  const regex = new RegExp(pattern)

  try {
    if (!regex.test(todo?.title))
      throw new ValidationError(
        'Title must start with a capital letter and be 3 to 50 characters long.'
      )

    await updateTodoDao(todo)
    revalidatePath('/exercises/todos')
    updateTag('todos')
    return {ok: true}
  } catch (err) {
    console.error('Error updating todo [updateTodo ]', err)
    //erreur métier connue → ValidationError
    if (err instanceof ValidationError) return {ok: false, message: err.message}
    //erreur technique / inattendue → message générique propre
    throw new Error('Failed to update todo. Please try again.')
  }
}
