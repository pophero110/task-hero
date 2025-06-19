import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "./components/ui/scroll-area";
import type { Step } from "./store/localStorageService";

type TimelineProps = {
  items: Step[];
};

export default function Timeline({ items }: TimelineProps) {
  return (
    <ScrollArea className="w-full h-screen">
      <div className="border-gray-200 space-y-2">
        {items.map((item, idx) => (
          <div key={item.created} className="relative">
            <span className="absolute -left-0 top-0 w-5 h-5 bg-blue-300 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {idx + 1}
            </span>
            <Card>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-1">
                  {item.created}
                </p>
                <p className="text-base">{item.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
