import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProductDetails, useProducts } from '../context/ProductContext';
import { shortenText } from '../helpers/helpers';
import { useTitle } from '../hooks/TitleComponent';
//----------------icons-------------------------------
import { FaStar } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";

//----------------loading-----------------------------
import Spinner from "../components/Spinner";
//-----------------css--------------------------------
import styles from './DetailPage.module.css';
//____________________________________________________
function DetailPage() {
    //-------------------custum hook--------------------------
    useTitle("About Product");
    //--------------------------------------------------------
  const { id } = useParams();
  const productDetails = useProductDetails(+id)

  if(!productDetails) return <div className={styles.container}><Spinner /></div>
  return (
    <div className={styles.container}>
      <div className={styles.image}><img src={productDetails.image} /></div>
      <div className={styles.about}>
        <h3>{shortenText(productDetails.title)}</h3>
        <p>{productDetails.description}</p>
        <div className={styles.ratePrice}>
          <p className={styles.rate}><span><FaStar /></span>{productDetails.rating.rate}</p>
          <p className={styles.price}><span><FaMoneyBillWave /></span>${productDetails.price}</p>
        </div>
        <Link to={'/products'}><FaArrowLeft />Go to Products</Link>
      </div>
    </div>
  )
}

export default DetailPage