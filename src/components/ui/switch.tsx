"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) {
  return (
    <SwitchPrimitives.Root
      data-slot="switch"
      className={cn(
        "text-primary-foreground data-[state=checked]:bg-primary data-[state=unchecked]:bg-input peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-1.5 border-transparent shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:has-[[data-slot=thumb][data-state=checked]]:outline-hidden data-[state=checked]:has-[[data-slot=thumb][data-state=checked]:focus-visible]:ring data-[state=checked]:has-[[data-slot=thumb][data-state=checked]:focus-visible]:ring-ring/20 data-[state=unchecked]:has-[[data-slot=thumb][data-state=unchecked]]:outline-hidden data-[state=unchecked]:has-[[data-slot=thumb][data-state=unchecked]:focus-visible]:ring data-[state=unchecked]:has-[[data-slot=thumb][data-state=unchecked]:focus-visible]:ring-ring/20",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        data-slot="thumb"
        className="*:data-[state=unchecked]:data-[slot=icon]:text-muted-foreground data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 pointer-events-none flex size-4 items-center justify-center rounded-full bg-white shadow-md transition-transform data-[state=checked]:outline-hidden"
      />
    </SwitchPrimitives.Root>
  )
}

export { Switch }
