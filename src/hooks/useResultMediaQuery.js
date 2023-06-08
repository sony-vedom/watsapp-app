import { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"

export const useResultMediaQuery = () => {
  const [typeDevice, setTypeDevice] = useState("")
  const isDesktop = useMediaQuery({ minWidth: 1440 })
  const isTablet = useMediaQuery({ maxWidth: 1224 })
  const isMobile = useMediaQuery({ maxWidth: 1000 })

  useEffect(() => {
    if (isDesktop) setTypeDevice("Desktop")
    if (isTablet) setTypeDevice("Tablet")
    if (isMobile) setTypeDevice("Mobile")
  }, [isTablet, isMobile, isDesktop])

  return typeDevice
}
