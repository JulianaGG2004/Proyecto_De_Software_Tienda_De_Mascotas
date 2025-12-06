import React, { useState } from 'react'
import { DisplayPriceInPesos } from '../utils/DisplayPriceInPesos'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'

const CheckoutPage = () => {
    const { totalPrice, totalQty } = useGlobalContext()
    const [openAddress, setOpenAddress] = useState(false)
    const addressList = useSelector(state => state.addresses.addressList)
    const [selectAddress, setSelectAddress] = useState(0)
  return (
    <section className='bg-slate-100'>
        <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
            <div className='w-full'>
                {/***address***/}
                <h3 className='text-lg font-semibold'>Selecciona una dirección</h3>
                
                <div className='bg-white p-2 grid gap-4'>
                        {
                            addressList.map((address, index) => {
                                return (
                                    <label htmlFor={"address" + index} className={!address.status && "hidden"}>
                                        <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                                        <div>
                                            <input id={"address" + index} type='radio' value={index} onChange={(e) => setSelectAddress(e.target.value)} name='address' />
                                        </div>
                                        <div>
                                            <p>{address.city}</p>
                                            <p>{address.department}</p>
                                            <p>{address.address_detail}/{address.neighborhood}</p>
                                            <p>{address.additional_information}</p>
                                            <p>{address.mobile}</p>
                                        </div>
                                        </div>
                                    </label>
                                    )
                                })
                        }
                    <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'>
                        Agregar Dirección
                    </div>
                </div>
            </div>
            <div className='w-full max-w-md bg-white py-4 p-2 px-2 border  '>
                {/**summary**/}
                <h3 className='text-lg font-semibold'>Resumen de pedido</h3>
                <div className='bg-white p-4 border '>
                    <h3 className='font-semibold'>Detalle de la factura</h3>
                    <div className='flex gap-4 justify-between ml-1 '>
                        <p>Sub total:</p>
                        <p className='flex items-center gap-2'>{DisplayPriceInPesos(totalPrice)}</p>
                    </div>
                    <div className='flex gap-4 justify-between ml-1'>
                        <p>Cantidad total:</p>
                        <p className='flex items-center gap-2'>{totalQty} Productos</p>
                    </div>
                    <div className='flex gap-4 justify-between ml-1'>
                        <p>Envío:</p>
                        <p className='flex items-center gap-2'>GRATIS</p>
                    </div>
                    <div className='font-semibold flex items-center justify-between gap-4'>
                        <p >Total</p>
                        <p>{DisplayPriceInPesos(totalPrice)}</p>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-4 mt-2'>
                    <button className='py-2 px-4 bg-primary-300 hover:bg-primary-500 text-white font-semibold'>Pago con tarjeta</button>

                    <button className='py-2 px-4 border-2 border-primary-300 font-semibold text-primary-300 hover:bg-primary-300  hover:text-white' >Pago en efectivo/contraentrega</button>
                </div>

            </div>
        </div>
         {
            openAddress && (
            <AddAddress close={() => setOpenAddress(false)} />
            )
        }
    </section>
  )
}

export default CheckoutPage
