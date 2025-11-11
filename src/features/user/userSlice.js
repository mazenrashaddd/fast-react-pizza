import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function fetchAddress() {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  },
);

const initialState = {
  fullName: "",
  status: "idle",
  error: "",
  address: "",
  position: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName(state, action) {
      state.fullName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.rejected, (state) => {
        ((state.status = "error"),
          (state.error =
            "There was a problem getting your address, please try again"));
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        ((state.status = "idle"),
          (state.address = action.adress),
          (state.position = action.position));
      }),
});

export const { setName } = userSlice.actions;

export default userSlice.reducer;
