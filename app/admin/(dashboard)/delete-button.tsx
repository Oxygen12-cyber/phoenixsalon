"use client";

import { deleteProduct } from "./products/actions";

const DeleteButton = ({ id, name }: { id: number; name: string }) => {
  return (
    <form
      action={deleteProduct}
      onSubmit={(e) => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-full px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  );
};

export default DeleteButton;
