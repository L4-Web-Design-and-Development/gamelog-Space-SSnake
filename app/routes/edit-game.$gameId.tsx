import { useState } from "react";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import ImageUploader from "~/components/ImageUploader";

export async function loader({ params }: LoaderFunctionArgs) {
  const gameId = params.gameId;

  const prisma = new PrismaClient();

  const game = await prisma.game.findUnique({
    where: { id: gameId },
  });

  if (!game) {
    throw new Response("Game not found", { status: 404 });
  }

  const categories = await prisma.category.findMany({
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  });

  prisma.$disconnect();

  return json({ game, categories });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const gameId = params.gameId;
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const rating = parseFloat(formData.get("rating") as string);
  const releaseDate = new Date(formData.get("releaseDate") as string);
  const imageUrl = formData.get("imageUrl") as string;
  const categoryId = formData.get("categoryId") as string;

  const prisma = new PrismaClient();

  await prisma.game.update({
    where: { id: gameId },
    data: {
      title,
      description,
      price,
      rating,
      releaseDate,
      imageUrl,
      categoryId,
    },
  });

  prisma.$disconnect();

  return redirect("/");
}

export default function EditGame() {
  const { game, categories } = useLoaderData<typeof loader>();
  const [imageUrl, setImageUrl] = useState(game.imageUrl || "");

  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
  };

  // Format the date to YYYY-MM-DD for the date input
  const formattedDate = new Date(game.releaseDate).toISOString().split("T")[0];

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="font-bold text-5xl text-center mb-10">
        Edit <span className="text-cyan-400">Game</span>
      </h1>

      <div className="max-w-2xl mx-auto bg-gray-950 p-8 rounded-xl">
        <Form method="post" className="space-y-6">
          <input type="hidden" name="imageUrl" value={imageUrl} />

          {/* Form fields with defaultValue set to current game data */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium mb-2 text-slate-400"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={game.title}
              required
              className="w-full p-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2 text-slate-400"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={game.description}
              required
              rows={4}
              className="w-full p-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            ></textarea>
          </div>

          <div className="mb-8">
            <ImageUploader onImageUploaded={handleImageUploaded} />
            {imageUrl && (
              <div className="mt-2">
                <p className="text-sm text-slate-400">Current image:</p>
                <img
                  src={imageUrl}
                  alt={game.title}
                  className="mt-1 h-20 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium mb-2 text-slate-400"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                defaultValue={game.price}
                step="0.01"
                min="0"
                required
                className="w-full p-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium mb-2 text-slate-400"
              >
                Rating
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                defaultValue={game.rating}
                step="0.1"
                min="0"
                max="5"
                required
                className="w-full p-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="releaseDate"
              className="block text-sm font-medium mb-2 text-slate-400"
            >
              Release Date
            </label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              defaultValue={formattedDate}
              required
              className="w-full p-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium mb-2 text-slate-400"
            >
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              defaultValue={game.categoryId || ""}
              required
              className="w-full p-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-16">
            <Link
              to="/"
              className="text-red-300 border-2 border-red-300 py-3 px-6 rounded-md hover:bg-red-50/10 transition duration-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-cyan-600 text-white py-3 px-6 rounded-md hover:bg-cyan-500 transition duration-200"
            >
              Update Game
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
