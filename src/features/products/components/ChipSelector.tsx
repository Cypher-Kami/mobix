import { Button } from '@/components/ui/button'

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
      <p className="mb-2 text-sm font-medium">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <Button
            key={option.code !== undefined ? option.code : index}
            type="button"
            variant={value === option.code ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange(option.code)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
