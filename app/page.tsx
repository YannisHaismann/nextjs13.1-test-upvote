import { type NextPage } from 'next';
import LinkBtn from '~/src/components/form/LinkBtn';

export default function Home(): JSX.Element {
  return (
    <div className="min-h-full">
      <h1 className="text-3xl text-center font-bold my-10">
        Choisis le mode que tu veux tester
      </h1>
      <div className="flex gap-5 justify-center">
        <LinkBtn
          text="Board (Full Server Side)"
          href={`/board?ssr=true&pagination=1`}
          color="bg-gray-800"
          hoverColor="hover:bg-gray-700"
          className="border-gray-700 p-6"
        />
        <LinkBtn
          text="Board (Client Side)"
          href={`/board?ssr=false&pagination=1`}
          color="bg-gray-800"
          hoverColor="hover:bg-gray-700"
          className="border-gray-700 p-6"
        />
      </div>
    </div>
  );
}
