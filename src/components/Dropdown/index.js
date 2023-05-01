import { Select } from "@chakra-ui/react"

// Now we can use the new `brandPrimary` variant
export default function Dropdown({ children, ...rest}) {
    return (
        <select id="countries" className="font-normal bg-gray-200 transition-colors duration-200 outline-none px-5 focus:bg-gray-300 hover:bg-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block w-100 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:border-blue-500">
            {
                rest.options ?
                Object.keys(rest.options).map((i) => {
                    return <option className='bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-200 dark:bg-gray-800' value={i}>{rest.options[i]}</option>
                })
                :
                null
            }
        </select>
    )
}