import React from 'react'
import styles from './FormName.module.sass'

const FormName = ({Name}) => {
    return (
        <div className={styles.container}>
            <p>Прийняв: <span>{Name}</span></p>
        </div>
    )
}

export default FormName
