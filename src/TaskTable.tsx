import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "./components/ui/checkbox";
import { useState } from "react";
import { Task } from "./store/localStorageService";

type TaskTableProps = {
  tasks: Task[];
  onSelectRow: (task: Task) => void;
};

export default function TaskTable({ tasks, onSelectRow }: TaskTableProps) {
  return (
    <Table>
      <TableBody>
        {tasks.map((task) => (
          <TaskRow onSelect={onSelectRow} key={task.id} task={task} />
        ))}
      </TableBody>
    </Table>
  );
}

type TaskRowProps = {
  task: Task;
  onSelect: (task: Task) => void;
};

function TaskRow({ task, onSelect }: TaskRowProps) {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <TableRow onClick={() => onSelect(task)} key={task.name}>
      <TableCell>
        <Checkbox
          checked={checked}
          onCheckedChange={(checkState) => setChecked(checkState as boolean)}
          onClick={(e) => e.stopPropagation()}
        />
      </TableCell>
      <TableCell className="font-medium">{task.id}</TableCell>
      <TableCell className="font-medium">{task.name}</TableCell>
    </TableRow>
  );
}
