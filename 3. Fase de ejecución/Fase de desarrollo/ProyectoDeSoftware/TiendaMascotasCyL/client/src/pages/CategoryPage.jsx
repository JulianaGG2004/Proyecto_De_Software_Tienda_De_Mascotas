import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const CategoryPage = () => {

  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])

  const fetchCategory = async()=>{
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getCategory
      })
      const { data : responseData } = response

      if(responseData.success){
        setCategoryData(responseData.data)
      }
    } catch (error) {
      
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchCategory()
  },[])

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Categorías</h2>
        <button onClick={()=> setOpenUploadCategory(true)} className='text-sm border border-primary-400 hover:bg-primary-400
         px-3 py-1 rounded-full text-primary-400 hover:text-white'>Añadir Categoría</button>
      </div>
      {
        !categoryData[0] && !loading && (
          <NoData/>
        )
      }
      {
        loading && (
          <Loading/>
        )
      }

      <div className='p-4 grid gap-4 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]'>
        {
        categoryData.map((category,index)=>{
          return(
            <div className='w-full h-60 group rounded shadow-md bg-white'>
              <img
                alt={category.name}
                src={category.image} 
                
                className='w-full h-36 object-contain' 
              />
              <p className="font-medium text-center mt-3 h-8">{category.name}</p>
              <div className='items-center h-9 flex gap-2 p-3'>
                <button className='flex-1 bg-primary-300 hover:bg-primary-500 text-white font-medium py-2 rounded-full'>
                  Editar
                </button>
                <button className='flex-1 bg-secondary-300 hover:bg-secondary-500 text-white font-medium py-2 rounded-full'>
                  Eliminar
                </button>
              </div>
            </div>
          )
        })
      }
      </div>

      {
        openUploadCategory && (
          <UploadCategoryModel fetchData={fetchCategory} close={()=>setOpenUploadCategory(false)}/>
        )
      }
      
    </section>
  )
}

export default CategoryPage
