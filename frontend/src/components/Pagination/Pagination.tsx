import ArrowDownIcon from "../Icons/ArrowDown";

type Props = {
  page: number
  maxPages: number
  onPageChange:(nextPage:number)=> void
}
const Pagination = ({page, maxPages, onPageChange}: Props) => {
  return (
    <div className="grid w-fit grid-cols-[auto_auto_auto] items-center rounded-md border border-border bg-surface">
      <button
        type="button"
        disabled={ page <=1}
        className="grid h-9 w-9 place-items-center rounded-l-md transition-colors duration-200 hover:bg-gray-light"
             onClick={()=>{onPageChange(page-1)}}
      >
        <ArrowDownIcon className="h-4 w-4 rotate-90" />
      </button>

      <span className="grid h-9 min-w-14 place-items-center border-x border-border px-2 text-sm font-medium text-text">
        {page} / { maxPages}
      </span>

      <button
        type="button"
         disabled={ page >=maxPages}
        className="grid h-9 w-9 place-items-center rounded-r-md transition-colors duration-200 hover:bg-gray-light"
        onClick={()=>{onPageChange(page+1)}}
      >
        <ArrowDownIcon className="h-4 w-4 -rotate-90" />
      </button>
    </div>
  );
};

export default Pagination;