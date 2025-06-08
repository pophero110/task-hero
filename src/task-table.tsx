import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "./app/page";

type TaskTableProps = {
  tasks: Task[];
};

export default function TaskTable({ tasks }: TaskTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.name}>
            <TableCell className="font-medium">{task.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
