import { Link, useParams } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { ProjectWorkspace } from "@/components/projects/ProjectWorkspace";
export default function ProjectDetailPage() {
 const { projectId } = useParams(); const { projects } = useApp(); const p = projects.find(x=>x.id===projectId);
 if (!p) return <div className="py-20 text-center"><p className="text-muted-foreground">Project not found.</p><Link to="/projects" className="text-primary">Back to projects</Link></div>;
 return <ProjectWorkspace key={p.id} project={p}/>;
}
