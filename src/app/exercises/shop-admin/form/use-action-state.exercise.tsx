'use client'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select'

import React, {useRef} from 'react'
import {CategoriesEnum, Product} from '@/lib/type'

import {onSubmitAction} from '../actions'

import {useActionState} from 'react'
import {Label} from '@/components/ui/label'
import {toast} from 'sonner'

import {useFormStatus} from 'react-dom'

function Buttons() {
  const status = useFormStatus()
  return (
    <>
      <Button disabled={status.pending} size="sm" type="submit">
        Save
      </Button>

      <Button size="sm" variant="outline">
        Cancel
      </Button>
    </>
  )
}

export default function ProductForm({product}: {product?: Product}) {
  const [state, formAction] = useActionState(onSubmitAction, {
    error: false,
    message: '',
  })

  const formRef = useRef<HTMLFormElement>(null)

  // const handleReset = () => {
  //   if (formRef.current) {
  //     formRef.current.reset()
  //   }
  // }

  React.useEffect(() => {
    if (state.error) {
      toast.error(state.message)
    } else {
      toast.success(state.message)
      //handleReset()
    }
  }, [state])

  const categories = Object.keys(CategoriesEnum).filter((key) =>
    Number.isNaN(Number(key))
  )

  return (
    // 🐶 Ajoute le prop `action={formAction}`
    <form action={formAction} ref={formRef} className="gap-2 space-y-4">
      <Label>Product title</Label>
      <Input placeholder="ex : Iphone" name="title" />
      <Label>Product title</Label>
      <Input type="number" placeholder="199" name="price" />
      <Label>Product title</Label>
      <Textarea placeholder="Product description" name="description" />
      <Label>Product title</Label>
      <Select name="category">
        <SelectTrigger>
          <SelectValue placeholder="Choisir une catégorie" />
        </SelectTrigger>

        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Label>Product title</Label>
      <Input type="number" placeholder="Product quantity" name="quantity" />
      <div className="flex gap-2">
        <Buttons />
      </div>
    </form>
  )
}
