export const availableStatus = [
  {
    id: 'todo',
    name: 'Todo',
  },
  {
    id: 'in-progress',
    name: 'In Progress',
  },
  {
    id: 'done',
    name: 'Done',
  },
];

export function getStatusById(id) {
  return availableStatus.find((status) => status.id === id);
}
