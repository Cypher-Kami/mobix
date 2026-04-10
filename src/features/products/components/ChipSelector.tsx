interface ChipOption {
  code: number
  label: string
}

interface ChipSelectorProps {
  label: string
  options: ChipOption[]
  value: number | null
  onChange: (code: number) => void
}

export function ChipSelector({ label, options, value, onChange }: ChipSelectorProps) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-gray-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <button
            key={option.code !== undefined ? option.code : index}
            type="button"
            onClick={() => onChange(option.code)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
              value === option.code
                ? 'border-[#111827] bg-[#111827] text-white'
                : 'border-gray-200 bg-[#F5F5F7] text-[#111827] hover:border-gray-300 hover:bg-[#EAE7E3]'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
