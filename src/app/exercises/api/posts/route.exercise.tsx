// 🐶 Importe la fonction `getPosts` qui va récupérer les posts en BDD
//import {getPosts} from '@/db/sgbd'

export async function GET() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.co/posts')
    if (!res.ok) throw new Error('API error')
    const posts = await res.json()
    return Response.json(posts)
  } catch(error) {
    return Response.json(
      {
        message: 'failed to fetch posts data',
        error : error instanceof Error ? error?.message : null
      },
      {
        status: 500,
      }
    )
  }
}
