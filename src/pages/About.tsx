import Select from "../components/Select";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import type { SelectOption } from "@components/Select";

export default function About() {

  const options: SelectOption[] = [
    {
      id: 1,
      label: (
        <span className="flex items-center gap-2">
          <CheckIcon className="size-4 text-blue-500" />
          Tom Cook
        </span>
      )
    },
    {
      id: 2,
      label: (
        <span className="flex items-center gap-2">
          <CheckIcon className="size-4 text-green-500" />
          Wade Cooper
        </span>
      )
    },
    {
      id: 3,
      label: (
        <span className="flex items-center gap-2">
          <CheckIcon className="size-4 text-purple-500" />
          Tanya Fox
        </span>
      )
    }
  ];

  // Option 2 selected by default — now correctly typed
  const [selected, setSelected] = useState<SelectOption>(options[1]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-semibold mb-3">About Us</h1>
      <p className="text-gray-700 dark:text-gray-300">
        This is the about page. Learn more about our application here.
      </p>

      <div className="mt-6">
        <Select
          options={options}
          value={selected}
          onChange={setSelected}
        />
      </div>
    </div>
  );
}
