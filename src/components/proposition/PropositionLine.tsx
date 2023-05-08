import { type PropositionLineProps } from '~/src/types';
import { UpVote } from './UpVote';

export const PropositionLine = ({
  title,
  id,
  voteCount,
  boardId,
  mutateUrl,
}: PropositionLineProps): JSX.Element => {
  return (
    <div className="p-6 flex justify-between items-center rounded-lg shadow bg-gray-800 border-gray-700 gap-2 w-full">
      <h5 className="text-2xl font-bold tracking-tight text-white">{title}</h5>
      <UpVote
        mutateUrl={mutateUrl}
        boardId={boardId}
        voteCount={voteCount}
        propositionId={id}
      />
    </div>
  );
};
