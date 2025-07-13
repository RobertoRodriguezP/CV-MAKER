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
  <h2
  style={{
    borderLeft: '4px solid #6366f1',
    paddingLeft: '12px',
    fontSize: '16px',
    fontWeight: 800,
    marginBottom: '10px',
    textTransform: 'uppercase',
    color: '#1f2937',
  }}
>
  {title}
</h2>


  <div className="text-sm leading-relaxed text-gray-800">{children}</div>
</div>

  )
}

