import { HTMLAttributes, forwardRef, useImperativeHandle, useRef, useState } from "react"

// nesse type é possível expor os metodos internos que estarão disponível via Ref
type InternalHandles = HTMLAttributes<HTMLDivElement> & {
  toggleShow: (test?: { data: string }) => void
}

const Modal = forwardRef<InternalHandles>((_, ref) => {
  const [show, setShow] = useState(false)

  // esse hook permite expor funções internas para fora por meio do ref (vide type)
  useImperativeHandle(ref, () => {
    return {
      toggleShow
    }
  }, [])

  function toggleShow(test?: { data: string }) {
    console.log({ test })

    setShow(oldValue => !oldValue)

    return { data: 'teste ' }
  }

  return show ? (
    <div className="w-full h-screen flex justify-center items-center absolute left-0 bg-black opacity-80 top-0">
      <button
        className="bg-violet-400 rounded-xl flex justify-center items-center p-4 z-20 text-black"
        onClick={() => toggleShow()}
      >
        Isto é um modal
      </button>
    </div>
  ) : null
})

export function InperativaHandle() {
  const modalRef = useRef<InternalHandles>(null)

  function handleClick() {
    const data = modalRef.current?.toggleShow({ data: 'Naruto' })

    console.log(data)
  }


  return (
    <div className="py-4 flex flex-col gap-y-2">
      <h2 className="text-2xl">Usando useInterativeHandle (executando uma função do componente filho no pai)</h2>

      <button onClick={handleClick} className="px-2 py-1 bg-teal-500 text-black rounded-lg w-full">Dispatch children functions</button>
      <Modal ref={modalRef} />
    </div>
  )
}