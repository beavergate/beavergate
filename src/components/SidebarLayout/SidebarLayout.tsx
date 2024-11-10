'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Home, LayoutDashboard, MessageSquare, Settings, Users, Menu, X } from 'lucide-react'

const navigation = [
  {
    title: '',
    items: [
      { title: 'Dashboard', href: '/', icon: LayoutDashboard },
      { title: 'Properties', href: '/properties', icon: Home },
    ],
  },
  {
    title: '',
    items: [
      { title: 'Residents & Leases', href: '/', icon: Users },
      { title: 'Messages', href: '/', icon: MessageSquare },
    ],
  },
  {
    title: '',
    items: [
      { title: 'Settings', href: '/', icon: Settings },
      { title: 'Notifications', href: '/', icon: Bell },
    ],
  },
]

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const pathname = usePathname()

  return (
    <aside className={`
       z-40 w-64 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      bg-white border-r border-gray-200 md:translate-x-0 md:relative
    `}>
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 md:hidden"
        aria-label="Close sidebar"
      >
        <X className="h-6 w-6" />
      </button>
     
      <nav className=" px-3 py-4 overflow-y-auto">
        {navigation.map((group,i) => (
          <div key={i} className="">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
              {group.title}
            </h3>
            <ul>
              {group.items.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      pathname === item.href
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={onClose}
                  >
                    <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex  overflow-hidden bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        
        <main className="flex-1 relative overflow-y-auto  focus:outline-none">
          <div className="h-[calc(100vh_-_88px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}