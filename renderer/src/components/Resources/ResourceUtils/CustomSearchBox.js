import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'



export default function CustomSearchBox({customData, selectedList, setSelectedList, filterParams = 'name'}) {
  const [query, setQuery] = useState('')
  const [sortedData, setSortedData] = useState()
  const [selected, setSelected] = useState('')
  const [hover, setHover] = useState(false)
  const [alterLanguage, setAlterLanguage] = useState()
  let filteredData = [];
  // eslint-disable-next-line no-unused-vars
  const [isActive, setIsActive] = useState(false);
  if (customData.length === 1) {
    setSelectedList(customData);
    // setSelected(customData)
  } else if (customData.length > 1) {
    // eslint-disable-next-line no-nested-ternary
    filteredData = (query === '')
      ? customData.slice(0, 100).concat([selectedList].filter((item) => customData.slice(0, 100).indexOf(item) === -1)) // showing initial 100
      : (query.length >= 3)
        ? customData.filter((data) => data[filterParams].toLowerCase().includes(query.toLowerCase()))
        : [];
  }
  return (
    customData.length > 1 ? (
      <Combobox value={selectedList} onChange={setSelectedList}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(language) => language?.ang}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredData.length === 0 && query !== '' ? (
                <div className="relative cursor-pointer select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredData.map((data) => (
                  <Combobox.Option
                    key={data.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-gray-400 text-white ' : 'text-gray-900'
                      }`
                    }
                    value={data}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {data[filterParams]}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
  ): (
    // only one item in dropdown
    <div className="relative">
      <div className="relative w-full border border-gray-200 cursor-default overflow-hidden rounded-lg bg-white text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
        <input
          type="text"
          value={customData[0][filterParams]}
          disabled
          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 bg-gray-100 text-gray-900 focus:ring-0"
        />
      </div>
    </div>
  )
);
}
