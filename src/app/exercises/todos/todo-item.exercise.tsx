import {Checkbox} from '@/components/ui/checkbox'
import {cn} from '@/lib/utils'
import {Todo} from '@/lib/type'
import {updateTodo as updateTodoAction} from './actions'
import {toast} from 'sonner'
import {startTransition, useOptimistic} from 'react'

type TodoOptimistic = Todo & {
  sending?: boolean
}

type OptimisticFields = {isCompleted: boolean; sending: boolean}

export default function TodoItem({todo}: {todo: Todo}) {
  const [optimisticTodo, setOptimisticTodo] = useOptimistic<
    TodoOptimistic,
    OptimisticFields
  >(todo, (currentTodo, {isCompleted, sending}) => ({
    ...currentTodo,
    isCompleted,
    sending,
  }))

  const handleChange = async (isCompleted: boolean) => {
    setOptimisticTodo({isCompleted, sending: true})
    try {
      const result = await updateTodoAction({
        ...todo,
        isCompleted,
      })
      if (!result.ok) toast.error(result.message)
    } catch {
      toast.error(`Failed to update todo.`)
    } finally {
      setOptimisticTodo({isCompleted, sending: false})
    }
  }
  return (
    <>
      <div className="flex items-center gap-4" key={optimisticTodo.id}>
        <Checkbox
          checked={optimisticTodo.isCompleted}
          id={`${optimisticTodo.id}`}
          onCheckedChange={(checked) => {
            startTransition(() => handleChange(checked as boolean))
          }}
        />
        <label
          className={cn('flex-1 text-sm font-medium', {
            'line-through': optimisticTodo.isCompleted,

            'animate-color-cycle': optimisticTodo.sending,
          })}
          htmlFor={`${optimisticTodo.id}`}
        >
          {optimisticTodo.title}
        </label>

        <span
          className={cn('text-sm text-gray-500 dark:text-gray-400 ', {
            'line-through': optimisticTodo.isCompleted,
          })}
        >
          {optimisticTodo.updadtedAt}
        </span>
      </div>
    </>
  )
}
