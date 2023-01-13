import React from 'react'
import MainAddPage from '../Common/MainPage'
import AddSideBar from './AddSideBar'

const AddLayout = () => {

  return (
    <form className='flex flex-row' encType='multipart/form-data' onSubmit={(e) => { e.preventDefault() }}>
      <AddSideBar />
      <MainAddPage />
    </form>
  )
}

export default AddLayout 