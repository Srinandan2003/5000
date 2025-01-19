import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import for route params
import { PlusCircle, MinusCircle, Activity, Utensils } from "lucide-react";
import { NutritionCircle } from "./NutritionCircle"; // Assume this is your reusable circle component

const mockApiData = {
  1: {
    id: 1,
    name: " Chicken Sandwich",
    servingSize: "1 sandwich (250g)",
    nutrition: {
      calories: 350,
      protein: 28,
      carbs: 35,
      fats: 12,
      fiber: 4,
      sugar: 3,
    },
    ingredients: ["Chicken breast", "Whole wheat bread", "Lettuce", "Tomato", "Mayo"],
    allergens: ["Wheat", "Eggs"],
    imageUrl: "/api/placeholder/400/300",
  },
  2: {
    id: 2,
    name: "Veggie Wrap",
    servingSize: "1 wrap (200g)",
    nutrition: {
      calories: 250,
      protein: 10,
      carbs: 40,
      fats: 5,
      fiber: 8,
      sugar: 2,
    },
    ingredients: ["Tortilla", "Lettuce", "Tomato", "Cucumber", "Hummus"],
    allergens: ["Wheat"],
    imageUrl: "/api/placeholder/400/300",
  },
};

const FoodDetailTracker = () => {
  const { id } = useParams(); // Get the `id` from the route
  const [foodData, setFoodData] = useState(null);
  const [servings, setServings] = useState(1);
  const [trackedItems, setTrackedItems] = useState([]);

  const DAILY_GOALS = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 65,
  };

  useEffect(() => {
    // Simulating data fetching
    const fetchData = async () => {
      const data = mockApiData[id];
      setFoodData(data);
    };

    fetchData();
  }, [id]);

  const handleAddFood = () => {
    if (!foodData || servings <= 0) return;

    const newItem = {
      ...foodData,
      servings,
      timestamp: new Date().toISOString(),
    };

    setTrackedItems((prev) => [...prev, newItem]);
    setServings(1);
  };

  if (!foodData) {
    return <p>Loading food details...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Scanned Food Details */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={foodData.imageUrl}
              alt={foodData.name}
              className="w-full md:w-1/3 h-48 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{foodData.name}</h2>
              <p className="text-gray-600 mb-4">Serving Size: {foodData.servingSize}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <div className="text-lg font-bold">{foodData.nutrition.calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <div className="text-lg font-bold">{foodData.nutrition.protein}g</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <div className="text-lg font-bold">{foodData.nutrition.carbs}g</div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <div className="text-lg font-bold">{foodData.nutrition.fats}g</div>
                  <div className="text-sm text-gray-600">Fats</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setServings(Math.max(0, servings - 0.5))}
                  className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-full"
                >
                  <MinusCircle size={24} />
                </button>
                <span className="w-16 text-center text-xl font-bold">{servings}</span>
                <button
                  onClick={() => setServings(servings + 0.5)}
                  className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-full"
                >
                  <PlusCircle size={24} />
                </button>
                <button
                  onClick={handleAddFood}
                  className="ml-4 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                >
                  Add to Daily Total
                </button>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Ingredients:</p>
                <p className="text-gray-600">{foodData.ingredients.join(", ")}</p>
                <p className="font-medium">Allergens:</p>
                <p className="text-gray-600">{foodData.allergens.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="text-emerald-500" />
            Daily Progress
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <NutritionCircle
              value={foodData.nutrition.calories * servings}
              total={DAILY_GOALS.calories}
              label="Calories"
              color="stroke-emerald-500"
            />
            <NutritionCircle
              value={foodData.nutrition.protein * servings}
              total={DAILY_GOALS.protein}
              label="Protein"
              color="stroke-blue-500"
            />
            <NutritionCircle
              value={foodData.nutrition.carbs * servings}
              total={DAILY_GOALS.carbs}
              label="Carbs"
              color="stroke-orange-500"
            />
            <NutritionCircle
              value={foodData.nutrition.fats * servings}
              total={DAILY_GOALS.fats}
              label="Fats"
              color="stroke-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailTracker;
