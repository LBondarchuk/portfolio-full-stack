import Button from "../../../../../../../components/buttons/Button/Button";
import DeleteIcon from "../../../../../../../components/Icons/Delete";
import EditIcon from "../../../../../../../components/Icons/Edit";

const Actions = () => {
  return (
    <div className="border-t border-border p-4">
      <div className="grid grid-cols-2 gap-2">
        <Button variant="ghost" className="border-[0.1px] rounded-md!" >
          <div className="flex items-center justify-center gap-2 ">
            <EditIcon className="h-3.5! w-3.5!" />
            <span className="text-xs ">Edit</span>
          </div>
        </Button>
        <Button variant="danger" className="rounded-md!" >
          <div className="flex items-center justify-center gap-2 w-full">
            <DeleteIcon className="h-3.5! w-3.5!" />
            <span className="text-xs "> Delete</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Actions;
