type Props = {
    title: string
}

const EventTitle = ({title}: Props) => {
  return (
   <div className="rounded-2xl bg-primary-light p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />

              <span className="text-xs font-medium text-primary">
                Upcoming event
              </span>
            </div>

            <h3 className="text-lg font-semibold tracking-tight text-text">
              {title}
            </h3>
          </div>
  );
};

export default EventTitle;