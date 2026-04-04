// 🐶 Ajoute la directive `use server` pour spécifier que nous faisons des server actions
'use server'
import {updateTag} from 'next/cache'
import {addTodo as addTodoDao, updateTodo as updateTodoDao} from '@/db/sgbd'
import {AddTodo, Todo} from '@/lib/type'

export const addTodo = async (todo: AddTodo, pattern: string) => {
  console.log('add todo action', todo)
  // 🐶 Appelle `addTodoDao(todo)` dans un `try catch`,
  // En effet, il faut pouvoir gérer les erreurs d'insersion en BDD.
  // Fais un `console.error` en cas d'erreur
  // et throw l'erreur pour la remonter au client

  //🐶 Pense à utiliser cette action dans `todos-view`
  //const pattern = /^[A-Z][\w -]{2,49}$/

  const regex = new RegExp(pattern)
  
  //console.log('regex.test(todo?.title)', regex.test(todo?.title))
  //console.log('!regex.test(todo?.title)', !regex.test(todo?.title))
  
  if(!regex.test(todo?.title)) throw new Error('The task title is invalid.')
  try {
    await addTodoDao(todo)
    updateTag('todos')
  } catch (err) {
    console.error('Error adding todo', err)
    throw err
  }
}

export const updateTodo = async (todo: Todo, pattern: string) => {
  console.log('update todo action', todo)
  //const pattern = /^[A-Z][\w -]{2,49}$/
  
  const regex = new RegExp(pattern)
  
  //console.log('regex.test(todo?.title)', regex.test(todo?.title))
  //console.log('!regex.test(todo?.title)', !regex.test(todo?.title))
  
  if(!regex.test(todo?.title)) throw new Error('The task title is invalid.')
  try {
    await updateTodoDao(todo)
    updateTag('todos')
  } catch (err) {
    console.error('Error updating todo', err)
    throw err
  }
}

//🐶 N'oublie pas les exercices bonus
