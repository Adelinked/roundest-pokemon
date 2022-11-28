import { z } from "zod";
import { procedure, router } from "./trpc";
import * as trpc from "@trpc/server";
import { PokemonClient } from "pokenode-ts";
import { prisma } from "@/backend/router/utils/prisma";

export const appRouter = router({
  getPokemonById: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const api = new PokemonClient();
      const pokemon = await api.getPokemonById(input.id);
      return { name: pokemon.name, sprites: pokemon.sprites };
    }),
  castVote: procedure
    .input(z.object({ votedFor: z.number(), VotedAgainst: z.number() }))
    .mutation(async ({ input }) => {
      const voteInDb = await prisma.vote.create({
        data: { ...input },
      });
      return { succes: true, vote: voteInDb };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
