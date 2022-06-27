import { useRouter } from "next/router";

export default function Article({article}){
    const router = useRouter();
    if(router.isFallback){
        return <div>Loading...</div>
    }
    return(
        <>
            <div key={article.id}>
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <p>{article.category}</p>
                <hr />
            </div>
        </>
    )
}

export async function getStaticProps(context){
    const {params} = context;
    const response = await fetch(`http://localhost:4000/news/${params.articleId}`);
    const data = await response.json();
    return{
        props:{
            article:data,
        },
        revalidate: 5,
    }
}
export async function getStaticPaths(){
    const response = await fetch(`http://localhost:4000/news`);
    const data = await response.json();

    const paths = data.map(article=>{
        return{
            params:{
                articleId:`${article.id}`
            }
        }
    })
    return{
        paths,
        fallback: true,
    }
}