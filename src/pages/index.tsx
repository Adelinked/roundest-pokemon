import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { trpc } from "@/utils/trpc";
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { useState } from "react";

const Home: NextPage = () => {
  const [ids, setIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;
  const firstPokemon = trpc.getPokemonById.useQuery({ id: first });
  const secondPokemon = trpc.getPokemonById.useQuery({ id: second });

  if (firstPokemon.isLoading || secondPokemon.isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center text-2xl">
        ...Loading
      </div>
    );
  const voteForRoundest = (selected: number) => {
    //
    setIds(getOptionsForVote());
  };
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen ">
      <div className="text-2xl text-center">Which Pokemon is Rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 items-center flex justify-between max-w-2xl">
        <div className="w-64 h-64 flex flex-col items-center justify-center">
          <img
            className="w-full"
            src={firstPokemon.data?.sprites.front_default}
          />
          <div className="text-xl capitalize mt-[-2rem]">
            {firstPokemon.data?.name}
          </div>
          <div className="pt-2"></div>
          <button
            className="border rounded p-2"
            onClick={() => voteForRoundest(first)}
          >
            Rounder
          </button>
        </div>
        <div className="p-8"> Vs </div>
        <div className="w-64 h-64 flex flex-col items-center justify-center">
          <img
            className="w-full"
            src={secondPokemon.data?.sprites.front_default}
          />
          <div className="text-xl capitalize mt-[-2rem]">
            {secondPokemon.data?.name}
          </div>
          <div className="pt-2"></div>

          <button
            className="border rounded p-2"
            onClick={() => voteForRoundest(second)}
          >
            Rounder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
