import { motion } from "motion/react";
const CompletionRate = ({ completionRate }: { completionRate: number }) => {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-text">Completion rate</h2>

          <p className="text-sm text-text-secondary">
            Completed tasks compared with all tasks
          </p>
        </div>

        <span className="text-2xl font-bold text-primary">
          {completionRate}%
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-light">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${completionRate}%` }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 20,
          }}
          className="h-full rounded-full bg-primary"
        />
      </div>
    </div>
  );
};

export default CompletionRate;
