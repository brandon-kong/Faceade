import React, { useEffect } from 'react'
import Router from 'next/router'

export default function Redirect ({ to }) {
    useEffect(() => {
        Router.push(to)
    })
    return (
        <div className="h-screen w-screen bg-white dark:bg-black">
            <p className="text-black dark:text-white">Redirecting...</p>
        </div>
    )
}