import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "./components/ui/scroll-area";

export default function Timeline({ items }) {
  return (
    <ScrollArea className="w-full h-screen">
      <div className="border-gray-200 space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="relative">
            <span className="absolute -left-0 top-0 w-5 h-5 bg-blue-300 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {idx + 1}
            </span>
            <Card>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-1">
                  {item.time}
                </p>
                <p className="text-base">{item.content}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
