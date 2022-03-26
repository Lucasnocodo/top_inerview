import React from 'react'

import './Skeleton.css'

export default function Skeleton() {
    return (
        <div className="skeleton-box">
            <div className="skeleton city"></div>
            <div className="skeleton main"></div>
            <div className="skeleton text"></div>
            <div className="skeleton text"></div>
            <div className="skeleton text"></div>
            <div className="skeleton text"></div>
        </div>
    )
}
