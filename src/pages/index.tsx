import { useRef, useState } from 'react'
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef
} from 'react-zoom-pan-pinch'
import MapZoom from '../components/shared/MapZoom'
import CardMap from '../components/shared/MapZoom/CardMap'
import LayoutSvg from '../components/shared/MapZoom/LayoutSvg'

function App() {
  const refZoom = useRef<ReactZoomPanPinchRef | null>(null)

  const refData = useRef<HTMLDivElement | null>(null)

  // estado para controlar el tamaño del fondo negro de la imagen pequeña del mapa
  const [sizeShadow, setSizeShadow] = useState(1)
  console.log(sizeShadow)
  // estado para controlar el zoom

  const [translateXShawdow, setTranslateXShawdow] = useState(0)
  // console.log(scale)

  const stepUpSizeShadow = () => {
    if (sizeShadow === 4) return
    setSizeShadow((prev) => prev + 1)
  }
  const stepDownSizeShadow = () => {
    if (sizeShadow === 1) return
    setSizeShadow((prev) => prev - 1)
  }

  const translateX = (refZoom: ReactZoomPanPinchRef) => {
    if (sizeShadow <= 1) {
      setTranslateXShawdow(0)
      return
    }
    if (refZoom.state.positionX >= -131) {
      setTranslateXShawdow(refZoom.state.positionX)
    }
  }

  return (
    <>
      <div className="flex justify-center items-center w-full min-h-screen">
        <div className="bg-white w-[90vw] h-[90vw] md:w-[70vw] md:h-[70vw] max-w-[700px] flex justify-center items-center max-h-[700px]">
          <MapZoom />
        </div>
      </div>
    </>
  )
}

export default App
