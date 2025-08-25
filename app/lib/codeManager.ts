export interface CodeProject {
  id: string
  userId: string
  title: string
  description: string
  language: string
  code: string
  tags: string[]
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
  version: number
  preview?: string
  settings: {
    theme: 'dark' | 'light'
    fontSize: number
    lineNumbers: boolean
    wordWrap: boolean
  }
}

export interface CodeVersion {
  id: string
  projectId: string
  version: number
  code: string
  message: string
  createdAt: Date
}

// Mock database for code projects
export let codeProjects: CodeProject[] = []
export let codeVersions: CodeVersion[] = []

export function createCodeProject(userId: string, data: Partial<CodeProject>): CodeProject {
  const project: CodeProject = {
    id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    title: data.title || 'Untitled Project',
    description: data.description || '',
    language: data.language || 'javascript',
    code: data.code || '// Start coding here...',
    tags: data.tags || [],
    isPublic: data.isPublic || false,
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
    settings: {
      theme: 'dark',
      fontSize: 14,
      lineNumbers: true,
      wordWrap: false,
      ...data.settings
    }
  }

  codeProjects.push(project)
  
  // Create initial version
  const version: CodeVersion = {
    id: `version_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    projectId: project.id,
    version: 1,
    code: project.code,
    message: 'Initial version',
    createdAt: new Date()
  }
  
  codeVersions.push(version)
  
  return project
}

export function getCodeProject(projectId: string): CodeProject | undefined {
  return codeProjects.find(project => project.id === projectId)
}

export function getUserProjects(userId: string): CodeProject[] {
  return codeProjects.filter(project => project.userId === userId)
}

export function getPublicProjects(): CodeProject[] {
  return codeProjects.filter(project => project.isPublic)
}

export function updateCodeProject(projectId: string, updates: Partial<CodeProject>): CodeProject | null {
  const projectIndex = codeProjects.findIndex(project => project.id === projectId)
  if (projectIndex === -1) return null

  const project = codeProjects[projectIndex]
  const updatedProject = {
    ...project,
    ...updates,
    updatedAt: new Date(),
    version: project.version + 1
  }

  codeProjects[projectIndex] = updatedProject

  // Create new version if code changed
  if (updates.code && updates.code !== project.code) {
    const version: CodeVersion = {
      id: `version_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      projectId,
      version: updatedProject.version,
      code: updates.code,
      message: updates.description || 'Code updated',
      createdAt: new Date()
    }
    codeVersions.push(version)
  }

  return updatedProject
}

export function deleteCodeProject(projectId: string): boolean {
  const projectIndex = codeProjects.findIndex(project => project.id === projectId)
  if (projectIndex === -1) return false

  codeProjects.splice(projectIndex, 1)
  
  // Remove associated versions
  const versionIndices = codeVersions
    .map((version, index) => version.projectId === projectId ? index : -1)
    .filter(index => index !== -1)
    .reverse()
  
  versionIndices.forEach(index => codeVersions.splice(index, 1))
  
  return true
}

export function getProjectVersions(projectId: string): CodeVersion[] {
  return codeVersions
    .filter(version => version.projectId === projectId)
    .sort((a, b) => b.version - a.version)
}

export function getProjectVersion(projectId: string, version: number): CodeVersion | undefined {
  return codeVersions.find(v => v.projectId === projectId && v.version === version)
}

export function searchProjects(query: string, userId?: string): CodeProject[] {
  const searchTerm = query.toLowerCase()
  let projects = userId ? getUserProjects(userId) : getPublicProjects()
  
  return projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm) ||
    project.description.toLowerCase().includes(searchTerm) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    project.language.toLowerCase().includes(searchTerm)
  )
}

export function generatePreview(code: string, language: string): string {
  // Generate a preview by taking first few lines and adding syntax highlighting
  const lines = code.split('\n').slice(0, 10) // First 10 lines
  const preview = lines.join('\n')
  
  if (lines.length === 10) {
    return preview + '\n...'
  }
  
  return preview
}

export function validateCode(code: string, language: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Basic validation
  if (!code.trim()) {
    errors.push('Code cannot be empty')
  }
  
  if (code.length > 100000) {
    errors.push('Code is too large (max 100KB)')
  }
  
  // Language-specific validation
  switch (language) {
    case 'javascript':
    case 'typescript':
      // Check for basic syntax
      if (!code.includes(';') && code.includes('console.log')) {
        errors.push('Missing semicolons in JavaScript/TypeScript')
      }
      break
    case 'python':
      // Check for indentation
      if (code.includes('def ') && !code.includes('    ')) {
        errors.push('Python code should be properly indented')
      }
      break
    case 'html':
      if (!code.includes('<') || !code.includes('>')) {
        errors.push('HTML code should contain tags')
      }
      break
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
