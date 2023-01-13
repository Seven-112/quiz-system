import React from 'react'
import { useNavigate } from 'react-router-dom'
import { displayNum } from '../../../utils/display';
import { useSelector } from 'react-redux';

const Top = ({ id = ''}) => {
  const navigate = useNavigate();
  const num = useSelector(state => state.todoReducer.topNum)

  return (
    <div className='mt-8'>
      <img className='absolute ml-10 -mt-2' src='/assets/icons/logo.png' alt='logo' />
      <div className='bg-[#3598DB] flex flex-row justify-between pl-48 w-full pr-8 items-center'>
        <div className='text-white text-lg'>Autoescuela App Test 0{displayNum(num)}</div>
        <div className='flex flex-row items-center gap-10'>
          <div className='text-white text-lg'>Pregunta {displayNum(id)}</div>
          <div className='flex flex-row justify-center space-x-4 items-center'>
            <div className='text-white text-lg'>salir</div>
            <img className='cursor-pointer' src='/assets/icons/Logout.png' alt='go back' onClick={() => navigate('/user/todotest')} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Top