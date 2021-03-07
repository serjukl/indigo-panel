import React, { useState, useEffect } from 'react'
import uniqid from 'uniqid'
import Select from 'react-select'
import firebase from 'firebase/app'
import styles from '../styles/addproject.module.sass'
import {useRouter} from 'next/router'
import FormName from '../components/FormName/FormName'
import Input from '../components/Input_line/Input_line'
import Button from '../components/Button/Button'
import Tabs from '../components/Tabs/Tabs'
import '../lib/firebase'
import 'firebase/database'
import Navigation from '../components/Navigation/Navigation'

const createTask = () => {
  const router = useRouter()
  const tabsAble = [
    'Обробка хімією', 'Висушування стін', 'Висушування підлоги',
    'Гідроізоляція', 'Опалення', 'Вологість', 'Витяжка', 'Діагностика'
  ]
  const [NewInputValue, setNewInputValue] = useState(null)
  const [CurrentUser, setCurrentUser] = useState(null)
  const [GetGeoLocation, setGetGeoLocation] = useState(null)
  const [InputsValues] = useState({})
  const [TabsValues, setTabsValues] = useState(tabsAble)
  const [ProjectsArr, setProjectsArr] = useState([])
  const [AllUsers, setAllUsers] = useState([])


  const geoLocations = [{
    value: 'Івано-Франківськ',
    label: 'Івано-Франківськ'
  },
  {
    value: 'Київ',
    label: 'Київ'
  }]

  const handleChange = (e) => {
    setNewInputValue(e)
  }

  const getCreatorName = async () => {
    const response = await fetch(`${window.location.origin}/api/getCurrentUser`, {
      method: 'POST',
      body: JSON.stringify(localStorage.getItem('iea')),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json()
    setCurrentUser(result[0])
  }

  const getAllUsers = async () => {
    const response = await fetch(`${window.location.origin}/api/getUsers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json()
    setAllUsers(result)
    console.log(result)
  }

  const getInputValues = (e) => {
    InputsValues[e.target.name] = e.target.value
  }

  const submitAddProject = async (e) => {
    e.preventDefault()
    const projects = ProjectsArr.length ? ProjectsArr : []
    const newProject = {
      id: uniqid(),
      date: new Date().toISOString().slice(0, 10),
      creatorName: CurrentUser,
      numberPhoning: InputsValues.userCallTo,
      clientName: InputsValues.firstName,
      clientNumber: InputsValues.number,
      city: GetGeoLocation.value,
      street: InputsValues.address,
      worker: NewInputValue.value ? NewInputValue.value : null,
      workTypes: TabsValues,
      accessToProject: [
        CurrentUser, 
        NewInputValue.value ? NewInputValue.value : null,
        AllUsers.filter((user) => user.isAdmin === true)[0]
      ]
    }
    projects.unshift(newProject)
    await firebase.database().ref('projects').set(projects)
    router.push('/')
  }

  useEffect(() => {
    getCreatorName()
    getAllUsers()
  }, [GetGeoLocation])

  const getProjects = async () => {
    const response = await fetch(`${window.location.origin}/api/getProjects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const logResult = await response.json()
    return logResult
  }

  useEffect(() => {
    async function fetchData() {
      setProjectsArr(await getProjects())
    }
    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      <Navigation />
      <form className={styles.box} onSubmit={(e) => submitAddProject(e)}>
        <FormName
          Name={CurrentUser ? CurrentUser.Name : null}
        />
        <Input
          placeholder="Номер на який дзвонили"
          inputName="userCallTo"
          inputType="tel"
          changeHandler={(e) => getInputValues(e)}
        />
        <Input
          placeholder="Ім'я клієнта"
          inputName="firstName"
          inputType="text"
          changeHandler={(e) => getInputValues(e)}
        />
        
        <Input
          placeholder="Номер клієнта"
          inputName="number"
          inputType="tel"
          changeHandler={(e) => getInputValues(e)}

        />
        <Select
          value={GetGeoLocation}
          onChange={(e) => setGetGeoLocation(e)}
          options={geoLocations}
          isClearable
          placeholder="Оберіть місто"
          instanceId={2}
          className={styles.selectNumber}
          theme={(theme) => ({
            ...theme,
            borderColor: 'transparent',
            colors: {
              ...theme.colors,
              primary: '#f05c5c',
              primary75: 'transparent',
              primary25: 'rgba(255,0,0,.3)',
              neutral0: 'black',
              neutral80: '#e63c3c'
            }
          })}
        />
        <Input
          placeholder="Адреса"
          inputName="address"
          inputType="text"
          changeHandler={(e) => getInputValues(e)}

        />

        <Select
          value={NewInputValue}
          onChange={(e) => handleChange(e)}
          options={AllUsers.map((user) => {
            return {
              label: `${user.Name} ${user.SecondName} ${user.workCity}`,
              value: user
            }
          })}
          isClearable
          placeholder="Призначити задачу"
          instanceId={2}
          className={styles.selectNumber}
          theme={(theme) => ({
            ...theme,
            borderColor: 'transparent',
            colors: {
              ...theme.colors,
              primary: '#f05c5c',
              primary75: 'transparent',
              primary25: 'rgba(255,0,0,.3)',
              neutral0: 'black',
              neutral80: '#e63c3c'
            }
          })}
        />


        <div className={styles.TagCloud}>
          <p>Оберіть тип робіт</p>
          <Tabs
            arrValue={TabsValues}
            tabsHandler={(value) => setTabsValues(value)}
          />
        </div>
        <Button
          btnName="Додати"
          btnType="submit"
        />
      </form>
    </div>
  )
}
export default createTask
