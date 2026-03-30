import {Post} from '@/lib/type'
import {use} from 'react'

/***
 * Oui, et petite nuance importante : use() n’est pas un hook React “classique” 
 * dans la doc, c’est une API spéciale. 
 * C’est pour ça qu’elle surprend la première fois. 
 * React dit aussi quelle peur etre utliser sans  les Server Components
 */

const fetchPosts = async () => {
  const response = await fetch('http://localhost:3000/exercises/api/posts')
  const data = await response.json()
  return data as Post[]
}

const Page = () => {
  const posts = use(fetchPosts())
  console.log('post', posts)

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
