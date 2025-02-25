import React from "react";
import { Textarea } from "./text-area";
import { cn } from "@/lib/utils";

const ChatInput = React.forwardRef((props, ref) => {
  const { className = "", ...rest } = props;

  return (
    <Textarea
      ref={ref}
      name="message"
      autoComplete="off"
      className={cn(
        "max-h-12 px-4 py-3 bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md flex items-center h-16 resize-none",
        className
      )}
      {...rest}
    />
  );
});

ChatInput.displayName = "ChatInput";

export { ChatInput };
