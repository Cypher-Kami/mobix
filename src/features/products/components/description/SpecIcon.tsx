interface SpecIconProps {
  icon: React.ComponentType<{ className?: string }>
}

export function SpecIcon({ icon: Icon }: SpecIconProps) {
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#845ec2]/30">
      <Icon className="h-3.5 w-3.5 text-[#845ec2]" />
    </div>
  )
}
