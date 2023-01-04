export interface IPlace {
  id: string;
  image: string;
  name: string;
  description: string;
  remoteness?: number;
  bookedDates: number[];
  price: number;
}

export type PlaceList = Pick<IPlace, "id" | "name" | "image">;
