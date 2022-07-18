import React from "react"
import { trpc } from "../utils/trpc"
function PostList() {
  const { data } = trpc.useQuery(["posts"])
  if (!data) return <div>Loading...</div>
  if (data.length === 0) return <div>No posts...</div>
  return (
    <div>
      {data.map((post) => (
        <div>{post.title}</div>
      ))}
    </div>
  )
}

export default PostList
