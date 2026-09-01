import client from '@tina/__generated__/client'
import { HomeClient } from './HomeClient'

export default async function HomePage() {
  const res = await client.queries.home({ relativePath: 'home.json' })
  return <HomeClient data={res.data} query={res.query} variables={res.variables} />
}
