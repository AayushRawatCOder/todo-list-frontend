export const TodoReducer = (state, action) => {
    switch (action.type) {
      case "LOAD_TODOS":
        return action.payload ?? { Today: [], Tomorrow: [] };
  
      case "ADDTODAY":
        return { ...state, Today: [...state.Today, action.payload] };
  
      case "ADDTOMORROW":
        return { ...state, Tomorrow: [...state.Tomorrow, action.payload] };
  
      case "UPDATETODAY":
        return { ...state, Today: action.payload.tasks };
  
      case "UPDATETOMORROW":
        return { ...state, Tomorrow: action.payload.tasks };

      // case "DELETE_TASK":
      //     return {
      //       ...state,
      //       [action.payload.type]: state[action.payload.type].filter(
      //         (_, i) => i !== action.payload.index
      //       ),
      //     };
      case "TOGGLE_COMPLETE":
          const { type, index } = action.payload;
        
          // Ensure Completed is always an array
          const completedTasks = state.Completed ? [...state.Completed] : [];
        
          // Remove task from the current list and move it to Completed
          const updatedTasks = state[type].filter((_, i) => i !== index);
          const completedTask = { ...state[type][index], completed: true };
        
          return {
            ...state,
            [type]: updatedTasks,
            Completed: [...completedTasks, completedTask], // ✅ Ensure it's an array
          };
        
        
      default:
        return state;
    }
  };
  