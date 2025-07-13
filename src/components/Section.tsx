// components/Section.tsx
import { useCVStore } from '../store/cvStore'
import { ReactNode } from 'react'

interface SectionProps {
  title: string
  sectionKey: keyof ReturnType<typeof useCVStore>['sections']
  children: ReactNode
}

// components/Section.tsx
export default function Section({ title, sectionKey, children }: SectionProps) {
  const isVisible = useCVStore((state) => state.sections[sectionKey])

  if (!isVisible) return null

  return (
    <div className="pb-6 border-b border-gray-200">
  <h2 className="text-xl font-bold mb-3 text-indigo-700 tracking-wide">{title}</h2>
  <div className="text-sm leading-relaxed text-gray-800">{children}</div>
</div>

  )
}

