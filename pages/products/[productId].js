import { useRouter } from 'next/router';

function Product({product}){
    const router = useRouter();

    if(router.isFallback){
        return <div>Loading...</div>
    }
    return(
        <div>
            <h2>
                {product.id} {product.title} R${product.price}
            </h2>
            <p>{product.description}</p>
            <hr />
        </div>
    )
}
export default Product

export async function getStaticProps(context){
    const {params} = context
    console.log(`Regenerating product ${params.productId}`)
    const response = await fetch(`http://localhost:4000/products/${params.productId}`)
    const data = await response.json();
    // console.log(`Generating page for /products/${params.productId}`)
        return{
            props:{
                product:data
            },
            revalidate: 10,
        }
    }

export async function getStaticPaths(){
    // const response = await fetch('http://jsonplaceholder.typicode.com/posts')
    // const data = await response.json()

    // const paths = data.map(post=>{
    //     return{
    //         params:{
    //             postId:`${post.id}`
    //         }
    //     }
    // })
    return{
        paths:[{params: { productId: '1'} }],
        // paths,
        fallback: true,
    }
}