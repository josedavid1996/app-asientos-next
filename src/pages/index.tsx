import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef
} from 'react-zoom-pan-pinch'
import LayoutSvg from '../components/layout/Navbar/LayoutSvg'
import CardMap from '../components/shared/CardMap'
import Icon from '../components/shared/Icon'

function App() {
  const refZoom = useRef<ReactZoomPanPinchRef | null>(null)
  const [scale, setScale] = useState(0)

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
    <div
      className={`flex justify-center w-full items-center min-h-screen relative`}
    >
      <div id="info-box" ref={refData}></div>

      <div className="w-[60%] h-[60vh] bg-white relative">
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
          ref={refZoom}
          maxScale={4}
          onPanning={(refZoom) => {
            translateX(refZoom)
          }}
          onZoom={(refZoom) => {
            setSizeShadow(Math.round(refZoom.state.scale))
          }}
        >
          {({ zoomIn, zoomOut, resetTransform, setTransform, ...rest }) => {
            return (
              <>
                <CardMap
                  sizeShadow={sizeShadow}
                  translateXShawdow={translateXShawdow}
                />

                <div className="tools absolute top-2 right-3 hidden sm:flex flex-col z-20">
                  <button
                    className="w-[32px] h-[32px] rounded-[3px] shadow-[0_1px_4px_rgba(152,4,19,0.5)] border border-[#ccc] flex justify-center items-center cursor-pointer bg-white"
                    onClick={() => {
                      resetTransform()
                      setSizeShadow(0)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-counterclockwise text-[rgb(152,4,19)]"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                      />
                      <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                    </svg>{' '}
                  </button>
                  <button
                    className="w-[32px] h-[32px] rounded-[3px] shadow-[0_1px_4px_rgba(152,4,19,0.5)] border border-[#ccc] flex justify-center items-center cursor-pointer mt-3 bg-white"
                    onClick={() => {
                      zoomIn(0.6, 1000)
                      stepUpSizeShadow()
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-plus-lg text-[rgb(152,4,19)]"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                      />
                    </svg>
                  </button>
                  <button
                    className="w-[32px] h-[32px] rounded-[3px] shadow-[0_1px_4px_rgba(152,4,19,0.5)] border border-[#ccc] flex justify-center items-center cursor-pointer bg-white"
                    onClick={() => {
                      zoomOut(0.6, 1000)
                      stepDownSizeShadow()
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="20"
                      fill="currentColor"
                      className="bi bi-dash text-[rgb(152,4,19)]"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                    </svg>{' '}
                  </button>
                </div>
                <TransformComponent>
                  <div className="w-full h-full">
                    <LayoutSvg sizeShadow={sizeShadow} refData={refData} />
                  </div>
                </TransformComponent>
              </>
            )
          }}
        </TransformWrapper>
      </div>
    </div>
  )
}

export default App
