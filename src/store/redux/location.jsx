import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "myLocation",
  initialState: {
    loc: {
      country: null,
      lat: null,
      lon: null,
      name: null,
    },
    locDetail: {
      name: null,
      country: null,
      country_code: null,
      state: null,
      city: null,
      municipality: null,
      postcode: null,
      city_district: null,
      district: null,
      suburb: null,
      street: null,
      lon: null,
      lat: null,
      state_code: null,
      distance: null,
      result_type: null,
      formatted: null,
      address_line1: null,
      address_line2: null,
    },
    districts: [],
    conName: [],
    disName: [],
    data: [],
    count: 0,
    notFound: null,
    backup: [],
  },

  reducers: {
    setLoc(state, action) {
      state.loc = action.payload;
    },
    setFullLoc(state, action) {
      state.locDetail = action.payload;
    },

    setData(state, action) {
      state.data = action.payload.sort((a, b) =>
        a.ED_ENGLISH > b.ED_ENGLISH ? 1 : -1
      );
    },

    findDistrict(state, action) {
      const uper = action.payload.name.toUpperCase().trim();

      let found = [];
      found = state.data.filter((obj) => {
        return obj.attributes.COUNTY === action.payload.name;
      });

      if (found.length <= 0) {
        found = state.data.filter((obj) => {
          const { attributes } = obj;
          if (obj.attributes.ED_ENGLISH.includes(uper)) return attributes;
        });
      }

      if (found.length <= 0) {
        found = state.data.filter((obj) => {
          return obj.attributes.PROVINCE === action.payload.name;
        });
      }

      state.count++;
      if (found?.length > 0 && state.loc.name === null) {
        state.backup = found;
        state.districts = found;
        state.loc.name = action.payload.name;
        state.loc.country = action.payload.country;
        state.loc.lon = action.payload.lon;
        state.loc.lat = action.payload.lat;
      } else if (found?.length === 0 && state.count === 3) {
        state.backup = state.data;
        state.districts = state.data;
        state.loc.name = "Ireland";
        state.loc.country = "IE";
      } else {
        state.districts = found = state.data.filter((obj) => {
          return obj.attributes.COUNTY === "Dublin";
        });
      }
    },
    setFilterDistricts(state, action) {
  
      if (action.payload.call != "county") {
        if (action.payload.name != "All Counties") {
        console.log("chamo");

          state.districts = state.data.filter((obj) => {
            return obj.attributes.COUNTY === action.payload.name;
          });


        } else {
          state.districts = state.data;
        }
      } else {
        state.districts = state.data.filter((obj) => {
          return obj.attributes.ED_ENGLISH === action.payload.name;
        });
      }
    },
    setSearchValues(state, action) {
      const allCounty = state.data.map((obj) => {
        return obj.attributes.COUNTY;
      });

      state.data.map((obj, i) => {
        state.disName.push({ id: i, name: obj.attributes.ED_ENGLISH });
      });

      state.conName = [...new Set(allCounty)].sort((a, b) => (a > b ? 1 : -1));
    },
    setNotFound(state, action) {
      state.notFound = action.payload;
    },
    setLocDistricts(state, action) {
      state.districts = state.backup;
    },
  },
});

const store = configureStore({
  reducer: { location: locationSlice.reducer },
});
export const locAction = locationSlice.actions;

export default store;

// GEOPIFY location responses:
// const allInfo = {
//   address_line1: "Amado Granell Mesado (imparell) - Antonio Ferrandis",
//   address_line2:
//     "Avinguda d'Amado Granell Mesado (Militar), 46013 Valencia, Spain",
//   category: "public_transport.bus",
//   city: "Valencia",
//   country: "Spain",
//   country_code: "es",
//   county: "Comarca de València",
//   distance: 59.34484253185858,
//   district: "Ciutat de les Arts i de les Ciències",
//   formatted:
//     "Amado Granell Mesado (imparell) - Antonio Ferrandis, Avinguda d'Amado Granell Mesado (Militar), 46013 Valencia, Spain",
//   lat: 39.4511804,
//   lon: -0.3591353,
//   name: "Amado Granell Mesado (imparell) - Antonio Ferrandis",
//   old_name: "General Urrutia (impar) - Antonio Ferrandis",
//   place_id:
//     "519db415a012fcd6bf59504c8347c0b94340f00103f9012b94554400000000c00201920333416d61646f204772616e656c6c204d657361646f2028696d706172656c6c29202d20416e746f6e696f2046657272616e646973",
//   plus_code: "8CFXFJ2R+F8",
//   plus_code_short: "FJ2R+F8 Valencia, Comarca de València, Spain",
//   postcode: "46013",
//   province: "Valencia",
//   ref: "2296",
//   result_type: "amenity",
//   state: "Valencian Community",
//   street: "Avinguda d'Amado Granell Mesado (Militar)",
//   suburb: "Quatre Carreres",
// };

// const allInfo2 = {
//   name: "Ashgrove",
//   country: "Ireland",
//   country_code: "ie",
//   state: "Leinster",
//   city: "Tallaght",
//   municipality: "South Dublin",
//   postcode: "D24 R5Y6",
//   city_district: "Tallaght-Springfield DED 1986",
//   district: "Dublin 24",
//   suburb: "Springfield",
//   street: "Ashgrove",
//   lon: -6.3869874,
//   lat: 53.2882189,
//   state_code: "L",
//   distance: 13.827068905473524,
//   result_type: "street",
//   formatted: "Ashgrove, Springfield, Tallaght, Ireland",
//   address_line1: "Ashgrove",
//   address_line2: "Springfield, Tallaght, Ireland",
// };
