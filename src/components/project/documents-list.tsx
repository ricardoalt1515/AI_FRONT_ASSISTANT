"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FileText, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ProjectDocument } from "@/lib/mock-data";

type DocumentsListProps = {
  documents: ProjectDocument[];
  title?: string;
  description?: string;
};

const typeLabel: Record<ProjectDocument["type"], string> = {
  proposal: "Propuesta",
  pid: "P&ID",
  bom: "BOM",
  calculations: "Cálculos",
  layout: "Layout",
  specifications: "Especificaciones",
  procurement: "Procurement",
  order: "Orden de Compra",
};

const statusBadgeClass: Record<ProjectDocument["status"], string> = {
  generating: "bg-amber-100 text-amber-700 border border-amber-200",
  completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  reviewed: "bg-blue-100 text-blue-700 border border-blue-200",
  approved: "bg-purple-100 text-purple-700 border border-purple-200",
};

export function DocumentsList({ documents, title = "Documentos", description }: DocumentsListProps) {
  const hasDocs = documents && documents.length > 0;

  return (
    <Card className="card-premium">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {description && (
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        )}

        {!hasDocs ? (
          <div className="text-sm text-muted-foreground">No hay documentos aún.</div>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="group flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors motion-safe:transition motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:transform-none hover:shadow-sm focus-within:shadow-sm focus-within:ring-2 focus-within:ring-primary/40"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="font-medium truncate max-w-[220px] sm:max-w-[360px]" title={doc.name}>{doc.name}</span>
                          </TooltipTrigger>
                          <TooltipContent>{doc.name}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Badge variant="secondary" className="text-[10px]">
                        {typeLabel[doc.type]}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {doc.size} • {doc.createdAt} • Fase: {doc.phase}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:ml-auto">
                  <span
                    aria-live="polite"
                    aria-busy={doc.status === "generating"}
                    className={`px-2 py-1 rounded-full text-xs ${statusBadgeClass[doc.status]}`}
                  >
                    {doc.status === "generating" ? "Generando" :
                     doc.status === "completed" ? "Completo" :
                     doc.status === "reviewed" ? "Revisado" : "Aprobado"}
                  </span>

                  {doc.url ? (
                    <Button asChild size="sm" variant="outline" className="focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2">
                      <Link
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Descargar ${doc.name}`}
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-2" />
                        Descargar
                      </Link>
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled className="opacity-70">
                      Descargar
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <Separator />
            <div className="text-xs text-muted-foreground">
              Nota: Los documentos se sirven como enlaces externos para descarga.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default DocumentsList;

