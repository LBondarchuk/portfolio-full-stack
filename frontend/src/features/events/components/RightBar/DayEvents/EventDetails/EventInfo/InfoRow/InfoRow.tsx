interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => {
  return (
    <div className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-gray-light">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gray-light text-text-secondary">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wide text-text-muted">
          {label}
        </p>

        <p className="truncate text-xs font-medium text-text">
          {value}
        </p>
      </div>
    </div>
  );
};



export default InfoRow