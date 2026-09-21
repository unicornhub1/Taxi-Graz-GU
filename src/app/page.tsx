import client from '@tina/__generated__/client'
import { JsonLd } from '@/components/JsonLd'
import { faqPageSchema } from '@/lib/schema'
import { compact } from '@/lib/site'
import { HomeClient } from './HomeClient'

export default async function HomePage() {
  const [res, settings] = await Promise.all([
    client.queries.home({ relativePath: 'home.json' }),
    client.queries.settings({ relativePath: 'site.json' }),
  ])
  return (
    <>
      <JsonLd data={faqPageSchema(compact(res.data.home.faq.items), settings.data.settings)} />
      <HomeClient data={res.data} query={res.query} variables={res.variables} />
    </>
  )
}
