// src/components/ErrorToast.tsx

import { Button, Toast, ToastBody } from "reactstrap"


const ErrorToast = (props: {
  toastIsOpen: boolean
  setToastIsOpen: (isOpen: boolean) => void
  text:string
}) => {
  return (
    <Toast
      className="bg-danger text-white fixed-bottom ms-auto me-4 mb-4"
      isOpen={props.toastIsOpen}
      fade
    >
      <ToastBody className="d-flex justify-content-between">
        {props.text}
        <Button
          close
          className="btn-close-white"
          onClick={() => props.setToastIsOpen(false)}
        ></Button>
      </ToastBody>
    </Toast>
  )
}

export default ErrorToast