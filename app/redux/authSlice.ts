import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  msg: string;
  user: string;
  token: string;
  loading: boolean;
  error: string;
}

interface SignUpRequestBody {
  name: string;
  email: string;
  password: string;
}

interface SignInRequestBody {
  password: string;
  email: string;
}

interface SignUpResponse {
  error: string;
  msg: string;
  token?: any;
  user?: any;
}

interface SignInResponse extends SignUpResponse {
  user: string;
}

export const signUpUser = createAsyncThunk<SignUpResponse, SignUpRequestBody>(
  "signupuser",
  async (body) => {
    try {
      const res = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const { error } = await res.json();
        return { error, msg: "", user: "", token: "" };
      }

      const { token } = await res.json();
      return { error: "", msg: "User signed up successfully", user: "", token };
    } catch (error) {
      return { error: "An error occurred", msg: "", user: "", token: "" };
    }
  }
);

export const signInUser = createAsyncThunk<SignInResponse, SignInRequestBody>(
  "signinuser",
  async (body) => {
    try {
      const res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const { error } = await res.json();
        return { error, msg: "", user: "", token: "" };
      }

      const { token, user } = await res.json();
      return { error: "", msg: "User signed in successfully", user, token };
    } catch (error) {
      return { error: "An error occurred", msg: "", user: "", token: "" };
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState: {
    msg: "",
    user: "",
    token: "",
    loading: false,
    error: "",
  } as AuthState,

  reducers: {
    addToken: (state: AuthState, action) => {
      state.token = localStorage.getItem("token") || "";
    },
    addUser: (state: AuthState, action) => {
      state.user = localStorage.getItem("user") || "";
    },
    logout: (state: AuthState, action) => {
      // TODO
      state.token = "";
      localStorage.clear();
    },
  },

  extraReducers: (builder) => {
    // Sign up
    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      signUpUser.fulfilled,
      (state, { payload: { error, msg, token, user } }) => {
        state.loading = false;
        if (error) {
          state.error = error;
        } else {
          state.msg = msg;
          state.token = token!;
        }
      }
    );

    builder.addCase(signUpUser.rejected, (state) => {
      state.loading = false;
      state.error = "An error occurred";
    });

    // Sign in
    builder.addCase(signInUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      signInUser.fulfilled,
      (state, { payload: { error, msg, token, user } }) => {
        state.loading = false;
        if (error) {
          state.error = error;
        } else {
          state.msg = msg;
          state.token = token!;
          state.user = user;

          localStorage.setItem("msg", msg);
          localStorage.setItem("token", token!);
          localStorage.setItem("user", JSON.stringify(user));
        }
      }
    );

    builder.addCase(signInUser.rejected, (state) => {
      state.loading = false;
      state.error = "An error occurred";
    });
  },
});

export default authSlice.reducer;
