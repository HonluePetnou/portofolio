"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingAI() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={cn(
          "fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-xl transition-all duration-300 hover:scale-105 z-50",
          isOpen
            ? "bg-destructive hover:bg-destructive/90 rotate-90"
            : "bg-linear-to-r from-indigo-600 to-purple-600 hover:brightness-110",
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Bot className="h-8 w-8 text-white" />
        )}
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-28 right-8 w-96 z-50 transition-all duration-300 origin-bottom-right",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none",
        )}
      >
        <Card className="border-indigo-500/20 shadow-2xl overflow-hidden">
          <CardHeader className="bg-linear-to-r from-indigo-600 to-purple-600 p-4">
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5" /> Soluty AI
            </CardTitle>
            <CardDescription className="text-indigo-100">
              Your agency copilot.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 p-0 flex flex-col bg-background">
            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <Bot className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="bg-muted p-3 rounded-lg rounded-tl-none text-sm">
                  Hello! I can help you generate content ideas or summarize your
                  analytics.
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t flex gap-2">
              <Input
                placeholder="Ask anything..."
                className="focus-visible:ring-indigo-500"
              />
              <Button size="icon" className="bg-indigo-600 hover:bg-indigo-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
