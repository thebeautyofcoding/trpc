import { useState } from "react"
import reactLogo from "./assets/react.svg"
import "./App.css"
import PostList from "./components/PostList"
import { Button } from "react-bootstrap"
import { QueryClient, QueryClientProvider } from "react-query"
import { trpc } from "./utils/trpc"
import MyModal from "./components/Modal"
function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:4001/trpc",
    })
  )

  return (
    <>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <MyModal showModal={show} handleClose={handleClose} />
          <Button onClick={handleShow}>Create</Button>
          <PostList />
        </QueryClientProvider>
      </trpc.Provider>
    </>
  )
}

export default App
