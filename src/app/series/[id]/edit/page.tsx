import { EditSeriesScreen } from "@/features/vocabulary/components/edit-series-screen"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  return <EditSeriesScreen id={parseInt(id, 10)} />
}
