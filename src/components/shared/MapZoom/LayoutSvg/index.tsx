import React, {
  MouseEvent,
  useEffect,
  useState,
  useRef,
  LegacyRef,
  MutableRefObject,
  RefObject
} from 'react'
import { SVGProps } from 'react'
import SvgExterno from '../Svgs/SvgExterno'
import SvgInterno from '../Svgs/SvgInterno'

const LayoutSvg = ({
  sizeShadow,
  refData,
  setTransform,
  setSizeShadow
}: {
  sizeShadow: number
  refData: any
  setTransform: any
  setSizeShadow: any
}) => {
  const [isPrecio, setisPrecio] = useState<any>([])
  const idsDesactive = [
    'T3B-B-3',
    'T3B-B-5',
    'T3B-B-10',
    'T3B-B-15',
    'T3B-CB-2',
    'T3B-CB-12',
    'T3B-CB-22',
    'T3B-CB-8',
    'T3B-CB-10',
    'T3B-F03-17',
    'T3B-F03-7',
    'T3B-F03-22',
    'T3B-F03-14',
    'T3B-F03-19'
  ]

  const tendidoDosBajo = useRef<SVGGElement | null>(null)

  const dataPrecio = async () => {
    const res = await fetch(
      'https://apilaesperanza-dev.plazaticket.com/public/graphql',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
     query GetAllButacas($tendido: String) {
  GetAllButacas(tendido: $tendido) {
    data {
      butacaId
      tendido
      codigo
      cantidad
      precio
    }
  }
}
      `,
          variables: {
            tendido: 'T1'
          }
        })
      }
    )
    const data = await res.json()
    setisPrecio(data.data.GetAllButacas.data)
  }
  useEffect(() => {
    dataPrecio()
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      idsDesactive.forEach((item) => {
        document.getElementById(item)?.classList.add('fill-[#bfbfbf]')
      })
      // Client-side-only code
      console.log(tendidoDosBajo.current)
    }
  }, [sizeShadow >= 2])

  const handleMouse = (
    e: MouseEvent<SVGCircleElement, globalThis.MouseEvent>
  ) => {
    refData.current.style.display = 'grid'
    refData.current.style.top = `${e.pageY}px`
    refData.current.style.left = `${e.pageX}px`
    refData.current.innerHTML = (e.target as SVGCircleElement).dataset.info
  }

  return (
    <div className="w-[80%] h-[80%] ">
      {sizeShadow < 2 ? (
        <SvgExterno />
      ) : (
        // <svg
        //   className="w-full h-full"
        //   xmlns="http://www.w3.org/2000/svg"
        //   viewBox="0 0 8000 8000"
        // >
        //   <defs></defs>
        //   <g id="Capa_1" data-name="Capa 1">
        //     <path
        //       className="t-cls-7"
        //       d="M1635.57,4969.68c-117.94-278.84-188.49-600.43-204.01-903.3l-170.04,5.99-162.05,9.15-616.53,34.86-157.21,8.83-159.14,7.51c19.37,461.5,119.75,909.47,299.26,1333.9,81.91,193.64,212.19,432.88,323.34,608.99l131.83-89.02,131.7-88.93,505.55-341.35,126.37-86.18,156.63-99.12c-80.5-124.93-147.27-263.15-205.71-401.34Z"
        //     />
        //     <path
        //       className="t-cls-7"
        //       d="M4000,1221.63c-376.12,0-752.81,80.36-1096.42,225.69-331.83,140.35-598.14,340.35-854.01,596.22-255.87,255.87-453.22,527.47-593.58,859.3-121.89,288.18-189.32,534.72-209.21,846.93l186.64,18.18c105.13-693.25,290.5-1166.82,744.69-1614.15,490.08-482.68,1130.7-748.78,1817.15-748.78,289.75,0,573.12,47.98,839.29,139.54l61.95-183.42c-309.35-103.19-566.7-139.51-896.5-139.51Z"
        //     />
        //     <path
        //       className="t-cls-7"
        //       d="M6562.78,2886.35c-140.35-331.82-340.34-632.24-601.42-882.79-237.96-228.38-464-382.82-761.47-520.54l-73.37,179.13c276.26,131.14,458.31,264.7,682.45,488.83,485.39,485.4,737.67,1129.62,737.67,1816.07s-240.07,1318.41-725.46,1803.81c-129.71,129.71-198.66,174.51-357.08,300.98l160.15,219.94c104.93-76.98,239.42-173.48,382.2-325.51,247.72-263.77,455.75-563.45,596.1-895.28,145.33-343.6,208.63-727.81,208.63-1103.94s-103.07-737.1-248.4-1080.7Z"
        //     />
        //     <path
        //       className="t-cls-7"
        //       d="M3998.29,131.94c-2039.03,0-3703.96,1554.64-3825.57,3563.1l948.96,54.74c20.01-322.6,111.91-599.83,237.82-897.51,144.25-341.04,350.73-647.31,613.71-910.29,262.98-262.98,569.24-469.46,910.29-613.71,353.16-149.37,726.85-234.37,1113.42-234.37s769.84,67.89,1122.99,217.26c4.44,1.88,99.55,42.35,103.98,44.25l373.57-875.09c-496.53-234.75-1013.49-348.38-1599.17-348.38Z"
        //     />
        //     <path
        //       className="t-cls-7"
        //       d="M5597.46,480.31l-373.57,875.09c336.77,159.06,532.63,283.63,806.67,548.8,270.87,262.11,492.24,559.55,636.49,900.6,149.37,353.15,255.73,747.91,255.73,1134.48,0,425.02-60.75,758.29-200.8,1125.96-134.5,353.08-355.69,695.17-618.67,958.15-162.05,162.05-197.89,197.5-387.65,335.1l530.84,719.51c972.09-701.6,1598.81-1852.37,1598.81-3143.99,0-1532.4-948.71-2839.49-2247.85-3453.69Z"
        //     />
        //     <path
        //       className="t-cls-7"
        //       d="M5227.63,6218.6c-332.78,180.78-813,313.92-1238.58,310.3-423.2-3.6-840.14-107.07-1203.76-299.78l-280.53,556.75c86.63,46.58,157.46,77.79,248.73,116.39,390.21,165.05,770.11,245.52,1200.35,253.45,426.87,7.87,829.63-54.2,1274.39-227.27,103.43-40.25,227.28-99.58,323.65-152.81l-324.25-557.04Z"
        //     />
        //     <path
        //       className="t-cls-4"
        //       d="M2140.89,5738.15c-75.78-75.78-178.72-213.42-243.62-296.59l-101.77,86.42c-178.58,146.21-251.66,314.99-49.62,588.42,.93,1.26,27.64,28.63,28.75,29.74,64.01,64.01,126.59,134.82,210.53,188.38,200.94,128.23,448.16,92.54,585.2-103.34l47.98-100.17c-149.58-97.12-348.38-263.8-477.46-392.88Z"
        //     />
        //     <g>
        //       <path
        //         className="t-cls-7"
        //         d="M1357.94,5872.49l-468.39,340.8c290.56,401.44,657.02,744.31,1078.25,1007.73l308.59-496.75c-339.2-214.93-693.42-520.38-918.45-851.77Z"
        //       />
        //       <g>
        //         <path
        //           className="t-cls-7"
        //           d="M2465.34,6843.72l-293.81,496.72c332,187.96,758.49,342.74,1135.85,403.65l124.75-571.82c-317.36-52.58-749.76-205.16-966.79-328.55Z"
        //         />
        //         <path
        //           className="t-cls-7"
        //           d="M5869.7,7318.83l-299.61-495.13c-313.31,175.83-678.89,287.73-983.36,342.97l102.55,576.91c407.49-67.66,881.99-242.97,1180.41-424.75Z"
        //         />
        //         <path
        //           className="t-cls-7"
        //           d="M4026.49,7219.38c-182.38,5.29-393.2-16.09-553.45-40.27l-107.13,575.13c207.55,38.64,376.41,47.93,632.39,47.93,188.3,0,448.06-13.22,635.35-48.88l-91.77-576.1c-195.99,31.4-303.88,36.05-515.38,42.18Z"
        //         />
        //       </g>
        //     </g>
        //     <circle className="t-cls-6" cx="3998.29" cy="3967.05" r="2008.16" />
        //     <text className="t-cls-2" transform="translate(3587.99 3996.83)">
        //       <tspan x="0" y="0">
        //         RUEDO
        //       </tspan>
        //     </text>
        //     <text
        //       className="t-cls-3"
        //       transform="translate(4687.92 1671.09) rotate(20.22)"
        //     >
        //       <tspan x="0" y="0">
        //         TORIL
        //       </tspan>
        //     </text>
        //     <text
        //       className="t-cls-1"
        //       transform="translate(1865.21 5773.09) rotate(40.58)"
        //     >
        //       <tspan x="0" y="0">
        //         PUERTA
        //       </tspan>
        //       <tspan x="-24.75" y="145.65">
        //         GRANDE
        //       </tspan>
        //     </text>
        //     <path
        //       className="t-cls-4"
        //       d="M5088.85,1646.62c-75.22-35.68-140.75-62.54-225.33-92.57l50.45-175.52c114.86-40.19,213.15-1.92,254.31,101.95l-79.43,166.14Z"
        //     />
        //     <line
        //       className="t-cls-8"
        //       x1="2387.54"
        //       y1="1746.49"
        //       x2="2497.91"
        //       y2="1881.67"
        //     />
        //   </g>
        //   <g id="Capa_2" data-name="Capa 2">
        //     <circle
        //       className="t-cls-5"
        //       cx="2439.09"
        //       cy="1886.65"
        //       r="17.58"
        //       id="T3B-B-1"
        //       onClick={(
        //         e: MouseEvent<SVGCircleElement, globalThis.MouseEvent>
        //       ) => {
        //         const { target } = e
        //         if (target)
        //           (target as SVGCircleElement).classList.toggle(
        //             'fill-[#C70039]'
        //           )
        //       }}
        //       onMouseEnter={(
        //         e: MouseEvent<SVGCircleElement, globalThis.MouseEvent>
        //       ) => handleMouse(e)}
        //       onMouseLeave={() => {
        //         refData.current.style.display = 'none'
        //       }}
        //       data-info={`<div class="flex flex-col items-center">
        //   <span class=" text-gray-400 text-lg uppercase">Fila</span>
        //   <span class="font-bold text-lg">Barrera</span>
        // </div>
        // <div class="flex flex-col items-center">
        //   <span class=" text-gray-400 text-lg uppercase">Asiento</span>
        //   <span class="font-bold text-lg">1</span>
        // </div>
        // <div class="flex flex-col items-center">
        //   <span class=" text-gray-400 text-lg uppercase">Precio</span>
        //   <span class="font-bold text-lg">S/300.00</span>
        // </div>
        // <div class="md:col-span-3 flex justify-center">
        //   <span class="text-center text-gray-400 text-lg uppercase">
        //     Tendido 3B
        //   </span>
        // </div>`}
        //     />
        //     <circle
        //       className="t-cls-5"
        //       cx="2396.62"
        //       cy="1917"
        //       r="17.58"
        //       id="T3B-B-2"
        //       onMouseEnter={(e: any) => handleMouse(e)}
        //       onMouseLeave={() => {
        //         refData.current.style.display = 'none'
        //       }}
        //       data-info="<div>Tendido 3B</div><div>Fila:Barrera</div><div>Asiento:2</div><div>Precio:S/300.00</div>"
        //     />
        //     <circle
        //       className="t-cls-5"
        //       cx="2349.98"
        //       cy="1952.17"
        //       r="17.58"
        //       id="T3B-B-3"
        //     />
        //     <circle
        //       className="t-cls-5"
        //       cx="2306.64"
        //       cy="1990.1"
        //       r="17.58"
        //       id="T3B-B-4"
        //     />
        //     <circle
        //       className="t-cls-5"
        //       cx="2263.94"
        //       cy="2023.22"
        //       r="17.58"
        //       id="T3B-B-5"
        //     />
        //     <circle
        //       className="t-cls-5"
        //       cx="2221.78"
        //       cy="2063.64"
        //       r="17.58"
        //       id="T3B-B-6"
        //     />
        //     <circle
        //       id="T3B-B-8"
        //       className="t-cls-5"
        //       cx="2141.74"
        //       cy="2141.61"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-9"
        //       className="t-cls-5"
        //       cx="2096.83"
        //       cy="2186.66"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-10"
        //       className="t-cls-5"
        //       cx="2055.55"
        //       cy="2229.28"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-11"
        //       className="t-cls-5"
        //       cx="2007.43"
        //       cy="2277.31"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-12"
        //       className="t-cls-5"
        //       cx="1968.92"
        //       cy="2328.37"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-13"
        //       className="t-cls-5"
        //       cx="1927.03"
        //       cy="2370.95"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-14"
        //       className="t-cls-5"
        //       cx="1891.87"
        //       cy="2426.28"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-15"
        //       className="t-cls-5"
        //       cx="1856.71"
        //       cy="2477.29"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-16"
        //       className="t-cls-5"
        //       cx="1815.54"
        //       cy="2524.72"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-17"
        //       className="t-cls-5"
        //       cx="1783.87"
        //       cy="2576.16"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-18"
        //       className="t-cls-5"
        //       cx="1751.07"
        //       cy="2625.6"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-19"
        //       className="t-cls-5"
        //       cx="1724.96"
        //       cy="2675.03"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-20"
        //       className="t-cls-5"
        //       cx="1698.54"
        //       cy="2730.65"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-21"
        //       className="t-cls-5"
        //       cx="1667.93"
        //       cy="2786.27"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-22"
        //       className="t-cls-5"
        //       cx="1641.75"
        //       cy="2841.88"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-23"
        //       className="t-cls-5"
        //       cx="1617.01"
        //       cy="2897.5"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-24"
        //       className="t-cls-5"
        //       cx="1590.83"
        //       cy="2953.12"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-25"
        //       className="t-cls-5"
        //       cx="1568.24"
        //       cy="3016.49"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-26"
        //       className="t-cls-5"
        //       cx="1547.14"
        //       cy="3079.86"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-B-27"
        //       className="t-cls-5"
        //       cx="1529.38"
        //       cy="3143.23"
        //       r="17.58"
        //     />
        //     <circle
        //       className="t-cls-5"
        //       cx="2178.43"
        //       cy="2101.95"
        //       r="17.58"
        //       id="T3B-B-7"
        //     />
        //     <circle
        //       className="t-cls-5"
        //       cx="2396.62"
        //       cy="1851.4"
        //       r="17.58"
        //       id="T3B-CB-1"
        //     />
        //     <circle
        //       id="T3B-CB-2"
        //       className="t-cls-5"
        //       cx="2352.76"
        //       cy="1886.57"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-3"
        //       className="t-cls-5"
        //       cx="2306.11"
        //       cy="1921.73"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-4"
        //       className="t-cls-5"
        //       cx="2262.78"
        //       cy="1959.67"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-5"
        //       className="t-cls-5"
        //       cx="2220.08"
        //       cy="1992.78"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-6"
        //       className="t-cls-5"
        //       cx="2177.92"
        //       cy="2033.21"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-8"
        //       className="t-cls-5"
        //       cx="2097.88"
        //       cy="2111.18"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-9"
        //       className="t-cls-5"
        //       cx="2052.97"
        //       cy="2156.23"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-10"
        //       className="t-cls-5"
        //       cx="2011.68"
        //       cy="2198.84"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-11"
        //       className="t-cls-5"
        //       cx="1963.57"
        //       cy="2246.88"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-12"
        //       className="t-cls-5"
        //       cx="1925.06"
        //       cy="2297.93"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-13"
        //       className="t-cls-5"
        //       cx="1883.17"
        //       cy="2340.51"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-14"
        //       className="t-cls-5"
        //       cx="1848"
        //       cy="2395.85"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-15"
        //       className="t-cls-5"
        //       cx="1812.84"
        //       cy="2446.85"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-16"
        //       className="t-cls-5"
        //       cx="1771.68"
        //       cy="2494.29"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-17"
        //       className="t-cls-5"
        //       cx="1740.01"
        //       cy="2545.73"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-18"
        //       className="t-cls-5"
        //       cx="1707.21"
        //       cy="2595.16"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-19"
        //       className="t-cls-5"
        //       cx="1681.1"
        //       cy="2644.6"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-20"
        //       className="t-cls-5"
        //       cx="1654.67"
        //       cy="2700.22"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-21"
        //       className="t-cls-5"
        //       cx="1624.07"
        //       cy="2755.83"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-22"
        //       className="t-cls-5"
        //       cx="1597.88"
        //       cy="2811.45"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-23"
        //       className="t-cls-5"
        //       cx="1573.14"
        //       cy="2867.07"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-24"
        //       className="t-cls-5"
        //       cx="1546.96"
        //       cy="2922.69"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-25"
        //       className="t-cls-5"
        //       cx="1524.38"
        //       cy="2986.06"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-26"
        //       className="t-cls-5"
        //       cx="1503.28"
        //       cy="3049.43"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-27"
        //       className="t-cls-5"
        //       cx="1479.32"
        //       cy="3112.79"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-28"
        //       className="t-cls-5"
        //       cx="1458.93"
        //       cy="3172.54"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-"
        //       className="t-cls-5"
        //       cx="2134.56"
        //       cy="2071.52"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-CB-29"
        //       className="t-cls-5"
        //       cx="1448.27"
        //       cy="3232.29"
        //       r="17.58"
        //     />

        //     <circle
        //       className="t-cls-5"
        //       cx="2366.96"
        //       cy="1808.06"
        //       r="17.58"
        //       id="T3B-F03-1"
        //     />
        //     <circle
        //       id="T3B-F03-2"
        //       className="t-cls-5"
        //       cx="2320.64"
        //       cy="1840.65"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-3"
        //       className="t-cls-5"
        //       cx="2278.55"
        //       cy="1877.2"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-4"
        //       className="t-cls-5"
        //       cx="2234.72"
        //       cy="1912.57"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-5"
        //       className="t-cls-5"
        //       cx="2196.6"
        //       cy="1949.13"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-6"
        //       className="t-cls-5"
        //       cx="2153.91"
        //       cy="1989.01"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-8"
        //       className="t-cls-5"
        //       cx="2072.87"
        //       cy="2065.94"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-9"
        //       className="t-cls-5"
        //       cx="2027.38"
        //       cy="2110.4"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-10"
        //       className="t-cls-5"
        //       cx="1987.54"
        //       cy="2152.47"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-11"
        //       className="t-cls-5"
        //       cx="1940.81"
        //       cy="2200.88"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-12"
        //       className="t-cls-5"
        //       cx="1897.64"
        //       cy="2250.43"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-13"
        //       className="t-cls-5"
        //       cx="1857.2"
        //       cy="2294.46"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-14"
        //       className="t-cls-5"
        //       cx="1819.32"
        //       cy="2347.34"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-15"
        //       className="t-cls-5"
        //       cx="1782.51"
        //       cy="2397.88"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-16"
        //       className="t-cls-5"
        //       cx="1743.73"
        //       cy="2444.78"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-17"
        //       className="t-cls-5"
        //       cx="1710.39"
        //       cy="2495.8"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-18"
        //       className="t-cls-5"
        //       cx="1677.95"
        //       cy="2544.81"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-19"
        //       className="t-cls-5"
        //       cx="1649.21"
        //       cy="2593.9"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-20"
        //       className="t-cls-5"
        //       cx="1622.06"
        //       cy="2649.17"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-21"
        //       className="t-cls-5"
        //       cx="1590.74"
        //       cy="2704.39"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-22"
        //       className="t-cls-5"
        //       cx="1563.84"
        //       cy="2759.66"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-23"
        //       className="t-cls-5"
        //       cx="1538.38"
        //       cy="2814.95"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-24"
        //       className="t-cls-5"
        //       cx="1511.47"
        //       cy="2870.23"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-25"
        //       className="t-cls-5"
        //       cx="1488.07"
        //       cy="2933.3"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-26"
        //       className="t-cls-5"
        //       cx="1462.15"
        //       cy="2995.39"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-27"
        //       className="t-cls-5"
        //       cx="1438.37"
        //       cy="3052.43"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-28"
        //       className="t-cls-5"
        //       cx="1413.21"
        //       cy="3115.92"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-7"
        //       className="t-cls-5"
        //       cx="2110.07"
        //       cy="2026.75"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-29"
        //       className="t-cls-5"
        //       cx="1394.63"
        //       cy="3176.52"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-30"
        //       className="t-cls-5"
        //       cx="1377.05"
        //       cy="3231.29"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-31"
        //       className="t-cls-5"
        //       cx="1361.46"
        //       cy="3286.06"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-32"
        //       className="t-cls-5"
        //       cx="1346.88"
        //       cy="3339.82"
        //       r="17.58"
        //     />
        //     <circle
        //       id="T3B-F03-33"
        //       className="t-cls-5"
        //       cx="1337.46"
        //       cy="3393.59"
        //       r="17.58"
        //     />
        //   </g>
        // </svg>
        <SvgInterno tendidoDosBajo={tendidoDosBajo} />
      )}
    </div>
  )
}

export default LayoutSvg
