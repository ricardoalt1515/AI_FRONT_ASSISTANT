"use client"

import { useState, useCallback } from "react"
import { Card, CardContent } from "./card"
import { Button } from "./button"
import { Progress } from "./progress"
import { Badge } from "./badge"
import {
  Upload,
  File,
  FileText,
  FileImage,
  FileSpreadsheet,
  X,
  Check,
  AlertCircle,
  RotateCcw
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadState {
  id: string
  file: File
  progress: number
  status: 'uploading' | 'completed' | 'error'
  preview?: string
  error?: string
}

interface FileUploaderProps {
  acceptedTypes?: string[]
  maxSize?: number // in MB
  maxFiles?: number
  onUpload?: (files: File[]) => Promise<void>
  onRemove?: (fileId: string) => void
  className?: string
  disabled?: boolean
  showPreview?: boolean
}

const getFileIcon = (type: string) => {
  if (type.includes('image')) return FileImage
  if (type.includes('spreadsheet') || type.includes('excel')) return FileSpreadsheet
  if (type.includes('pdf') || type.includes('text')) return FileText
  return File
}

const getFileTypeColor = (type: string) => {
  if (type.includes('image')) return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
  if (type.includes('spreadsheet') || type.includes('excel')) return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
  if (type.includes('pdf')) return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
  return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
}

export function FileUploader({
  acceptedTypes = ['.xlsx', '.xls', '.pdf', '.png', '.jpg', '.jpeg'],
  maxSize = 10,
  maxFiles = 5,
  onUpload,
  onRemove,
  className,
  disabled = false,
  showPreview = true
}: FileUploaderProps) {
  const [uploads, setUploads] = useState<FileUploadState[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const validateFile = (file: File): string | null => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()

    if (!acceptedTypes.includes(fileExtension)) {
      return `Tipo de archivo no permitido. Use: ${acceptedTypes.join(', ')}`
    }

    if (file.size > maxSize * 1024 * 1024) {
      return `Archivo muy grande. Máximo: ${maxSize}MB`
    }

    if (uploads.length >= maxFiles) {
      return `Máximo ${maxFiles} archivos permitidos`
    }

    return null
  }

  const handleFileSelect = useCallback(async (files: FileList) => {
    const fileArray = Array.from(files)
    const validFiles: File[] = []

    for (const file of fileArray) {
      const error = validateFile(file)
      if (error) {
        // Simular upload con error
        const fileState: FileUploadState = {
          id: Math.random().toString(36).substring(7),
          file,
          progress: 0,
          status: 'error',
          error
        }
        setUploads(prev => [...prev, fileState])
      } else {
        validFiles.push(file)
      }
    }

    // Procesar archivos válidos
    for (const file of validFiles) {
      const fileState: FileUploadState = {
        id: Math.random().toString(36).substring(7),
        file,
        progress: 0,
        status: 'uploading'
      }

      setUploads(prev => [...prev, fileState])

      // Simular progreso de upload
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        setUploads(prev => prev.map(upload =>
          upload.id === fileState.id
            ? { ...upload, progress }
            : upload
        ))
      }

      // Marcar como completado
      setUploads(prev => prev.map(upload =>
        upload.id === fileState.id
          ? { ...upload, status: 'completed' }
          : upload
      ))
    }

    // Llamar callback si existe
    if (onUpload && validFiles.length > 0) {
      try {
        await onUpload(validFiles)
      } catch (error) {
        console.error('Upload error:', error)
      }
    }
  }, [uploads.length, maxFiles, onUpload, acceptedTypes, maxSize])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (!disabled && e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files)
    }
  }, [handleFileSelect, disabled])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }, [disabled])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const removeFile = (fileId: string) => {
    setUploads(prev => prev.filter(upload => upload.id !== fileId))
    if (onRemove) {
      onRemove(fileId)
    }
  }

  const retryUpload = async (fileId: string) => {
    const upload = uploads.find(u => u.id === fileId)
    if (!upload) return

    setUploads(prev => prev.map(u =>
      u.id === fileId
        ? { ...u, status: 'uploading', progress: 0, error: undefined }
        : u
    ))

    // Simular retry
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      setUploads(prev => prev.map(u =>
        u.id === fileId
          ? { ...u, progress }
          : u
      ))
    }

    setUploads(prev => prev.map(u =>
      u.id === fileId
        ? { ...u, status: 'completed' }
        : u
    ))
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drop Zone */}
      <Card
        className={cn(
          "border-2 border-dashed transition-all duration-200",
          isDragOver
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-muted-foreground/25",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="p-8 text-center">
          <Upload className={cn(
            "h-12 w-12 mx-auto mb-4 transition-colors",
            isDragOver ? "text-primary" : "text-muted-foreground"
          )} />
          <div className="space-y-2">
            <p className="text-lg font-medium">
              {isDragOver ? "Suelta los archivos aquí" : "Arrastra archivos o haz click para seleccionar"}
            </p>
            <p className="text-sm text-muted-foreground">
              Formatos soportados: {acceptedTypes.join(', ')}
            </p>
            <p className="text-sm text-muted-foreground">
              Máximo {maxSize}MB por archivo, hasta {maxFiles} archivos
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4"
            disabled={disabled}
            onClick={() => {
              const input = document.createElement('input')
              input.type = 'file'
              input.multiple = true
              input.accept = acceptedTypes.join(',')
              input.onchange = (e) => {
                const files = (e.target as HTMLInputElement).files
                if (files) handleFileSelect(files)
              }
              input.click()
            }}
          >
            Seleccionar Archivos
          </Button>
        </CardContent>
      </Card>

      {/* Upload List */}
      {uploads.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Archivos ({uploads.length})</h4>
          {uploads.map((upload) => {
            const FileIcon = getFileIcon(upload.file.type)
            const typeColor = getFileTypeColor(upload.file.type)

            return (
              <Card key={upload.id} className="p-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    upload.status === 'error' ? "bg-red-100 dark:bg-red-900/20" : "bg-muted"
                  )}>
                    <FileIcon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium truncate">{upload.file.name}</p>
                      <Badge variant="outline" className={cn("text-xs", typeColor)}>
                        {upload.file.type.split('/').pop()?.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(upload.file.size)}
                    </p>

                    {upload.status === 'uploading' && (
                      <div className="mt-2">
                        <Progress value={upload.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Subiendo... {upload.progress}%
                        </p>
                      </div>
                    )}

                    {upload.status === 'error' && upload.error && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                        <AlertCircle className="h-4 w-4" />
                        {upload.error}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {upload.status === 'completed' && (
                      <div className="text-green-600 dark:text-green-400">
                        <Check className="h-5 w-5" />
                      </div>
                    )}

                    {upload.status === 'error' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => retryUpload(upload.id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(upload.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}