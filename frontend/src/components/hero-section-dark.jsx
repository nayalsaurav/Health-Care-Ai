import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { DialogTitle } from "@radix-ui/react-dialog";
import { Signup } from "@/pages/Signup";

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "gray",
  darkLineColor = "gray",
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />
    </div>
  );
};

const HeroSection = React.forwardRef((
  {
    className,
    title = "AI Healthcare Assistant",
    subtitle = {
      regular: "Your personal AI assistant for ",
      gradient: "healthcare support.",
    },
    description = "Get instant answers to your health-related questions, understand medical terms, and receive personalized healthcare guidance through our advanced AI assistant.",
    gridOptions,
    ...props
  },
  ref,
) => {
  const navigate = useNavigate();

  const handleChatbotNavigation = () => {
    navigate('/dashboard/chatbot');
  };

  return (
    (<div className={cn("relative", className)} ref={ref} {...props}>
      <div
        className="absolute top-0 z-[0] h-fit w-screen bg-purple-950/10 dark:bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <section className="relative max-w-full mx-auto z-1">
        <RetroGrid {...gridOptions} />
        <div className="max-w-screen-xl z-10 mx-auto px-4 py-16 md:py-28 gap-12 md:px-8">
          <div className="space-y-4 md:space-y-5 max-w-3xl leading-0 lg:leading-5 mx-auto text-center">
            <h1
              className="text-sm text-gray-600 dark:text-gray-400 group font-geist mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/20 via-gray-400/20 to-transparent dark:from-zinc-300/5 dark:via-gray-400/5 border-[2px] border-black/5 dark:border-white/5 rounded-3xl w-fit">
              {title}
              <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
            </h1>
            <h2
              className="text-3xl md:text-4xl lg:text-6xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
              {subtitle.regular}
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200">
                {subtitle.gradient}
              </span>
            </h2>
            <p className="max-w-[280px] sm:max-w-md md:max-w-2xl mx-auto text-sm sm:text-base text-gray-600 dark:text-gray-300 px-2 sm:px-4">
              {description}
            </p>

            {/* Updated buttons section */}
            <div className="items-center justify-center gap-x-4 space-y-4 sm:flex sm:space-y-0">
              {/* Updated Get Started Button with SignUp Dialog */}
              

              {/* Try Chatbot Button */}
              <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-gray-950 text-xs font-medium backdrop-blur-3xl">
                  <button
                    onClick={handleChatbotNavigation}
                    className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-zinc-300/20 via-purple-400/30 to-transparent dark:from-zinc-300/5 dark:via-purple-400/20 text-gray-900 dark:text-white border-input border-[1px] hover:bg-gradient-to-tr hover:from-zinc-300/30 hover:via-purple-400/40 hover:to-transparent dark:hover:from-zinc-300/10 dark:hover:via-purple-400/30 transition-all sm:w-auto py-4 px-10"
                  >
                    Talk with VedaVaani
                    <svg 
                      className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>
              </span>
            </div>

            {/* Feature highlights */}
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900/20 p-3">
                  <svg className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">24/7 AI Support</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Always available to answer your health queries</p>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900/20 p-3">
                  <svg className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Secure & Private</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Your health information stays confidential</p>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900/20 p-3">
                  <svg className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Fast Responses</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Get instant answers to your questions</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>)
  );
})
HeroSection.displayName = "HeroSection"

export { HeroSection };