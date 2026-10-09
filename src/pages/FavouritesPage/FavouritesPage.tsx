import { useAppContext } from '../../context/AppContext';
import { Catalog } from '../../components/Catalog';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useAppContext();

  return (
    <Catalog products={favourites} title="Favourites" category="favourites" />
  );
};
