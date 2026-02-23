import { Suspense } from "react"
import { TrainingScreen } from "@/components/training-screen"

export default function TrainSessionPage() {
  return (
    <Suspense>
      <TrainingScreen />
    </Suspense>
  )
}
