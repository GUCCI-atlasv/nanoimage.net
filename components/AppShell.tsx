'use client'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Header,
  Footer,
  HomePage,
  ToolPage,
  HowItWorksPage,
  BlogPage,
  BlogPostPage,
  LegalPage,
  NotFoundPage,
  CategoryPage,
  CliPage,
  DocsCliPage,
} from '@/src/App'
import { tools, blogPosts } from '@/src/data'
import { privacyPolicy, termsOfUse } from '@/src/legal'

type PendingUpload = { id: number; files: File[] }

export type AppShellProps =
  | { page: 'home' }
  | { page: 'tool'; toolSlug: string }
  | { page: 'blog-list' }
  | { page: 'blog-post'; blogSlug: string }
  | { page: 'how-it-works' }
  | { page: 'category'; categoryId: string }
  | { page: 'privacy-policy' }
  | { page: 'terms-of-use' }
  | { page: 'cli' }
  | { page: 'docs-cli' }
  | { page: 'not-found' }

export default function AppShell(props: AppShellProps) {
  const router = useRouter()
  const [pendingCompressUpload, setPendingCompressUpload] = useState<PendingUpload | null>(null)

  const navigate = useCallback((to: string) => {
    router.push(to)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [router])

  const openCompressWithFiles = useCallback((files: File[]) => {
    if (!files.length) return
    setPendingCompressUpload({ id: Date.now(), files })
    router.push('/compress-image')
  }, [router])

  const clearPendingUpload = useCallback(() => setPendingCompressUpload(null), [])

  const activeTool = props.page === 'tool'
    ? tools.find(t => t.slug === props.toolSlug)
    : undefined

  const blogPost = props.page === 'blog-post'
    ? blogPosts.find(p => p.slug === props.blogSlug)
    : undefined

  return (
    <div className="site-shell">
      <Header navigate={navigate} />
      <main>
        {props.page === 'home' && (
          <HomePage navigate={navigate} onCompressUpload={openCompressWithFiles} />
        )}
        {props.page === 'tool' && activeTool && (
          <ToolPage
            key={activeTool.slug}
            tool={activeTool}
            navigate={navigate}
            pendingUpload={activeTool.slug === 'compress-image' ? pendingCompressUpload : null}
            onPendingUploadConsumed={clearPendingUpload}
          />
        )}
        {props.page === 'how-it-works' && <HowItWorksPage navigate={navigate} />}
        {props.page === 'blog-list' && <BlogPage navigate={navigate} />}
        {props.page === 'blog-post' && blogPost && (
          <BlogPostPage navigate={navigate} slug={blogPost.slug} />
        )}
        {props.page === 'category' && (
          <CategoryPage categoryId={props.categoryId} />
        )}
        {props.page === 'privacy-policy' && <LegalPage markdown={privacyPolicy} />}
        {props.page === 'terms-of-use' && <LegalPage markdown={termsOfUse} />}
        {props.page === 'cli' && <CliPage navigate={navigate} />}
        {props.page === 'docs-cli' && <DocsCliPage navigate={navigate} />}
        {props.page === 'not-found' && <NotFoundPage navigate={navigate} />}
      </main>
      <Footer navigate={navigate} />
    </div>
  )
}
