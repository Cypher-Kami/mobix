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
      <p className="mb-2 text-sm font-medium text-gray-700">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.code}
            type="button"
            onClick={() => onChange(option.code)}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
              value === option.code
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
