"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  Send,
  X,
  UserCircle2,
  BrainCircuit,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  HelpCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ChatBot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { sender: "bot", content: "Hi, how can I help you today?" },
  ]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", content: input }]);
      setInput("");
      setIsLoading(true);

      // Simulate bot response after 1 second
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            content: "I'm here to assist you. What specific help do you need?",
          },
        ]);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 z-50 h-auto">
        {!isOpen && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsOpen(true)}
                className="rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out transform hover:scale-110"
              >
                <MessageCircle className="w-10 h-10" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open Chatbot</p>
            </TooltipContent>
          </Tooltip>
        )}
        {isOpen && (
          <Card className="w-96 h-[600px] flex flex-col shadow-xl">
            <CardHeader className="flex flex-row items-center bg-primary text-primary-foreground rounded-t-lg">
              <Avatar className="h-12 w-12 border-2 border-primary-foreground">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Bot Avatar" />
                <AvatarFallback>ACL</AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-grow">
                <p className="text-xl font-bold">ACL Tear Detector</p>
                <p className="text-sm">Always here to help</p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Close Chatbot</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-end max-w-[80%] ${
                      message.sender === "user"
                        ? "flex-row-reverse"
                        : "flex-row"
                    }`}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar
                          className={`h-10 w-10 ${
                            message.sender === "user" ? "ml-2" : "mr-2"
                          } cursor-pointer transition-transform duration-200 hover:scale-110`}
                        >
                          {message.sender === "user" ? (
                            <UserCircle2 className="h-8 w-8 text-primary p-1" />
                          ) : (
                            <BrainCircuit className="h-8 w-8 text-primary p-1" />
                          )}
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {message.sender === "user" ? "You" : "AI Assistant"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="font-medium">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center bg-muted p-3 rounded-lg">
                    <span className="w-3 h-3 bg-primary rounded-full mr-1 animate-bounce"></span>
                    <span
                      className="w-3 h-3 bg-primary rounded-full mr-1 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                      className="w-3 h-3 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex w-full items-center space-x-2"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Attach a file</p>
                  </TooltipContent>
                </Tooltip>
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isLoading}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send message</p>
                  </TooltipContent>
                </Tooltip>
              </form>
            </CardFooter>
            <div className="flex justify-between items-center p-2 bg-muted rounded-b-lg">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Rate this conversation as helpful</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Not Helpful
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Rate this conversation as not helpful</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Help
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Get help using the chatbot</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
}
