import { createContext, ReactNode, useContext, useRef } from 'react'
import { TransformWrapper, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'

interface CtxValues {}

const Ctx = createContext<CtxValues>({} as CtxValues)

const WrapperProvider = ({ children }: { children?: any }) => {
  const refZoom = useRef<ReactZoomPanPinchRef | null>(null)
  return (
    <Ctx.Provider value={{}}>
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        ref={refZoom}
      >
        {children}
      </TransformWrapper>
    </Ctx.Provider>
  )
}

export default WrapperProvider

export const useWrapperCtx = () => useContext(Ctx)
