// src/components/SuccessToast.tsx

import { useEffect } from "react"
import { Button, Toast, ToastBody } from "reactstrap"


const SuccessToast = (props: {
  toastIsOpen: boolean
  setToastIsOpen: (isOpen: boolean) => void
  text:string
}) => {

  useEffect(()=>{
    if (props.toastIsOpen === true){
      setTimeout(()=>{
        props.setToastIsOpen(false)
      },3 * 1000)
    }
  },[props.toastIsOpen])

  return (
    <Toast
      className="bg-success text-white fixed-bottom ms-auto me-4 mb-4"
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

export default SuccessToast