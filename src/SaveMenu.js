import React from 'react'

export default function SaveMenu(props) {

  return (
    <div className='flex flex-row'>
      <input 
        type="text" 
        className="block text-gray-300 border border-black p-2 w-1/2 m-3"
        placeholder="Enter Layout Name" 
      />
      <button className='m-5 bg-black text-white rounded-md p-2' >Save Layout</button>
      <button className='m-5 bg-black text-white rounded-md p-2'>Load Layout</button>
      <button className='m-5 bg-black text-white rounded-md p-2'>Publish</button>
    </div>
  )
}
