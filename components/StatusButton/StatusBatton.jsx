import React from 'react'
import PropTypes from 'prop-types'
import styles from './StatusButton.module.sass'

const StatusBatton = ({status}) => {

    if(status === "0"){
        return (
            <button className={styles.statusButton} style={{backgroundColor: 'red'}}>
                В очікуванні
            </button>
        )
    }

    if(status === "1"){
        return (
            <button className={styles.statusButton} style={{backgroundColor: 'yellow'}}>
                Прийнято
            </button>
        )
    }

    if(status === "2"){
        return (
            <button className={styles.statusButton} style={{backgroundColor: 'green'}}>
                Завершено
            </button>
        )
    }

}

StatusBatton.propTypes = {
    status: PropTypes.string
}

export default StatusBatton
