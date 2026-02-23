import { Suspense } from "react"
import { TrainingScreen } from "@/components/training-screen"

export default function TrainPage() {
  return (
    <Suspense>
      <TrainingScreen />
    </Suspense>
  )
}
