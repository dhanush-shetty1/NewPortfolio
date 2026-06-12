import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const FONT_WEIGHTS = {
  subtitle: {
    min: 100,
    max: 400,
    default: 100,
  },
  title: {
    min: 400,
    max: 900,
    default: 400,
  },
}

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={`inline-block ${className}`}
      style={{
        fontVariationSettings: `'wght' ${baseWeight}`,
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
}

const setupTextHover = (container, type) => {
  if (!container) return

  const letters = container.querySelectorAll('span')

  const {
    min,
    max,
    default: defaultWeight,
  } = FONT_WEIGHTS[type]

  const animateLetter = (
    letter,
    weight,
    duration = 0.25
  ) => {
    gsap.to(letter, {
      duration,
      ease: 'power2.out',
      fontVariationSettings: `'wght' ${weight}`,
    })
  }

  const handleMouseMove = (e) => {
    const containerRect =
      container.getBoundingClientRect()

    const mouseX = e.clientX - containerRect.left

    letters.forEach((letter) => {
      const rect = letter.getBoundingClientRect()

      const letterCenter =
        rect.left -
        containerRect.left +
        rect.width / 2

      const distance = Math.abs(
        mouseX - letterCenter
      )

      const intensity = Math.exp(
        -(distance ** 2) / 2000
      )

      const weight =
        min + (max - min) * intensity

      animateLetter(letter, weight)
    })
  }

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, defaultWeight, 0.4)
    })
  }

  container.addEventListener(
    'mousemove',
    handleMouseMove
  )

  container.addEventListener(
    'mouseleave',
    handleMouseLeave
  )

  return () => {
    container.removeEventListener(
      'mousemove',
      handleMouseMove
    )

    container.removeEventListener(
      'mouseleave',
      handleMouseLeave
    )
  }
}

const Welcome = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useGSAP(() => {
    const cleanupTitle = setupTextHover(
      titleRef.current,
      'title'
    )

    const cleanupSubtitle = setupTextHover(
      subtitleRef.current,
      'subtitle'
    )

    return () => {
      cleanupTitle?.()
      cleanupSubtitle?.()
    }
  }, [])

  return (
    <section
      id='welcome'
      className='min-h-screen flex flex-col items-center justify-center text-center px-6'
    >
      <p
        ref={subtitleRef}
        className='text-3xl font-georama text-white'
      >
        {renderText(
          "Hey, I'm Dhanush Shetty! Welcome to my",
          'text-3xl font-georama',
          FONT_WEIGHTS.subtitle.default
        )}
      </p>

      <h1
        ref={titleRef}
        className='mt-7 leading-none'
      >
        {renderText(
          'Portfolio',
          'text-9xl italic font-georama',
          FONT_WEIGHTS.title.default
        )}
      </h1>

      <div className='small-screen mt-10'>
        <p className='text-gray-400'>
          This Portfolio is designed for desktop
          screens only
        </p>
      </div>
    </section>
  )
}

export default Welcome