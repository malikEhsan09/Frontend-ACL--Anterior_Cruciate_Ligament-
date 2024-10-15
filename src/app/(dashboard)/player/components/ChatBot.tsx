"use client";
import "tailwindcss/tailwind.css";

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
import { BsRobot } from "react-icons/bs";

export default function ChatBot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { sender: "bot", content: "Hi, how can I help you today?" },
  ]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", content: input }]);
      setInput("");
      setIsLoading(true);

      // Simulate bot response after 2 seconds
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            content: "I'm here to assist you. What specific help do you need?",
          },
        ]);
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 z-50">
        {!isOpen && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsOpen(true)}
                className="rounded-full w-16 h-16 shadow-lg bg-darkBlue hover:bg-onHover transition-all duration-300 ease-in-out transform hover:scale-110"
              >
                <BsRobot className="w-10 h-10 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-white bg-darkBlue font-semibold text-md">
              <p>ChatBot</p>
            </TooltipContent>
          </Tooltip>
        )}
        {isOpen && (
          <Card className="w-[450px] max-h-[100vh] flex flex-col shadow-xl absolute bottom-0 right-0 rounded-xl overflow-hidden h-[28rem]">
            <CardHeader className="flex flex-row items-center bg-white text-gray-800 rounded-t-lg shadow-md z-10">
              <Avatar className="h-12 w-12 border-2 border-gray-800">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Bot Avatar" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-grow">
                <p className="text-xl font-bold">
                  AI Health Assistant (Chatbot){" "}
                </p>
                <p className="text-sm">Always here to help</p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-full transition-colors duration-200"
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
            <CardContent className="flex-grow overflow-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
                  <div className="flex items-center space-x-2 bg-muted p-3 rounded-lg">
                    <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                    <div
                      className="w-3 h-3 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
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
                      className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
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
                    className="text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200"
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
                    className="text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200"
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
                    className="text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200"
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
