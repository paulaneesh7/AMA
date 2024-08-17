"use client";

import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import toast, { Toaster } from 'react-hot-toast';

const Main = () => {
  
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch("/api/askQuery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      const responseData = await response.json();
      toast.success("Message sent successfully");
      console.log(responseData);
      setLoading(false);

      setInput("");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex justify-center items-center flex-col mt-16 w-full px-7 md:mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-5">
          Ask Me Anything
        </h1>
        <p className="text-base md:text-lg lg:text-2xl text-gray-500 mb-3 lg:mb-5">
          Have a question? Submit it below and I&apos;ll do my best to provide a
          helpful answer.
        </p>
        <h2 className="text-sm md:text-lg font-medium mb-2">Your Questions</h2>

        <form
          className="w-full max-w-xl mx-auto space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <Textarea
              placeholder="Enter your question"
              className="min-h-[100px]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Main;
