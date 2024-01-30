import React from 'react'
import { Link } from 'react-router-dom'
import { FaBasketShopping } from "react-icons/fa6";
import { useCard } from '../context/CardContext';
import styles from './Layout.module.css'

function Layout({children}) {
    const [state, dispatch] = useCard();

  return (
    <div className={styles.container}>
        <header>
            <h2>MaxMall</h2>
            <Link to={"/checkout"}><FaBasketShopping /> <span>{state.itemsCounter}</span></Link>
        </header>
        {children}
        <footer>Developed By PMBPG With ❤️</footer>
    </div>
  )
}

export default Layout