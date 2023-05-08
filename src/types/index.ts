import { type Proposition, type Board, type Vote } from '@prisma/client';

export interface DataBoards {
  boards: Board[];
  count: number;
}

export interface DisplayDatasBoardsProps {
  data: DataBoards | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

export interface PropositionsWithVotes extends Proposition {
  vote?: Vote[];
}

export interface DataPropositions {
  propositions: PropositionsWithVotes[];
  board: Board | null;
  count: number;
}

export interface Error {
  name: string;
}

export interface CreateVoteReturn {
  vote: Vote;
  message: string;
}

export interface DialogAddboardProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface PropositionLineProps {
  title: string;
  mutateUrl: string;
  id: number;
  voteCount: number;
  boardId: number;
}

export interface UpVoteProps {
  voteCount: number;
  propositionId: number;
  boardId: number;
  mutateUrl: string;
}

export interface IsVotedType {
  alreadyVote: Vote[];
}
