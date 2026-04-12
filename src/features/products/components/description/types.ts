export interface Spec {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}

export interface OptionItem {
  code: number
  label: string
}

export const rowBg = (i: number) =>
  i % 2 === 0 ? 'bg-[#1e293b]' : 'bg-[#172033]'
