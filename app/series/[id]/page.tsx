import { SeriesDetail } from "@/components/series-detail"

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <SeriesDetail seriesId={Number(id)} />
}
