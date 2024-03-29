import React from 'react'
import { useSelector } from 'react-redux';
import { setCategoryId, setPageCount,  selectSort} from '../redux/slices/filterSlice'

import Sort from '../components/Sort'
import Categores from '../components/Categores'
import Pizza_block from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'



import { fetchPizza,PizzaData,  } from '../redux/slices/pizzasSlice'
import { useAppDispatch } from '../redux/store';




const Home: React.FC = () => {
  const isSearch = React.useRef(false);

  const dispatch = useAppDispatch();
  const { items, status } = useSelector(PizzaData)
  const { searchValue, pageCount,sort, categoryId } = useSelector(selectSort)
  
  
  
  
  const onChangeCategories = React.useCallback((idx:number) => {
    dispatch(setCategoryId(idx))
  }, []);





  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map( (obj:any)=> status === 'loading' ? <Skeleton /> : (
    
      <Pizza_block
          key={obj.id}
        {...obj}
      />
    
  ));

  const onPageChange = (idx: any) => {
    dispatch(setPageCount(idx))
  }

  const getPizza = async () => {
 
 
    const category = categoryId > 0 ? `&&category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';
    const order = sort.sortProperties.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperties.replace('-', '');

    
    dispatch(
     
      fetchPizza({
      category,
      search,
      order,
      sortBy ,
      pageCount,
    }))
    window.scrollTo(0, 0)
  }
 // Если изменили параметры и был первый рендер 
  React.useEffect(() => {
    // if (isMounted.current) {
    //   const queryString = qs.stringify({
    //     sortProperties: sort.sortProperties,
    //     categoryId,
    //     pageCount,
    //   });

    //   console.log(isMounted.current);

    //   navigate(`/?${queryString}`);
    // }

    // isMounted.current = true;
    getPizza();
  }, [categoryId, sort.sortProperties, pageCount]);
// Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     console.log(window.location.search);
  //     const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;   
  //     const sort = sortNames.find((obj) => obj.sortProperties === params.sortBy);
       
  //      console.log(params);
       
   
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         sort : sort || sortNames[0] ,
  //         pageCount: params.pageCount,
  //       })
  //     );
  //     isSearch.current = false;
  //   }
  // }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizza();
    }

    isSearch.current = true;
  }, [categoryId, sort.sortProperties, searchValue, pageCount]);


 



  return (
    <div className="container">
      <div className="content__top">
        <Categores value={categoryId} setIsChoosen={onChangeCategories} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (<div>
        <h2>Произошла ошибка</h2>
      </div>) : (<div className="content__items">
        {
          status === 'loading' ? skeletons : pizzas
        }
      </div>)}
      <Pagination page={pageCount} currentPage={onPageChange} />
    </div>
  )
}
export default Home;