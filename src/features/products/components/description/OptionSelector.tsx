import { SpecIcon } from './SpecIcon'
import { rowBg, type OptionItem } from './types'

interface OptionSelectorProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  options: OptionItem[]
  selected: number | null
  onSelect: (code: number) => void
  index: number
}

export function OptionSelector({
  icon, label, options, selected, onSelect, index,
}: OptionSelectorProps) {
  if (options.length === 0) return null

  return (
    <div className={`flex items-start gap-3 px-5 py-3 border-t border-white/15 ${rowBg(index)}`}>
      <SpecIcon icon={icon} />
      <dt className="w-36 shrink-0 pt-1 text-xs text-gray-300">{label}</dt>
      <dd className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.code}
            type="button"
            onClick={() => onSelect(opt.code)}
            aria-pressed={selected === opt.code}
            className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-all ${
              selected === opt.code
                ? 'border-[#845ec2] bg-[#845ec2] text-white'
                : 'border-white/20 bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </dd>
    </div>
  )
}
