import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef
} from 'react-zoom-pan-pinch'
import CardMap from '../components/shared/CardMap'
import Icon from '../components/shared/Icon'

function App() {
  const refZoom = useRef<ReactZoomPanPinchRef | null>(null)
  const [scale, setScale] = useState(0)
  const [isImage, setIsImage] = useState(true)
  const [scalewit, setScalewit] = useState(0)
  // console.log(scale)

  // estado para controlar el tamaño del fondo negro de la imagen pequeña del mapa
  const [sizeShadow, setSizeShadow] = useState(1)
  console.log(scale)

  const stepUpSizeShadow = () => {
    if (sizeShadow === 3) return
    setSizeShadow((prev) => prev + 1)
  }
  const stepDownSizeShadow = () => {
    if (sizeShadow === 1) return
    setSizeShadow((prev) => prev - 1)
  }
  useEffect(() => {
    if (scale <= 1.5) {
      setIsImage(true)
    }
    if (scale > 1.5) {
      setIsImage(false)
    }
  }, [scale])
  return (
    <div className={`flex justify-center w-full items-center min-h-screen `}>
      <div className="w-[60%] h-[60vh] bg-white relative">
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
          ref={refZoom}
          maxScale={3}
          onZoom={(refZoom) => setSizeShadow(Math.round(refZoom.state.scale))}
        >
          {({ zoomIn, zoomOut, resetTransform, setTransform, ...rest }) => {
            return (
              <>
                <CardMap sizeShadow={sizeShadow} />

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
                    <svg
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1080 1080"
                      className="w-full h-full"
                    >
                      <defs></defs>
                      <path
                        className="cls-4"
                        d="M262.2,658.11c-13.77-32.54-21.77-71.17-23.58-106.52l-18.24,.7-18.91,1.07-71.96,4.07-18.35,1.03-18.57,.88c2.26,53.86,13.98,106.15,34.93,155.69,9.56,22.6,24.77,50.52,37.74,71.08l15.39-10.39,15.37-10.38,59.01-39.84,14.75-10.06,16.8-11.22c-9.4-14.58-17.54-29.97-24.36-46.1Z"
                      />
                      <path
                        className="cls-5"
                        d="M539.45,215.24c-43.9,0-86.49,8.6-126.6,25.56-38.73,16.38-73.51,39.83-103.37,69.69-29.86,29.86-53.31,64.64-69.69,103.37-14.23,33.63-22.27,64.98-24.59,101.42l25.24,1.47c4.69-72.68,34.95-136.42,86.92-188.4,56.65-56.65,131.98-87.85,212.1-87.85,33.82,0,67.8,5.79,98.86,16.47l7.69-23.89c-35.69-13.06-68.06-17.86-106.55-17.86Z"
                      />
                      <path
                        className="cls-2"
                        d="M839.12,413.87c-16.38-38.73-39.83-73.51-69.69-103.37-27.26-27.26-59.74-49.91-94.46-65.98l-9.98,23.37c32.76,14.74,60.42,34.32,86.58,60.48,56.65,56.65,87.85,131.98,87.85,212.1s-31.2,155.44-87.85,212.1c-15.14,15.14-26.11,24.78-43.65,36.17l14.53,20.66c16.94-11.5,32.32-24.29,46.99-38.96,29.86-29.86,53.31-64.64,69.69-103.37,16.96-40.1,25.56-82.7,25.56-126.6s-8.6-86.49-25.56-126.6Z"
                      />
                      <path
                        className="cls-7"
                        d="M539.8,92.38c-237.99,0-432.31,181.45-446.5,415.87l113.19,6.53c2.34-37.65,10.63-70.15,25.33-104.89,16.84-39.8,40.94-75.55,71.63-106.24,30.69-30.69,66.44-54.79,106.24-71.63,41.22-17.43,84.99-26.27,130.11-26.27s88.9,8.84,130.11,26.27c.52,.22,10.8,4.83,11.32,5.05l45.21-104.02c-57.95-27.4-118.29-40.66-186.65-40.66Z"
                      />
                      <path
                        className="cls-3"
                        d="M726.45,133.04l-45.21,104.02c39.18,16.8,64.63,36.28,94.92,66.58,30.69,30.69,54.79,66.44,71.63,106.24,17.43,41.22,26.27,84.99,26.27,130.11s-8.84,88.9-26.27,130.11c-16.84,39.8-40.94,75.55-71.63,106.24-18.91,18.91-21.61,23.53-44.12,37.28l66.64,91.57c114.22-81.11,188.74-214.45,188.74-365.21,0-178.85-109.34-335.27-260.97-406.96Z"
                      />
                      <path
                        className="cls-1"
                        d="M684.89,802.94c-38.89,18.11-100.91,35.29-145.09,35.29-49.4,0-98.06-12.5-140.5-34.99l-31.42,63.6c10.11,5.44,17.53,8.85,28.18,13.35,45.54,19.26,93.9,29.03,143.73,29.03s98.19-9.77,143.73-29.03c11.93-5.05,23.52-10.7,34.77-16.92l-33.41-60.35Z"
                      />
                      <path
                        className="cls-6"
                        d="M325.38,747.09c-8.84-8.84-22.82-22.73-30.4-32.44l-14.8,11.03c-23.05,17.18-25.69,50.86-5.39,71.22,.13,.13,.26,.26,.39,.39,7.47,7.47,16,15.1,24.98,22.48,22.29,18.33,55.64,12.73,70.61-11.95l10.1-16.64c-17.46-11.34-40.41-29.03-55.48-44.1Z"
                      />
                      <g>
                        <path
                          className="cls-9"
                          d="M230.08,762.81l-53.12,39.36c33.91,46.85,76.68,86.87,125.85,117.62l34.36-56.39c-39.59-25.09-79.16-63.11-107.09-100.58Z"
                        />
                        <g>
                          <path
                            className="cls-8"
                            d="M377.27,885.61l-28.76,59.16c38.6,18.28,80.24,31.19,123.95,37.79l9.2-65.4c-33.67-5.53-74.3-17.83-104.39-31.56Z"
                          />
                          <path
                            className="cls-8"
                            d="M730.91,944.84l-27.62-59.16c-26.89,11.18-74.6,26.26-104.19,31.05l10.62,65.3c42.69-6.66,83.38-19.36,121.18-37.19Z"
                          />
                          <path
                            className="cls-8"
                            d="M539.8,921.61c-19.49,0-35.21-.96-53.91-3.79l-8.56,65.46c20.42,2.85,41.27,4.33,62.47,4.33s43.58-1.59,64.71-4.65l-10.25-65.21c-18.48,2.75-35.22,3.86-54.46,3.86Z"
                          />
                        </g>
                      </g>
                      <circle
                        className="cls-9"
                        cx="539.8"
                        cy="540"
                        r="234.38"
                      />
                      <text
                        className="cls-14"
                        transform="translate(269.19 274.28) rotate(-44.23)"
                      >
                        <tspan x="0" y="0">
                          T
                        </tspan>
                      </text>
                      <text
                        className="cls-14"
                        transform="translate(281.08 262.71) rotate(-41.79)"
                      >
                        <tspan x="0" y="0">
                          E
                        </tspan>
                      </text>
                      <text
                        className="cls-14"
                        transform="translate(292.88 252.08) rotate(-39.01)"
                      >
                        <tspan x="0" y="0">
                          N
                        </tspan>
                      </text>
                      <text
                        className="cls-14"
                        transform="translate(309.24 238.81) rotate(-35.87)"
                      >
                        <tspan x="0" y="0">
                          D
                        </tspan>
                      </text>
                      <text
                        className="cls-14"
                        transform="translate(326.25 226.66) rotate(-33.65)"
                      >
                        <tspan x="0" y="0">
                          I
                        </tspan>
                      </text>
                      <text
                        className="cls-14"
                        transform="translate(333.41 221.75) rotate(-31.43)"
                      >
                        <tspan x="0" y="0">
                          D
                        </tspan>
                      </text>
                      <text
                        className="cls-14"
                        transform="translate(351.15 210.87) rotate(-28.19)"
                      >
                        <tspan x="0" y="0">
                          O
                        </tspan>
                      </text>
                      <text
                        className="cls-14"
                        transform="translate(370.94 200.44) rotate(-26.11)"
                      >
                        <tspan x="0" y="0">
                          {' '}
                        </tspan>
                      </text>
                      <text
                        className="cls-14"
                        transform="translate(375.65 198.05) rotate(-24.49)"
                      >
                        <tspan x="0" y="0">
                          3
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(246.18 460.47) rotate(-73.55)"
                      >
                        <tspan x="0" y="0">
                          T
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(249.95 447.71) rotate(-71.1)"
                      >
                        <tspan x="0" y="0">
                          E
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(254.03 435.62) rotate(-68.32)"
                      >
                        <tspan x="0" y="0">
                          N
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(260.26 419.94) rotate(-65.18)"
                      >
                        <tspan x="0" y="0">
                          D
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(267.38 404.76) rotate(-62.96)"
                      >
                        <tspan x="0" y="0">
                          I
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(270.46 398.51) rotate(-60.74)"
                      >
                        <tspan x="0" y="0">
                          D
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(278.6 383.95) rotate(-57.5)"
                      >
                        <tspan x="0" y="0">
                          O
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(288.34 368.88) rotate(-55.42)"
                      >
                        <tspan x="0" y="0">
                          {' '}
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(290.71 365.33) rotate(-53.8)"
                      >
                        <tspan x="0" y="0">
                          3
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(298.33 354.87) rotate(-51.21)"
                      >
                        <tspan x="0" y="0">
                          B
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(307.56 343.52) rotate(-49.43)"
                      >
                        <tspan x="0" y="0">
                          {' '}
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(311.19 339.29) rotate(-48.38)"
                      >
                        <tspan x="0" y="0">
                          {' '}
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(330.39 319.29) rotate(-43.13)"
                      >
                        <tspan x="0" y="0">
                          {' '}
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(351.34 301.13) rotate(-37.88)"
                      >
                        <tspan x="0" y="0">
                          {' '}
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(373.85 284.98) rotate(-32.62)"
                      >
                        <tspan x="0" y="0">
                          {' '}
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(397.75 270.96) rotate(-27.38)"
                      >
                        <tspan x="0" y="0">
                          {' '}
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(422.77 259.11) rotate(-21.35)"
                      >
                        <tspan x="0" y="0">
                          T
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(435.16 254.27) rotate(-18.94)"
                      >
                        <tspan x="0" y="0">
                          E
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(447.22 250.08) rotate(-16.19)"
                      >
                        <tspan x="0" y="0">
                          N
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(463.45 245.36) rotate(-13.04)"
                      >
                        <tspan x="0" y="0">
                          D
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(479.78 241.67) rotate(-10.8)"
                      >
                        <tspan x="0" y="0">
                          I
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(486.6 240.27) rotate(-8.56)"
                      >
                        <tspan x="0" y="0">
                          D
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(503.08 237.77) rotate(-5.29)"
                      >
                        <tspan x="0" y="0">
                          O
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(520.96 236.23) rotate(-3.19)"
                      >
                        <tspan x="0" y="0">
                          {' '}
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(525.22 235.93) rotate(-1.55)"
                      >
                        <tspan x="0" y="0">
                          3
                        </tspan>
                      </text>
                      <text
                        className="cls-11"
                        transform="translate(538.14 235.54) rotate(1.19)"
                      >
                        <tspan x="0" y="0">
                          A
                        </tspan>
                      </text>
                      <text
                        className="cls-13"
                        transform="translate(464.49 871) rotate(12.4)"
                      >
                        <tspan x="0" y="0">
                          {' '}
                        </tspan>
                      </text>
                      <text
                        className="cls-13"
                        transform="translate(469.56 872.19) rotate(10.68)"
                      >
                        <tspan x="0" y="0">
                          T
                        </tspan>
                      </text>
                      <text
                        className="cls-13"
                        transform="translate(484.8 875.04) rotate(8.12)"
                      >
                        <tspan x="0" y="0">
                          E
                        </tspan>
                      </text>
                      <text
                        className="cls-13"
                        transform="translate(499.67 877.21) rotate(5.21)"
                      >
                        <tspan x="0" y="0">
                          N
                        </tspan>
                      </text>
                      <text
                        className="cls-13"
                        transform="translate(519.31 878.98) rotate(1.93)"
                      >
                        <tspan x="0" y="0">
                          D
                        </tspan>
                      </text>
                      <text
                        className="cls-13"
                        transform="translate(538.59 879.51) rotate(-.4)"
                      >
                        <tspan x="0" y="0">
                          I
                        </tspan>
                      </text>
                      <text
                        className="cls-13"
                        transform="translate(546.99 879.55) rotate(-2.73)"
                      >
                        <tspan x="0" y="0">
                          D
                        </tspan>
                      </text>
                      <text
                        className="cls-13"
                        transform="translate(566.5 878.62) rotate(-6.12)"
                      >
                        <tspan x="0" y="0">
                          O
                        </tspan>
                      </text>
                      <text
                        className="cls-13"
                        transform="translate(586.97 876.27) rotate(-8.31)"
                      >
                        <tspan x="0" y="0">
                          {' '}
                        </tspan>
                      </text>
                      <text
                        className="cls-13"
                        transform="translate(592.13 875.59) rotate(-10.01)"
                      >
                        <tspan x="0" y="0">
                          1
                        </tspan>
                      </text>
                      <text
                        className="cls-15"
                        transform="translate(200.66 690.82) rotate(-112.59)"
                      >
                        <tspan x="0" y="0">
                          P
                        </tspan>
                      </text>
                      <text
                        className="cls-15"
                        transform="translate(194.87 677.09) rotate(-110.12)"
                      >
                        <tspan x="0" y="0">
                          A
                        </tspan>
                      </text>
                      <text
                        className="cls-15"
                        transform="translate(188.26 658.88) rotate(-107.55)"
                      >
                        <tspan x="0" y="0">
                          L
                        </tspan>
                      </text>
                      <text
                        className="cls-15"
                        transform="translate(184.28 646.52) rotate(-105.24)"
                      >
                        <tspan x="0" y="0">
                          C
                        </tspan>
                      </text>
                      <text
                        className="cls-15"
                        transform="translate(179.44 628.95) rotate(-102.17)"
                      >
                        <tspan x="0" y="0">
                          O
                        </tspan>
                      </text>
                      <text
                        className="cls-16"
                        transform="translate(903.62 420.05) rotate(73.06)"
                      >
                        <tspan x="0" y="0">
                          T
                        </tspan>
                      </text>
                      <text
                        className="cls-16"
                        transform="translate(908.49 436.03) rotate(75.5)"
                      >
                        <tspan x="0" y="0">
                          E
                        </tspan>
                      </text>
                      <text
                        className="cls-16"
                        transform="translate(912.58 451.56) rotate(78.28)"
                      >
                        <tspan x="0" y="0">
                          N
                        </tspan>
                      </text>
                      <text
                        className="cls-16"
                        transform="translate(916.9 472.38) rotate(81.43)"
                      >
                        <tspan x="0" y="0">
                          D
                        </tspan>
                      </text>
                      <text
                        className="cls-16"
                        transform="translate(919.92 493.22) rotate(83.64)"
                      >
                        <tspan x="0" y="0">
                          I
                        </tspan>
                      </text>
                      <text
                        className="cls-16"
                        transform="translate(921.01 501.88) rotate(85.86)"
                      >
                        <tspan x="0" y="0">
                          D
                        </tspan>
                      </text>
                      <text
                        className="cls-16"
                        transform="translate(922.56 522.85) rotate(89.1)"
                      >
                        <tspan x="0" y="0">
                          O
                        </tspan>
                      </text>
                      <text
                        className="cls-16"
                        transform="translate(922.76 545.39) rotate(91.17)"
                      >
                        <tspan x="0" y="0">
                          {' '}
                        </tspan>
                      </text>
                      <text
                        className="cls-16"
                        transform="translate(922.73 550.76) rotate(92.8)"
                      >
                        <tspan x="0" y="0">
                          2
                        </tspan>
                      </text>
                      <text
                        className="cls-10"
                        transform="translate(214.45 809.92) rotate(49.07)"
                      >
                        <tspan x="0" y="0">
                          P
                        </tspan>
                      </text>
                      <text
                        className="cls-10"
                        transform="translate(226.06 823.42) rotate(46.48)"
                      >
                        <tspan x="0" y="0">
                          A
                        </tspan>
                      </text>
                      <text
                        className="cls-10"
                        transform="translate(241.95 840.02) rotate(43.77)"
                      >
                        <tspan x="0" y="0">
                          L
                        </tspan>
                      </text>
                      <text
                        className="cls-10"
                        transform="translate(253.13 850.83) rotate(41.33)"
                      >
                        <tspan x="0" y="0">
                          C
                        </tspan>
                      </text>
                      <text
                        className="cls-10"
                        transform="translate(269.53 865.29) rotate(38.07)"
                      >
                        <tspan x="0" y="0">
                          O
                        </tspan>
                      </text>
                      <text
                        className="cls-18"
                        transform="translate(491.91 543.48)"
                      >
                        <tspan x="0" y="0">
                          RUEDO
                        </tspan>
                      </text>
                      <text
                        className="cls-19"
                        transform="translate(620.3 272.03) rotate(20.22)"
                      >
                        <tspan x="0" y="0">
                          TORIL
                        </tspan>
                      </text>
                      <text
                        className="cls-17"
                        transform="translate(290.84 758.2) rotate(40.58)"
                      >
                        <tspan x="0" y="0">
                          PUERTA
                        </tspan>
                        <tspan x="-2.89" y="17">
                          GRANDE
                        </tspan>
                      </text>
                      <text
                        className="cls-12"
                        transform="translate(492.06 960.13) rotate(5.51)"
                      >
                        <tspan x="0" y="0">
                          P
                        </tspan>
                      </text>
                      <text
                        className="cls-12"
                        transform="translate(506.09 961.53) rotate(3.45)"
                      >
                        <tspan x="0" y="0">
                          A
                        </tspan>
                      </text>
                      <text
                        className="cls-12"
                        transform="translate(524.21 962.57) rotate(1.32)"
                      >
                        <tspan x="0" y="0">
                          L
                        </tspan>
                      </text>
                      <text
                        className="cls-12"
                        transform="translate(536.51 962.89) rotate(-.61)"
                      >
                        <tspan x="0" y="0">
                          C
                        </tspan>
                      </text>
                      <text
                        className="cls-12"
                        transform="translate(553.79 962.73) rotate(-3.18)"
                      >
                        <tspan x="0" y="0">
                          O
                        </tspan>
                      </text>
                      <text
                        className="cls-12"
                        transform="translate(574.18 961.52) rotate(-5.52)"
                      >
                        <tspan x="0" y="0">
                          S
                        </tspan>
                      </text>
                      <path
                        className="cls-6"
                        d="M656.15,237.32h0c6.37,0,11.54,5.17,11.54,11.54v14.26h-23.07v-14.26c0-6.37,5.17-11.54,11.54-11.54Z"
                        transform="translate(136.94 -222.6) rotate(21.45)"
                      />
                      <line
                        className="cls-20"
                        x1="348.68"
                        y1="277"
                        x2="364.68"
                        y2="296.6"
                      />
                    </svg>
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
