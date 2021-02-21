import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import styles from '../styles/Home.module.sass'
import Input from '../components/Input_line/Input_line'
import Button from '../components/Button/Button'

const Home = () => {
  const [ProjectsArr, setProjectsArr] = useState([])
  const [SearchValue, setSearchValue] = useState('default')
  const [UserSearch] = useState({})
  const [Flag, setFlag] = useState(0)
  const iconLink = (
    <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M87.1096 75.3906H79.2971V67.5781C79.2971 67.1484 78.9456 66.7968 78.5159 66.7968H73.8284C73.3987 66.7968 73.0471 67.1484 73.0471 67.5781V75.3906H65.2346C64.8049 75.3906 64.4534 75.7422 64.4534 76.1718V80.8593C64.4534 81.289 64.8049 81.6406 65.2346 81.6406H73.0471V89.4531C73.0471 89.8828 73.3987 90.2343 73.8284 90.2343H78.5159C78.9456 90.2343 79.2971 89.8828 79.2971 89.4531V81.6406H87.1096C87.5393 81.6406 87.8909 81.289 87.8909 80.8593V76.1718C87.8909 75.7422 87.5393 75.3906 87.1096 75.3906ZM36.4749 48.6718C36.387 47.8222 36.3381 46.9629 36.3381 46.0937C36.3381 44.541 36.4846 43.0273 36.7581 41.5527C36.8264 41.2011 36.6409 40.8398 36.3186 40.6933C34.9905 40.0976 33.7698 39.2773 32.7151 38.2422C31.4723 37.0372 30.4944 35.5863 29.8437 33.9822C29.1929 32.3781 28.8837 30.656 28.9358 28.9258C29.0237 25.791 30.2834 22.8125 32.4807 20.5664C34.8928 18.0957 38.135 16.748 41.5823 16.7871C44.6975 16.8164 47.7053 18.0176 49.9807 20.1465C50.7522 20.8691 51.4163 21.6699 51.9729 22.5293C52.1682 22.832 52.5491 22.959 52.8811 22.8418C54.5999 22.2461 56.4163 21.8261 58.2815 21.6308C58.8284 21.5722 59.1409 20.9863 58.8967 20.498C55.7229 14.2187 49.2385 9.88278 41.7385 9.7656C30.9182 9.59958 21.8948 18.4765 21.8948 29.2968C21.8948 35.4297 24.717 40.8984 29.1409 44.4824C26.0354 45.9179 23.1741 47.9004 20.6936 50.3808C15.342 55.7226 12.3147 62.7734 12.1194 70.3027C12.1168 70.4069 12.1351 70.5106 12.1732 70.6077C12.2112 70.7047 12.2684 70.7932 12.3412 70.8678C12.414 70.9424 12.501 71.0017 12.5971 71.0422C12.6932 71.0827 12.7964 71.1035 12.9006 71.1035H18.3792C18.7991 71.1035 19.1506 70.7715 19.1604 70.3515C19.3459 64.6875 21.6409 59.3847 25.6741 55.3613C28.5452 52.4902 32.0608 50.498 35.8987 49.5312C36.2698 49.4238 36.5237 49.0625 36.4749 48.6718V48.6718ZM80.469 46.0937C80.469 35.4101 71.885 26.7285 61.2405 26.5625C50.4202 26.3965 41.4065 35.2734 41.4065 46.0937C41.4065 52.2265 44.2385 57.6953 48.6526 61.2793C45.515 62.7337 42.6586 64.7304 40.2151 67.1777C34.8635 72.5195 31.8362 79.5703 31.6409 87.0898C31.6383 87.194 31.6565 87.2977 31.6946 87.3948C31.7327 87.4918 31.7899 87.5803 31.8627 87.6549C31.9355 87.7295 32.0225 87.7888 32.1186 87.8293C32.2146 87.8698 32.3179 87.8906 32.4221 87.8906H37.8909C38.3108 87.8906 38.6624 87.5586 38.6721 87.1386C38.8577 81.4746 41.1526 76.1718 45.1858 72.1484C49.3948 67.9394 54.9807 65.625 60.9377 65.625C71.719 65.625 80.469 56.8847 80.469 46.0937ZM69.7756 54.9316C67.4124 57.2949 64.2776 58.5937 60.9377 58.5937C57.5979 58.5937 54.4631 57.2949 52.0999 54.9316C50.9205 53.7585 49.9887 52.3605 49.3597 50.8206C48.7306 49.2806 48.4171 47.6301 48.4377 45.9668C48.467 42.7636 49.7463 39.6679 51.9827 37.373C54.3264 34.9707 57.4612 33.6328 60.8108 33.5937C64.1213 33.5644 67.3342 34.8535 69.6975 37.1679C72.1194 39.541 73.4475 42.7148 73.4475 46.0937C73.4377 49.4336 72.1389 52.5683 69.7756 54.9316V54.9316Z" fill="black" />
    </svg>
  )
  const isLogin = async () => {
    const response = await fetch(`${window.location.origin}/api/isLogged`, {
      method: 'POST',
      body: JSON.stringify(localStorage.getItem('iea')),
      headers: {
        'Content-Type': 'application/json'
      },
      cors: 'no-cors'
    })
    const logResult = await response.json()
    if (!logResult) {
      localStorage.removeItem(localStorage.removeItem('iea'))
      window.location = '/auth'
    }
  }

  useEffect(() => {
    if (localStorage.getItem('iea') === 'false'
    || localStorage.getItem('iea') === null) window.location = '/auth'
    isLogin()
  }, [])

  const getProjects = async () => {
    const response = await fetch(`${window.location.origin}/api/getProjects`, {
      method: 'GET'
    })
    const logResult = await response.json()
    return logResult
  }

  const getSearchValue = (e) => {
    setSearchValue(e.target.value)
  }

  const getUserSearch = (e) => {
    UserSearch[e.target.name] = e.target.value
  }

  const submitSearch = () => {
    if (SearchValue === 'clientName') {
      const temp = ProjectsArr.filter((prj) => prj.clientName === UserSearch.search)
      console.log(temp)
      setProjectsArr(temp)
    }
    if (SearchValue === 'date') {
      const temp = ProjectsArr.filter((prj) => prj.date === UserSearch.search)
      setProjectsArr(temp)
    }
    if (SearchValue === 'creatorName') {
      const temp = ProjectsArr.filter((prj) => prj.creatorName === UserSearch.search)
      setProjectsArr(temp)
    }
    if (SearchValue === 'clientNumber') {
      const temp = ProjectsArr.filter((prj) => prj.clientNumber === UserSearch.search)
      setProjectsArr(temp)
    }
    if (SearchValue === 'default') {
      const temp = ProjectsArr.filter((prj) => prj.clientNumber === UserSearch.search)
      setProjectsArr(temp)
      setFlag(Flag + 1)
    }
  }

  useEffect(() => {
    async function fetchData() {
      setProjectsArr(await getProjects())
    }
    fetchData()
  }, [Flag])
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar
        icon={iconLink}
        title="Перейти в адмін панель"
        link="ieadmin"
      />

      <div className={styles.addNewProject}>
        <select name="" id="" onChange={(e) => getSearchValue(e)}>
          <option value="default">Оберіть пошук</option>
          <option value="date">Дата</option>
          <option value="clientName">Ім&rsquo;я клієнта</option>
          <option value="creatorName">Хто прийняв</option>
          <option value="clientNumber">Номер клієнта</option>
        </select>
        <Input 
          placeholder="Ключове слово"
          inputName="search" 
          changeHandler={(e) => getUserSearch(e)}/>
        <Button
          btnName="Пошук"
          btnHandler={() => submitSearch()}
        />
      </div>

      <div className={styles.addNewProject}>
        <Link href="/addproject">
          <a>
            Додати проект
          </a>
        </Link>
      </div>
      {
        ProjectsArr.map((project, key) => (
          <div className={styles.project} key={key}>
            <div className={styles.settings}>
              <Link href={`/editProject/${project.id}`}>
                <a>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.94 22H11.05C10.6044 22 10.1771 21.823 9.86206 21.5079C9.547 21.1929 9.37 20.7656 9.37 20.32V19.23C9.36458 19.1658 9.34103 19.1044 9.30208 19.0531C9.26313 19.0017 9.21038 18.9625 9.15 18.94C9.08881 18.9008 9.01767 18.88 8.945 18.88C8.87233 18.88 8.80119 18.9008 8.74 18.94L8 19.74C7.84478 19.8963 7.66016 20.0204 7.45678 20.105C7.25341 20.1897 7.03529 20.2333 6.815 20.2333C6.59471 20.2333 6.37659 20.1897 6.17322 20.105C5.96984 20.0204 5.78522 19.8963 5.63 19.74L4.26 18.4C4.10142 18.2451 3.97547 18.06 3.8896 17.8556C3.80372 17.6512 3.75966 17.4317 3.76 17.21C3.76064 16.7565 3.94034 16.3217 4.26 16L5 15.26C5.03573 15.2049 5.05474 15.1407 5.05474 15.075C5.05474 15.0093 5.03573 14.9451 5 14.89C4.94 14.74 4.84 14.63 4.7 14.63H3.68C3.23352 14.6274 2.80623 14.4481 2.49145 14.1315C2.17667 13.8148 1.99999 13.3865 2 12.94V11.05C2 10.6044 2.177 10.1771 2.49206 9.86206C2.80712 9.547 3.23444 9.37 3.68 9.37H4.77C4.83422 9.36458 4.89558 9.34103 4.94692 9.30208C4.99827 9.26313 5.03748 9.21038 5.06 9.15C5.0992 9.08881 5.12004 9.01767 5.12004 8.945C5.12004 8.87233 5.0992 8.80119 5.06 8.74L4.26 8C4.10368 7.84478 3.97962 7.66016 3.89497 7.45678C3.81031 7.25341 3.76672 7.03529 3.76672 6.815C3.76672 6.59471 3.81031 6.37659 3.89497 6.17322C3.97962 5.96984 4.10368 5.78522 4.26 5.63L5.6 4.26C5.7534 4.10217 5.93682 3.97663 6.13947 3.89076C6.34212 3.80489 6.55991 3.76043 6.78 3.76C7.00625 3.75901 7.23046 3.80266 7.43981 3.88846C7.64916 3.97426 7.83952 4.10052 8 4.26L8.74 5C8.79509 5.03573 8.85934 5.05474 8.925 5.05474C8.99066 5.05474 9.05491 5.03573 9.11 5C9.26 4.94 9.37 4.84 9.37 4.7V3.68C9.37264 3.23352 9.55186 2.80623 9.86851 2.49145C10.1852 2.17667 10.6135 1.99999 11.06 2H13C13.4456 2 13.8729 2.177 14.1879 2.49206C14.503 2.80712 14.68 3.23444 14.68 3.68V4.77C14.6854 4.83422 14.709 4.89558 14.7479 4.94692C14.7869 4.99827 14.8396 5.03748 14.9 5.06C14.9612 5.0992 15.0323 5.12004 15.105 5.12004C15.1777 5.12004 15.2488 5.0992 15.31 5.06L16 4.26C16.1552 4.10368 16.3398 3.97962 16.5432 3.89497C16.7466 3.81031 16.9647 3.76672 17.185 3.76672C17.4053 3.76672 17.6234 3.81031 17.8268 3.89497C18.0302 3.97962 18.2148 4.10368 18.37 4.26L19.74 5.6C19.8981 5.75526 20.0238 5.94043 20.1096 6.14474C20.1955 6.34905 20.2398 6.56839 20.24 6.79C20.2448 7.01529 20.2029 7.23914 20.1168 7.44741C20.0308 7.65567 19.9025 7.84383 19.74 8L19 8.74C18.9643 8.79509 18.9453 8.85934 18.9453 8.925C18.9453 8.99066 18.9643 9.05491 19 9.11C19.06 9.26 19.16 9.37 19.3 9.37H20.39C20.8242 9.39058 21.2338 9.57767 21.5336 9.89241C21.8335 10.2071 22.0005 10.6253 22 11.06V13C22 13.4456 21.823 13.8729 21.5079 14.1879C21.1929 14.503 20.7656 14.68 20.32 14.68H19.23C19.1658 14.6854 19.1044 14.709 19.0531 14.7479C19.0017 14.7869 18.9625 14.8396 18.94 14.9C18.9043 14.9551 18.8853 15.0193 18.8853 15.085C18.8853 15.1507 18.9043 15.2149 18.94 15.27L19.71 16.04C19.8663 16.1952 19.9904 16.3798 20.075 16.5832C20.1597 16.7866 20.2033 17.0047 20.2033 17.225C20.2033 17.4453 20.1597 17.6634 20.075 17.8668C19.9904 18.0702 19.8663 18.2548 19.71 18.41L18.4 19.74C18.2466 19.8978 18.0632 20.0234 17.8605 20.1092C17.6579 20.1951 17.4401 20.2396 17.22 20.24C16.7735 20.2341 16.3467 20.0548 16.03 19.74L15.26 19C15.2049 18.9643 15.1407 18.9453 15.075 18.9453C15.0093 18.9453 14.9451 18.9643 14.89 19C14.74 19.06 14.63 19.16 14.63 19.3V20.39C14.6094 20.8242 14.4223 21.2338 14.1076 21.5336C13.7929 21.8335 13.3747 22.0005 12.94 22V22ZM11.37 20H12.63V19.23C12.6343 18.7689 12.7753 18.3193 13.0352 17.9384C13.2951 17.5574 13.6622 17.2622 14.09 17.09C14.5196 16.9022 14.9953 16.8467 15.4566 16.9304C15.9179 17.0141 16.3438 17.2333 16.68 17.56L17.22 18.1L18.1 17.22L17.56 16.67C17.2353 16.3389 17.0164 15.9188 16.9309 15.463C16.8454 15.0072 16.8973 14.5362 17.08 14.11C17.2537 13.6841 17.5497 13.3191 17.9305 13.061C18.3113 12.803 18.76 12.6634 19.22 12.66H20V11.37H19.23C18.7689 11.3657 18.3193 11.2247 17.9384 10.9648C17.5574 10.7049 17.2622 10.3378 17.09 9.91C16.9022 9.48043 16.8467 9.00467 16.9304 8.54339C17.0141 8.0821 17.2333 7.6562 17.56 7.32L18.1 6.78L17.22 5.9L16.67 6.44C16.3337 6.74716 15.9167 6.95185 15.468 7.02995C15.0193 7.10806 14.5576 7.05633 14.1373 6.88086C13.717 6.70539 13.3556 6.41348 13.0957 6.03952C12.8357 5.66555 12.688 5.22509 12.67 4.77V4H11.37V4.77C11.3657 5.23115 11.2247 5.68066 10.9648 6.06161C10.7049 6.44257 10.3378 6.73782 9.91 6.91C9.48043 7.09777 9.00467 7.15335 8.54339 7.06964C8.0821 6.98593 7.6562 6.76673 7.32 6.44L6.78 5.9L5.9 6.78L6.44 7.33C6.74716 7.66628 6.95185 8.08331 7.02995 8.53201C7.10806 8.98071 7.05633 9.44238 6.88086 9.86267C6.70539 10.283 6.41348 10.6444 6.03952 10.9043C5.66555 11.1643 5.22509 11.312 4.77 11.33H4V12.59H4.77C5.23115 12.5943 5.68066 12.7353 6.06161 12.9952C6.44257 13.2551 6.73782 13.6222 6.91 14.05C7.09777 14.4796 7.15335 14.9553 7.06964 15.4166C6.98593 15.8779 6.76673 16.3038 6.44 16.64L5.9 17.18L6.78 18.06L7.33 17.52C7.66628 17.2128 8.08331 17.0082 8.53201 16.93C8.98071 16.8519 9.44238 16.9037 9.86267 17.0791C10.283 17.2546 10.6444 17.5465 10.9043 17.9205C11.1643 18.2945 11.312 18.7349 11.33 19.19L11.37 20Z" fill="white" />
                    <path d="M12 15.5C11.3078 15.5 10.6311 15.2947 10.0555 14.9101C9.47993 14.5256 9.03133 13.9789 8.76642 13.3394C8.50152 12.6999 8.4322 11.9961 8.56725 11.3172C8.7023 10.6383 9.03564 10.0146 9.52513 9.52513C10.0146 9.03564 10.6383 8.7023 11.3172 8.56725C11.9961 8.4322 12.6999 8.50152 13.3394 8.76642C13.9789 9.03133 14.5256 9.47993 14.9101 10.0555C15.2947 10.6311 15.5 11.3078 15.5 12C15.5 12.9283 15.1313 13.8185 14.4749 14.4749C13.8185 15.1313 12.9283 15.5 12 15.5V15.5ZM12 10.5C11.7033 10.5 11.4133 10.588 11.1666 10.7528C10.92 10.9176 10.7277 11.1519 10.6142 11.426C10.5007 11.7001 10.4709 12.0017 10.5288 12.2926C10.5867 12.5836 10.7296 12.8509 10.9393 13.0607C11.1491 13.2704 11.4164 13.4133 11.7074 13.4712C11.9983 13.5291 12.2999 13.4994 12.574 13.3858C12.8481 13.2723 13.0824 13.08 13.2472 12.8334C13.412 12.5867 13.5 12.2967 13.5 12C13.5 11.6022 13.342 11.2206 13.0607 10.9393C12.7794 10.658 12.3978 10.5 12 10.5Z" fill="white" />
                  </svg>
                </a>
              </Link>
            </div>

            <div className={styles.projectOption}>
              <p className={styles.optionHeader}>
                Дата замовлення
              </p>
              <p className={styles.optionValue}>
                {project.date}
              </p>
            </div>
            <div className={styles.projectOption}>
              <p className={styles.optionHeader}>
                Прийняв замовлення
              </p>
              <p className={styles.optionValue}>
                {project.creatorName}
              </p>
            </div>

            <div className={styles.projectOption}>
              <p className={styles.optionHeader}>
                Номер на який подзвонив клієнт
              </p>
              <a href={`tel:${project.numberPhoning}`} className={styles.optionValue}>
                {project.numberPhoning}
              </a>
            </div>

            <div className={styles.projectOption}>
              <p className={styles.optionHeader}>
                Ім&rsquo;я клієнта
              </p>
              <p className={styles.optionValue}>
                {project.clientName}
              </p>
            </div>

            <div className={styles.projectOption}>
              <p className={styles.optionHeader}>
                Номер клієнта
              </p>
              <a href={`tel:${project.numberPhoning}`} className={styles.optionValue}>
                {project.clientNumber}
              </a>
            </div>

            <div className={styles.projectOption}>
              <p className={styles.optionHeader}>
                Місто
              </p>
              <p className={styles.optionValue}>
                {project.city}
              </p>
            </div>

            <div className={styles.workTypesContainer}>
              <p className={styles.optionHeader}>
                Тип робіт
              </p>
              <div className={styles.workTypesValues}>
                {
                  project.workTypes.map((item, index) => (
                    <div key={index} className={styles.projectOption}>
                      <p className={styles.optionValue}>
                        {`${item}, `}
                      </p>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className={styles.projectOption}>
              <p className={styles.optionHeader}>
                Заявлені розхідники
              </p>
              <div className={styles.containerValue}>
                {
                  project?.usedItems ? project.usedItems.map((item, index) => (
                    <p className={styles.optionValue} key={index}>
                      {`${item}, `}
                    </p>
                  )) : <p className={styles.optionValue}>не вказано</p>
                }
              </div>
            </div>

            <div className={styles.projectOption}>
              <p className={styles.optionHeader}>
                Використані розхідники
              </p>
              <div className={styles.containerValue}>
                {
                  project?.totalyUsedItems ? project.totalyUsedItems.map((item, index) => (
                    <p className={styles.optionValue} key={index}>
                      {`${item}, `}
                    </p>
                  )) : <p className={styles.optionValue}>не вказано</p>
                }
              </div>
            </div>

            <div className={styles.projectOption}>
              <p className={styles.optionHeader}>
                Завдаток
              </p>
              <p className={styles.optionValue}>
                {project.previousSum || 'не вказано'}
              </p>
            </div>
            <div className={styles.projectOption}>
              <p className={styles.optionHeader}>
                Загальна сума
              </p>
              <p className={styles.optionValue}>
                {project.totalSum || 'не вказано'}
              </p>
            </div>

          </div>
        ))
      }
    </div>
  )
}

export default Home
