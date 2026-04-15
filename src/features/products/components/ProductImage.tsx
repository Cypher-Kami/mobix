import { useState, useEffect } from 'react'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
}

export function ProductImage({ src, alt, className }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    setImgSrc(src)
    setErrored(false)
  }, [src])

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (!errored) {
          setErrored(true)
          setImgSrc('/placeholder.png')
        }
      }}
    />
  )
}
