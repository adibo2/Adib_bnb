import React from 'react'

const NumberInput = ({value,setValue}) => {
  return (
    <div className='flex-1 flex items-center justify-between mr-5'>
       
        <h4 className='block text-white font-semibold font-mono text-base mr-4'>Add guests</h4>
        <span className='bg-[#1e1e38] rounded-full ml-auto p-1 text-xs sm:p-2 flex gap-3 w-fit'>
        <button
          disabled={value <= 0}
          onClick={() => !(value <= 0) && setValue((val) => val - 1)}
          className="rounded-2xl text-white text-xs  bg-[#002] border-none outline-none hover:scale-95 t px-4 transition duration-200 
          ease-out"
        >
          -
        </button>
        <input
          min={0}
          max={20}
          value={value}
          id="guest"
          onChange={(e) => setValue(e.target.value)}
          type="number"
          placeholder="Add dates"
          className='[appearance:textfield] bg-[#1e1e38] w-16 p-3  border-none outline-none text-center'
        />
        <button
          onClick={() => !(value >= 20) && setValue((val) => val + 1)}
          className="rounded-2xl bg-[#002] border-none outline-none text-xs px-4 hover:scale-95 hover:shadow-white transition duration-200 
          ease-out"
        >
          +
        </button>
      </span>
    </div>
  )
}

export default NumberInput