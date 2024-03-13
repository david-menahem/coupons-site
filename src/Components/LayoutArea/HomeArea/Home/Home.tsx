import './Home.css'
import homeCoupon from "../../../../Assets/home_coupon.jpeg";
function Home(): JSX.Element {
  return (
    <div className="Home">
      <div className='image'>
        <img src={homeCoupon} height="500px" width="500px" alt=''></img>
      </div>
    </div>
  )
}

export default Home
