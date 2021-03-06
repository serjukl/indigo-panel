import Head from 'next/head'
import Navigation from '../components/Navigation/Navigation'
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
        'Content-Type': 'application/json',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin'
      }
    })
    const logResult = await response.json()
    if (!logResult) {
      localStorage.removeItem(localStorage.removeItem('iea'))
      window.location = '/auth'
    }
  }

  useEffect(() => {
    console.log(navigator)
    if (localStorage.getItem('iea') === 'false'
    || localStorage.getItem('iea') === null) window.location = '/auth'
    isLogin()
  }, [])

  const getProjects = async () => {
    const response = await fetch(`${window.location.origin}/api/getProjects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin'
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
  }, [Flag])
  
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Navigation />
        <h1>main page</h1>
      </div>
  )
}

export default Home
