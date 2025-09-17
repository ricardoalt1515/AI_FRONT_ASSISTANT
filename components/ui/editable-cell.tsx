"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "./input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Button } from "./button"
import { Check, X, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface EditableCellProps {
  value: string | number
  type?: 'text' | 'number' | 'select'
  options?: string[]
  unit?: string
  placeholder?: string
  onSave: (value: string | number) => Promise<boolean>
  validationStatus?: 'valid' | 'warning' | 'error'
  validationMessage?: string
  className?: string
  disabled?: boolean
}

export function EditableCell({
  value,
  type = 'text',
  options = [],
  unit,
  placeholder,
  onSave,
  validationStatus = 'valid',
  validationMessage,
  className,
  disabled = false
}: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value.toString())
  const [isSaving, setIsSaving] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const parsedValue = type === 'number' ? parseFloat(editValue) : editValue
      const success = await onSave(parsedValue)
      if (success) {
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error saving cell:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditValue(value.toString())
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const getStatusIcon = () => {
    switch (validationStatus) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusClasses = () => {
    switch (validationStatus) {
      case 'warning':
        return "border-yellow-300 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/10"
      case 'error':
        return "border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/10"
      default:
        return ""
    }
  }

  if (disabled) {
    return (
      <div className={cn(
        "min-h-[40px] px-3 py-2 rounded-md border bg-muted text-muted-foreground flex items-center",
        getStatusClasses(),
        className
      )}>
        <span className="flex-1">{value}</span>
        {unit && <span className="text-sm text-muted-foreground ml-2">{unit}</span>}
        {getStatusIcon()}
      </div>
    )
  }

  if (!isEditing) {
    return (
      <div
        onClick={() => setIsEditing(true)}
        className={cn(
          "min-h-[40px] px-3 py-2 rounded-md border cursor-pointer hover:bg-muted/50 transition-colors group flex items-center",
          getStatusClasses(),
          className
        )}
        title={validationMessage}
      >
        <span className="flex-1">{value}</span>
        {unit && <span className="text-sm text-muted-foreground ml-2">{unit}</span>}
        {getStatusIcon()}
        <span className="ml-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          Click para editar
        </span>
      </div>
    )
  }

  if (type === 'select') {
    return (
      <div className="flex items-center gap-2">
        <Select
          value={editValue}
          onValueChange={setEditValue}
          disabled={isSaving}
        >
          <SelectTrigger className={cn("flex-1", getStatusClasses())}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleSave}
            disabled={isSaving}
            className="h-8 w-8 p-0"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            disabled={isSaving}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 relative">
        <Input
          ref={inputRef}
          type={type}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isSaving}
          className={cn("pr-12", getStatusClasses())}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
      <div className="flex gap-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleSave}
          disabled={isSaving}
          className="h-8 w-8 p-0"
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCancel}
          disabled={isSaving}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}