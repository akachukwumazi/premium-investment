import React from 'react'




const EmptyUser = "/empty_user_footer.png"
const EmptyServices = ({description}) => {
  return (
    <div className='w-max flex flex-col justify-center items-center gap-4'>
        <img src={EmptyUser} alt="" className='w-45' />
        <p className='font-semibold text-md text-premium-black'>{description}</p>
    </div>
  )
}

export default EmptyServices
