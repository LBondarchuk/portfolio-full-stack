type Props = {
    score: number,
    bestScore: number
}
const ScoreBoard = ({score,bestScore}:Props) => {
  return (
     <div className="mb-5 flex w-full gap-3">
          <div className="min-w-24 rounded-xl border border-border bg-surface px-5 py-3 text-center shadow-sm">
            <span className="block text-xs font-bold uppercase tracking-wider text-text-muted">
              Score
            </span>

            <span className="mt-1 block text-xl font-black text-text">
              {score}
            </span>
          </div>

          <div className="min-w-24 rounded-xl border border-border bg-surface px-5 py-3 text-center shadow-sm">
            <span className="block text-xs font-bold uppercase tracking-wider text-text-muted">
              Best
            </span>

            <span className="mt-1 block text-xl font-black text-text">
              {bestScore}
            </span>
          </div>
        </div>
  );
};

export default ScoreBoard;