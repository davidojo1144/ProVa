"use client";

import { Minus, Plus, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCounterStore } from "@/store/counter-store";

export function CounterDemo() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zustand</CardTitle>
        <CardDescription>Global state without a provider.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={decrement}>
          <Minus className="size-4" />
        </Button>
        <span className="w-10 text-center font-mono text-lg tabular-nums">
          {count}
        </span>
        <Button variant="outline" size="icon" onClick={increment}>
          <Plus className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={reset} aria-label="Reset">
          <RotateCcw className="size-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
