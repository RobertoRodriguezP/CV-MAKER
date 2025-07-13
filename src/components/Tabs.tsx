// components/Tabs.tsx
import { useCVStore } from '../store/cvStore'

const tabs = ['General', 'Técnico', 'Freelance', 'Corporativo']

export default function Tabs() {
  const selectedTab = useCVStore((state) => state.selectedTab)
  const setTab = useCVStore((state) => state.setTab)

  return (
    <div className="flex gap-4 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setTab(tab.toLowerCase())}
          className={`px-4 py-2 rounded-xl font-semibold text-sm transition duration-300 shadow-sm
  ${selectedTab === tab.toLowerCase()
    ? 'bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-md'
    : 'bg-white border text-gray-700 hover:bg-gray-100 border-gray-300'}
`}

        >
          {tab}
        </button>
      ))}
    </div>
  )
}
