import Topbar from "@/components/Topbar"

const HomePage = () => {
  return <div>
    <Topbar/>
    <button onClick={()=>{alert("this is for testing ")}}>
      click me
    </button>
  </div>
}
export default HomePage