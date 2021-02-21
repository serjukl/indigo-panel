import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import uniqid from 'uniqid'
import firebase from 'firebase/app'
import styles from '../styles/addproject.module.sass'
import FormLogoContainer from '../components/FormLogoContainer/FormLogoContainer'
import FormName from '../components/FormName/FormName'
import Input from '../components/Input_line/Input_line'
import Button from '../components/Button/Button'
import Tabs from '../components/Tabs/Tabs'
import Message from '../components/Message/Message'
import '../lib/firebase'
import 'firebase/database'

const addproject = () => {
  const tabsAble = [
    'Обробка хімією', 'Висушування стін', 'Висушування підлоги',
    'Гідроізоляція', 'Опалення', 'Вологість', 'Витяжка'
  ]
  const [NewInputValue, setNewInputValue] = useState(null)
  const [CurrentUser, setCurrentUser] = useState(null)
  const [UserPhones, setUserPhones] = useState(null)
  const [GetGeoLocation, setGetGeoLocation] = useState(null)
  const [InputsValues] = useState({})
  const [TabsValues, setTabsValues] = useState(tabsAble)
  const [ProjectsArr, setProjectsArr] = useState([])
  const [ShowMessage, setShowMessage] = useState(false)
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
      },
      cors: 'no-cors'
    })
    const result = await response.json()
    setCurrentUser(result[0])
    setUserPhones([{
      value: result[0].Phone,
      label: result[0].Phone
    },
    {
      value: result[0]?.Phone2,
      label: result[0]?.Phone2
    }])
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
      creatorName: CurrentUser.Name,
      numberPhoning: NewInputValue.value,
      clientName: InputsValues.firstName,
      clientNumber: InputsValues.number,
      city: GetGeoLocation.value,
      street: InputsValues.address,
      workTypes: TabsValues
    }
    projects.unshift(newProject)
    await firebase.database().ref('projects').set(projects)
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
      window.location.reload()
    }, 2000)
  }

  useEffect(() => {
    getCreatorName()
    // console.log(GetGeoLocation)
  }, [GetGeoLocation])

  const getProjects = async () => {
    const response = await fetch(`${window.location.origin}/api/getProjects`, {
      method: 'GET'
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
      <form className={styles.box} onSubmit={(e) => submitAddProject(e)}>
        <FormLogoContainer />
        <FormName
          Name={CurrentUser ? CurrentUser.Name : null}
        />
        <Message message="message example" status={ShowMessage} activationKey={ShowMessage} />

        <Select
          value={NewInputValue}
          onChange={(e) => handleChange(e)}
          options={UserPhones}
          isClearable
          placeholder="Номер на який дзвонили"
          instanceId={1}
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
export default addproject
