import { SpecIcon } from './SpecIcon'
import { rowBg, type Spec } from './types'

interface SpecRowProps {
  spec: Spec
  index: number
}

export function SpecRow({ spec, index }: SpecRowProps) {
  return (
    <div className={`flex items-center gap-3 px-5 py-3 ${rowBg(index)}`}>
      <SpecIcon icon={spec.icon} />
      <dt className="w-36 shrink-0 text-xs text-gray-300">{spec.label}</dt>
      <dd className="text-xs font-medium text-white">{spec.value}</dd>
    </div>
  )
}
