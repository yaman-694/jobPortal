import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserInformation } from '../../interface'

export interface User {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    slug?: string;
    githubId?: string;
    googleId?: string;
}

// extends User
export interface UserWithFormData extends User {
  information: UserInformation
}

export interface UserState {
  currentUser: UserWithFormData
  error: string | null
  loading: boolean
}

const initialState: UserState = {
    currentUser: {
      _id: '',
      email: '',
      firstname: '',
      lastname: '',
      information: {
        role: '',
        skills: '',
        locality: '',
        country: '',
        city: '',
        resume: {
          file_link: '',
        }
      }
    },
    error: null,
    loading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: state => {
      ;(state.loading = true), (state.error = null)
    },
    signInSuccess: (state, action: PayloadAction<UserWithFormData>) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },

    onBoardingStart: state => {
      state.loading = true
      state.error = null
    },

    onBoardingSuccess: (state, action: PayloadAction<UserWithFormData>) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },

    onBoardingFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    updateUserStart: state => {
      state.loading = true
      state.error = null
    },
    updateUserSuccess: (state, action: PayloadAction<UserWithFormData>) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    deleteUserStart: state => {
      state.loading = true
      state.error = null
    },
    deleteUserSuccess: state => {
      state.currentUser = {
        _id: '',
        email: '',
        firstname: '',
        lastname: '',
        information: {
          role: '',
          skills: '',
          locality: '',
          country: '',
          city: '',
          resume: {
            file_link: '',
          }
        }
      }
      state.loading = false
      state.error = null
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    signOutUserStart: state => {
      state.loading = true
    },
    signOutUserSuccess: state => {
      state.currentUser = {
        _id: '',
        email: '',
        firstname: '',
        lastname: '',
        information: {
          role: '',
          skills: '',
          locality: '',
          country: '',
          city: '',
          resume: {
            file_link: '',
          }
        }
      }
      state.loading = false
      state.error = null
    },
    signOutUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const { signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart, signOutUserFailure, signOutUserSuccess, onBoardingFailure, onBoardingSuccess, onBoardingStart } = userSlice.actions;

export default userSlice.reducer
