import MapZoom from '../components/shared/MapZoom'

function App() {
  return (
    <>
      <div className="flex justify-center items-center w-full min-h-screen relative">
        <div className="bg-white w-[90vw] h-[90vw] md:w-[70vw] md:h-[70vw] max-w-[700px] flex justify-center items-center max-h-[700px] ">
          <MapZoom />
        </div>
      </div>
    </>
  )
}

export default App
