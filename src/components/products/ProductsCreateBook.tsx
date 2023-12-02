import { products } from "@/lib";
import { FormInput, FormSelect } from "@/ui";
import React from "react";

type Props = {};

const ProductsCreateBook = ({
  register,
  errors,
  books,
  setBooks,
}: {
  register?: any;
  errors: any;
  setBooks: any;
  books: string;
}) => {
  return (
    <div className=" grid grid-cols-5 gap-10 border-b-2 border-gray-200 pb-4">
      <div className=" col-span-5 flex gap-8">
        <FormInput
          label="Book"
          type="text"
          isInvalid={Boolean(errors?.book)}
          {...register("book", {
            required: "Book field is required",
          })}
        />
        <FormInput
          label="Reference CCY"
          type="text"
          name="referenceccy"
          disabled={true}
          isInvalid={Boolean(errors?.ref_ccy)}
          {...register("ref_ccy", {
            required: "Reference CCY field is required",
          })}
        />
      </div>
    </div>
  );
};

export default ProductsCreateBook;
