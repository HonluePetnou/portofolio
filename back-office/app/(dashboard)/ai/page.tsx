import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Bot, Sparkles } from "lucide-react";

export default function AIPage() {
  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-6">
      <div className="h-24 w-24 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center mb-4 animate-pulse">
        <Bot className="h-12 w-12 text-white" />
      </div>
      <h2 className="text-3xl font-bold">Soluty AI Assistant</h2>
      <p className="text-muted-foreground text-lg">
        Your creative partner for content ideas, rewriting, and automation.
        <br />
        Coming soon to the studio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pt-8">
        <Card className="text-left hover:border-indigo-500 cursor-pointer transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" /> Idea Generator
            </CardTitle>
            <CardDescription>
              Brainstorm new article topics suited for the agency.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="text-left hover:border-purple-500 cursor-pointer transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-500" /> Post Rewriter
            </CardTitle>
            <CardDescription>
              Turn a rough draft into a polished LinkedIn post.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
