import { useRef } from 'react'

export default function DragArea() {

  const dragAreaRef = useRef<HTMLDivElement>(null)

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    dragAreaRef.current?.classList.add('active')
  }

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    dragAreaRef.current?.classList.remove('active')
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e);
  }

  return(
    <div className="dragarea" ref={dragAreaRef}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}>
        DROPAREA
    </div>
  )
}