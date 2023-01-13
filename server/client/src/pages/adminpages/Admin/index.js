import React, { useState, useEffect } from 'react'
import AddButton from '../../../components/admin/addtest/AddButton'
import TestRow from '../../../components/admin/TestRow'
import { getTests } from '../../../apis/admin.test.api'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const [lists, setLists] = useState([])
  const tests = useSelector(state => state.todoReducer.tests)
  const loading = useSelector(state => state.todoReducer.loading)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, logout } = useAuth()

  useEffect(() => {
    if (isLoggedIn){
      dispatch(getTests())
    }
    else {
      navigate('/')
    } 
  }, [isLoggedIn])

  useEffect(() => {
    setLists(tests)
  }, [loading])

  return (
    <>
      {
        tests ?
          (<div className='relative py-14 pr-14'>
            <div className='pr-48 ml-24 mr-14 overflow-auto'>
              <AddButton />
            </div>
            <div className='px-20 py-14'>
              {
                lists.map((list, key) =>
                  <TestRow test={list} no={key + 1} key={key} />
                )
              }
            </div>
          </div>)
          :
          (<></>)
      }
    </>
  )
}

export default Admin
