import React, { useState, useEffect } from "react";
import { PlusCircle, MinusCircle, Activity, Utensils, Apple } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// This would come from your QR scan
const SCANNED_FOOD_EXAMPLE = {
  name: "Grilled Chicken Sandwich",
  servingSize: "1 sandwich (250g)",
  nutrition: {
    calories: 350,
    protein: 28,
    carbs: 35,
    fats: 12,
    fiber: 4,
    sugar: 3
  },
  ingredients: ["Chicken breast", "Whole wheat bread", "Lettuce", "Tomato", "Mayo"],
  allergens: ["Wheat", "Eggs"],
  imageUrl: "/api/placeholder/400/300"
};

const NutritionCircle = ({ value, total, label, color }) => {
  const percentage = Math.min((value / total) * 100, 100);
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="45"
            className="fill-none stroke-gray-200"
            strokeWidth="6"
          />
          <circle
            cx="48"
            cy="48"
            r="45"
            className={`fill-none ${color}`}
            strokeWidth="6"
            strokeDasharray={`${percentage * 2.827} 282.7`}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-xl font-bold">{Math.round(value)}</div>
          <div className="text-xs text-gray-500">/ {total}</div>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium">{label}</span>
    </div>
  );
};

const FoodDetailTracker = ({ scannedFood = SCANNED_FOOD_EXAMPLE }) => {
  const [servings, setServings] = useState(1);
  const [dailyTotals, setDailyTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  });
  const [trackedItems, setTrackedItems] = useState([]);

  const DAILY_GOALS = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 65
  };

  useEffect(() => {
    const savedItems = localStorage.getItem('trackedItems');
    if (savedItems) {
      setTrackedItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    const totals = trackedItems.reduce((acc, item) => ({
      calories: acc.calories + (item.nutrition.calories * item.servings),
      protein: acc.protein + (item.nutrition.protein * item.servings),
      carbs: acc.carbs + (item.nutrition.carbs * item.servings),
      fats: acc.fats + (item.nutrition.fats * item.servings)
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

    setDailyTotals(totals);
    localStorage.setItem('trackedItems', JSON.stringify(trackedItems));
  }, [trackedItems]);

  const handleAddFood = () => {
    if (servings <= 0) return;
    
    const newItem = {
      ...scannedFood,
      servings,
      timestamp: new Date().toISOString()
    };

    setTrackedItems(prev => [...prev, newItem]);
    setServings(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Scanned Food Details */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={scannedFood.imageUrl}
              alt={scannedFood.name}
              className="w-full md:w-1/3 h-48 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{scannedFood.name}</h2>
              <p className="text-gray-600 mb-4">Serving Size: {scannedFood.servingSize}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <div className="text-lg font-bold">{scannedFood.nutrition.calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <div className="text-lg font-bold">{scannedFood.nutrition.protein}g</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <div className="text-lg font-bold">{scannedFood.nutrition.carbs}g</div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <div className="text-lg font-bold">{scannedFood.nutrition.fats}g</div>
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
                <p className="text-gray-600">{scannedFood.ingredients.join(", ")}</p>
                <p className="font-medium">Allergens:</p>
                <p className="text-gray-600">{scannedFood.allergens.join(", ")}</p>
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
              value={dailyTotals.calories}
              total={DAILY_GOALS.calories}
              label="Calories"
              color="stroke-emerald-500"
            />
            <NutritionCircle
              value={dailyTotals.protein}
              total={DAILY_GOALS.protein}
              label="Protein"
              color="stroke-blue-500"
            />
            <NutritionCircle
              value={dailyTotals.carbs}
              total={DAILY_GOALS.carbs}
              label="Carbs"
              color="stroke-orange-500"
            />
            <NutritionCircle
              value={dailyTotals.fats}
              total={DAILY_GOALS.fats}
              label="Fats"
              color="stroke-purple-500"
            />
          </div>
        </div>

        {/* Today's Log */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Utensils className="text-emerald-500" />
            Today's Food Log
          </h2>
          <div className="space-y-4">
            {trackedItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.servings} {item.servings === 1 ? 'serving' : 'servings'} • 
                    {item.nutrition.calories * item.servings} calories
                  </p>
                </div>
                <button
                  onClick={() => setTrackedItems(prev => prev.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            {trackedItems.length === 0 && (
              <p className="text-center text-gray-500">No items logged yet today</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailTracker;