import {
  useCallback,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBloomContext } from './context'
import { useReducedMotion } from './hooks/useReducedMotion'
import { reducedMotionSpring } from "./utils/animations";
import type { BloomTriggerProps } from './types'

export function Trigger({
  children,
  disabled = false,
  className = '',
  style,
}: Omit<BloomTriggerProps, 'asChild'>): ReactNode {
  const { open, setOpen, triggerRef, animationConfig, visualDuration, bounce } = useBloomContext()
  const prefersReducedMotion = useReducedMotion()

  // Trigger uses slightly shorter duration (same as content)
  const springConfig = prefersReducedMotion
    ? { type: 'spring' as const, ...reducedMotionSpring }
    : { type: 'spring' as const, visualDuration: visualDuration * 0.85, bounce }

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (disabled) return
      event.preventDefault()
      event.stopPropagation()
      setOpen(!open)
    },
    [disabled, setOpen, open]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (disabled) return
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setOpen(!open)
      }
      if (event.key === 'ArrowDown' && !open) {
        event.preventDefault()
        setOpen(true)
      }
    },
    [disabled, setOpen, open]
  )

  const triggerContentVariants = {
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
    },
    hidden: {
      opacity: 0,
      filter: prefersReducedMotion ? 'blur(0px)' : `blur(${animationConfig.triggerBlur}px)`,
    },
  }

  // Trigger is absolutely positioned within Container
  return (
    <AnimatePresence initial={false}>
      {!open && (
        <motion.div
          ref={triggerRef as React.RefObject<HTMLDivElement>}
          key="trigger-icon"
          layout={false}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={triggerContentVariants}
          transition={springConfig}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-disabled={disabled}
          className={className}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            ...style,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
