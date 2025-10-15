
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, User, Bot, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { helpChat } from "@/ai/flows/help-chat-flow";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/providers/auth-provider";

type Message = {
    role: 'user' | 'model';
    content: string;
};

export default function AiHelpPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewportRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollViewportRef.current) {
            scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
        }
    }

    useEffect(() => {
        // A slight delay to allow the new message to render before scrolling
        setTimeout(scrollToBottom, 100);
    }, [messages]);
    
    useEffect(() => {
        // Initial bot message
        setMessages([{ role: 'model', content: "Hello! I'm your AI assistant for Night Fury. How can I help you today?" }]);
    }, []);

    const handleSendMessage = async () => {
        if (input.trim() === "" || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput("");
        setIsLoading(true);
        
        // Format history for the AI flow
        const historyForAI = messages.map(msg => ({
            role: msg.role as 'user' | 'model',
            content: [{ text: msg.content }]
        }));

        try {
            const botResponse = await helpChat({
                history: historyForAI,
                message: currentInput,
            });

            const botMessage: Message = { role: 'model', content: botResponse };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("AI Error:", error);
            const errorMessage: Message = { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <MainLayout>
             <div className="flex flex-col h-full">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <div className="flex-grow flex items-center justify-center">
                       <Sparkles className="h-6 w-6 text-primary mr-2"/>
                       <h1 className="text-xl font-bold">AI Help Assistant</h1>
                    </div>
                    <div className="w-10"></div>
                </header>
                <div className="flex-grow flex flex-col overflow-hidden bg-secondary/30">
                    <ScrollArea className="flex-grow p-4" viewportRef={scrollViewportRef}>
                         <div className="space-y-2 pb-4">
                            {messages.map((message, index) => (
                                <div key={index} className={cn("flex items-end gap-3 w-full", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                                    {message.role === 'model' && (
                                        <Avatar className="h-9 w-9 border-2 border-primary/50">
                                            <AvatarFallback className="bg-primary/20"><Bot className="text-primary"/></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn("rounded-2xl px-4 py-3 max-w-[80%] shadow-md", 
                                        message.role === 'user' 
                                            ? 'bg-primary text-primary-foreground rounded-br-none' 
                                            : 'bg-card text-card-foreground rounded-bl-none'
                                    )}>
                                        <p className="text-sm leading-relaxed">{message.content}</p>
                                    </div>
                                    {message.role === 'user' && (
                                        <Avatar className="h-9 w-9 border-2 border-border">
                                            <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} key={user?.photoURL}/>
                                            <AvatarFallback><User/></AvatarFallback>

                                        </Avatar>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-end gap-3 justify-start">
                                    <Avatar className="h-9 w-9 border-2 border-primary/50">
                                        <AvatarFallback className="bg-primary/20"><Bot className="text-primary"/></AvatarFallback>
                                    </Avatar>
                                    <div className="rounded-2xl px-4 py-3 bg-card text-card-foreground rounded-bl-none shadow-md">
                                        <div className="flex items-center space-x-2">
                                           <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                           <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                           <span className="h-2 w-2 bg-primary rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <div className="p-4 border-t bg-background shrink-0">
                        <div className="relative">
                            <Input 
                                placeholder="Ask me anything..." 
                                className="pr-12 h-12 rounded-full bg-card pl-5" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                disabled={isLoading}
                            />
                            <Button 
                                variant="default" 
                                size="icon" 
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full"
                                onClick={handleSendMessage}
                                disabled={isLoading || input.trim() === ""}
                            >
                                <Send className="h-5 w-5"/>
                            </Button>
                        </div>
                         <div className="text-center mt-3">
                            <p className="text-xs text-muted-foreground">Can't find your answer? <Link href="/contact-us" className="text-primary underline">Contact Support</Link></p>
                         </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
