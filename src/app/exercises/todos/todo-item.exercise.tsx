import {Checkbox} from '@/components/ui/checkbox'
import {cn} from '@/lib/utils'
import {Todo} from '@/lib/type'
import {updateTodo as updateTodoAction} from './actions.exercise'
import {toast} from 'sonner'

export default function TodoItem({todo}: {todo: Todo}) {
  const handleChange = async (isCompleted: boolean) => {
    console.log('isCompleted', isCompleted)
    const titlePattern = '^[A-Z][\\w -]{2,49}$'
    try {
      const result = await updateTodoAction(
        {...todo, isCompleted},
        titlePattern
      )
      if (!result.ok) toast.error(`${result.message}`)
    } catch {
      toast.error('Failed to update todo. Please try again.')
    }
  }
  return (
    <>
      <div className="flex items-center gap-4" key={todo.id}>
        <Checkbox
          checked={todo.isCompleted}
          id={`${todo.id}`}
          onCheckedChange={(checked) => handleChange(checked as boolean)}
        />
        <label
          className={cn('flex-1 text-sm font-medium', {
            'line-through': todo.isCompleted,
          })}
          htmlFor={`${todo.id}`}
        >
          {todo.title}
        </label>

        <span
          className={cn('text-sm text-gray-500 dark:text-gray-400 ', {
            'line-through': todo.isCompleted,
          })}
        >
          {todo.updadtedAt}
        </span>
      </div>
    </>
  )
}
