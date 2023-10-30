import { useRef, useState } from "react"

import { getData } from "./service"

export function ApiRequest() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [data, setData] = useState<{ data: unknown, error: unknown, loading: boolean}>({
    data: null,
    error: null,
    loading: false
  })

  async function getAddress() {
    setData(oldState => ({ ...oldState, loading: true}))
    const value = inputRef.current?.value

    if (value) {
      const [data, error] = await getData(value)
      setData({ data, error, loading: false })
    }
  }

  if (data.loading) return <p>Loading...</p>
  
  return(    
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Tricks to Api Riquest</h1>
      <input ref={inputRef} placeholder="Digite o CEP" className="px-2 py-1 rounded-lg bg-zinc-800" type="text" />
      <button 
        onClick={getAddress}
        className="px-2 py-1 bg-yellow-500 text-black rounded-lg"
      >Dispatch request</button>

      <h2>Success Response</h2>
      {data.data ?
        <pre>{JSON.stringify(data.data, null, 2)}</pre> :
        <p>n/a</p>
      }

      <h2>Error Response</h2>
      {data.error ?
        <pre>{JSON.stringify(data.error, null, 2)}</pre> :
        <p>n/a</p>
      }
    </div>
  )
}