import { useState } from "react";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import ImageUploader from "~/components/ImageUploader";

export async function loader() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany({
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  });

  prisma.$disconnect();

  return json({ categories });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const rating = parseFloat(formData.get("rating") as string);
  const releaseDate = new Date(formData.get("releaseDate") as string);
  const imageUrl = formData.get("imageUrl") as string;
  const categoryId = formData.get("categoryId") as string;

  const prisma = new PrismaClient();

  await prisma.game.create({
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

export default function AddGame() {
  const { categories } = useLoaderData<typeof loader>();
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="font-bold text-5xl text-center mb-10">
        Add <span className="text-cyan-400">Game</span>
      </h1>

      <div className="max-w-2xl mx-auto bg-gray-950 p-8 rounded-xl">
        <Form method="post" className="space-y-6">
          <input type="hidden" name="imageUrl" value={imageUrl} />

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
              required
              rows={4}
              className="w-full p-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            ></textarea>
          </div>

          <div className="mb-8">
            <ImageUploader onImageUploaded={handleImageUploaded} />
          </div>

          {/* Additional form fields for price, rating, etc. */}

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
              className=" text-red-300 border-2 border-red-300 py-3 px-6 rounded-md hover:bg-red-50/10 transition duration-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className=" bg-cyan-600 text-white py-3 px-6 rounded-md hover:bg-cyan-500 transition duration-200"
            >
              Add Game
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
