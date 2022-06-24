import Link from 'next/link';
import {useRouter} from 'next/router'
function Home(){
  const router = useRouter();

  const handleCLick = () =>{
    console.log('Placing your order');
    router.push('/product');
  }

  return (
      <div>
        <h1>Home Page</h1>
        <Link href="/blog">
        <a>Blog</a>
        </Link>
        <Link href="/product">
          <a>Product</a>
        </Link>
        <button onClick={handleCLick}>
          Place Order
        </button>
      </div>
    )
}

export default Home