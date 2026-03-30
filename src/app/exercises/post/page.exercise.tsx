import type {Post} from '@/lib/type'
import {getPosts} from '@/db/sgbd'

const Page = async() => {
  const posts = await getPosts()
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
