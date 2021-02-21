import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from './NavBar.module.sass'

const NavBar = ({ link, icon, title }) => (
  <div className={styles.adminPanel}>
    <Link href={`/${link}`}>
      <a title={title}>
        {icon}
      </a>
    </Link>
  </div>
)

NavBar.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  link: PropTypes.string
}

export default NavBar
