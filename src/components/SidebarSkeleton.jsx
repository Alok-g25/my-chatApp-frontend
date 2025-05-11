import React from 'react'
import { Users } from 'lucide-react'

function SidebarSkeleton() {
  return (
    <aside className="h-full w-80 flex flex-col animate-pulse shadow-theme bg-transparent rounded-xl">
      {/* Header */}
      <div className="w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-black font-bold" />
          <span className="font-bold text-black text-lg">Contacts</span>
        </div>
      </div>

      {/* Skeleton list */}
      <div className="overflow-y-auto w-full py-3 custom-scrollbar">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-full p-3 flex items-center gap-3 hover:bg-[#f0e8ff] transition-colors"
          >
            <div className="relative">
              <div className="size-12 rounded-full bg-[#f9a8d4]/50" />
            </div>

            <div className="text-left min-w-0 flex-1 space-y-1">
              <div className="h-4 bg-[#c084fc]/60 rounded w-3/4"></div>
              <div className="h-3 bg-[#c084fc]/40 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default SidebarSkeleton
