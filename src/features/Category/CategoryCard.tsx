type Props = {
  data: {
    img: string;
    title: string;
    description: string;
  };
};

export default function CategoryCard({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition">
      <img src={data.img} className="h-48 w-full object-cover" />

      <div className="p-5">
        <h3 className="text-xl font-bold">{data.title}</h3>
        <p className="text-gray-600 mt-2">{data.description}</p>

        <button className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
          Discover
        </button>
      </div>
    </div>
  );
}
