// export default function RecipeSelector({ recipes, selected, onSelect }) {
//     return (
//       <div className="grid md:grid-cols-3 gap-6">
//         {recipes.map((recipe) => (
//           <div
//             key={recipe.id}
//             className={`border p-4 rounded cursor-pointer transition-all ${
//               selected?.id === recipe.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-100"
//             }`}
//             onClick={() => onSelect(recipe)}
//           >
//             <h1>Select one recipe videos</h1>
//             <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
//             <video className="w-full h-32 object-cover mb-2" src={recipe.videoUrl} controls muted />
//             <p className="text-sm text-gray-600">{recipe.description}</p>
//           </div>
//         ))}
//       </div>
//     );
//   }

export default function RecipeSelector({ recipes, selected, onSelect }) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className={`border p-4 rounded-lg cursor-pointer transition-all shadow-sm hover:shadow-md ${
              selected?.id === recipe.id
                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-300"
                : "hover:bg-gray-50"
            }`}
            onClick={() => onSelect(recipe)}
          >
            <h3 className="text-lg font-semibold mb-2 text-center">{recipe.title}</h3>
  
            <div className="w-full h-40 mb-2 overflow-hidden rounded">
              <video
                className="w-full h-full object-cover rounded"
                src={recipe.videoUrl}
                controls
                muted
              >
                Your browser does not support the video tag.
              </video>
            </div>
  
            {recipe.description && (
              <p className="text-sm text-gray-600 text-center">{recipe.description}</p>
            )}
          </div>
        ))}
      </div>
    );
  }
  