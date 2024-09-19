import { categories } from "../../services/categoryJson";
import "./categoryItem.style.scss";

const CategoryItem = () => {
  return (
    <div className="categories-container">
      {categories.map(({ title, id, imageUrl }) => (
        <div className="category-container" key={id}>
          <div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} />
          <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shp now</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryItem;
