import { PrismaClient } from "@prisma/client";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import GameCard from "~/components/GameCard";
import gamelogFallback from "~/assets/svg/gamelog-logo.svg"; // You will need to add your own image here
import HeroBanner from "~/components/HeroBanner";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const prisma = new PrismaClient();

  const games = await prisma.game.findMany({
    select: {
      id: true,
      title: true,
      releaseDate: true,
      imageUrl: true,
      category: {
        select: {
          title: true,
        },
      },
    },
  });

  return json({ games });
}

export default function Index() {
  const { games } = useLoaderData<typeof loader>();

  console.log({ games });

  return (
    <div className="container mx-auto px-4">
      <HeroBanner />

      <h2 className="text-2xl font-semibold mb-6 text-white">Games</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"></div>
      <div className="container mx-auto grid grid-cols-3 gap-8 p-8">
        {games.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            title={game.title}
            releaseDate={game.releaseDate}
            genre={game.category?.title || "No Category"}
            imageUrl={game.imageUrl || gamelogFallback}
          />
        ))}
      </div>
    </div>
  );
}
