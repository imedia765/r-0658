import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Database, Search, Code, GitBranch } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AIResearcher = () => {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState('current');

  // Mock projects data - in a real app, this would come from your backend
  const projects = [
    { id: 'current', name: 'Current Project' },
    { id: 'project-1', name: 'E-commerce App' },
    { id: 'project-2', name: 'Blog Platform' },
  ];

  const projectTools = {
    'current': [
      { name: 'Code Analysis', progress: 85, description: 'Analyzing code patterns and structure' },
      { name: 'Data Mining', progress: 70, description: 'Extracting valuable insights from project data' },
      { name: 'Dependency Scanner', progress: 90, description: 'Scanning and analyzing project dependencies' }
    ],
    'project-1': [
      { name: 'API Analysis', progress: 95, description: 'Analyzing REST API patterns' },
      { name: 'State Management', progress: 80, description: 'Analyzing state management patterns' },
      { name: 'UI Components', progress: 75, description: 'Analyzing component structure' }
    ],
    'project-2': [
      { name: 'Database Schema', progress: 88, description: 'Analyzing data models' },
      { name: 'Auth Patterns', progress: 92, description: 'Analyzing authentication flows' },
      { name: 'Content Management', progress: 85, description: 'Analyzing CMS patterns' }
    ]
  };

  const projectDatasets = {
    'current': [
      { name: 'Code Patterns', size: '2.5GB', lastUpdated: '2 hours ago', type: 'patterns' },
      { name: 'Best Practices', size: '1.8GB', lastUpdated: '1 day ago', type: 'practices' },
      { name: 'Documentation', size: '3.2GB', lastUpdated: '5 hours ago', type: 'docs' }
    ],
    'project-1': [
      { name: 'E-commerce Patterns', size: '3.1GB', lastUpdated: '1 hour ago', type: 'patterns' },
      { name: 'Payment Integration', size: '2.2GB', lastUpdated: '3 hours ago', type: 'integration' },
      { name: 'User Flows', size: '1.9GB', lastUpdated: '2 days ago', type: 'flows' }
    ],
    'project-2': [
      { name: 'Blog Templates', size: '2.8GB', lastUpdated: '4 hours ago', type: 'templates' },
      { name: 'SEO Patterns', size: '1.5GB', lastUpdated: '1 day ago', type: 'seo' },
      { name: 'Content Types', size: '2.1GB', lastUpdated: '6 hours ago', type: 'content' }
    ]
  };

  const handleAnalyze = () => {
    toast({
      title: "Analysis Started",
      description: "AI is analyzing the selected project's codebase...",
    });
  };

  const currentTools = projectTools[selectedProject as keyof typeof projectTools] || projectTools.current;
  const currentDatasets = projectDatasets[selectedProject as keyof typeof projectDatasets] || projectDatasets.current;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          AI Research Tools
        </h1>
        <div className="flex items-center gap-4">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAnalyze} className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Analyze Project
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Active Analysis Tools</h2>
          </div>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {currentTools.map((tool, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{tool.name}</span>
                    <span className="text-sm text-muted-foreground">{tool.progress}%</span>
                  </div>
                  <Progress value={tool.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Project Knowledge Base</h2>
          </div>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {currentDatasets.map((dataset, index) => (
                <div key={index} className="p-3 bg-accent/10 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{dataset.name}</span>
                    <span className="text-sm text-muted-foreground">{dataset.size}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Last updated: {dataset.lastUpdated}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Project Intelligence</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          The AI Research Assistant analyzes your project structure, suggests improvements,
          and provides insights based on patterns from similar projects in the knowledge base.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-4 w-4" />
              <h3 className="font-medium">Code Analysis</h3>
            </div>
            <p className="text-sm text-muted-foreground">Real-time pattern analysis and suggestions</p>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <GitBranch className="h-4 w-4" />
              <h3 className="font-medium">Project Structure</h3>
            </div>
            <p className="text-sm text-muted-foreground">Architecture and dependency insights</p>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4" />
              <h3 className="font-medium">Knowledge Base</h3>
            </div>
            <p className="text-sm text-muted-foreground">Access to patterns and best practices</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIResearcher;