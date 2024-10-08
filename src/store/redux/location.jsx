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
