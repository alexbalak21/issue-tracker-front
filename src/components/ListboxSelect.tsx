import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useState } from 'react'
import Badge from './Badge'

type BadgeColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray' | 'orange'

interface Person {
  id: number
  name: string
  color: BadgeColor
}

const people: Person[] = [
  { id: 1, name: 'Tom Cook', color: 'red' },
  { id: 2, name: 'Wade Cooper', color: 'green' },
  { id: 3, name: 'Tanya Fox', color: 'blue' },
  { id: 4, name: 'Arlene Mccoy', color: 'yellow' },
  { id: 5, name: 'Devon Webb', color: 'purple' },
]

export default function ListboxSelect() {
  const [selected, setSelected] = useState<Person>(people[1])

  return (
    <div className="relative w-35">
      <Listbox value={selected} onChange={setSelected}>

        <ListboxButton className="w-full border px-3 py-2 rounded bg-white text-left">
          <Badge text={selected.name} color={selected.color} />
        </ListboxButton>

        <ListboxOptions className="absolute mt-1 w-full bg-white shadow-lg rounded max-h-60 overflow-auto z-50 border">
          {people.map((person) => (
            <ListboxOption
              key={person.id}
              value={person}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
            >
              <Badge text={person.name} color={person.color} />
            </ListboxOption>
          ))}
        </ListboxOptions>

      </Listbox>
    </div>
  )
}
