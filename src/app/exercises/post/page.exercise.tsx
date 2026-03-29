'use client'
import {Post} from '@/lib/type'
import {useEffect, useState} from 'react'

const Page = () => {
  // 🐶 Crée un state pour les posts
  const [posts, setPosts] = useState<Post[]>([])

  // 🐶 Crée un effet pour récupérer les posts
  // 🤖 Utilise le code ci-dessous

  useEffect(() => {
    // https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'http://localhost:4000/posts'
        )
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
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
        {/* 🐶 Affiche les posts */}
        {posts?.map((post: Post) => <li key={post.title}>{post.title}</li>)}
      </ul>
    </div>
  )
}
export default Page
