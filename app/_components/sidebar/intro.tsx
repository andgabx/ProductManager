"use client";

import { cn } from "@/app/_lib/utils";
import { Button } from "@/app/_components/ui/button";
import Image from "next/image";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { stepContent } from "./step-content";


export default function Component() {
  const [step, setStep] = useState(1);

  
  const totalSteps = stepContent.length;

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <DialogContent className="gap-0 p-0 [&>button:last-child]:text-white">
      <div className="p-2">
        <Image
          src="/teste.jpg"
          alt="Project Explanation"
          width={1200}
          height={1200}
        />
      </div>






      <div className="space-y-6 px-6 pb-6 pt-3">
        <DialogHeader>
          <DialogTitle>{stepContent[step - 1].title}</DialogTitle>
          <DialogDescription>
            {stepContent[step - 1].description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex justify-center space-x-1.5 max-sm:order-1">
            {[...Array(totalSteps)].map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1.5 w-1.5 rounded-full bg-primary",
                  index + 1 === step ? "bg-primary" : "opacity-20",
                )}
              />
            ))}
          </div>
          <DialogFooter>
            {step > 1 && (
              <Button type="button" variant="outline" onClick={handleBack}>
                <ArrowLeft
                  className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Voltar
              </Button>
            )}
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Pular
              </Button>
            </DialogClose>

            {step < totalSteps ? (
              <Button
                variant="outline"
                className="group"
                type="button"
                onClick={handleContinue}
              >
                Próximo
                <ArrowRight
                  className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Button>
            ) : (
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Concluir
                </Button>
              </DialogClose>
            )}
          </DialogFooter>
        </div>
      </div>
    </DialogContent>
  );
}
