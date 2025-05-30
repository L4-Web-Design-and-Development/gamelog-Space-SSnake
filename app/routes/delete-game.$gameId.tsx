import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

export async function action({ params }: ActionFunctionArgs) {
  const gameId = params.gameId;

  const prisma = new PrismaClient();

  // Delete the game from the database
  await prisma.game.delete({
    where: { id: gameId },
  });

  prisma.$disconnect();

  // Redirect back to the home page
  return redirect("/");
}

// No need for a default export since this route only handles the action
