import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import styles from './editProject.module.sass'
import Input from '../../components/Input_line/Input_line'
import Tabs from '../../components/Tabs/Tabs'
import Button from '../../components/Button/Button'
import Message from '../../components/Message/Message'
import '../../lib/firebase'
import 'firebase/database'

const editProject = ({ newData }) => {
  const [OpenEditing, setOpenEditing] = useState(null)
  const [AbleValues] = useState(newData[0].workTypes)
  const [InputsValue] = useState({})
  const [UsedItems] = useState([])
  const [SpecialNewValue] = useState({})
  const [Flag, setFlag] = useState(0)
  const [TotalyUsedItems] = useState([])
  const [ShowMessage, setShowMessage] = useState(false)
  const [ProjectsArr, setProjectsArr] = useState([])

  const getSpecialValues = (e) => {
    SpecialNewValue[e.target.name] = e.target.value
  }

  const addUsedItem = (e) => {
    e.preventDefault()
    UsedItems.push(SpecialNewValue.usedMaterials)
    setFlag(Flag + 1)
    e.target.reset()
  }

  const addTotalyUsedItem = (e) => {
    e.preventDefault()
    TotalyUsedItems.push(SpecialNewValue.totalyUsedMaterials)
    setFlag(Flag + 1)
    e.target.reset()
  }

  const setTabsValues2 = (value) => {
    InputsValue.workTypes = value
  }

  const getInputsValues = (e) => {
    InputsValue[e.target.name] = e.target.value
  }
  const submitChanges = async () => {
    const projects = ProjectsArr.filter((prj) => prj.id !== newData[0].id)
    const changedProject = {
      id: newData[0].id,
      numberPhoning: newData[0].numberPhoning,
      creatorName: newData[0].creatorName,
      date: newData[0].date,
      clientName: InputsValue.clientName || newData[0].clientName,
      clientNumber: InputsValue.clientNumber || newData[0].clientNumber,
      city: InputsValue.city || newData[0].city,
      street: InputsValue.street || newData[0].street,
      workTypes: InputsValue.workTypes || newData[0].workTypes,
      usedItems: UsedItems || newData[0].usedItems || [],
      totalyUsedItems: TotalyUsedItems || newData[0].totalyUsedItems || [],
      previousSum: InputsValue.previousSum || newData[0].previousSum || '',
      totalSum: InputsValue.totalSum || newData[0].totalSum || ''
    }
    projects.unshift(changedProject)
    await firebase.database().ref('projects').set(projects)
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
      window.location = '/'
    }, 2000)
  }

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

  useEffect(() => {
  }, [Flag])
  return (
    <div className={styles.editProject}>
      {
        newData
          ? (
            <div className={styles.currentProject}>
              <div className={styles.container}>
                <div className={styles.header} onClick={() => setOpenEditing(1)}>
                  <p>Змінити ім&rsquo;я клієнта</p>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6L10 11L15 6L17 7L10 14L3 7L5 6Z" fill="black" />
                  </svg>
                </div>
                <div className={
                    OpenEditing === 1
                      ? `${styles.content} ${styles.opened}`
                      : styles.content
                    }
                >
                  <Input
                    inputType="text"
                    placeholder={newData[0].clientName}
                    inputName="clientName"
                    changeHandler={(e) => getInputsValues(e)}
                  />
                </div>
              </div>

              <div className={styles.container}>
                <div className={styles.header} onClick={() => setOpenEditing(2)}>
                  <p>Змінити місто</p>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6L10 11L15 6L17 7L10 14L3 7L5 6Z" fill="black" />
                  </svg>
                </div>
                <div className={
                    OpenEditing === 2
                      ? `${styles.content} ${styles.opened}`
                      : styles.content
                    }
                >
                  <Input
                    inputType="text"
                    placeholder={newData[0].city}
                    inputName="city"
                    changeHandler={(e) => getInputsValues(e)}
                  />
                </div>
              </div>

              <div className={styles.container}>
                <div className={styles.header} onClick={() => setOpenEditing(3)}>
                  <p>Змінити вулицю</p>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6L10 11L15 6L17 7L10 14L3 7L5 6Z" fill="black" />
                  </svg>
                </div>
                <div className={
                    OpenEditing === 3
                      ? `${styles.content} ${styles.opened}`
                      : styles.content
                    }
                >
                  <Input
                    inputType="text"
                    placeholder={newData[0].street}
                    inputName="street"
                    changeHandler={(e) => getInputsValues(e)}
                  />
                </div>
              </div>

              <div className={styles.container}>
                <div className={styles.header} onClick={() => setOpenEditing(4)}>
                  <p>Змінити номер клієнта</p>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6L10 11L15 6L17 7L10 14L3 7L5 6Z" fill="black" />
                  </svg>
                </div>
                <div className={
                    OpenEditing === 4
                      ? `${styles.content} ${styles.opened}`
                      : styles.content
                    }
                >
                  <Input
                    inputType="text"
                    placeholder={newData[0].clientNumber}
                    inputName="clientNumber"
                    changeHandler={(e) => getInputsValues(e)}
                  />
                </div>
              </div>

              <div className={styles.container}>
                <div className={styles.header} onClick={() => setOpenEditing(5)}>
                  <p>Змінити тип робіт</p>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6L10 11L15 6L17 7L10 14L3 7L5 6Z" fill="black" />
                  </svg>
                </div>
                <div className={
                    OpenEditing === 5
                      ? `${styles.content} ${styles.opened}`
                      : styles.content
                    }
                >
                  <Tabs
                    arrValue={newData[0].workTypes ? newData[0].workTypes : AbleValues}
                    allChecked
                    tabsHandler={(value) => setTabsValues2(value)}
                  />
                </div>
              </div>

              <div className={styles.container}>
                <div className={styles.header} onClick={() => setOpenEditing(6)}>
                  <p>Додати розхідники матеріалу</p>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6L10 11L15 6L17 7L10 14L3 7L5 6Z" fill="black" />
                  </svg>
                </div>
                <div className={
                    OpenEditing === 6
                      ? `${styles.content} ${styles.opened}`
                      : styles.content
                    }
                >
                  <div className={styles.containerDown}>
                    <div className={styles.needWorkItem}>
                      {
                        UsedItems.map((item, index) => (
                          <div key={index} className={styles.listItem}>
                            <p>{item}</p>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19.41 17.9999L27.7 9.70994C27.8638 9.51864 27.9494 9.27256 27.9397 9.02089C27.93 8.76921 27.8256 8.53047 27.6475 8.35238C27.4694 8.17428 27.2307 8.06995 26.979 8.06023C26.7274 8.05051 26.4813 8.13612 26.29 8.29994L18 16.5899L9.70997 8.28994C9.52167 8.10164 9.26627 7.99585 8.99997 7.99585C8.73367 7.99585 8.47828 8.10164 8.28997 8.28994C8.10167 8.47825 7.99588 8.73364 7.99588 8.99994C7.99588 9.26624 8.10167 9.52164 8.28997 9.70994L16.59 17.9999L8.28997 26.2899C8.18529 26.3796 8.10027 26.4899 8.04025 26.614C7.98022 26.738 7.94649 26.8732 7.94117 27.0109C7.93586 27.1486 7.95906 27.2859 8.00934 27.4143C8.05961 27.5426 8.13587 27.6591 8.23332 27.7566C8.33078 27.854 8.44733 27.9303 8.57565 27.9806C8.70398 28.0309 8.84131 28.0541 8.97903 28.0487C9.11675 28.0434 9.25188 28.0097 9.37594 27.9497C9.50001 27.8896 9.61033 27.8046 9.69997 27.6999L18 19.4099L26.29 27.6999C26.4813 27.8638 26.7274 27.9494 26.979 27.9397C27.2307 27.9299 27.4694 27.8256 27.6475 27.6475C27.8256 27.4694 27.93 27.2307 27.9397 26.979C27.9494 26.7273 27.8638 26.4812 27.7 26.2899L19.41 17.9999Z" fill="black" />
                            </svg>
                          </div>
                        ))
                      }
                    </div>
                    <form className={styles.addNewValue} onSubmit={(e) => addUsedItem(e)}>
                      <Input
                        placeholder="Новий розхідник"
                        inputName="usedMaterials"
                        changeHandler={(e) => getSpecialValues(e)}
                      />
                      <Button
                        btnType="submit"
                        btnName="Додати"
                      />
                    </form>
                  </div>
                </div>
              </div>

              <div className={styles.container}>
                <div className={styles.header} onClick={() => setOpenEditing(7)}>
                  <p>Використано розхідники</p>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6L10 11L15 6L17 7L10 14L3 7L5 6Z" fill="black" />
                  </svg>
                </div>
                <div className={
                    OpenEditing === 7
                      ? `${styles.content} ${styles.opened}`
                      : styles.content
                    }
                >
                  <div className={styles.containerDown}>
                    <div className={styles.needWorkItem}>
                      {
                        TotalyUsedItems.map((item, index) => (
                          <div key={index} className={styles.listItem}>
                            <p>{item}</p>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19.41 17.9999L27.7 9.70994C27.8638 9.51864 27.9494 9.27256 27.9397 9.02089C27.93 8.76921 27.8256 8.53047 27.6475 8.35238C27.4694 8.17428 27.2307 8.06995 26.979 8.06023C26.7274 8.05051 26.4813 8.13612 26.29 8.29994L18 16.5899L9.70997 8.28994C9.52167 8.10164 9.26627 7.99585 8.99997 7.99585C8.73367 7.99585 8.47828 8.10164 8.28997 8.28994C8.10167 8.47825 7.99588 8.73364 7.99588 8.99994C7.99588 9.26624 8.10167 9.52164 8.28997 9.70994L16.59 17.9999L8.28997 26.2899C8.18529 26.3796 8.10027 26.4899 8.04025 26.614C7.98022 26.738 7.94649 26.8732 7.94117 27.0109C7.93586 27.1486 7.95906 27.2859 8.00934 27.4143C8.05961 27.5426 8.13587 27.6591 8.23332 27.7566C8.33078 27.854 8.44733 27.9303 8.57565 27.9806C8.70398 28.0309 8.84131 28.0541 8.97903 28.0487C9.11675 28.0434 9.25188 28.0097 9.37594 27.9497C9.50001 27.8896 9.61033 27.8046 9.69997 27.6999L18 19.4099L26.29 27.6999C26.4813 27.8638 26.7274 27.9494 26.979 27.9397C27.2307 27.9299 27.4694 27.8256 27.6475 27.6475C27.8256 27.4694 27.93 27.2307 27.9397 26.979C27.9494 26.7273 27.8638 26.4812 27.7 26.2899L19.41 17.9999Z" fill="black" />
                            </svg>
                          </div>
                        ))
                      }
                    </div>
                    <form className={styles.addNewValue} onSubmit={(e) => addTotalyUsedItem(e)}>
                      <Input
                        placeholder="Використаний розхідник"
                        inputName="totalyUsedMaterials"
                        changeHandler={(e) => getSpecialValues(e)}
                      />
                      <Button
                        btnType="submit"
                        btnName="Додати"
                      />
                    </form>
                  </div>
                </div>
              </div>

              <div className={styles.container}>
                <div className={styles.header} onClick={() => setOpenEditing(8)}>
                  <p>Внести завдаток</p>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6L10 11L15 6L17 7L10 14L3 7L5 6Z" fill="black" />
                  </svg>
                </div>
                <div className={
                    OpenEditing === 8
                      ? `${styles.content} ${styles.opened}`
                      : styles.content
                    }
                >
                  <Input
                    inputType="text"
                    placeholder="Сума"
                    inputName="previousSum"
                    changeHandler={(e) => getInputsValues(e)}
                  />
                </div>
              </div>

              <div className={styles.container}>
                <div className={styles.header} onClick={() => setOpenEditing(9)}>
                  <p>Внести оплату</p>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6L10 11L15 6L17 7L10 14L3 7L5 6Z" fill="black" />
                  </svg>
                </div>
                <div className={
                    OpenEditing === 9
                      ? `${styles.content} ${styles.opened}`
                      : styles.content
                    }
                >
                  <Input
                    inputType="text"
                    placeholder="Сума"
                    inputName="totalSum"
                    changeHandler={(e) => getInputsValues(e)}
                  />
                </div>
              </div>

              <Button
                btnName="Зберегти зміни"
                btnHandler={() => submitChanges()}
              />
              <Message message="message example" status={ShowMessage} activationKey={ShowMessage} />

            </div>
          )
          : <p>Такого проекту не існує</p>
      }
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const res = await fetch('https://admin-panel-fce34-default-rtdb.firebaseio.com/projects/.json')
  const dataDB = await res.json()
  const newData = dataDB.filter((item) => item.id === params.slug)
  if (newData.length) {
    return { props: { newData } }
  }
  return { props: { value: null } }
}

export default editProject
