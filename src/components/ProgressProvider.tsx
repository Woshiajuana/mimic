'use client'

import { ProgressProvider as BProgressProvider } from '@bprogress/next/app'

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  return (
    <BProgressProvider height="5px" color="#ff0000" options={{ showSpinner: false }} shallowRouting>
      {children}
    </BProgressProvider>
  )
}
