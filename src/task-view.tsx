import { FormEvent, useEffect, useState } from "react";
import { Task } from "./app/page";
import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import "@milkdown/crepe/theme/nord.css";
import "@milkdown/crepe/theme/common/style.css";
import "./custom-milkdown.css";
import Timeline from "./timeline";
import { Input } from "./components/ui/input";
type TaskViewProps = {
  task: Task;
};

export default function TaskView({ task }: TaskViewProps) {
  const [name, setName] = useState<string>(task.name);

  useEffect(() => {
    setName(task.name);
  }, [task]);

  const [items, setItems] = useState([
    { time: new Date().toLocaleTimeString(), content: "First step" },
    { time: new Date().toLocaleTimeString(), content: "Second step" },
    { time: new Date().toLocaleTimeString(), content: "Third step" },
  ]);

  const [content, setContent] = useState("");

  const addStep = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (content.trim()) {
      setItems([...items, { time: new Date().toLocaleTimeString(), content }]);
      setContent("");
    }
  };

  return (
    <div className="flex flex-col h-screen space-y-3">
      <input
        className="appearance-none border-none bg-transparent shadow-none focus:outline-none text-4xl"
        type="text"
        required
        autoComplete="off"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <MilkdownProvider>
        <CrepeEditor />
      </MilkdownProvider>
      <form onSubmit={addStep}>
        <Input
          className="focus-visible:ring-[0px]"
          id="step"
          type="text"
          autoComplete="off"
          placeholder="Enter new step"
          required
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </form>
      <Timeline items={items} />
    </div>
  );
}
const CrepeEditor: React.FC = () => {
  const { get } = useEditor((root) => {
    return new Crepe({
      root,
      featureConfigs: {
        placeholder: {
          text: "Description",
        },
      },
    });
  });

  return <Milkdown />;
};
