import React from 'react'
import { Link } from 'react-router-dom'
import { productQuantity, shortenText } from '../helpers/helpers'
//-------------------icons-----------------------
import { TbListDetails } from "react-icons/tb";
import { TbShoppingBagPlus } from "react-icons/tb";
import { BsTrash3Fill } from "react-icons/bs";
import { MdAddCircle } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";
//--------------css----------------------------
import styles from './Card.module.css';
import { useCard } from '../context/CardContext';
//________________________________________________
function Card({data}) {
  const {price, image, title, id} = data;
  const [state, dispatch] = useCard();
  const quantity = productQuantity(state, id);

  const clickHandler = (type) => {
      dispatch({type, payload: data});
  }

  return (
    <div className={styles.container}>
        <div className={styles.details}>
            <img src={image} alt="Product image" />
            <div>
              <h4>{shortenText(title)}</h4>
              <p>${price}</p>
            </div>
        </div>
        <div className={styles.buttons}>
            <Link to={`${id}`}><TbListDetails /></Link>
            <div>
              {quantity === 1 &&<button onClick={() => clickHandler("REMOVE_ITEM")} className={styles.animation}><BsTrash3Fill /></button>}
              {quantity > 1 &&<button onClick={() => clickHandler("DECREASE")}><IoIosRemoveCircle /></button>}
              {quantity >= 1 && <p>{quantity}</p>}
              {quantity >= 1 &&<button onClick={() => clickHandler("INCREASE")}><MdAddCircle /></button>}
              {quantity === 0 &&<button onClick={() => clickHandler("ADD_ITEM")}><TbShoppingBagPlus /></button>}
            </div>
        </div>
    </div>
  )
}

export default Card