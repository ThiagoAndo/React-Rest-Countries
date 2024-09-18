import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "myLocation",
  initialState: {
    loc: {
      count: null,
      country: null,
      lat: null,
      local_names: null,
      lon: null,
      name: null,
    },
    districts: [],
    conName: [],
    disName: [],
    data: [],
    count: 0,
  },

  reducers: {
    setLoc(state, action) {
      state.loc = action.payload;
    },

    setData(state, action) {
      state.data = action.payload.sort((a, b) =>
        a.ED_ENGLISH > b.ED_ENGLISH ? 1 : -1
      );
    },

    findDistrict(state, action) {
      const hasLocation = action.payload.hasLoc;
      const showAll = action.payload.name != "All Counties";
      if (hasLocation && showAll) {
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
        state.count++;
        state.districts = found;
      } else {
        state.districts = state.data;
      }
    },
    setSearchValues(state, action) {
      const allCounty = state.data.map((obj) => {
        return obj.attributes.COUNTY;
      });

      state.data.map((obj, i) => {
        state.disName.push({ id: i, name: obj.attributes.ED_ENGLISH });
      });

      state.conName = [...new Set(allCounty)];
    },
  },
});

const store = configureStore({
  reducer: { location: locationSlice.reducer },
});
export const locAction = locationSlice.actions;

export default store;
