import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addMessageToDB, getAllMessagesFromDB, clearMessagesFromDB } from '../utils/indexedDB';

export const loadChatHistory = createAsyncThunk(
  'chat/loadChatHistory',
  async () => {
    const messages = await getAllMessagesFromDB();
    return messages;
  }
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    loading: false,
    error: null
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      addMessageToDB(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
      clearMessagesFromDB();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadChatHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(loadChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
