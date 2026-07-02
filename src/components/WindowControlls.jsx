import useWindowStore from '#store/window'
import React from 'react'

const WindowControlls = ({ target }) => {

    const { closeWindow, minimizeWindow } = useWindowStore()

    return (
        <div id="window-controls">

            <div
                className='close'
                data-clickable="true"
                onClick={() => closeWindow(target)}
            />

            <div
                className='minimize'
                data-clickable="true"
                onClick={() => minimizeWindow(target)}
            />

            <div 
                className='maximize'
                data-clickable="true"
            />

        </div>
    )
}

export default WindowControlls