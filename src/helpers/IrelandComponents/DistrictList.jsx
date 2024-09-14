// import { ModeAction } from "../../store/context/mode";
// import { fRegion } from "../../store/context/fetchRegion";
// import { useContext } from "react";
// import Search from "../components/conutryComponents/Search";

// function DistrictList({ countries }) {
//   const context = useContext(ModeAction);
//   const regionCtx = useContext(fRegion);
//   let thisContries;
//   if (regionCtx.data === undefined) thisContries = countries;
//   else thisContries = regionCtx.data;

// function chunkArray(arr, size) {
//   var groupedArray = [];
//   for (var i = 0; i < arr.length; i += size) {
//     groupedArray.push(arr.slice(i, i + size));
//   }
//   return groupedArray;
// }

//   return (
//     <>
//       <Search />
//       <section id="main" className={context.mode ? "blight" : "bDark"}>
//         <div class="container">
//           {chunkArray(list, 4).map((chunk) => (
//             <div class="row">
//               {chunk.map((item) => (
//                 <div className="col-md-6 col-sm-6 col-lg-3 format">
//                   <h2>{item.ED_ENGLISH}</h2>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }
// export default DistrictList;
