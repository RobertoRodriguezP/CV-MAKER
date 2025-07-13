import { create } from 'zustand'

type CVState = {
  selectedTabs: string[]
  sections: Record<string, boolean> // ejemplo: { sobreMi: true, skills: true }
  data: any // aquí va tu JSON completo
  setSection: (key: string, value: boolean) => void
}

export const useCVStore = create<CVState>((set) => ({
  selectedTabs: [],
  sections: {},
  data: {},
  setSection: (key, value) =>
    set((state) => ({
      sections: { ...state.sections, [key]: value },
    })),
}))
