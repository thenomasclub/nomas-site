import { client } from "@/sanity/lib/client"
import { generateBlogMetadata } from "./page.metadata"
import { PortableText } from "@portabletext/react"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts: { slug: string }[] = await client.fetch(
    `*[_type=="article"]{ "slug": slug.current }`
  )
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata( { params, }: {params: Promise<{ slug: string }>}) {
  const { slug } = await params
  return generateBlogMetadata(slug)
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  const post = await client.fetch(
    `*[_type=="article" && slug.current==$slug][0]{
      _id,
      title,
      body,
      mainImage{ asset->{ url } },
      publishedAt
    }`,
    { slug }
  )

  if (!post) {
    return <p>Article not found</p>
  }

  return (
    <></>
  )
}