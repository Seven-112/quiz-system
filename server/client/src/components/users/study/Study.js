import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Top from './Top'
import Bottom from '../exam/Bottom'
import { useSelector, useDispatch } from 'react-redux'
import { CHEATNUM } from '../../../utils/constants'
import toast from 'react-hot-toast'
import { addAnswer, increaseCheatNum } from '../../../actions/answer'
import { getStudyData } from '../../../apis/test.api'
import { useAuth } from '../../../contexts/AuthContext'
import VideoPlayer from '../common/Video'

const DisplayButton = ({ num = '', pageId, visited = '', correct = '' }) => {

  const navigate = useNavigate()

  return (
    <>
      {
        !visited ?
          <div className='border border-gray-600 text-gray-700 text-center items-center w-28 py-6 text-[32px] rounded-xl mx-1.5 my-2'>
            {num}
          </div>
          :
          correct ?
            <div className='border border-gray-600 bg-[#4EFF6C] text-white text-center items-center w-28 py-6 text-[32px] rounded-xl mx-1.5 my-2 cursor-pointer' onClick={() => navigate(`/study/${pageId}`)}>
              {num}
            </div>
            :
            <div className='border border-gray-600 bg-[#FF5353] text-white text-center items-center w-28 py-6 text-[32px] rounded-xl mx-1.5 my-2 cursor-pointer' onClick={() => navigate(`/study/${pageId}`)}>
              {num}
            </div>
      }
    </>
  )
}

const StudyButton = ({ name = '', onClick, checked }) => {
  return (
    <>
      {
        checked ?
          <div className='border border-solid rounded-3xl border-[#3598DB] bg-[#3598DB] text-white py-1 w-44 text-center text-[12px] uppercase cursor-pointer font-bold' onClick={onClick}>
            {name}
          </div >
          :
          <div className='border border-solid rounded-3xl border-[#3598DB] text-[#3598DB] py-1 w-44 text-center text-[12px] uppercase cursor-pointer font-bold' onClick={onClick}>
            {name}
          </div>
      }
    </>
  )
}

const ChoiceButton = ({ name = '', content = '', answer = '', choice, setChoice, removed, userNum = '', images = '', totalUser }) => {
  const { account } = useAuth();
  const buttonClick = () => {
    if (choice === '') {
      setChoice(name)
    }
    else {
      toast.error('You already chose an answer.')
    }
  }

  let text;
  if (name === 'choice1')
    text = 'A'
  else if (name === 'choice2')
    text = 'B'
  else if (name === 'choice3')
    text = 'C'
  else
    text = 'D'

  let imageString1;
  let imageString2;
  let images2 = [];

  images2.push(account.image)
  for (let i = 0; i < images.length; i++) {
    images2.push(images[i])
  }

  if (images.length > 5) {
    let subImages1 = []
    let subImages2 = []
    for (let i = 0; i < 4; i++)
      subImages1.push(images[i])

    for (let i = 0; i < 4; i++)
      subImages2.push(images2[i])

    const extraNum = images.length - 4
    imageString1 = (
      <div className='flex flex-row min-w-fit -space-x-2 overflow-hidden'>
        {subImages1.map((image, key) =>
          <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={image} alt="" key={key} />)}
        <div className='flex h-8 w-8 rounded-full ring-2 ring-white bg-[#3598DB] text-white font-medium text-center justify-center items-center'>{extraNum}+</div>
      </div>)

    imageString2 = (
      <div className='flex flex-row min-w-fit -space-x-2 overflow-hidden'>
        {subImages2.map((image, key) =>
          <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={image} alt="" key={key} />)}
        <div className='flex h-8 w-8 rounded-full ring-2 ring-white bg-[#3598DB] text-white font-medium text-center justify-center items-center'>{extraNum}+</div>
      </div>)
  }

  return (
    <>
      <div className='flex flex-row items-center w-full h-32 overflow-none'>
        {
          choice === name ?
            choice === answer ?
              <div className='bg-[#4EFF6C] text-[32px] text-white px-5 py-10 rounded-xl cursor-pointer'>{text}</div>
              :
              <div className='bg-[#FF5353] text-[32px] text-white px-5 py-10 rounded-xl cursor-pointer'>{text}</div>
            :
            <div className='bg-[#3598DB] text-[32px] text-white px-5 py-10 rounded-xl cursor-pointer hover:bg-blue-300' onClick={buttonClick}>{text}</div>
        }
        <div className='w-full'>
          {
            choice === '' ?
              removed ?
                <div className='relative flex items-center'>
                  <div className='absolute border-2 border-black ml-5 w-full' />
                  <div className='text-gray-500 text-[28px] pl-10'>{content}</div>
                </div>
                :
                <div className='text-gray-500 pl-10 text-[28px]'>{content}</div>
              :
              <>
                <div className='relative'>
                  <div className='flex flex-col float-right right-0 min-w-fit'>
                    <div className="-space-x-2 overflow-hidden">
                      {
                        images.length > 5 ?
                          choice === name ?
                            imageString2
                            :
                            imageString1
                          :
                          choice === name ?
                            images2.map((image, key) =>
                              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={image} alt="" key={key} />)
                            :
                            images.map((image, key) =>
                              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={image} alt="" key={key} />)
                      }
                    </div>
                    {
                      choice === name ?
                        <div className='text-center'>
                          {Math.floor((userNum + 1) / (totalUser + 1) * 100)}%
                        </div>
                        :
                        <div className='text-center'>
                          {Math.floor(userNum / (totalUser + 1) * 100)}%
                        </div>
                    }
                  </div>
                </div>
                <div className='relative flex items-center h-32'>
                  {
                    choice === name ?
                      <div className='bg-[#DBDB3559] absolute h-full' style={{ width: `${Math.floor((userNum + 1) / (totalUser + 1) * 100)}%` }} />
                      :
                      <div className='bg-[#DBDB3559] absolute h-full' style={{ width: `${Math.floor(userNum / (totalUser + 1) * 100)}%` }} />
                  }
                  <div className='pl-10 text-gray-500 text-[28px]'>{content}</div>
                </div>
              </>
          }
        </div>
      </div>
    </>
  )
}

const Study = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const exams = useSelector(state => state.problemReducer.problems)
  const loading = useSelector(state => state.problemReducer.loading)
  const answers = useSelector(state => state.answerReducer.answers)
  const cheatNum = useSelector(state => state.answerReducer.cheatNum)
  const category = useSelector(state => state.todoReducer.category)
  const testNum = useSelector(state => state.todoReducer.index)
  const [currentData, setCurrentData] = useState({})
  const [length, setLength] = useState()
  const [choice, setChoice] = useState('')

  const [isKillerChecked, setIsKillerChecked] = useState(false)
  const [isGuessChecked, setIsGuessChecked] = useState(false)
  const [isMemoryChecked, setIsMemoryChecked] = useState(false)
  const [isVideoClicked, setIsVideoClicked] = useState(false)
  const [leftCheatNum, setLeftCheatNum] = useState(CHEATNUM)
  const [cheatText, setCheatText] = useState([])
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    setCheatText('')
    dispatch(getStudyData(testNum, category))
  }, [])

  useEffect(() => {
    setIsVideoClicked(false)
    setCheatText('')
    setLeftCheatNum(CHEATNUM - cheatNum)
    if (exams)
      setCurrentData(exams[id - 1])
    if (answers[id - 1]) {
      if (answers[id - 1].choice) {
        setChoice(answers[id - 1].choice)
      }
      else
        setChoice('')
      if (answers[id - 1].isKiller)
        setIsKillerChecked(answers[id - 1].isKiller)
      else
        setIsKillerChecked(false)
      if (answers[id - 1].isGuess)
        setIsGuessChecked(answers[id - 1].isGuess)
      else
        setIsGuessChecked(false)
      if (answers[id - 1].isMemory)
        setIsMemoryChecked(answers[id - 1].isMemory)
      else
        setIsMemoryChecked(false)
    }
    else {
      setChoice('')
      setIsGuessChecked(false)
      setIsKillerChecked(false)
      setIsMemoryChecked(false)
    }
  }, [id])

  useEffect(() => {
    if (exams) {
      setCurrentData(exams[id - 1])
      setLength(exams.length)
    }
  }, [loading])

  let rows = [];
  function Rows() {
    let i = 0
    let len = exams.length;
    while (++i <= len) rows.push(i);
  }
  Rows()

  const onPreviousClick = () => {
    if (Number(id) !== 1) {
      const previous = Number(id) - 1
      navigate(`/study/${previous}`)
    }
  }
  const onNextClick = () => {
    if (choice === '') {
      toast.error('You should choose an answer.')
    }
    else {
      const data = {
        isKiller: isKillerChecked,
        isGuess: isGuessChecked,
        isMemory: isMemoryChecked,
        isVideo: isVideoClicked,
        choice: choice,
        isTrue: currentData.answer === choice ? true : false
      }
      if (answers.length === Number(id) - 1)
        dispatch(addAnswer(data))

      if (Number(id) !== length) {
        const next = Number(id) + 1
        navigate(`/study/${next}`)
      }
      else (
        navigate('/study/result')
      )
    }
  }

  const onKillerClick = () => {
    setIsKillerChecked(!isKillerChecked)
  }

  const onGuessClick = () => {
    setIsGuessChecked(!isGuessChecked)
  }

  const onMemoryClick = () => {
    setIsMemoryChecked(!isMemoryChecked)
  }

  const onVideoClick = () => {
    if (currentData?.video) {
      setShowVideo(true)
    }
    else {
      toast.error('There is no video explanation here.')
    }
    setIsVideoClicked(true)
  }

  const cheatNumClick = () => {
    if (leftCheatNum === 0)
      toast.error("You can not use this button.")
    else {
      const length = currentData.choice4 ? 4 : 3;
      if (cheatText.length < length - 1) {
        let removeText = ''
        do {
          let num = Math.floor(Math.random() * length) + 1
          removeText = 'choice'.concat(`${num}`)
        }
        while (removeText === '' || cheatText.includes(removeText) || removeText === currentData.answer)

        const newArray = [...cheatText, removeText]
        setCheatText(newArray)
        setLeftCheatNum(leftCheatNum - 1)
        dispatch(increaseCheatNum())

      }
      else {
        toast.error('You run out this on this problem.')
      }
    }
  }

  return (
    <>
      <Top id={id} />
      <div className='h-full'>
        {
          currentData ?
            <>
              <div className='flex flex-row w-full'>
                <div className='flex flex-col justify-center items-center w-1/2'>
                  <div className='flex flex-row'>
                    <StudyButton name='killer pregunta' onClick={onKillerClick} checked={isKillerChecked} />
                    <StudyButton name='la he adivinado' onClick={onGuessClick} checked={isGuessChecked} />
                    <StudyButton name='de memoria' onClick={onMemoryClick} checked={isMemoryChecked} />
                  </div>
                  <img className='min-w-[701px] py-3' src={currentData.image} alt='test_image' />
                  <div className='flex flex-row gap-5'>
                    <div className='flex flex-row bg-[#3598DB] space-x-5 py-4 w-52 rounded-xl items-center justify-center cursor-pointer' onClick={onVideoClick}>
                      <img src='/assets/icons/Group 88.png' alt='video' />
                      <span className='text-white text-center text-normal uppercase font-bold'>ver video</span>
                    </div>
                    <div className='flex flex-row bg-[#87A7BC] space-x-5 py-4 w-80 rounded-xl items-center justify-center cursor-pointer' onClick={cheatNumClick}>
                      <img src='/assets/icons/Path 1525.png' alt='video' />
                      <span className='text-white text-center text-normal uppercase font-bold'>eliminar respuestas</span>
                      <div className='flex flex-row bg-[#5ECFFF] rounded-full text-sm text-white text-center justify-center items-center w-7 h-7'>{leftCheatNum}</div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col justify-center gap-10 w-1/2 px-10'>
                  <div className='mt-20 text-[32px] text-gray-500'>
                    {currentData.title}
                  </div>
                  <ChoiceButton
                    name='choice1'
                    content={currentData.choice1}
                    answer={currentData.answer}
                    choice={choice}
                    setChoice={setChoice}
                    removed={cheatText.includes('choice1') ? true : false}
                    userNum={currentData.history ? currentData.history[0]?.userNum : 0}
                    totalUser={currentData.totalUser}
                    images={currentData.history ? currentData.history[0].images : []}
                  />
                  <ChoiceButton
                    name='choice2'
                    content={currentData.choice2}
                    answer={currentData.answer}
                    choice={choice}
                    setChoice={setChoice}
                    removed={cheatText.includes('choice2') ? true : false}
                    userNum={currentData.history ? currentData.history[1]?.userNum : 0}
                    totalUser={currentData.totalUser}
                    images={currentData.history ? currentData.history[1]?.images : []}
                  />
                  <ChoiceButton
                    name='choice3'
                    content={currentData.choice3}
                    answer={currentData.answer}
                    choice={choice}
                    setChoice={setChoice}
                    removed={cheatText.includes('choice3') ? true : false}
                    userNum={currentData.history ? currentData.history[2]?.userNum : 0}
                    totalUser={currentData.totalUser}
                    images={currentData.history ? currentData.history[2]?.images : []}
                  />
                  {
                    currentData.choice4 ?
                      <ChoiceButton
                        name='choice4'
                        content={currentData.choice4}
                        answer={currentData.answer}
                        choice={choice}
                        setChoice={setChoice}
                        removed={cheatText.includes('choice4') ? true : false}
                        userNum={currentData.history ? currentData.history[3]?.userNum : 0}
                        totalUser={currentData.totalUser}
                        images={currentData.history ? currentData.history[3]?.images : []}
                      />
                      :
                      <></>
                  }
                  <div className='flex flex-row py-10 gap-10 justify-center items-center'>
                    <div className='flex flex-row rounded-xl px-10 py-5 items-center gap-5 text-white bg-[#3598DB] cursor-pointer hover:bg-blue-300' onClick={onPreviousClick}>
                      <FaChevronLeft />
                      <div className='uppercase'>anterior</div>
                    </div>
                    <div className='flex flex-row rounded-xl px-10 py-5 items-center gap-5 text-white bg-[#3598DB] cursor-pointer hover:bg-blue-300' onClick={onNextClick}>
                      <div className='uppercase'>siguiente</div>
                      <FaChevronRight />
                    </div>
                  </div>
                </div>
              </div>
              <div className='px-5'>
                <div className='flex flex-row flex-wrap'>
                  {
                    rows.map((row, key) => {
                      return <DisplayButton num={row} pageId={key + 1} visited={answers[key] ? true : false} key={key} correct={answers[key] ? answers[key].isTrue : false} />
                    })
                  }
                </div>
              </div>
            </>
            : <></>
        }
        <VideoPlayer url={currentData?.video} showVideo={showVideo} setShowVideo={setShowVideo} />
        <Bottom />
      </div>
    </>
  )
}

export default Study