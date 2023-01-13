import axios from '../utils/axios'
import {
  TEST_LOADING,
  GET_TESTS,
  PROBLEM_LOADING,
  GET_PROBLEMS,
} from '../store/constants'

const saveTest = async (questions) => {
  let formData = new FormData()
  formData.append('total', questions.length)
  for (let i = 0; i < questions.length; i++) {
    formData.append(
      `title${i}`, questions[i].title
    )
    formData.append(
      `image${i}`, questions[i].image
    )
    formData.append(
      `answer${i}`, questions[i].answer
    )
    formData.append(
      `choice1${i}`, questions[i].choice1
    )
    formData.append(
      `choice2${i}`, questions[i].choice2
    )
    formData.append(
      `choice3${i}`, questions[i].choice3
    )
    formData.append(
      `choice4${i}`, questions[i].choice4
    )
    formData.append(
      `killertest${i}`, questions[i].killertest
    )
    formData.append(
      `gemela${i}`, questions[i].gemela
    )
    formData.append(
      `newpregunta${i}`, questions[i].newpregunta
    )
    formData.append(
      `tema${i}`, questions[i].tema
    )
    formData.append(
      `category${i}`, questions[i].category
    )
    formData.append(
      `video${i}`, questions[i].video
    )
    formData.append(
      `difficulty${i}`, questions[i].difficulty
    )
  }

  try {
    const result = await axios.post('api/admin/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return result

  } catch (error) {
    return error
  }
}

const updateTest = async (id, problems) => {
  let formData = new FormData()
  formData.append('total', problems.length)

  for (let i = 0; i < problems.length; i++) {
    formData.append(
      `title${i}`, problems[i].title
    )
    formData.append(
      `image${i}`, problems[i].image
    )
    formData.append(
      `answer${i}`, problems[i].answer
    )
    formData.append(
      `choice1${i}`, problems[i].choice1
    )
    formData.append(
      `choice2${i}`, problems[i].choice2
    )
    formData.append(
      `choice3${i}`, problems[i].choice3
    )
    formData.append(
      `choice4${i}`, problems[i].choice4
    )
    formData.append(
      `killertest${i}`, problems[i].killertest
    )
    formData.append(
      `gemela${i}`, problems[i].gemela
    )
    formData.append(
      `newpregunta${i}`, problems[i].newpregunta
    )
    formData.append(
      `tema${i}`, problems[i].tema
    )
    formData.append(
      `category${i}`, problems[i].category
    )
    formData.append(
      `video${i}`, problems[i].video
    )
    formData.append(
      `difficulty${i}`, problems[i].difficulty
    )
  }
  try {
    const result = await axios.post(`api/admin/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return result
  }
  catch (error) {
    return error
  }
}

const deleteTest = async (id) => {
  try {
    const data = await axios.post(`api/admin/delete/${id}`);
    return data.data
  }
  catch (error) {
    return error
  }

}

const getTests = () => async dispatch => {
  try {
    dispatch({ type: TEST_LOADING })
    const data = await axios.get('api/admin/read');
    dispatch({ type: GET_TESTS, payload: data.data })
  }
  catch (error) {
    return error
  }
}

const getProblems = (id) => async dispatch => {
  try {
    dispatch({ type: PROBLEM_LOADING })
    const data = await axios.get(`api/admin/read/${id}`)
    dispatch({ type: GET_PROBLEMS, payload: data.data })
  }
  catch (error) {
    return error
  }
}

export {
  saveTest,
  deleteTest,
  updateTest,
  getTests,
  getProblems,
}