import React, { memo } from 'react'
import './Header.css'
export default memo(function Header() {
    console.log('head render')
    return (
        <div className='container'>
            <h2 className='title'>Today's Weather</h2>
        </div>
    )
})
