import { useCallback, useEffect, useRef, useState } from "react";

type Option = {
  label: string
  value: string
}

type Item = Option & {
  checked: boolean
}

type MultiSelectProps = {
  options: Option[]
  selectedOptions?: string[]
  onValueChange: (values: string[]) => void
}

function MultiSelect({ options, onValueChange, selectedOptions = [] }: MultiSelectProps) {
  const [itens, setItens] = useState<Item[]>(options.map(({ label, value }) => ({ label, value, checked: !!(selectedOptions.some(selected => selected === value)) })))
  const divRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const createTextInformation = useCallback((value: number) => {
    if (value === 0) {
      inputRef.current!.value = ''
    }

    if (value === 1) {
      inputRef.current!.value = '1 selecionado'
    }

    if (value > 1) {
      inputRef.current!.value = `${value} selecionados`
    }
  }, [])

  useEffect(() => {
    const newOptions = options.filter(option => selectedOptions.includes(option.value))

    createTextInformation(newOptions.length)
  }, [options, selectedOptions, createTextInformation])

  document.addEventListener('click', (event: MouseEvent) => {
    const id = (event.target as HTMLDivElement).id

    if (id !== 'multiselect-input' && id !== 'multiselect-options') {
      divRef.current?.classList.add('hidden')
    }
  })

  return (
    <div className="relative">
      <input
        type="text"
        readOnly
        ref={inputRef}
        id="multiselect-input"
        className="px-2 py-1 rounded-lg bg-zinc-800"
        style={{ border: '1px solid black' }}
        placeholder="Selecione"
        onFocus={() => {
          divRef.current?.classList.remove('hidden')
        }}
      />
      <div
        ref={divRef}
        id="multiselect-options"
        className="hidden absolute rounded-lg z-20 bg-zinc-800 p-1 top-[40px] h-[300px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="h-full w-full overflow-auto">
            {itens.map(({ label, value, checked }, index) => (
              <div
                key={value}
                className="p-1 flex justify-start items-center"
              >
                <input
                  type="checkbox"
                  className="mr-1"
                  checked={checked}
                  value={value}
                  onChange={() => {
                    const newItens = [...itens]

                    newItens[index].checked = !checked
                    setItens(newItens)

                    const itensChecked = newItens.filter(item => item.checked)

                    createTextInformation(itensChecked.length)
                    onValueChange(itens.filter(item => item.checked).map(({ value }) => value))
                  }}
                />{label}</div>
            ))}
        </div>
      </div >
    </div>
  )
}

export function ComponentMultiSelect() {
  const options = Array.from({ length: 50 }, (_, index) => ({ label: `Option ${index}`, value: `${index}` }))
  const selectedOptions = ['1', '6', '3']

  return (
    <>
      <h2 className="text-2xl">MultiSelect</h2>

      <MultiSelect
        onValueChange={console.log}
        options={options}
        selectedOptions={selectedOptions}
      />
    </>
  )
}