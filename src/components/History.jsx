import React, { useEffect, useCallback, memo, useState } from 'react'
import deleteIcon from '../images/deleteIcon.svg'
import searchIcon from '../images/searchIcon.svg'

import './History.css'
export default memo(function History({ handleSearch, result }) {
    const [hisotry, setHisotry] = useState([])

    const handleDeleteItem = (key) => {
        localStorage.removeItem(key)
        setHisotry(allStorage())
    }


    const allStorage = useCallback(() => {
        console.log('storage call')
        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
        while (i--) {
            values.push({ ...JSON.parse(localStorage.getItem(keys[i])), key: keys[i] });
        }
        return values;
    }, [])
    console.log('allStorage: ', allStorage())

    useEffect(() => {
        setHisotry(allStorage())
    }, [allStorage, result])

    return (
        <div className='history-container'>
            <h3 className='title'>
                Search History
            </h3>
            <div className='history-items'>
                {hisotry.map(({ city, country, dateTime, key }, index) => {

                    const time = dateTime.split(' ')[1]
                    return <div key={key} className='item-box'>

                        <div className='left-info'>
                            <span className='item-index'>{index + 1}.</span>
                            <span>{city},</span>
                            <span>{country}</span>
                        </div>
                        <div className='right-controller'>

                            <span>{time}</span>
                            <div onClick={() => handleSearch(city, country)} className='icon-button' >
                                <img src={searchIcon} alt='search' width={15} className='icon-img' />
                            </div>
                            <div onClick={() => handleDeleteItem(key)} className='icon-button'>
                                <img src={deleteIcon} alt='delete' width={15} className='icon-img' />

                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
})
