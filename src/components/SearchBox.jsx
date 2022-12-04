import { useQuery } from '@tanstack/react-query'
import {useState} from 'react'
import useDebounce from '../hooks/useDebounce'

function SearchResult({isLoading, data})
{
   return (
        <div className="flex flex-col px-4 py-2
        w-full bg-gray-500 divide-y divide-gray-300">
            {isLoading && <div className="text-white">Loading...</div>}
            {data && data.map((item) => (
                <div key={item.id} className="text-gray-100 py-2">
                    {item.title}
                </div>
            ))}
        </div>
   )
}


export default function SearchBox() {

  const [search, setSearch] = useState('')
 
  const debouncedSearchTerm = useDebounce(search, 200)

  const {data, isLoading, error} = useQuery({
    queryKey: ['search', debouncedSearchTerm],
    queryFn: 
    () => {
    if (debouncedSearchTerm) {
       return fetch(`https://dummyjson.com/products/search?q=${debouncedSearchTerm}`).then(res => res.json())
    }
    return {products: []}
    }
  })
 
 

  return (
    <div>
        <input type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
        placeholder='Enter your search term here'
        className="p-2 w-full focus:outline-none 
        rounded-md bg-gray-600 placeholder:text-gray-500
         text-gray-50 focus:ring focus:ring-purple-500" />
        {data?.products.length > 0 && <SearchResult isLoading={isLoading} data={data.products} />}

    </div>
  )
}
