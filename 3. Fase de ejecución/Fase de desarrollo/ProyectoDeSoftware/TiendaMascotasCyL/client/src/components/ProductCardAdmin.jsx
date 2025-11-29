import React from 'react'

const ProductCardAdmin = ({ data }) => {
  return (
    <div className='w-38 p-4 bg-white rounded'>
      <div className='w-full h-60 group rounded bg-white' >
        <img 
            src={data?.image[0]}
            alt={data?.name}
            className='w-full h-full object-scale-down'
        />
      </div>
      <p className='text-ellipsis line-clamp-2 font-medium'>{data.name}</p>
      <p className='text-slate-400'>{data?.unit}</p>
      <p></p>
    </div>
  )
}

export default ProductCardAdmin
