'use client'

import { FC, useState } from 'react'
import Link from 'next/link'
import { Search, Zap, Bell, HelpCircle, ChevronDown } from 'lucide-react'
import ProfileDropdown from './components/ProfileDropdown'
import InputPopover from '../InputPopover'
import {
  useCreateFullProperty,
  useCreateProperty,
  useGetPropertiesByUserId,
} from '@/hooks/property'
import { useGlobalState } from '@/context/GlobalStateContext'

const Header: FC = () => {
  const {
    state: { properties },
    actions: { setProperties },
  } = useGlobalState()

  const [createFullProperty] = useCreateFullProperty()
  const [getPropertiesByUserId, { loading }] = useGetPropertiesByUserId()
  const [files, setFiles] = useState<File[]>([])

  const handleData = async (data: any) => {
    try {
      const createPromises = data.map((item: any) => createFullProperty(item))
      const responses = await Promise.all(createPromises)
      const newProperties = responses.map((response: any) => response.data)
      if (newProperties.length > 0) {
        getPropertiesByUserId({ page: 1 })
      }
    } catch (e) {
      console.error('Error creating property:', e)
    }
  }

  return (
    <header className="bg-[#121924] px-4 py-3 shadow">
      <div className="flex items-center justify-between gap-4 max-w-[1600px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <h5 className="text-white text-xl font-semibold">BeaverGate</h5>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties, lease, and more"
              className="w-full bg-[#1e2633] text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <InputPopover
            onFilesChange={(files) => setFiles(files)}
            files={files}
            handleData={handleData}
            type="all"
          />
          
          {/* Quick Actions Button */}
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition-colors">
            <Zap className="h-4 w-4" />
            <span>Quick Actions</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {/* Notification & Help */}
          <button className="text-gray-400 hover:text-white transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <HelpCircle className="h-5 w-5" />
          </button>

          {/* Profile */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  )
}

export default Header