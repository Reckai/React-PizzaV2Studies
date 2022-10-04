import React from 'react'

type CategoresProps = {
  value: number;
  setIsChoosen: (i:number) => void;
}

 const Categores: React.FC<CategoresProps> = React.memo(({ value , setIsChoosen }) =>
 {
   
 
   const categories = [
     'Все',
     'Вегетарианская',
     'Мясные',
     'Гриль',
     'Острые',
     'Закрытые',
 
   ];
   return (
     <div className="categories">
       <ul>
         {
           categories.map((obj, i) => (
             <li
               key={i}
               onClick={() => setIsChoosen(i)}
               className={value  === i ? 'active' : ""}
             >
               {obj}
             </li>))
         }
       </ul>
     </div>
   )
 })

export default Categores;