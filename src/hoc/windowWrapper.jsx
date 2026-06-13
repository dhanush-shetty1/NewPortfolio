import useWindowStore from '#store/window'
import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

const windowWrapper = (Component, windowKey) => {

    const Wrapped = (props) => {

        const { focusWindow, windows } = useWindowStore()
        const { isOpen, zIndex } = windows[windowKey]

        const ref = useRef(null)

        useLayoutEffect(() => {

            const el = ref.current
            if (!el) return

            // Dynamically locate the header or title bar to use as the drag trigger
            const winContainer = el.firstElementChild
            const header = winContainer?.querySelector('#window-header, .window-header, .title-bar, .drag-handle')
                || winContainer?.firstElementChild
                || el

            const draggable = Draggable.create(el, {
                trigger: header,
                onPress: () => focusWindow(windowKey),
            })

            return () => {
                draggable[0]?.kill()
            }

        }, [])

        useLayoutEffect(() => {

            const el = ref.current
            if (!el) return

            if (isOpen) {

                el.style.display = 'block'

                gsap.fromTo(
                    el,
                    {
                        scale: 0.8,
                        opacity: 0,
                        y: 40,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: 'power3.out',
                    }
                )

            } else {

                gsap.to(el, {
                    scale: 0.9,
                    opacity: 0,
                    y: 20,
                    duration: 0.25,
                    ease: 'power3.in',
                    onComplete: () => {
                        el.style.display = 'none'
                    },
                })

            }

        }, [isOpen])

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{
                    zIndex,
                    display: 'none',
                }}
                className='absolute'
                onMouseDown={() => focusWindow(windowKey)}
            >
                <Component {...props} />
            </section>
        )
    }

    Wrapped.displayName = `windowWrapper(${
        Component.displayName || Component.name || 'Component'
    })`

    return Wrapped
}

export default windowWrapper