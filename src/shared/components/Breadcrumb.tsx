import { Link } from 'react-router-dom'
import {
  Breadcrumb as ShadBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'

interface BreadcrumbItemType {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItemType[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <ShadBreadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-1.5">
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : item.label ? (
                <BreadcrumbPage className="text-[#111827] font-medium">{item.label}</BreadcrumbPage>
              ) : (
                <Skeleton className="h-4 w-24" />
              )}
            </BreadcrumbItem>
          </span>
        ))}
      </BreadcrumbList>
    </ShadBreadcrumb>
  )
}
