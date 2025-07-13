import { create } from 'zustand'

type SectionKeys =
  | 'sobreMi'
  | 'skillsDuras'
  | 'skillsBlandas'
  | 'experiencia'
  | 'educacion'
  | 'certificados'
  | 'proyectos'

type CVState = {
  selectedTab: string
  sections: Record<SectionKeys, boolean>
  setTab: (tab: string) => void
  toggleSection: (key: SectionKeys) => void
}

// Configuración por tipo de CV
const tabSectionConfig: Record<string, Partial<CVState['sections']>> = {
  general: {
    sobreMi: true,
    skillsDuras: true,
    skillsBlandas: true,
    experiencia: true,
    educacion: true,
    certificados: true,
    proyectos: true,
  },
  técnico: {
    sobreMi: true,
    skillsDuras: true,
    experiencia: true,
    proyectos: true,
    certificados: true,
    skillsBlandas: false,
    educacion: false,
  },
  freelance: {
    sobreMi: true,
    proyectos: true,
    skillsBlandas: true,
    certificados: true,
    experiencia: false,
    skillsDuras: false,
    educacion: false,
  },
  corporativo: {
    sobreMi: true,
    experiencia: true,
    educacion: true,
    certificados: true,
    skillsDuras: true,
    skillsBlandas: true,
    proyectos: false,
  },
}

export const useCVStore = create<CVState>((set) => ({
  selectedTab: 'general',
  sections: {
    sobreMi: true,
    skillsDuras: true,
    skillsBlandas: true,
    experiencia: true,
    educacion: true,
    certificados: true,
    proyectos: true,
  },
  setTab: (tab) =>
    set((state) => ({
      selectedTab: tab,
      sections: {
        ...state.sections,
        ...tabSectionConfig[tab],
      },
    })),
  toggleSection: (key) =>
    set((state) => ({
      sections: {
        ...state.sections,
        [key]: !state.sections[key],
      },
    })),
}))
