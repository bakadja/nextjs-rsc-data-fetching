'use client'
import {Post} from '@/lib/type'
import {useEffect, useState} from 'react'

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // ⛏️ Remplace cette url par l'url de l'api next
        const response = await fetch('/exercises/api/posts')
        if(!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        console.log("data",data)
        console.log("Array.isArray(data",Array.isArray(data))
        if(!Array.isArray(data)) throw new Error('Invalid Format')
        setPosts(data as Post[])
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    fetchPosts()
  }, [])
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
