import { WindowControlls } from '#components'
import { safariSocialLinks, safariCodingLinks, safariNews } from '#constants'
import windowWrapper from '#hoc/windowWrapper'
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from 'lucide-react'
import React from 'react'

const Safari = () => {
  return (
    <>
      <div id="window-header">

        <WindowControlls target="safari" />

        <PanelLeft className='ml-10 icon' />

        <div className='flex items-center gap-1 ml-5'>
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className='flex-1 flex-center gap-3'>

          <ShieldHalf className='icon' />

          <div className='search flex items-center gap-2'>
            <Search className='icon' />

            <input
              type="text"
              placeholder='Search or enter website name'
              className='flex-1 outline-none bg-transparent'
            />
          </div>

        </div>

        <div className='flex items-center gap-5'>
          <Share className='icon' />
          <Plus className='icon' />
          <Copy className='icon' />
        </div>

      </div>

      <div className='safari-content p-8 bg-gradient-to-b from-pink-50 to-purple-50 overflow-y-auto'>

        {/* SNS Links Section */}
        <div className='mb-12'>
          <h2 className='text-3xl font-bold mb-6 text-gray-900'>Find me online</h2>
          <div className='grid grid-cols-5 gap-6'>
            {safariSocialLinks.map(({ id, name, color, letter, icon, link }) => (
              <a
                key={id}
                href={link}
                target='_blank'
                rel='noreferrer'
                className='flex flex-col items-center gap-2 group cursor-pointer transition-transform hover:scale-110'
              >
                <div
                  style={{ backgroundColor: icon ? 'transparent' : color }}
                  className='w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:shadow-lg transition-shadow'
                >
                  {icon ? (
                    <img src={icon} alt={name} className='w-full h-full object-contain p-2' />
                  ) : (
                    letter
                  )}
                </div>
                <p className='text-sm font-medium text-center text-gray-700'>
                  {name}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Coding Links Section */}
        <div className='mb-12'>
          <h2 className='text-3xl font-bold mb-6 text-gray-900'>Developer Presence</h2>
          <div className='grid grid-cols-7 gap-4'>
            {safariCodingLinks.map(({ id, name, color, letter, icon, link }) => (
              <a
                key={id}
                href={link}
                target='_blank'
                rel='noreferrer'
                className='flex flex-col items-center gap-2 group cursor-pointer transition-transform hover:scale-110'
              >
                <div
                  style={{ backgroundColor: icon ? 'transparent' : color }}
                  className='w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xs group-hover:shadow-lg transition-shadow'
                >
                  {icon ? (
                    <img src={icon} alt={name} className='w-full h-full object-contain p-2' />
                  ) : (
                    letter
                  )}
                </div>
                <p className='text-xs font-medium text-center text-gray-700 line-clamp-2'>
                  {name}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Frequently Visited Section */}
        <div className='mb-12'>
          <h2 className='text-3xl font-bold mb-6 text-gray-900'>Frequently Visited</h2>
          <div className='grid grid-cols-5 gap-6'>
            {safariCodingLinks.slice(0, 5).map(({ id, name, color, letter, icon }) => (
              <div
                key={id}
                className='flex flex-col items-center gap-2 group cursor-pointer transition-transform hover:scale-110'
              >
                <div
                  style={{ backgroundColor: icon ? 'transparent' : color }}
                  className='w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:shadow-lg transition-shadow'
                >
                  {icon ? (
                    <img src={icon} alt={name} className='w-full h-full object-contain p-2' />
                  ) : (
                    letter
                  )}
                </div>
                <p className='text-sm font-medium text-center text-gray-700'>
                  {name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Report Section */}
        <div>
          <h2 className='text-3xl font-bold mb-6 text-gray-900'>Developer Updates</h2>
          <div className='space-y-4'>
            {safariNews.map(({ id, title, source, date }) => (
              <div
                key={id}
                className='bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-gray-200 hover:border-gray-300 transition-all'
              >
                <div className='flex items-start gap-4'>
                  <div className='text-2xl'>📰</div>
                  <div className='flex-1'>
                    <p className='text-sm text-gray-500 mb-1'>{source}</p>
                    <h3 className='font-semibold text-gray-900 mb-2'>{title}</h3>
                    <p className='text-xs text-gray-400'>{date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}

const SafariWindow = windowWrapper(Safari, 'safari')

export default SafariWindow