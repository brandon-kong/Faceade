import React, { useEffect } from 'react'
import Router from 'next/router'

export default function Redirect ({ to }) {
    useEffect(() => {
        Router.push(to)
    })
    return (
        <div className="h-screen">
            <p>Redirecting...</p>
        </div>
    )
}