import Filter from "./Filter";
import Sort from "./Sort";

export default function SortFilterMenue() {
  return (
    <>
      <div className="flex justify-end gap-4 mb-4">
        <Filter />
        <Sort />
      </div>
    </>
  );
}
