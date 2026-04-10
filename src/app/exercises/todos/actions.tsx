'use server'

import {addTodo as addTodoDao, updateTodo as updateTodoDao} from '@/db/sgbd'
import {AddTodo, Todo} from '@/lib/type'
import {revalidatePath} from 'next/cache'

type TodoResult = {ok: true} | {ok: false; message: string}

export const addTodo = async (todo: AddTodo): Promise<TodoResult> => {
  console.log('add todo action', todo)
  try {
    await addTodoDao(todo)
    return {ok: true}
  } catch (error) {
    console.error('Failed to add todo [addTodo]', error)
    return {ok: false, message: 'Failed to save todo. Please try again.'}
  } finally {
    revalidatePath('/exercises/todos')
  }
}

export const updateTodo = async (todo: Todo): Promise<TodoResult> => {
  try {
    await updateTodoDao(todo)
    return {ok: true}
  } catch (error) {
    console.error('Failed to update todo [updateTodo]', error)
    return {ok: false, message: 'Failed to update todo. Please try again.'}
  } finally {
    revalidatePath('/exercises/todos')
  }
}
