import { client } from "@/sanity/lib/client"

export async function generateBlogMetadata(slug: string) {

  const post = await client.fetch(
    `*[_type=="article" && slug.current==$slug][0]{
      title,
      seoTitle,
      seoDescription,
      ogImage{ asset->{ url } }
    }`,
    { slug }
  )

  if (!post) {
    return {
      title: "Article not found | My Client Site",
      description: "The article you are looking for does not exist.",
    }
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || "",
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || "",
      images: post.ogImage?.asset?.url
        ? [{ url: post.ogImage.asset.url }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || "",
      images: post.ogImage?.asset?.url ? [post.ogImage.asset.url] : [],
    },
  }
}
