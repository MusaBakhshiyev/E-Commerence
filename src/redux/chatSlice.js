import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addMessageToDB, getAllMessagesFromDB, clearMessagesFromDB, deleteMessageFromDB } from '../utils/indexedDB';

export const loadChatHistory = createAsyncThunk(
  'chat/loadChatHistory',
  async () => {
    const messages = await getAllMessagesFromDB();

    const enrichedMessages = messages.map(msg => {
      if (msg.type === 'voice' && msg.blob) {
        return {
          ...msg,
          blobUrl: URL.createObjectURL(msg.blob)
        };
      }
      else if (msg.type === 'photo' && msg.blob) {
        return {
          ...msg,
          blobUrl: URL.createObjectURL(msg.blob)
        };
      }
      return msg;
    });

    return enrichedMessages;
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
      const message = action.payload;

      if (message.type === 'voice' && message.blob) {
        message.blobUrl = URL.createObjectURL(message.blob);
      }

      else if (message.type === 'photo' && message.blob) {
        message.blobUrl = URL.createObjectURL(message.blob);
      }

      state.messages.push(message);
      addMessageToDB(message);
    },
    clearMessages: (state) => {
      state.messages = [];
      clearMessagesFromDB();
    },
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter(msg => msg.timestamp !== action.payload);
      deleteMessageFromDB(action.payload); 
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

export const { addMessage, clearMessages, deleteMessage } = chatSlice.actions;
export default chatSlice.reducer;
