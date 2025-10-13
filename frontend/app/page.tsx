import { Button } from "@/components/ui/button";
import { Shield, Lock, Key } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="flex justify-center gap-4 mb-8">
          <Shield className="w-16 h-16 text-primary" />
          <Lock className="w-16 h-16 text-primary" />
          <Key className="w-16 h-16 text-primary" />
        </div>
        
        <h1 className="text-6xl font-bold tracking-tight">
          ethglobal-project
        </h1>
        
        <p className="text-2xl text-muted-foreground">
          Verify once, Login anywhere
        </p>
        
        <div className="flex gap-4 justify-center mt-8">
          <Button size="lg" asChild>
            <Link href="/example">View Example</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/Lin-tern/ethglobal-project" target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </Button>
        </div>

        <div className="mt-16 p-8 bg-muted rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Built with Modern Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-4 bg-background rounded-md">Next.js 15</div>
            <div className="p-4 bg-background rounded-md">TypeScript</div>
            <div className="p-4 bg-background rounded-md">Tailwind CSS</div>
            <div className="p-4 bg-background rounded-md">shadcn/ui</div>
            <div className="p-4 bg-background rounded-md">React Query</div>
            <div className="p-4 bg-background rounded-md">Lucide Icons</div>
            <div className="p-4 bg-background rounded-md">App Router</div>
            <div className="p-4 bg-background rounded-md">Middleware</div>
          </div>
        </div>
      </div>
    </div>
  );
}
