interface ItemProps {
  children: React.ReactNode | React.ReactElement
}

export default function Item({children}: ItemProps) {

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e);
    
  }

  return(
    <div className="item-wrapper"
      draggable
      onDragEnd={dragEndHandler}>
        {children}
    </div>
  )
}