import React from 'react'

const CategoryPage = () => {
  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Categorías</h2>
        <button className='text-sm border border-primary-400 hover:bg-primary-400
         px-3 py-1 rounded-full text-primary-400 hover:text-white'>Añadir Categoría</button>
      </div>
    </section>
  )
}

export default CategoryPage
