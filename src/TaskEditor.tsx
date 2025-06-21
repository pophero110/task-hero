import { FormEvent, useEffect, useState } from "react";
import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import "@milkdown/crepe/theme/nord.css";
import "@milkdown/crepe/theme/common/style.css";
import "./custom-milkdown.css";
import Timeline from "./Timeline";
import { Input } from "./components/ui/input";
import type { Result, Step, Task } from "./store/localStorageService";
type TaskEditorProps = {
  task: Task;
  handleUpdateTask: (task: Task) => Result<Task>;
};

export default function TaskEditor({
  task,
  handleUpdateTask,
}: TaskEditorProps) {
  const [name, setName] = useState(task.name);
  const [steps, setSteps] = useState(task.steps);
  const [stepDescription, setStepDescription] = useState("");

  useEffect(() => {
    setName(task.name);
    setSteps(task.steps);
  }, [task]);

  const handleAddTaskStep = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const description = stepDescription.trim();
    if (!description) return;

    const newStep: Step = {
      description,
      created: new Date().toISOString(),
    };

    const updatedSteps = [...steps, newStep];
    setSteps(updatedSteps);
    handleUpdateTask({ ...task, steps: updatedSteps });
    setStepDescription("");
  };

  return (
    <div className="flex flex-col h-screen space-y-3">
      <input
        className="appearance-none border-none bg-transparent shadow-none focus:outline-none text-4xl"
        type="text"
        required
        autoComplete="off"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <MilkdownProvider>
        <CrepeEditor />
      </MilkdownProvider>

      <form onSubmit={handleAddTaskStep}>
        <Input
          className="focus-visible:ring-0"
          id="step"
          type="text"
          required
          autoComplete="off"
          placeholder="Enter new step"
          value={stepDescription}
          onChange={(e) => setStepDescription(e.target.value)}
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
