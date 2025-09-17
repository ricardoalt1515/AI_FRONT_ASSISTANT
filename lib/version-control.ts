export interface ProjectVersion {
  id: string
  version: string
  title: string
  description: string
  author: string
  createdAt: Date
  status: "draft" | "review" | "approved" | "archived"
  type: "major" | "minor" | "patch"
  projectData: any
  changes: VersionChange[]
  metadata: VersionMetadata
}

export interface VersionChange {
  id: string
  section: string
  field: string
  oldValue: any
  newValue: any
  changeType: "added" | "modified" | "removed"
  timestamp: Date
  author: string
}

export interface VersionMetadata {
  capex?: number
  opex?: number
  efficiency?: number
  technologies?: string[]
  risks?: string[]
  timeline?: string
  checksum?: string
  approvedBy?: string
  approvedAt?: string
}

export class VersionControlManager {
  private static generateVersionNumber(currentVersion: string, type: "major" | "minor" | "patch"): string {
    const [major, minor, patch] = currentVersion.split(".").map(Number)

    switch (type) {
      case "major":
        return `${major + 1}.0.0`
      case "minor":
        return `${major}.${minor + 1}.0`
      case "patch":
        return `${major}.${minor}.${patch + 1}`
      default:
        return currentVersion
    }
  }

  static createVersion(
    projectId: string,
    currentData: any,
    previousVersion: ProjectVersion | null,
    versionInfo: {
      title: string
      description: string
      type: "major" | "minor" | "patch"
      author: string
    },
  ): ProjectVersion {
    const currentVersionNumber = previousVersion?.version || "0.0.0"
    const newVersionNumber = this.generateVersionNumber(currentVersionNumber, versionInfo.type)

    const changes = previousVersion ? this.detectChanges(previousVersion.projectData, currentData) : []

    const newVersion: ProjectVersion = {
      id: `v${newVersionNumber}`,
      version: newVersionNumber,
      title: versionInfo.title,
      description: versionInfo.description,
      author: versionInfo.author,
      createdAt: new Date(),
      status: "draft",
      type: versionInfo.type,
      projectData: JSON.parse(JSON.stringify(currentData)), // Deep copy
      changes,
      metadata: this.extractMetadata(currentData),
    }

    return newVersion
  }

  private static detectChanges(oldData: any, newData: any, path = ""): VersionChange[] {
    const changes: VersionChange[] = []

    const compareObjects = (old: any, current: any, currentPath: string) => {
      if (typeof old !== typeof current) {
        changes.push({
          id: Math.random().toString(36).substr(2, 9),
          section: currentPath.split(".")[0] || "General",
          field: currentPath.split(".").slice(1).join(".") || "Value",
          oldValue: old,
          newValue: current,
          changeType: "modified",
          timestamp: new Date(),
          author: "System",
        })
        return
      }

      if (typeof current === "object" && current !== null) {
        // Handle arrays
        if (Array.isArray(current)) {
          if (!Array.isArray(old) || old.length !== current.length) {
            changes.push({
              id: Math.random().toString(36).substr(2, 9),
              section: currentPath.split(".")[0] || "General",
              field: currentPath.split(".").slice(1).join(".") || "Array",
              oldValue: old,
              newValue: current,
              changeType: "modified",
              timestamp: new Date(),
              author: "System",
            })
          }
          return
        }

        // Handle objects
        const allKeys = new Set([...Object.keys(old || {}), ...Object.keys(current || {})])

        allKeys.forEach((key) => {
          const newPath = currentPath ? `${currentPath}.${key}` : key
          const oldValue = old?.[key]
          const newValue = current?.[key]

          if (oldValue === undefined && newValue !== undefined) {
            changes.push({
              id: Math.random().toString(36).substr(2, 9),
              section: currentPath.split(".")[0] || "General",
              field: key,
              oldValue: "",
              newValue: newValue,
              changeType: "added",
              timestamp: new Date(),
              author: "System",
            })
          } else if (oldValue !== undefined && newValue === undefined) {
            changes.push({
              id: Math.random().toString(36).substr(2, 9),
              section: currentPath.split(".")[0] || "General",
              field: key,
              oldValue: oldValue,
              newValue: "",
              changeType: "removed",
              timestamp: new Date(),
              author: "System",
            })
          } else if (oldValue !== newValue) {
            compareObjects(oldValue, newValue, newPath)
          }
        })
      } else if (old !== current) {
        changes.push({
          id: Math.random().toString(36).substr(2, 9),
          section: currentPath.split(".")[0] || "General",
          field: currentPath.split(".").slice(1).join(".") || "Value",
          oldValue: old,
          newValue: current,
          changeType: "modified",
          timestamp: new Date(),
          author: "System",
        })
      }
    }

    compareObjects(oldData, newData, path)
    return changes
  }

  private static extractMetadata(projectData: any): VersionMetadata {
    return {
      capex: projectData.proposal?.capex,
      opex: projectData.proposal?.opex,
      efficiency: projectData.proposal?.efficiency,
      technologies: projectData.proposal?.technologies,
      risks: projectData.proposal?.risks,
      timeline: projectData.proposal?.timeline,
      checksum: this.generateChecksum(projectData),
    }
  }

  private static generateChecksum(data: any): string {
    // Simple checksum generation for data integrity
    const jsonString = JSON.stringify(data, Object.keys(data).sort())
    let hash = 0
    for (let i = 0; i < jsonString.length; i++) {
      const char = jsonString.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16)
  }

  static compareVersions(
    version1: ProjectVersion,
    version2: ProjectVersion,
  ): {
    differences: VersionChange[]
    summary: {
      capexDiff: number
      opexDiff: number
      efficiencyDiff: number
      technologyChanges: string[]
    }
  } {
    const differences = this.detectChanges(version1.projectData, version2.projectData)

    const summary = {
      capexDiff: (version2.metadata.capex || 0) - (version1.metadata.capex || 0),
      opexDiff: (version2.metadata.opex || 0) - (version1.metadata.opex || 0),
      efficiencyDiff: (version2.metadata.efficiency || 0) - (version1.metadata.efficiency || 0),
      technologyChanges: this.getTechnologyChanges(
        version1.metadata.technologies || [],
        version2.metadata.technologies || [],
      ),
    }

    return { differences, summary }
  }

  private static getTechnologyChanges(oldTech: string[], newTech: string[]): string[] {
    const added = newTech.filter((tech) => !oldTech.includes(tech)).map((tech) => `+${tech}`)
    const removed = oldTech.filter((tech) => !newTech.includes(tech)).map((tech) => `-${tech}`)
    return [...added, ...removed]
  }

  static approveVersion(version: ProjectVersion, approver: string): ProjectVersion {
    return {
      ...version,
      status: "approved",
      metadata: {
        ...version.metadata,
        approvedBy: approver,
        approvedAt: new Date().toISOString(),
      },
    }
  }

  static archiveVersion(version: ProjectVersion): ProjectVersion {
    return {
      ...version,
      status: "archived",
    }
  }

  static restoreVersion(version: ProjectVersion): any {
    // Return the project data from this version for restoration
    return JSON.parse(JSON.stringify(version.projectData))
  }
}
