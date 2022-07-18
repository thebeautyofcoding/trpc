import React, { useState } from "react"
import { Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { trpc } from "../utils/trpc"

export interface IPost {
  title: string
  body: string
}
export default function MyModal({
  showModal,
  handleClose,
}: {
  showModal: boolean
  handleClose: () => void
}) {
  const [post, setPost] = useState({ title: "", body: "" })
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }
  const utils = trpc.useContext()
  const mutation = trpc.useMutation(["createPost"], {
    onSuccess(input) {
      console.log(input)
      utils.invalidateQueries(["posts"])
    },
  })
  const save = (post: IPost) => {
    mutation.mutate(post)
  }
  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={onChange}
              name="title"
              type="text"
              placeholder="Title..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Body</Form.Label>
            <Form.Control
              name="body"
              onChange={onChange}
              type="text"
              placeholder="Body..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={() => {
              save(post)
              handleClose()
            }}
            variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
