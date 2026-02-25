import { Suspense } from "react"
import { TrainingScreen } from "@/features/training/components/training-screen"

export default function TrainSessionPage() {
  return (
    <Suspense>
      <TrainingScreen />
    </Suspense>
  )
}
