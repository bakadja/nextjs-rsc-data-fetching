import type {Post} from '@/lib/type'
import { use } from 'react'

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('http://localhost:3000/exercises/api/posts')
  return await response.json()
}

const Page = () => {
  const posts = use(fetchPosts())
    console.log('posts', posts)
    
    return (
      <div className="mx-auto max-w-4xl p-6 text-lg">
        <h1 className="mb-4 text-center text-3xl font-bold"> Fetch Posts</h1>
        <ul className="list-disc p-4 pl-4">
          {posts?.map((post: Post) => <li key={post.title}>{post.title}</li>)}
        </ul>
      </div>
    )
}

export default Page
