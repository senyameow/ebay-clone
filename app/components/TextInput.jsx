import React from 'react'

const TextInput = ({ text, placeholder, error, onUpdate }) => {
  return (
    <>
      <input type="text" placeholder={placeholder} className='w-full bg-white text-gray-800 px-6 p-3 border border-gray-950 text-sm focus:outline-none placeholder-gray-500'
        value={text || ''} //нужно значение сюда (пока хз зачем)
        onChange={e => onUpdate(e.target.value)} // апдейт у нас будет разный
      />

      {error ? <div className='text-red-500 font-semibold'>{error}</div> : null}
    </>
  )
}

export default TextInput