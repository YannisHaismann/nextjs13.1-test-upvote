'use client';

import { type FC, Fragment, useState, useTransition } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import addItem from '~/src/db/boards/addItem';
import { usePathname, useSearchParams } from 'next/navigation';
import { type DialogAddboardProps } from '~/src/types';

const DialogAddboard: FC<DialogAddboardProps> = ({
  isOpen,
  setIsOpen,
}): JSX.Element => {
  const [question, setQuestion] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}?${searchParams?.toString()}`;

  const createQuestion = function (): void {
    startTransition(() => {
      // Don't work
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      addItem(question, url);
    });
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Ajout d&apos;une question
                </Dialog.Title>
                <div className="mt-2 mb-4">
                  <p className="text-sm text-gray-500">
                    Veuillez entrer une nouvelle question à ajouter au board.
                  </p>
                </div>

                <div className="flex flex-col gap-1 text-indigo-500 font-medium">
                  <label htmlFor="question">Question</label>
                  <input
                    onChange={(e) => {
                      setQuestion(e.target.value);
                    }}
                    className="p-3 border-none rounded-lg outline-indigo-500 ring-none bg-indigo-300 text-indigo-700"
                    id="question"
                    type="text"
                  />
                </div>

                <div className="mt-4 flex gap-2 justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent transition-colors duration-100 bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent transition-colors duration-100 bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      createQuestion();
                    }}
                  >
                    {isPending ? 'Loading' : 'Créer'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogAddboard;
