'use client';

import { toast } from 'react-hot-toast';
import { IoIosArrowUp } from 'react-icons/io';
import useSWR, { useSWRConfig } from 'swr';
import { type IsVotedType, type UpVoteProps } from '~/src/types';

const fetcher = async (
  ...args: [RequestInfo, RequestInit?]
): Promise<IsVotedType> =>
  await fetch(...args).then(async (res) => await res.json());

const onError = (): string => toast.error('You can only vote once');

export const UpVote = ({
  voteCount,
  propositionId,
  boardId,
  mutateUrl,
}: UpVoteProps): JSX.Element => {
  const { mutate } = useSWRConfig();
  const GET_ISVOTED_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/propositions/${boardId}/${propositionId}/isVoted`;

  const { data } = useSWR(GET_ISVOTED_API_URL, fetcher);

  const handleClick = (): void => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/propositions/${boardId}/${propositionId}/votes`,
      {
        method: 'POST',
      }
    )
      .then((res) => {
        if (res.status === 201) {
          void mutate(mutateUrl);
          void mutate(GET_ISVOTED_API_URL);
          return;
        }
        onError();
      })
      .catch(() => {
        onError();
      });
  };

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col border-2 items-center px-8 py-2 rounded-md ${
        data?.alreadyVote?.length
          ? 'border-green-600 bg-green-900'
          : 'border-gray-600 bg-gray-900'
      } bg-opacity-50 hover:bg-opacity-75`}
    >
      <IoIosArrowUp fontSize={24} />
      <span className="text-xl font-bold">{voteCount}</span>
    </button>
  );
};
