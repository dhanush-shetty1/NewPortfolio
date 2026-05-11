import { WindowControlls } from '#components'
import { techStack } from '#constants'
import windowWrapper from '#hoc/windowWrapper'
import { Check, Flag } from 'lucide-react'
import React from 'react'

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <WindowControlls target="terminal"/>
        <h2>Tech Stack</h2>
      </div>

      <div className='techstack'>

        <p className='mb-4 text-sm'>
          <span className='font-bold'>@dhanush %</span>
          {" "}show tech stack
        </p>

        <div className='flex items-center pb-2 mb-2 text-xs font-semibold border-b border-dashed border-black/40'>
          <div className='w-[22px] shrink-0' />
          <p className='w-[120px]'>Category</p>
          <p>Technologies</p>
        </div>

        <ul className='flex flex-col gap-1'>
          {techStack.map(({ category, items }) => (
            <li
              key={category}
              className='flex items-center gap-2 text-sm'
            >
              <Check
                className='text-green-500 shrink-0'
                size={14}
              />

              <div className='w-[120px] shrink-0'>
                <h3 className='font-semibold text-green-500 text-xs'>
                  {category}
                </h3>
              </div>

              <p className='flex-1 text-xs'>
                {items.join(", ")}
              </p>
            </li>
          ))}
        </ul>

        <div className='mt-3 pt-3 border-t border-dashed border-black/40 flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <Check className='text-green-500 shrink-0' size={14} />
            <p className='text-xs text-green-500'>
              {techStack.length} of {techStack.length} stacks loaded successfully (100%)
            </p>
          </div>

          <div className='flex items-center gap-2'>
            <Flag size={14} fill='currentColor' className='text-black shrink-0' />
            <p className='text-xs text-black'>Render time: 6ms</p>
          </div>
        </div>

      </div>
    </>
  )
}

const TerminalWindow = windowWrapper(Terminal, 'terminal')

export default TerminalWindow