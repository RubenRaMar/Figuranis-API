import { Types } from "mongoose";
import {
  type RequestUpdateFigureStructure,
  type FigureIdData,
  type RequestFigureData,
} from "../../types.js";

export const figuresMock: FigureIdData[] = [
  {
    _id: new Types.ObjectId("5f234c24c2a7890123456789"),
    title: "Goku SS4",
    character: "Goku",
    franchise: "Dragon Ball",
    isPurchased: true,
    manufacturer: "Break Studio",
    material: "Resin",
    size: 31,
    weight: 2.67,
    price: 95,
    image:
      "https://www.kaionation.com/wp-content/uploads/2023/05/Image_20230506143056-681x1024.jpg",
    userId: new Types.ObjectId("6494430a47f8ed0069ec52ac"),
  },
  {
    _id: new Types.ObjectId("a1b2c3d4e5f6a7b8c9d0e1f2"),
    title: "Naruto 8thdays",
    character: "Naruto",
    franchise: "Naruto",
    isPurchased: false,
    manufacturer: "Studio Kakashi Hatake",
    material: "Resina",
    size: 65,
    weight: 5.23,
    price: 245.99,
    image: "https://www.kaionation.com/wp-content/uploads/2023/04/aa-43.jpg",
    userId: new Types.ObjectId("6494430a47f8ed0069ec52ac"),
  },
  {
    _id: new Types.ObjectId("abcdef123456789012345678"),
    title: "Nika Luffy",
    character: "Luffy",
    franchise: "One Piece",
    isPurchased: true,
    manufacturer: "ATT Studio",
    material: "Resina",
    size: 41,
    weight: 3.32,
    price: 269.9,
    image:
      "https://www.kaionation.com/wp-content/uploads/2023/05/44-2-641x1024.webp",
    userId: new Types.ObjectId("6494430a47f8ed0069ec52ac"),
  },
  {
    _id: new Types.ObjectId("0123456789abcdefabcdef12"),
    title: "Metal Cooler",
    character: "Cooler",
    franchise: "Dragon Ball",
    isPurchased: true,
    manufacturer: "S.H. Figuarts Tamashii Nations Bandai Spirits",
    material: "ABS",
    size: 14.5,
    weight: 0.6,
    price: 99.9,
    image:
      "https://www.global-freaks.com/196309-pdt_540/dragon-ball-z-metal-cooler-sh-figuarts-tamashii-nations-bandai-spirits.jpg",
    userId: new Types.ObjectId("6494430a47f8ed0069ec52ac"),
  },
  {
    _id: new Types.ObjectId("f0e1d2c3b4a5968778695a4b"),
    title: "Enel the god of thunder",
    character: "Enel",
    franchise: "One Piece",
    isPurchased: true,
    manufacturer: "Jimei Palace",
    material: "Resin + LED",
    size: 62,
    weight: 9.87,
    price: 1_599,
    image:
      "https://kurogami.com/med/img/productos/37/70/FIGURA_SABER_ALTER_FATE_STAY_NIGHT_HEAVENS_FEEL_POP_UP_PARADE_1.webp",
    userId: new Types.ObjectId("6494430a47f8ed0069ec52ac"),
  },
];

export const requestFiguresMock: RequestFigureData = {
  title: "Goku SS4",
  character: "Goku",
  franchise: "Dragon Ball",
  isPurchased: true,
  manufacturer: "Break Studio",
  material: "Resin",
  size: 31,
  weight: 2.67,
  price: 95,
  image:
    "https://www.kaionation.com/wp-content/uploads/2023/05/Image_20230506143056-681x1024.jpg",
};

export const requestFiguresUdgrateMock: RequestUpdateFigureStructure = {
  id: "5f234c24c2a7890123456789",
  title: "Goku SS4",
  character: "Goku",
  franchise: "Dragon Ball",
  isPurchased: true,
  manufacturer: "Break Studio",
  material: "Resin",
  size: 31,
  weight: 2.67,
  price: 95,
  image:
    "https://www.kaionation.com/wp-content/uploads/2023/05/Image_20230506143056-681x1024.jpg",
  userId: "646fc50910c8e8c5b17d54a7",
};

export const badRequestFiguresUdgrateMock: RequestUpdateFigureStructure = {
  id: "5f234c24c2a7753123456789",
  title: "Goku SS4",
  character: "Goku",
  franchise: "Dragon Ball",
  isPurchased: true,
  manufacturer: "Break Studio",
  material: "Resin",
  size: 31,
  weight: 2.67,
  price: 95,
  image:
    "https://www.kaionation.com/wp-content/uploads/2023/05/Image_20230506143056-681x1024.jpg",
  userId: "646fc50910c8e8c5b17d54a7",
};
