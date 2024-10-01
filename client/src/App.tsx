// src/App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from './components/ui/input';
import { Select, SelectItem } from './components/ui/select';
import { Button } from './components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';


// Type for category data
interface Category {
  'Category ID': string;
  'Category Name': string;
}

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showChatbot, setShowChatbot] = useState<boolean>(false);

  // Fetch categories from the backend (API)
  useEffect(() => {
    axios
      .get('/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Filtered categories for search functionality
  const filteredCategories = categories.filter(category =>
    category['Category Name'].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    if (selectedCategory) {
      setShowChatbot(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Select a Home Improvement Category</h1>

      {/* Input with search and select */}
      <div className="mb-6">
        <Select
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value)}
        >
          <Input
            placeholder="Search category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 w-full"
          />
          {filteredCategories.map((category) => (
            <SelectItem key={category['Category ID']} value={category['Category ID']}>
              {category['Category Name']}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Submit Button */}
      <Button onClick={handleSubmit} disabled={!selectedCategory}>
        Submit
      </Button>

      {/* Chatbot Popover */}
      {showChatbot && (
        <Popover>
          <PopoverTrigger>
            <Button className="fixed bottom-4 right-4">
              Chatbot
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <iframe
              src="/chatbot"
              title="Chatbot"
              className="w-full h-96"
              frameBorder="0"
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default App;
