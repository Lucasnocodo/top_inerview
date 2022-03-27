import React, { useRef, useLayoutEffect, useState, memo, useCallback } from 'react';
import Skeleton from './Skeleton'
import './Search.css'

const initSearchState = { inputCity: '', inputCountry: '' }

export default memo(function Search({ result, handleSearch, init, isLoading }) {
    console.log('search render')
    const [searchData, setSearchData] = useState(initSearchState)
    const targetRef = useRef();
    const [containerWidth, setContainerWidth] = useState(0);

    useLayoutEffect(() => {
        if (targetRef.current) {
            setContainerWidth(targetRef.current.offsetWidth);
        }
    }, []);

    let { inputCity, inputCountry } = searchData
    const { city, country, description, main_description, humidity, temp_max, temp_min, dateTime } = result
    const inputs = [
        {
            title: 'City',
            key: 'inputCity',
            value: inputCity,
        },
        {
            title: 'Country',
            key: 'inputCountry',
            value: inputCountry,
        },
    ]
    const resultData = useCallback(() => [
        {
            title: 'Description',
            unit: '',
            value: description
        },
        {
            title: 'Temperature',
            unit: '°C',
            value: temp_min,
            value2: temp_max,
        },
        {
            title: 'Humidity',
            unit: '%',
            value: humidity
        },
        {
            title: 'Time',
            unit: '',
            value: dateTime
        },

    ], [dateTime, description, humidity, temp_max, temp_min])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSearchData((pre) => ({ ...pre, [name]: value }))
    }

    const handleClear = () => {
        setSearchData(initSearchState)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(inputCity, inputCountry)
        }
    }

    const renderResult = useCallback(() => {
        if (init) return null
        if (isLoading) return <Skeleton />
        const { cod, message } = result
        if (cod === 200) {
            return (
                <div className='result-box' >
                    <span className='light'>{city},{country}</span>
                    <p className='main-description'>{main_description}</p>
                    {resultData().map(({ title, unit, value, value2 }) => {
                        return (
                            <div className="result-item" key={title}>
                                <div className='result-col light'>
                                    {title}:
                                </div>
                                <div className='result-value'>
                                    {value2 ? `${value}${unit} ~ ${value2}${unit}` : `${value}${unit}`}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return <div className='err-message'>{message}</div>
        }
    }, [city, country, init, isLoading, main_description, result, resultData])

    return (
        <div className='search-container' ref={targetRef} >
            <div className='search-bar'>
                {inputs.map(({ title, key, value }) => (
                    <div className='search-box' key={title}>
                        <ResposeInput
                            title={title}
                            containerWidth={containerWidth}
                            handleInputChange={handleInputChange}
                            value={value}
                            name={key}
                            handleKeyDown={handleKeyDown}
                        />
                    </div>

                ))}
                <div className='search-box button-box'>
                    <button onClick={() => handleSearch(inputCity, inputCountry)}>Search</button>
                    <button onClick={() => handleClear()}>Clear</button>
                </div>
            </div>
            {renderResult()}
        </div>
    )
})

const ResposeInput = ({ containerWidth, value, handleInputChange, handleKeyDown, name, title }) => (
    <>
        {containerWidth > 600 &&
            <span className='input-name'>{title}: </span>
        }
        <input
            value={value}
            onChange={(e) => handleInputChange(e)}
            name={name}
            autoFocus={title === 'City'}
            onKeyDown={handleKeyDown}
            placeholder={containerWidth > 600 ? '' : title}
        />
    </>
)
