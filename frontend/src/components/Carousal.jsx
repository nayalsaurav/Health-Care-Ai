import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ShoppingCart,
  ExternalLink,
} from "lucide-react";

const ayurvedicMedicines = [
  {
    id: 2,
    name: "Triphala",
    description:
      "A traditional Ayurvedic formulation consisting of three fruits that support digestive health.",
    benefits: [
      "Improves digestion",
      "Cleanses the colon",
      "Reduces inflammation",
      "Supports regular bowel movements",
    ],
    imageUrl:
      "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/triphala-ayurvedic-fruits-1296x728.jpg?w=1155&h=1528", // Update if needed
    dosage: "500-1000mg before bed with warm water",
    purchaseLinks: {
      amazon: "https://www.amazon.in/s?k=triphala+supplement",
      flipkart: "https://www.flipkart.com/search?q=triphala",
    },
  },
  {
    id: 3,
    name: "Turmeric (Curcumin)",
    description:
      "A powerful anti-inflammatory and antioxidant herb used in Ayurvedic medicine for centuries.",
    benefits: [
      "Reduces inflammation",
      "Supports joint health",
      "Improves digestion",
      "Boosts immunity",
    ],
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/002/973/449/small/fresh-turmeric-roots-in-the-basket-on-wooden-table-free-photo.jpg", // Update if needed
    dosage: "500mg 1-2 times daily with black pepper for better absorption",
    purchaseLinks: {
      amazon: "https://www.amazon.in/s?k=turmeric+curcumin+supplement",
      flipkart: "https://www.flipkart.com/search?q=turmeric+curcumin",
    },
  },
  {
    id: 4,
    name: "Brahmi (Bacopa Monnieri)",
    description:
      "An herb known for its cognitive-enhancing properties and support for the nervous system.",
    benefits: [
      "Enhances memory",
      "Reduces anxiety",
      "Improves cognitive function",
      "Supports brain health",
    ],
    imageUrl: "https://gachwala.in/wp-content/uploads/2022/06/BRAHMI-3-1.webp", // Update if needed
    dosage: "300mg daily with meals",
    purchaseLinks: {
      amazon: "https://www.amazon.in/s?k=brahmi+bacopa+supplement",
      flipkart: "https://www.flipkart.com/search?q=brahmi+bacopa",
    },
  },
  {
    id: 5,
    name: "Shatavari",
    description:
      "A rejuvenating herb for women's health that balances hormones and supports the reproductive system.",
    benefits: [
      "Balances hormones",
      "Supports female reproductive health",
      "Boosts immunity",
      "Improves energy",
    ],
    imageUrl: "https://m.media-amazon.com/images/I/71fX9jdQvDL.jpg", // Update if needed
    dosage: "500-1000mg twice daily",
    purchaseLinks: {
      amazon: "https://www.amazon.in/s?k=shatavari+supplement",
      flipkart: "https://www.flipkart.com/search?q=shatavari",
    },
  },
  {
    id: 6,
    name: "Amla (Indian Gooseberry)",
    description:
      "A vitamin C-rich fruit that boosts immunity and promotes healthy skin and hair.",
    benefits: [
      "Rich in antioxidants",
      "Supports immune system",
      "Promotes healthy hair and skin",
      "Aids digestion",
    ],
    imageUrl:
      "https://www.jiomart.com/images/product/original/590000126/amla-indian-gooseberry-250-g-product-images-o590000126-p590000126-0-202409251835.jpg?im=Resize=(420,420)", // Update if needed
    dosage: "500-1000mg daily",
    purchaseLinks: {
      amazon: "https://www.amazon.in/s?k=amla+supplement",
      flipkart: "https://www.flipkart.com/search?q=amla+powder",
    },
  },
  {
    id: 7,
    name: "Guduchi (Giloy)",
    description:
      "An immune-boosting herb that helps fight infections and supports overall health.",
    benefits: [
      "Boosts immunity",
      "Reduces fever",
      "Detoxifies the body",
      "Anti-inflammatory properties",
    ],
    imageUrl:
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/plant-sapling/f/z/w/no-perennial-yes-giloye-giloy-plant-guduchi-guruch-fresh-stems-6-original-imafyy4tfgypuqxx.jpeg?q=20&crop=false", // Update if needed
    dosage: "500mg twice daily",
    purchaseLinks: {
      amazon: "https://www.amazon.in/s?k=giloy+supplement",
      flipkart: "https://www.flipkart.com/search?q=giloy",
    },
  },
  {
    id: 8,
    name: "Neem",
    description:
      "A powerful herb with antibacterial, antifungal, and blood-purifying properties.",
    benefits: [
      "Purifies blood",
      "Supports skin health",
      "Detoxifies the body",
      "Antimicrobial properties",
    ],
    imageUrl:
      "https://www.toothmountainnursery.com/wp-content/uploads/2020/03/Neem.jpg", // Update if needed
    dosage: "500mg twice daily",
    purchaseLinks: {
      amazon: "https://www.amazon.in/s?k=neem+supplement",
      flipkart: "https://www.flipkart.com/search?q=neem+tablets",
    },
  },
];


const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ayurvedicMedicines.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ayurvedicMedicines.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentMedicine = ayurvedicMedicines[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden p-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        Ayurvedic Medicine Suggestions
      </h2>
      <div className="relative">
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        <div className="flex flex-col md:flex-row items-center">
          <img
            src={currentMedicine.imageUrl}
            alt={currentMedicine.name}
            className="w-full md:w-1/3 h-64 object-cover rounded-lg"
          />

          <div className="md:w-2/3 p-4">
            <h3 className="text-xl font-bold mb-2">{currentMedicine.name}</h3>
            <p className="text-gray-300 mb-4">{currentMedicine.description}</p>
            <ul className="list-disc pl-5 text-gray-400 mb-4">
              {currentMedicine.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <p className="text-gray-400 mb-4">
              <span className="font-semibold">Dosage:</span>{" "}
              {currentMedicine.dosage}
            </p>
            <div className="flex gap-3">
              <a
                href={currentMedicine.purchaseLinks.amazon}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600"
              >
                <ShoppingCart size={18} /> Buy on Amazon{" "}
                <ExternalLink size={14} />
              </a>
              <a
                href={currentMedicine.purchaseLinks.flipkart}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <ShoppingCart size={18} /> Buy on Flipkart{" "}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
