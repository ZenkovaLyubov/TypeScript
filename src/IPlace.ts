export interface IPlace {
  id: string;
  image: string;
  name: string;
  description: string;
  bookedDates: number[];
  price: number;
  remoteness?: number | undefined;
}

export type PlaceList = Pick<IPlace, "id" | "name" | "image">;
