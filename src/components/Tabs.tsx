import { useEffect, useState } from 'react'
import { useCVStore } from '../store/cvStore'

type Profile = { key: string; label: string }

export default function Tabs() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const selectedTab = useCVStore((state) => state.selectedTab)
  const setTab = useCVStore((state) => state.setTab)

  useEffect(() => {
    fetch('/data/roberto-cv.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.profiles)) {
          setProfiles(data.profiles)
        } else {
          // fallback manual
          setProfiles([
            { key: 'general', label: 'General' },
            { key: 'técnico', label: 'Técnico' },
            { key: 'freelance', label: 'Freelance' },
            { key: 'corporativo', label: 'Corporativo' }
          ])
        }
      })
  }, [])

  if (profiles.length === 0) return <p className="text-center text-sm text-gray-400">Loading tabs...</p>

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-6">
      {profiles.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setTab(tab.key)}
          className={`px-5 py-2 rounded-full font-semibold text-sm tracking-wide shadow-sm transition duration-300 ease-in-out
            ${selectedTab === tab.key
              ? 'bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-md scale-105'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:scale-105'}
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
