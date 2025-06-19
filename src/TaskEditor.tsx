import { FormEvent, useEffect, useState } from "react";
import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import "@milkdown/crepe/theme/nord.css";
import "@milkdown/crepe/theme/common/style.css";
import "./custom-milkdown.css";
import Timeline from "./timeline";
import { Input } from "./components/ui/input";
import { Step, Task } from "./store/localStorageService";
type TaskEditorProps = {
  task: Task;
};

export default function TaskEditor({ task }: TaskEditorProps) {
  const [name, setName] = useState<string>(task.name);

  useEffect(() => {
    setName(task.name);
  }, [task]);

  const [steps, setSteps] = useState<Step[]>([
    { created: new Date().toLocaleTimeString(), description: "First step" },
    { created: new Date().toLocaleTimeString(), description: "Second step" },
    { created: new Date().toLocaleTimeString(), description: "Third step" },
  ]);

  const [step, setStep] = useState("");

  const handleAddTaskStep = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step.trim()) {
      setSteps([
        ...steps,
        { created: new Date().toLocaleTimeString(), description: step },
      ]);
      setStep("");
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
      <form onSubmit={handleAddTaskStep}>
        <Input
          className="focus-visible:ring-[0px]"
          id="step"
          type="text"
          autoComplete="off"
          placeholder="Enter new step"
          required
          onChange={(e) => setStep(e.target.value)}
          value={step}
        />
      </form>
      <Timeline items={steps} />
    </div>
  );
}

const CrepeEditor: React.FC = () => {
  const { get } = useEditor((root) => {
    const crepe = new Crepe({
      root,
      features: {
        "code-mirror": true, // Syntax highlighting in code blocks
        "list-item": true, // Bullet, ordered, todo lists
        "link-tooltip": true, // Link tooltips for edit/copy
        cursor: true, // Drop and gap cursors
        "image-block": true, // Image upload and resizing
        "block-edit": true, // Drag & drop blocks and slash commands
        toolbar: true, // Formatting toolbar on selected text
        placeholder: true, // Placeholder text when empty
        table: true, // Table editing with drag & drop
        latex: true, // Inline and block math formulas
      },
      featureConfigs: { placeholder: { text: "Description" } },
    });

    crepe.on((listener) => {
      listener.markdownUpdated((ctx, markdown) => {
        console.log("Markdown updated:", markdown);
        // Save markdown here
      });

      listener.updated(() => {
        console.log("Document updated");
      });

      listener.focus(() => {
        console.log("Editor focused");
      });

      listener.blur(() => {
        console.log("Editor blurred");
      });
    });

    return crepe;
  });

  return <Milkdown />;
};
