import {getTodos as getTodosDao} from '@/db/sgbd'
import Todos from './todos-view'
import {cacheLife, cacheTag} from 'next/cache'
import {Suspense} from 'react'

//export const revalidate = 3600

async function GetTodos() {
  'use cache'
  cacheTag('todos')
  cacheLife('default')
  const todos = await getTodosDao()

  return <Todos todos={todos ?? []} />
}

const Page = async () => {
  return (
    <Suspense fallback={<p>Loading ...</p>}>
      <div className="mx-auto max-w-4xl p-6 text-lg">
        <h1 className="mb-4 text-center text-3xl font-bold">Todo</h1>
        <GetTodos />
      </div>
    </Suspense>
  )
}

export default Page
