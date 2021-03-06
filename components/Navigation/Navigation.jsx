import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Navigation.module.sass'
import {useRouter} from 'next/router'

const Navigation = () => {
    const router = useRouter()
    const [OpenNav, setOpenNav] = useState(false)
    const links = [
        {
            name: 'Проекти',
            route: '/'
        },
        {
            name: 'Сторінка пошуку',
            route: '/search'
        },
        {
            name: 'Діяльність користувачів',
            route: '/userActivity'
        },
        {
            name: 'Створити задачу',
            route: '/createTask'
        },
        {
            name: 'Звіт по даті',
            route: '/dateStats'
        },
        {
            name: 'Створити користувача',
            route: '/createUser'
        },
        {
            name: 'Надіслати СМС',
            route: '/sendSMS'
        },
        {
            name: 'Вийти із системи',
            route: '/exit'
        }
    ]
    useEffect(() => {
        console.log(router)
    }, [])
    return (
        <nav className={styles.container}>
            <div className={styles.heading}>
                <h1>
                    indigo panel
                </h1>
                <div className={styles.iconContainer} onClick={() => setOpenNav(!OpenNav)}>
                    {
                        OpenNav
                            ? <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.41 18L27.7 9.71C27.8638 9.5187 27.9494 9.27262 27.9397 9.02095C27.93 8.76927 27.8256 8.53053 27.6475 8.35244C27.4694 8.17434 27.2307 8.07001 26.979 8.06029C26.7274 8.05057 26.4813 8.13617 26.29 8.3L18 16.59L9.70997 8.29C9.52167 8.10169 9.26627 7.99591 8.99997 7.99591C8.73367 7.99591 8.47828 8.10169 8.28997 8.29C8.10167 8.4783 7.99588 8.7337 7.99588 9C7.99588 9.2663 8.10167 9.52169 8.28997 9.71L16.59 18L8.28997 26.29C8.18529 26.3796 8.10027 26.49 8.04025 26.614C7.98022 26.7381 7.94649 26.8732 7.94117 27.0109C7.93586 27.1487 7.95906 27.286 8.00934 27.4143C8.05961 27.5426 8.13587 27.6592 8.23332 27.7566C8.33078 27.8541 8.44732 27.9304 8.57565 27.9806C8.70398 28.0309 8.84131 28.0541 8.97903 28.0488C9.11675 28.0435 9.25188 28.0097 9.37594 27.9497C9.50001 27.8897 9.61033 27.8047 9.69997 27.7L18 19.41L26.29 27.7C26.4813 27.8638 26.7274 27.9494 26.979 27.9397C27.2307 27.93 27.4694 27.8257 27.6475 27.6476C27.8256 27.4695 27.93 27.2307 27.9397 26.9791C27.9494 26.7274 27.8638 26.4813 27.7 26.29L19.41 18Z" fill="#19BFBA"/>
                            </svg>
                            : <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 24H28M4 8H28H4ZM4 16H28H4Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                    }
                    
                </div>
            </div>
            {
                OpenNav
                    ? <ul className={styles.linksContainer}>
                        {
                            links.map((link, key) => (
                                <li key={key}>
                                    <Link href={link.route} >
                                        <a style={{
                                                color: router.route === link.route
                                                    ? '#f05c5c'
                                                    : null
                                            }}>
                                            {link.name}
                                        </a>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    : null
            }
            
        </nav>
    )
}

export default Navigation
